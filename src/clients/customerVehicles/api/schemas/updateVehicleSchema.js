export const updateVehicleSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    contractStart: {type: "string", format: "date-time"},
    contractEnd: {type: "string", format: "date-time"}
  }
};
