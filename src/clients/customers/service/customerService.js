import DatabaseError from "../../../models/error.js";
import {Customer} from "../../../models/init.js";
import BaseService from "../../../services/BaseService.js";

const baseIncludeQuery = {
  vehicles: true
}

export default class CustomerService extends BaseService{

  static async getAllCustomers(clientId) {
    try {
      const customerList = await super.list({
        service: Customer,
        query: {
          where: {
            client_id: clientId
          },
          include: baseIncludeQuery
        }
      });

      if (customerList === undefined) {
        return [];
      }

      return customerList;
    } catch (err) {
      throw new DatabaseError(err);
    }
  }

  static async saveCustomer(data) {
    try {
      const saveCustomerRequest = {
        name: data.name,
        client_id: data.clientId,
        type: data.type
      }
      return await Customer.create({data: saveCustomerRequest});
    } catch (err) {
      throw new DatabaseError(err);
    }
  }

  static async getCustomer(id) {
    return await Customer.findUnique({
      where: {id},
      include: baseIncludeQuery
    });
  }

  static async updateCustomer(id, customerRequest) {
    try {
      return await Customer.update({
        where: {id},
        data: {
          ...customerRequest,
          updated_at: new Date()
        }
      });
    } catch (err) {
      throw new DatabaseError(err);
    }
  }

  static async deleteCustomer(id) {
    // If customer have any vehicles, delete is not possible
    try {
      return await super.delete({
        service: Customer,
        id: id
      });
    } catch (err) {
      throw new DatabaseError(err);
    }
  }
}
