import {
  calculateSavedMaterialInKg,
  calculateTotalCompensatedCarbonEmissions,
  calculateTotalCompensatedMileage,
  getAverageCarbonEmissions
} from "../../utils/calculations.js";
import {normalizeStandardLicensePlate} from "../../utils/licensePlate.js";

const buildImpactResponse = vehicle => {
  return {
    licencePlate: vehicle.licensePlate,
    licencePlateLabel: normalizeStandardLicensePlate(vehicle.licensePlate),
    make: vehicle.make,
    model: vehicle.model,
    avgCarbonEmissions: getAverageCarbonEmissions(vehicle),
    compensatedMileage: calculateTotalCompensatedMileage(vehicle),
    compensatedEmissions: calculateTotalCompensatedCarbonEmissions(vehicle),
    reusedMaterialQty: calculateSavedMaterialInKg(vehicle),
    materialsUsed: ['paper'],
    activeDate: vehicle.contractFrom
  };
};

export default buildImpactResponse;
