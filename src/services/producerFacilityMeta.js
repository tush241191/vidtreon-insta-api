import DatabaseError from "../models/error.js";
import {ProducerFacilityMeta} from "../models/init.js";
import BaseService from "./BaseService.js";

const includeQuery = {facility: true}

class ProducerFacilityMetaService extends BaseService {
  static async list() {
    try {
      return await super.list({
        service: ProducerFacilityMeta,
        query: {include: includeQuery}
      });
    } catch (err) {
      throw new DatabaseError(err);
    }
  }

  static async get(id) {
    try {
      return await ProducerFacilityMeta.findUnique({
        where: {id},
        include: includeQuery
      });
    } catch (err) {
      throw new DatabaseError(err);
    }
  }

  static async create(data) {
    try {
      return await ProducerFacilityMeta.create({data: data});
    } catch (err) {
      throw new DatabaseError(err);
    }
  }

  static async update(id, data) {
    try {
      return await ProducerFacilityMeta.update({
        where: {id},
        data: data
      });
    } catch (err) {
      throw new DatabaseError(err);
    }
  }
}

export default ProducerFacilityMetaService;
