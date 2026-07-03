export const facultySchema = {
  name: "faculty",
  title: "Faculty",
  type: "document",
  fields: [
    { name: "name", title: "Name", type: "string" },
    { name: "title", title: "Title (e.g. Senior HR Consultant)", type: "string" },
    { name: "company", title: "Company", type: "string" },
    { name: "experience", title: "Years Experience", type: "string" },
    { name: "photo", title: "Photo", type: "image", options: { hotspot: true } }
  ]
};
