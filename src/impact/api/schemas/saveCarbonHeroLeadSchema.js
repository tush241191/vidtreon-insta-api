export const saveCarbonHeroLeadSchema = {
  type: "object",
  required: ["email"],
  additionalProperties: false,
  properties: {
    email: {type: "string", format: "email"}
  }
};
