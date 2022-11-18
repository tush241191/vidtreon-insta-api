import DatabaseError from "../models/error.js";
import {PurchaseLog} from "../models/init.js";

class PurchaseLogService {
  static async list() {
    try {
      return PurchaseLog.findMany();
    } catch (err) {
      throw new DatabaseError(err);
    }
  }

  static async get({producerId, event}) {
    try {
      return await PurchaseLog.findFirst({
        where: {
          producer_id: producerId,
          event: event
        }
      });
    } catch (err) {
      throw new DatabaseError(err);
    }
  }

  static async create({purchaseId, event, data, createdAt = new Date()}) {
    try {
      return await PurchaseLog.create({
        data: {
          purchase_id: purchaseId,
          event: event,
          data: data,
          created_at: createdAt
        },
        include: {
          purchase: true
        }
      });
    } catch (err) {
      throw new DatabaseError(err);
    }
  }
}

export default PurchaseLogService;
