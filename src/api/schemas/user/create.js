import {USER_ROLE_CLIENT, USER_ROLE_PRODUCER, USER_ROLES} from "../../../services/constants/user.js";

export const createSchema = {
  type: "object",
  required: [
    "email",
    "password",
    "role",
    "instaToken",
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
    instaToken: {type: "string"},
    firstName: {type: "string"},
    lastName: {type: "string"},
    country: {type: "string"},
    position: {type: "string"}
  }
};
