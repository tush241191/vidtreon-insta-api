import DatabaseError from "../models/error.js";
import {ProducerLog} from "../models/init.js";

class ProducerLogService {
  static async list() {
    try {
      return ProducerLog.findMany();
    } catch (err) {
      throw new DatabaseError(err);
    }
  }

  static async get({producerId, event}) {
    try {
      return await ProducerLog.findFirst({
        where: {
          producer_id: producerId,
          event: event
        }
      });
    } catch (err) {
      throw new DatabaseError(err);
    }
  }

  static async create({producerId, event, createdBy, createdAt = new Date()}) {
    try {
      return await ProducerLog.create({
        data: {
          producer_id: producerId,
          event: event,
          created_by: createdBy,
          created_at: createdAt
        },
        include: {
          producer: true,
          creator: true
        }
      });
    } catch (err) {
      throw new DatabaseError(err);
    }
  }
}

export default ProducerLogService;
