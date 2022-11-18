export const updateSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    name: {type: "string", minLength: 3, maxLength: 4096},
    url: {type: "string", maxLength: 4096},
    isActive: {type: "boolean"}
  }
};
