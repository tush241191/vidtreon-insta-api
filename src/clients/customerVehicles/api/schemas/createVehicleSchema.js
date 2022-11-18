export const createVehicleSchema = {
  type: "object",
  required: ["customerId", "licensePlate", "vinCode", "make", "model", "owner", "allowedMonthlyMileage", "contractStart", "contractEnd"],
  additionalProperties: false,
  properties: {
    customerId: {type: "string", format: "uuid"},
    licensePlate: {type: "string"},
    vinCode: {type: "string"},
    make: {type: "string"},
    model: {type: "string"},
    owner: {type: "string"},
    coWltp: {type: "string"},
    coNedc: {type: "string"},
    allowedMonthlyMileage: {type: "string"},
    contractStart: {type: "string", format: "date-time"},
    contractEnd: {type: "string", format: "date-time"}
  }
};
