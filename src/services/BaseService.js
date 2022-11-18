import merge from 'lodash/merge.js';

import DatabaseError from "../models/error.js";

class BaseService {
  static async list({service, query = {}}) {
    try {
      const baseListQuery = {
        where: {deleted_at: null}
      };

      const listQuery = merge(baseListQuery, query)

      return await service.findMany(listQuery);
    } catch (err) {
      throw new DatabaseError(err);
    }
  }

  static async delete({service, id, query = {}}) {
    try {
      const baseDeleteQuery = {
        where: {id},
        data: {deleted_at: new Date()}
      };

      const deleteQuery = merge(baseDeleteQuery, query)

      return await service.update(deleteQuery);
    } catch (err) {
      throw new DatabaseError(err);
    }
  }
}

export default BaseService;
