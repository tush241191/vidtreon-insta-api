import DatabaseError from "../models/error.js";
import {ProducerFacilityCredit} from "../models/init.js";
import {calculateCreditTonnes} from "../utils/producerFacility.js";
import {generateFacilityCreditHash} from "../utils/validaitonHash.js";
import BaseService from "./BaseService.js";

const includeQuery = {
  facility: true,
  input: true,
  purchaseCredits: true
}

class ProducerFacilityCreditService extends BaseService {
  static async list() {
    try {
      return await super.list({
        service: ProducerFacilityCredit,
        query: {include: includeQuery}
      });
    } catch (err) {
      throw new DatabaseError(err);
    }
  }

  static async get(id) {
    try {
      return await ProducerFacilityCredit.findUnique({
        where: {id},
        include: includeQuery
      });
    } catch (err) {
      throw new DatabaseError(err);
    }
  }

  static async listAvailableCredits(limit = 100) {
    try {
      return ProducerFacilityCredit.findMany({
        take: limit,
        where: {
          tonnes_available: {
            gt: 0
          }
        },
        orderBy: [{created_at: "asc"}]
      })
    } catch (err) {
      throw new DatabaseError(err);
    }
  }

  static async create({facility, facilityInput}) {
    try {

      /** @TODO In the future it should most likely set the date according to the generation, not the input incremention */
      const creationDate = new Date(facilityInput.created_at);

      const getCreditTonnes = () => {
        const calculationData = {
          additionalityTonnes: facilityInput.tonnes_additionality, 
          bufferPercentage: facility.buffer_percentage,
          benchmark: facility.benchmark
        };
        return calculateCreditTonnes(calculationData)
      }
      
      const {totalTonnes, bufferTonnes, availableTonnes} = getCreditTonnes()

      const validationHash = generateFacilityCreditHash({
        creditTonnes: totalTonnes,
        facility: facility,
        createdAt: creationDate
      })

      return await ProducerFacilityCredit.create({
        data: {
          facility_id: facility.id,
          input_id: facilityInput.id,
          validation_hash: validationHash,
          tonnes_base_amount: totalTonnes,
          tonnes_buffer: bufferTonnes,
          tonnes_available: availableTonnes,
          tonnes_reserved: 0,
          tonnes_retired: 0,
          created_at: creationDate,
          updated_at: creationDate
        }
      });
    } catch (err) {
      throw new DatabaseError(err);
    }
  }

  static async update(id, data) {
    try {
      return await ProducerFacilityCredit.update({
        where: {id},
        data: {
          ...data,
          ...{updated_at: new Date()}
        }
      });
    } catch (err) {
      throw new DatabaseError(err);
    }
  }
}

export default ProducerFacilityCreditService;
