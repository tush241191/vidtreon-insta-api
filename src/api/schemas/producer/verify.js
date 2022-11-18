import {VERIFICATION_STEPS} from "../../../services/constants/producer.js";

export const verifySchema = {
  type: "object",
  required: ["step", "date"],
  additionalProperties: false,
  properties: {
    step: {type: "string", enum: VERIFICATION_STEPS},
    date: {type: "string", format: "date-time"}
  }
};
