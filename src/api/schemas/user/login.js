import {USER_AUTH_ORIGINS} from "../../../services/constants/user.js";

export const loginSchema = {
  type: "object",
  properties: {
    username: {type: "string", format: "email"},
    password: {type: "string"},
    authOrigin: {type: "string", enum: USER_AUTH_ORIGINS}
  },
  required: ["username", "password", "authOrigin"]
};
