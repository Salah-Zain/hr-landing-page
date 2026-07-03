export const testimonialSchema = {
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    { name: "name", title: "Name", type: "string" },
    { name: "batch", title: "Batch Number", type: "string" },
    { name: "company", title: "Company Placed At", type: "string" },
    { name: "quote", title: "Quote", type: "text" },
    { name: "tag", title: "Tag Pill (e.g. Fresher)", type: "string" },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Video Testimonials", value: "Video Testimonials" },
          { title: "Success Stories", value: "Success Stories" },
          { title: "Placement Experiences", value: "Placement Experiences" }
        ]
      }
    },
    { name: "photo", title: "Photo", type: "image", options: { hotspot: true } }
  ]
};
