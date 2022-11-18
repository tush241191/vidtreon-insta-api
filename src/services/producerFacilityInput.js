import DatabaseError from "../models/error.js";
import {ProducerFacilityInput} from "../models/init.js";
import {calculateAdditionalityTonnes} from "../utils/producerFacility.js";
import {generateFacilityInputHash} from "../utils/validaitonHash.js";
import BaseService from "./BaseService.js";
import {FACILITY_INPUT_STATE_RECEIVED} from "./constants/facilityInput.js";

const includeQuery = {
  facility: true,
  meta: true,
  credit: true
}

class ProducerFacilityInputService extends BaseService {
  static async list() {
    try {
      return await super.list({
        service: ProducerFacilityInput,
        query: {include: includeQuery}
      });
    } catch (err) {
      throw new DatabaseError(err);
    }
  }

  static async get(id) {
    try {
      return await ProducerFacilityInput.findUnique({
        where: {id},
        include: includeQuery
      });
    } catch (err) {
      throw new DatabaseError(err);
    }
  }

  static async create({facility, batch}) {
    try {
      const getAdditionalityTonnes = () => {
        const calculationData = {
          inputTonnes: batch.tonnes,
          additionalityPercentage: facility.additionality_percentage
        };
        return calculateAdditionalityTonnes(calculationData)
      }

      const validationHash = generateFacilityInputHash({
        inputTonnes: batch.tonnes,
        facility: facility,
        createdAt: batch.date
      })

      return await ProducerFacilityInput.create({
        data: {
          facility_id: facility.id,
          validation_hash: validationHash,
          tonnes_input: batch.tonnes,
          tonnes_additionality: getAdditionalityTonnes(),
          state: FACILITY_INPUT_STATE_RECEIVED,
          created_at: batch.date,
          updated_at: batch.date,
          meta: {
            create: {
              collector: batch.meta.collector,
              waste_code: batch.meta.wasteCode,
              material_type: batch.meta.materialType,
              full_dataset: batch.meta,
              created_at: batch.date,
              updated_at: batch.date
            }
          }
        },
        include: includeQuery
      });
    } catch (err) {
      throw new DatabaseError(err);
    }
  }
}

export default ProducerFacilityInputService;
