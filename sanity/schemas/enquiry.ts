export const enquirySchema = {
  name: "enquiry",
  title: "Student Enquiry",
  type: "document",
  fields: [
    { name: "name", title: "Full Name", type: "string" },
    { name: "age", title: "Age", type: "string" },
    { name: "phone", title: "Phone Number", type: "string" },
    { name: "email", title: "Email Address", type: "string" },
    { name: "preferredDate", title: "Preferred Date", type: "string" },
    { name: "preferredTime", title: "Preferred Time Slot", type: "string" },
    { name: "program", title: "Selected Program", type: "string" },
    {
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "New", value: "new" },
          { title: "Contacted", value: "contacted" },
          { title: "Scheduled", value: "scheduled" },
          { title: "Enrolled", value: "enrolled" },
          { title: "Cancelled", value: "cancelled" }
        ]
      },
      initialValue: "new"
    },
    { name: "createdAt", title: "Created At", type: "datetime" }
  ]
};
