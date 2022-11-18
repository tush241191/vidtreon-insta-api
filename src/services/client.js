import DatabaseError from "../models/error.js";
import {Client} from "../models/init.js";
import BaseService from "./BaseService.js";

class ClientService extends BaseService {
  static async list() {
    try {
      return await super.list({
        service: Client
      });
    } catch (err) {
      throw new DatabaseError(err);
    }
  }

  static async get(id) {
    try {
      return await Client.findUnique({
        where: {id},
        include: {
          users: {
            include: {user: true}
          }
        }
      });
    } catch (err) {
      throw new DatabaseError(err);
    }
  }

  static async create(data) {
    try {
      return await Client.create({data});
    } catch (err) {
      throw new DatabaseError(err);
    }
  }

  static async update(id, data) {
    try {
      return await Client.update({
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

  static async delete(id) {
    try {
      const query = {
        include: {
          users: {
            include: {user: true}
          }
        }
      };

      return await super.delete({
        service: Client,
        id: id,
        query: query
      });
    } catch (err) {
      throw new DatabaseError(err);
    }
  }
}

export default ClientService;
