import {getMonthDifference} from "./date.js";

export const getAverageCarbonEmissions = vehicle => vehicle.co2Wltp || vehicle.co2Nedc

const producerConst = 0.601
const priceOfTonne = 120

export const calculateTotalCompensatedMileage = vehicle => {
  const diff = getCarbonHeroContractLength(vehicle)
  const monthlyMileage = vehicle.mileageYear / 12
  return (diff * monthlyMileage).toFixed(2)
}

export const calculateTotalCompensatedCarbonEmissions = vehicle => {
  const compensatedMileage = calculateTotalCompensatedMileage(vehicle)
  return (compensatedMileage / parseFloat(getAverageCarbonEmissions(vehicle))).toFixed(2)
}

export const calculateSavedMaterialInKg = vehicle => {
  let totalPaidSum = getCarbonHeroContractLength(vehicle) * parseFloat(vehicle.carbonHeroPriceMonth);
  return (totalPaidSum * 0.8 / producerConst / priceOfTonne * 1000).toFixed(2)
}

const getCarbonHeroContractLength = vehicle => getMonthDifference(new Date(vehicle.contractFrom), new Date()) + 1
