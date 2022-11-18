import {randomUUID} from "crypto";

import DatabaseError from "../models/error.js";
import {Purchase} from "../models/init.js";
import {generatePurchaseHash} from "../utils/validaitonHash.js";
import BaseService from "./BaseService.js";
import {PURCHASE_STATE_PAID, PURCHASE_STATE_PENDING} from "./constants/purchase.js";
import {PURCHASE_LOG_CREATE, PURCHASE_LOG_UPDATE} from "./constants/purchaseLog.js";
import ProducerFacilityCreditService from "./producerFacilityCredit.js";

class PurchaseService extends BaseService {
  static async list() {
    try {
      const query = {
        orderBy: [{date: "desc"}],
        include: {
          facility: true,
          user: true
        }
      };

      return await super.list({
        service: Purchase,
        query: query
      });
    } catch (err) {
      throw new DatabaseError(err);
    }
  }

  static async userList(userId) {
    try {
      return Purchase.findMany({
        where: {user_id: userId},
        orderBy: [{date: "desc"}],
        include: {
          facility: true
        }
      });
    } catch (err) {
      throw new DatabaseError(err);
    }
  }

  static async get(id) {
    try {
      return await Purchase.findUnique({
        where: {id},
        include: {
          facility: true,
          producer: true,
          user: {
            include: {
              linkClient: {include: {client: true}}
            }
          }
        }
      });
    } catch (err) {
      throw new DatabaseError(err);
    }
  }

  static async create(data) {
    try {
      return await Purchase.create({data: {
        ...data,
        ...{
          logs: {
            create: {
              event: PURCHASE_LOG_CREATE,
              data: {state: PURCHASE_STATE_PENDING}
            }
          }
        }
      }});
    } catch (err) {
      throw new DatabaseError(err);
    }
  }

  /**
   * @TODO majority of this logic could be repurposed for other types of purchases
   */
  static async createVehiclePurchase({tonnes, client, facility, purchaseDate, meta}) {
    try {
      const purchaseTonnes = tonnes;

      const buildPurpose = () => {

        /** @TODO Meta data will most probably be linked differently in the future */
        const purposeParts = [
          `This certificate states that ${meta.clientCustomerVehicle.clientCustomer}`,
          `has compensated ${purchaseTonnes} tonnes of CO2`,
          `emissions emitted by following car ${meta.clientCustomerVehicle.licensePlate}`
        ]

        return purposeParts.join(' ')
      }

      const dateOfPurchase = purchaseDate ?? new Date();
      const purchaseId = randomUUID();
      const validationHash = generatePurchaseHash({tonnes, purchaseId, dateOfPurchase, facility})

      const availableCredits = await ProducerFacilityCreditService.listAvailableCredits()

      /**
       * @TODO move this logic to a more logical location
       * @TODO Add additional logical checks
       * - Add a check for cases when the first 100 credit batches does not cover the purchase tonnes amount
       * - Add a check for cases when the first 100 credits batches return less credits than the purchase
       * - Add a check for cases when the there are no available credit batches
       */
      let unallocatedPurchaseTonnes = purchaseTonnes;
      let purchaseCreditsArray = []

      /**
       * - Check if batch has more available tokens for allocation than the purchase requires
       *   and if so update the state accordingly
       * - Push credits along with assigned tonnages to the purchaseCreditArray for linking
       *   in purchase creation query
       */
      for (let currentIndex = 0; currentIndex < availableCredits.length; currentIndex++) {
        if(unallocatedPurchaseTonnes === 0) break;

        const formatTonnes = tonnes => parseFloat(tonnes.toFixed(6))

        const credit = availableCredits[currentIndex];
        const availableCreditTonnes = formatTonnes(credit.tonnes_available);
        const retiredCreditTonnes = formatTonnes(credit.tonnes_retired);

        /**
         * If batch has more credits available then purchase expects then we can just return the
         * unallocated value as a result and subtract it later.
         *
         * If batch has less, then we have to decrement the value from `unallocatedPurchaseTonnes`, set the value
         * and continue with the loop
         */
        const setAllocatedCreditTonnes = () => {
          if ( availableCreditTonnes >= unallocatedPurchaseTonnes ) {
            const result = formatTonnes(unallocatedPurchaseTonnes);
            unallocatedPurchaseTonnes = 0;
            return result;
          }

          unallocatedPurchaseTonnes = formatTonnes(unallocatedPurchaseTonnes - availableCreditTonnes);
          return availableCreditTonnes;
        }

        const allocatedCreditTonnes = formatTonnes(setAllocatedCreditTonnes());

        /**
         * Update Facility Credit to reflect the allocated credits from each batch
         */
        await ProducerFacilityCreditService.update(credit.id, {
          tonnes_available: availableCreditTonnes - allocatedCreditTonnes,
          tonnes_retired: retiredCreditTonnes + allocatedCreditTonnes
        })

        /** Push processed credit info to creditsArray to link it on purchase creation */
        purchaseCreditsArray.push({
          credit_id: credit.id,
          tonnes: allocatedCreditTonnes
        })
      }

      const data = {
        id: purchaseId,
        client_id: client.id,
        validation_hash: validationHash,
        purpose: buildPurpose(),
        facility_id: facility.id,
        tonnes: purchaseTonnes,
        tonne_price: facility.price,
        state: PURCHASE_STATE_PENDING,
        date: dateOfPurchase,
        meta: meta,
        logs: {
          create: {
            event: PURCHASE_LOG_CREATE,
            data: {state: PURCHASE_STATE_PENDING}
          }
        },
        credits: {
          create: purchaseCreditsArray
        }
      };

      return await Purchase.create({data: data});
    } catch (err) {
      throw new DatabaseError(err);
    }
  }

  static async setPurchasePaid(id) {
    try {
      return await Purchase.update({
        where: {id},
        data: {
          state: PURCHASE_STATE_PAID,
          logs: {
            create: {
              event: PURCHASE_LOG_UPDATE,
              data: {state: PURCHASE_STATE_PAID}
            }
          }
        }
      });
    } catch (err) {
      throw new DatabaseError(err);
    }
  }

  static async update(id, data) {
    try {
      return await Purchase.update({
        where: {id},
        data: {
          ...data, 
          ...{
            logs: {
              create: {
                event: PURCHASE_LOG_UPDATE,
                data: {} //@TODO fill this
              }
            }
          }
        }
      });
    } catch (err) {
      throw new DatabaseError(err);
    }
  }
}

export default PurchaseService;
