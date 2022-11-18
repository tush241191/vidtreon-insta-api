import DatabaseError from "../models/error.js";
import {Producer} from "../models/init.js";
import BaseService from "./BaseService.js";

class ProducerService extends BaseService {
  static async list() {
    try {
      return await super.list({
        service: Producer
      });
    } catch (err) {
      throw new DatabaseError(err);
    }
  }

  static async get(id) {
    try {
      return await Producer.findUnique({
        where: {id},
        include: {
          facilities: true
        }
      });
    } catch (err) {
      throw new DatabaseError(err);
    }
  }

  static async create(data) {
    try {
      return await Producer.create({data});
    } catch (err) {
      throw new DatabaseError(err);
    }
  }

  static async update(id, data) {
    try {
      return await Producer.update({
        where: {id},
        data: {
          ...data,
          updated_at: new Date()
        }
      });
    } catch (err) {
      throw new DatabaseError(err);
    }
  }

  static async verify(id) {
    try {
      return await Producer.update({
        where: {id},
        data: {
          is_verified: true,
          updated_at: new Date()
        }
      });
    } catch (err) {
      throw new DatabaseError(err);
    }
  }

  static async delete(id) {
    try {
      const query = {
        data: {
          facilities: {
            updateMany: {
              where: {is_active: true},
              data: {is_active: false}
            }
          }
        },
        include: {
          facilities: true
        }
      };

      return await super.delete({
        service: Producer,
        id: id,
        query: query
      });
    } catch (err) {
      throw new DatabaseError(err);
    }
  }
}

export default ProducerService;
