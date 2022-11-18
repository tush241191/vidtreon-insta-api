import {VehicleCache} from "../../../models/init.js";
import BaseService from "../../../services/BaseService.js";

export default class VehicleDataService extends BaseService{

  static async getVehicleData(licensePlate) {
    const cachedData = await VehicleCache.findFirst({
      where: {license_plate: licensePlate}
    })
    if (!cachedData) {
      // make request to liiklusregister and save response to cache
      return parseVehicleDataFromJsonString()
    }

    return parseVehicleDataFromJsonString()
  }

}

const parseVehicleDataFromJsonString = () => {
  return {
    licensePlate: '123ABC',
    vinCode: '4Y1SL65848Z411439',
    make: 'Škoda',
    model: 'Superb',
    avgEmissions: '158',
    allowedMonthlyMileage: '1500'
  }
}
