export const updateSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    email: {type: "string", format: "email"},
    password: {type: "string", minLength: 8, maxLength: 128},
    isActive: {type: "boolean"},
    firstName: {type: "string"},
    lastName: {type: "string"},
    country: {type: "string", enum: ["estonia", "sweden", "finland"]},
    position: {type: "string"}
  }
};
