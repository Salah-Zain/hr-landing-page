export const settingsSchema = {
  name: "settings",
  title: "Site Settings",
  type: "document",
  fields: [
    { name: "whatsappNumber", title: "WhatsApp Number", type: "string" },
    { name: "bookingLink", title: "Booking Link", type: "url" },
    { name: "batchDate", title: "Next Batch Date", type: "string" },
    { name: "seatsRemaining", title: "Seats Remaining", type: "number" }
  ]
};
