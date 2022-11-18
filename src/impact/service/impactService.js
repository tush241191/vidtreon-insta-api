import BaseService from "../../services/BaseService.js";

export const carbonHeroVehicles = [
  {
    "licensePlate": '708DTN',
    "make": 'Cupra',
    "model": 'Formentor',
    "bankContractStartDate": '22.03.2022',
    "bankContractEndDate": '30.03.2024',
    "bankContractLength": '2',
    "startingMileage": '0',
    "allowedMileage": '24000',
    "mileageYear": '12000',
    "co2Nedc": '122',
    "co2Wltp": '150',
    "carbonHeroPriceMonth": '14.67',
    "contractFrom": '2022-08-01T12:00:00.000Z'
  },
  {
    "licensePlate": '537CBR',
    "make": 'Skoda',
    "model": 'Kodiaq',
    "contractStartDate": '25.03.2022',
    "contractEndDate": '30.03.2024',
    "contractLength": '2',
    "startingMileage": '0',
    "allowedMileage": '30000',
    "mileageYear": '15000',
    "co2Nedc": '138',
    "co2Wltp": '161',
    "carbonHeroPriceMonth": '20.7',
    "contractFrom": '2022-08-01T12:00:00.000Z'
  },
  {
    "licensePlate": '414LHR',
    "make": 'Skoda',
    "model": 'Karoq',
    "contractStartDate": '30.06.2022',
    "contractEndDate": '30.03.2024',
    "contractLength": '2',
    "startingMileage": '0',
    "allowedMileage": '24000',
    "mileageYear": '12000',
    "co2Nedc": '150',
    "co2Wltp": '172',
    "carbonHeroPriceMonth": '18',
    "contractFrom": '2022-08-01T12:00:00.000Z'
  },
  {
    "licensePlate": '958VHJ',
    "make": 'BMW',
    "model": 'X6',
    "contractStartDate": '01.06.2021',
    "contractEndDate": '25.05.2025',
    "contractLength": '4',
    "startingMileage": '0',
    "allowedMileage": '100000',
    "mileageYear": '50000',
    "co2Nedc": '182',
    "co2Wltp": '217',
    "carbonHeroPriceMonth": '91',
    "contractFrom": '2022-08-01T12:00:00.000Z'
  },
  {
    "licensePlate": '222BFN',
    "make": 'Mercedes-Benz',
    "model": 'S 450 4MATIC',
    "contractStartDate": '30.05.2022',
    "contractEndDate": '30.05.2027',
    "contractLength": '5',
    "startingMileage": '24958',
    "allowedMileage": '124958',
    "mileageYear": '50000',
    "co2Nedc": '185',
    "co2Wltp": '202',
    "carbonHeroPriceMonth": '92.5',
    "contractFrom": '2022-08-01T12:00:00.000Z'
  },
  {
    "licensePlate": '222MJN',
    "make": 'Mercedes-Benz',
    "model": 'E 450 4MATIC',
    "contractStartDate": '19.08.2021',
    "contractEndDate": '25.08.2026',
    "contractLength": '5',
    "startingMileage": '20629',
    "allowedMileage": '60629',
    "mileageYear": '20000',
    "co2Nedc": '202',
    "co2Wltp": '217',
    "carbonHeroPriceMonth": '40.4',
    "contractFrom": '2022-08-01T12:00:00.000Z'
  },
  {
    "licensePlate": '731MWD',
    "make": 'Skoda',
    "model": 'Superb',
    "contractStartDate": '14.01.2022',
    "contractEndDate": '30.01.2024',
    "contractLength": '2',
    "startingMileage": '18060',
    "allowedMileage": '42060',
    "mileageYear": '12000',
    "co2Nedc": '131',
    "co2Wltp": '158',
    "carbonHeroPriceMonth": '15.72',
    "contractFrom": '2022-08-01T12:00:00.000Z'
  },
  {
    "licensePlate": '139JRM',
    "make": 'TOYOTA',
    "model": 'C-HR',
    "contractStartDate": '02.09.2022',
    "contractEndDate": '30.09.2025',
    "contractLength": '3',
    "startingMileage": '0',
    "allowedMileage": '72000',
    "mileageYear": '30000',
    "co2Nedc": undefined,
    "co2Wltp": '111',
    "carbonHeroPriceMonth": '33.3',
    "contractFrom": '2022-09-01T12:00:00.000Z'
  },
  {
    "licensePlate": '553XSG',
    "make": 'Volkswagen',
    "model": 'Arteon',
    "contractStartDate": '01.09.2022',
    "contractEndDate": '30.09.2025',
    "contractLength": '1',
    "startingMileage": '0',
    "allowedMileage": '60000',
    "mileageYear": '15000',
    "co2Nedc": '128',
    "co2Wltp": '150',
    "carbonHeroPriceMonth": '19.2',
    "contractFrom": '2022-09-01T12:00:00.000Z'
  }
];

export default class ImpactService extends BaseService{
  static async getCarbonHeroVehicle(identifier) {
    return carbonHeroVehicles.find(vehicle => vehicle.licensePlate === identifier)
  }
}
