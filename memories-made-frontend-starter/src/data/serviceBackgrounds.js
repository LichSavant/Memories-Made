import wedding01 from "../assets/placeholders/wedding-01.jpg";
import wedding02 from "../assets/placeholders/wedding-02.jpg";
import wedding03 from "../assets/placeholders/wedding-03.jpg";
import wedding04 from "../assets/placeholders/wedding-04.jpg";
import debut01 from "../assets/placeholders/debut-01.jpg";
import debut02 from "../assets/placeholders/debut-02.jpg";
import debut03 from "../assets/placeholders/debut-03.jpg";
import debut04 from "../assets/placeholders/debut-04.jpg";

// Temporary local assets are deliberately named by service and sequence so
// each file can be replaced in place without changing the carousel code.
export const fallbackBackground = { src: wedding01, position: "62% center" };

export const serviceBackgrounds = {
  weddings: [
    fallbackBackground,
    { src: wedding02, position: "68% center" },
    { src: wedding03, position: "64% center" },
    { src: wedding04, position: "66% center" },
  ],
  debuts: [
    { src: debut01, position: "66% center" },
    { src: debut02, position: "68% center" },
    { src: debut03, position: "68% center" },
    { src: debut04, position: "64% center" },
  ],
};

// Reused local placeholders, NOT approved photographs of these event types.
// Replace these mappings with approved, category-specific assets when available.
export const placeholderCollections = {
  prenups: [serviceBackgrounds.weddings[2], serviceBackgrounds.weddings[0]],
  anniversaries: [
    serviceBackgrounds.weddings[1],
    serviceBackgrounds.weddings[3],
  ],
  parties: [serviceBackgrounds.debuts[1], serviceBackgrounds.debuts[2]],
  more: [serviceBackgrounds.debuts[3], serviceBackgrounds.weddings[1]],
};
Object.assign(serviceBackgrounds, placeholderCollections);

export function getBackgrounds(service) {
  return serviceBackgrounds[service] ?? [fallbackBackground];
}
