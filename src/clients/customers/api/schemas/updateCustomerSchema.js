export const updateCustomerSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    name: {type: "string"},
    type: {type: "string"}
  }
};
