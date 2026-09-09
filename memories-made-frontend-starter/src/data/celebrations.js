import { getBackgrounds } from "./serviceBackgrounds";

// Existing temporary assets, not verified client portfolio. Keep the public
// preview note until the business supplies approved images and their credits.
export const portfolioNote =
  "Portfolio preview — temporary inspiration images, pending approved Memories Made event photography.";
export const celebrations = [
  {
    id: "wedding-florals",
    type: "Weddings",
    label: "Under a canopy of flowers",
    ...getBackgrounds("weddings")[0],
    alt: "A couple beneath hanging ivory flowers and warm reception lights",
  },
  {
    id: "debut-evening",
    type: "Debuts",
    label: "An evening in blush",
    ...getBackgrounds("debuts")[0],
    alt: "Candlelit tables facing a stage framed with blush flowers",
  },
  {
    id: "floral-details",
    type: "Styling",
    label: "A softer kind of romance",
    ...getBackgrounds("weddings")[1],
    alt: "Blush and ivory flowers arranged with dark botanical foliage",
  },
];
