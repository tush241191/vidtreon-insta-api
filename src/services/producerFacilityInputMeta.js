import DatabaseError from "../models/error.js";
import {ProducerFacilityInputMeta} from "../models/init.js";
import BaseService from "./BaseService.js";

const includeQuery = {input: true}

class ProducerFacilityInputMetaService extends BaseService {
  static async list() {
    try {
      return await super.list({
        service: ProducerFacilityInputMeta,
        query: {include: includeQuery}
      });
    } catch (err) {
      throw new DatabaseError(err);
    }
  }

  static async get(id) {
    try {
      return await ProducerFacilityInputMeta.findUnique({
        where: {id},
        include: includeQuery
      });
    } catch (err) {
      throw new DatabaseError(err);
    }
  }

  static async create(data) {
    try {
      return await ProducerFacilityInputMeta.create({data: data});
    } catch (err) {
      throw new DatabaseError(err);
    }
  }

  static async update(id, data) {
    try {
      return await ProducerFacilityInputMeta.update({
        where: {id},
        data: data
      });
    } catch (err) {
      throw new DatabaseError(err);
    }
  }
}

export default ProducerFacilityInputMetaService;
