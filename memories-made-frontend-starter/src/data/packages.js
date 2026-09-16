// Retain the starter's package names and scope; final inclusions require a proposal.
export const packages = [
  {
    name: "Essential",
    events: ["weddings", "debuts"],
    audience: "For celebrations that need focused planning support.",
    inclusions: ["Planning consultation", "Coordination"],
  },
  {
    name: "Signature",
    events: ["weddings", "debuts"],
    audience: "For a cohesive celebration with planning and styling direction.",
    inclusions: ["Planning consultation", "Coordination", "Styling direction"],
  },
  {
    name: "Bespoke",
    events: ["weddings", "debuts"],
    audience: "For celebrations shaped around a more individual brief.",
    inclusions: [
      "Planning consultation",
      "Coordination",
      "Styling direction",
      "Event-day support",
    ],
  },
];

export const packagesForEvent = (eventId) => packages.filter((item) => item.events.includes(eventId));
