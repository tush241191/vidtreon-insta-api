export const createCustomerSchema = {
  type: "object",
  required: ["name", "clientId", "type"],
  additionalProperties: false,
  properties: {
    name: {type: "string"},
    type: {type: "string"},
    clientId: {type: "string", format: "uuid"}
  }
};
