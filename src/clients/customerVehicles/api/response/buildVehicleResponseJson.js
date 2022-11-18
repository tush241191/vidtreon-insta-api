const buildVehicleResponseJson = vehicle => {
  return {
    id: vehicle.id,
    make: vehicle.make,
    model: vehicle.model,
    licensePlate: vehicle.license_plate,
    vinCode: vehicle.vin_code,
    avgEmissions: vehicle.co_wltp ?? vehicle.co_nedc ?? undefined,
    monthlyFee: vehicle.monthly_fee,
    allowedMonthlyMileage: vehicle.allowed_monthly_mileage,
    contractStart: vehicle.contract_start,
    contractEnd: vehicle.contract_end,
    createdAt: vehicle.created_at,
    updatedAt: vehicle.updated_at
  };
};

export default buildVehicleResponseJson;
