import {USER_ROLE_CLIENT, USER_ROLE_PRODUCER, USER_ROLES} from "../../../services/constants/user.js";

export const createSchema = {
  type: "object",
  required: [
    "email",
    "password",
    "role",
    "isActive",
    "firstName",
    "lastName",
    "country",
    "position"
  ],
  additionalProperties: false,
  properties: {
    email: {type: "string", format: "email"},
    password: {type: "string", minLength: 8, maxLength: 128},
    role: {type: "string", enum: USER_ROLES},
    isActive: {type: "boolean"},
    firstName: {type: "string"},
    lastName: {type: "string"},
    country: {type: "string", enum: ["estonia", "sweden", "finland"]},
    position: {type: "string"},
    clientId: {type: "string", format: "uuid"},
    producerId: {type: "string", format: "uuid"}
  },
  allOf: [
    {
      if: {properties: {role: {const: USER_ROLE_CLIENT}}},
      then: {required: ["clientId"]}
    },
    {
      if: {properties: {role: {const: USER_ROLE_PRODUCER}}},
      then: {required: ["producerId"]}
    }
  ]
};
