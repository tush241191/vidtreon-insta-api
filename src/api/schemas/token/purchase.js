export const purchaseSchema = {
  type: "object",
  properties: {
    facilityId: {type: "string", format: "uuid"},
    producerId: {type: "string", format: "uuid"},
    userId: {type: "string", format: "uuid"},
    purpose: {type: "string"},
    tonnes: {type: "integer"}
  },
  required: [
    "facilityId",
    "producerId",
    "userId",
    "purpose",
    "tonnes"
  ]
};
