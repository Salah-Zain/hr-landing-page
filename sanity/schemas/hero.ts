export const heroSchema = {
  name: "hero",
  title: "Hero Section",
  type: "document",
  fields: [
    { name: "headline", title: "Headline", type: "string" },
    { name: "sub", title: "Sub Headline", type: "text" },
    { name: "body", title: "Body Copy", type: "text" },
    { name: "cta1", title: "Primary CTA Text", type: "string" },
    { name: "cta2", title: "Secondary CTA Text", type: "string" },
    {
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true }
    }
  ]
};
