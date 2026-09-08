import enchantedWedding from "../assets/Enchanted-Wedding.jpg";

// Import local photos above and replace the empty slots below when available.
// Entries can specify a focal point, e.g. { src: photo, position: "65% center" }.
// Empty slots are intentional: do not display blank slides or duplicate photos.
export const fallbackBackground = { src: enchantedWedding, position: "62% center" };

export const serviceBackgrounds = {
  weddings: [fallbackBackground, null, null, null],
  debuts: [null, null, null, null],
};

export function getBackgrounds(service) {
  const photos = serviceBackgrounds[service]?.filter(Boolean);
  return photos?.length ? photos : [fallbackBackground];
}
