export const updateSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    name: {type: "string", minLength: 3, maxLength: 256},
    url: {type: "string", maxLength: 4096},
    constant: {type: "integer", minimum: 1},
    data: {
      type: "object",
      properties: {
        legal: {
          type: "object",
          properties: {
            name: {type: "string"},
            address: {type: "string"},
            code: {type: "string"}
          },
          required: ["name", "address", "code"]
        },
        informative: {
          type: "object",
          properties: {
            tagline: {type: "string"},
            description: {type: "string"},
            field: {type: "string"},
            goal: {type: "string"}
          },
          required: ["tagline", "description", "field", "goal"]
        }
      },
      required: ["legal", "informative"]
    },
    isActive: {type: "boolean"}
  }
};
