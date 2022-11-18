import DatabaseError from "../../../models/error.js";
import {Customer, CustomerVehicle} from "../../../models/init.js";
import BaseService from "../../../services/BaseService.js";
import {calculateMonthlyFeeForCar, getAverageCarbonEmissions} from "../utils/calculations.js";

export default class VehicleService extends BaseService{

  static async getClientCustomerVehicles(clientId) {
    const customerData = await Customer.findMany({
      where: {client_id: clientId},
      include: {
        vehicles: {
          where: {deleted_at: null}
        }
      }
    })

    return mapClientCustomerVehiclesToASingleList(customerData)
  }

  static async saveVehicle(data) {
    try {
      return await CustomerVehicle.create({data: buildVehicleEntity(data)});
    } catch (err) {
      throw new DatabaseError(err);
    }
  }

  static async updateVehicle(id, vehicleRequest) {
    try {
      return await CustomerVehicle.update({
        where: {id},
        data: {
          ...buildVehicleUpdateEntity(vehicleRequest),
          updated_at: new Date()
        }
      });
    } catch (err) {
      throw new DatabaseError(err);
    }
  }

  static async deleteVehicle(id) {
    try {
      return await super.delete({
        service: CustomerVehicle,
        id: id
      });
    } catch (err) {
      throw new DatabaseError(err);
    }
  }
}

const mapClientCustomerVehiclesToASingleList = clientCustomersWithVehicles => {
  return clientCustomersWithVehicles
    .map(({vehicles}) => vehicles.map(vehicle => vehicle))
    .flat(1);
}

const buildVehicleEntity = data => {
  const avgEmissions = getAverageCarbonEmissions(data);
  return {
    license_plate: data.licensePlate,
    vin_code: data.vinCode,
    make: data.make,
    model: data.model,
    owner: data.owner,
    co_nedc: data.coNedc,
    co_wltp: data.coWltp,
    monthly_fee: calculateMonthlyFeeForCar(data.allowedMonthlyMileage, avgEmissions),
    allowed_monthly_mileage: data.allowedMonthlyMileage,
    contract_start: data.contractStart,
    contract_end: data.contractEnd,
    customer_id: data.customerId
  }
}

const buildVehicleUpdateEntity = data => {
  return {
    contract_start: data.contractStart,
    contract_end: data.contractEnd
  }
}
