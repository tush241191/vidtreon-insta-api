import DatabaseError from "../models/error.js";
import {ProducerFacility} from "../models/init.js";
import BaseService from "./BaseService.js";

const baseIncludeQuery = {
  meta: true,
  producer: true
}

class ProducerFacilityService extends BaseService {

  static async getProducerFacilities(producerId) {
    try {
      return await ProducerFacility.findMany({
        where: {
          producer_id: producerId
        }
      })
    } catch (err) {
      throw new DatabaseError(err);
    }
  }

  static async list() {
    try {
      const query = {
        include: baseIncludeQuery
      };

      return await super.list({
        service: ProducerFacility,
        query: query
      });
    } catch (err) {
      throw new DatabaseError(err);
    }
  }

  static async get(id) {
    try {
      return await ProducerFacility.findUnique({
        where: {id},
        include: baseIncludeQuery
      });
    } catch (err) {
      throw new DatabaseError(err);
    }
  }

  static async getByName(name) {
    try {
      return await ProducerFacility.findMany({
        where: {
          name: {equals: name, mode: "insensitive"}
        },
        include: baseIncludeQuery
      });
    } catch (err) {
      throw new DatabaseError(err);
    }
  }

  static async create(data) {
    try {
      return await ProducerFacility.create({data: data, include: baseIncludeQuery});
    } catch (err) {
      throw new DatabaseError(err);
    }
  }

  static async update(id, data) {
    try {
      return await ProducerFacility.update({
        where: {id},
        data: data,
        include: baseIncludeQuery
      });
    } catch (err) {
      throw new DatabaseError(err);
    }
  }

  static async delete(id) {
    try {
      return await super.delete({
        service: ProducerFacility,
        id: id
      });
    } catch (err) {
      throw new DatabaseError(err);
    }
  }
}

export default ProducerFacilityService;
