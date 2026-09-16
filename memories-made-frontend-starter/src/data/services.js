// Shared service taxonomy. Add approved offerings here before exposing new routes.
export const services = [
  {
    id: "weddings",
    name: "Weddings",
    eventType: "Wedding",
    hero: true,
    path: "/weddings",
    eyebrow: "Premium Wedding Planning",
    description:
      "Your story, beautifully celebrated. Thoughtful planning for the day you begin a life together.",
  },
  {
    id: "debuts",
    name: "Debuts",
    eventType: "Debut",
    hero: true,
    path: "/debuts",
    eyebrow: "Signature Debut Planning",
    description:
      "A milestone that feels like you. A personal celebration of a new chapter.",
  },
  {
    id: "prenups",
    name: "Prenups",
    eventType: "Prenup",
    hero: true,
    path: "/services/prenups",
    eyebrow: "Before the Beginning",
    description:
      "Set the scene for your story. Share your ideas for a prenup setting and styling direction.",
  },
  {
    id: "anniversaries",
    name: "Anniversaries",
    eventType: "Anniversary",
    hero: true,
    path: "/services/anniversaries",
    eyebrow: "Stories Worth Celebrating",
    description:
      "Honour the years and the memories. Begin with the people and details that matter to you.",
  },
  {
    id: "parties",
    name: "Parties",
    eventType: "Party",
    hero: true,
    path: "/services/parties",
    eyebrow: "Gather Beautifully",
    description:
      "Make room for joy, connection, and a gathering that feels personal. Tell us what you have in mind.",
  },
  {
    id: "more",
    name: "More",
    eventType: "Other / Custom Event",
    hero: false,
    path: "/services/more",
    eyebrow: "Your Own Occasion",
    description:
      "Something a little different? Bring us your custom-event brief and we can discuss what is possible.",
  },
];
export const heroServices = services.filter((service) => service.hero);
export const findService = (id) =>
  services.find((service) => service.id === id);
export const inquiryPath = (service, packageName) =>
  `/booking?${new URLSearchParams({ eventType: service.eventType, ...(packageName ? { package: packageName } : {}) })}`;
