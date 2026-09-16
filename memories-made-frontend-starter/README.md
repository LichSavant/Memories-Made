# MemoriesMade

React/Vite frontend for MemoriesMade. The existing light editorial design, photographic hero, carousel and gallery lightbox are preserved.

## Run locally

```sh
npm install
npm run dev
npm test
npm run build
```

On Windows, use `npm.cmd` if PowerShell blocks the npm script. No lint script is configured. Unit tests use Node's built-in test runner; no application dependencies were added.

## Services and packages

`src/data/services.js` owns the service taxonomy, labels, inquiry values and routes. Weddings, Debuts, Prenups, Anniversaries and Parties appear in the hero. The full `/services` experience also includes More, a generic custom-event inquiry path. Navigation, booking and contact consume the same configuration.

`src/data/serviceBackgrounds.js` owns carousel collections. `placeholderCollections` explicitly reuses existing local images for the new categories. Replace those mappings with approved imagery later. Autoplay, preloading, crossfades, visibility handling, failed-image fallback and reduced motion remain supported; the visible pause control is removed.

`/packages` starts with event selection. The optional `?event=weddings` (or another service ID) preserves a selection from discovery links. Selecting events updates in-page. `packagesForEvent` filters the existing Essential, Signature and Bespoke starting points for Weddings and Debuts. No package data or prices have been added for the new categories. Those categories show an inquiry invitation. Details expand in-page, and inquiry links preserve both event and package. Changing the inquiry event clears unrelated package choices.

## Coordinator meetings

`/availability` is now Schedule a Meeting, separate from event-date inquiries:

- Online: date → meeting type → time → details → review.
- In person: date → meeting type → location or decide later → time → details → review.

`src/data/meetingAvailability.js` isolates the preview provider, timezone, validation, steps and request shape. All meeting dates/times use Asia/Manila. Preview slots are explicitly labelled, past times are rejected, and changing the date or setup clears stale time/location values. Required details are name and email; discussion notes are optional.

**There is no coordinator calendar or submission backend. Request Meeting prepares an unsent draft, never a booking confirmation.** Users can download a text copy. Online links are not generated. State is held in component memory and clears on navigation/reload. Booking and Contact also retain their existing honest draft-only behavior.

To connect a real provider, replace `getMeetingAvailability` with dated, identified slots from an authoritative source and add loading/error/empty states. Replace `prepareMeetingRequest` with a server submission that revalidates availability, handles conflicts, and returns the actual request status. Remove preview notices only once the live flow has been verified.

## Gallery and visual system

The gallery retains its three existing inspiration images and All / Weddings / Debuts / Styling filters. No unbacked categories or portfolio items were added. Its lead landscape image, staggered portrait/detail pairing, captions, champagne rules and warm surfaces extend the existing editorial direction. `CelebrationImage` retains the native dialog, keyboard navigation, focus return and scroll lock. Images never zoom on hover.

Shared layout tokens remain in `src/styles.css` and `src/styles/pages.css`. `src/styles/immersive.css` supplies the existing photographic presentation; `src/styles/planning.css` adds the event selector, gallery exhibition and progressive scheduler. Motion respects `prefers-reduced-motion`.

## Content awaiting approval

Photography in `src/assets/placeholders/` is temporary inspiration, not verified client work. Replace assets and update `celebrations.js` captions and credits when approved photography is available. Package names and inclusions are inherited from the starter, not newly verified business data; scopes and prices require business approval. No testimonials, contact destinations, prices, confirmed corporate offerings, or meeting links have been invented.

## Browser regression checks

Use the standalone agent-browser CLI against the Vite server. It is not an application dependency.

```powershell
npx.cmd --yes agent-browser open http://127.0.0.1:5173
Get-Content -Raw scripts/check-routes.js | npx.cmd --yes agent-browser eval --stdin
Get-Content -Raw scripts/check-layout.js | npx.cmd --yes agent-browser eval --stdin
Get-Content -Raw scripts/check-symmetry.js | npx.cmd --yes agent-browser eval --stdin
Get-Content -Raw scripts/check-carousel.js | npx.cmd --yes agent-browser eval --stdin
Get-Content -Raw scripts/check-flow.js | npx.cmd --yes agent-browser eval --stdin
Get-Content -Raw scripts/check-planning-access.js | npx.cmd --yes agent-browser eval --stdin
npx.cmd --yes agent-browser open http://127.0.0.1:5173/gallery
Get-Content -Raw scripts/check-lightbox.js | npx.cmd --yes agent-browser eval --stdin
npx.cmd --yes agent-browser open http://127.0.0.1:5173
npx.cmd --yes agent-browser set media light reduced-motion
Get-Content -Raw scripts/check-carousel.js | npx.cmd --yes agent-browser eval --stdin
npx.cmd --yes agent-browser close
```

Run route/layout checks from Home with menus closed. Change dimensions with `agent-browser set viewport WIDTH HEIGHT`. Carousel checks temporarily swap browser-memory collections with existing local fixture URLs, then restore them. Reload afterward. The flow check uses synthetic contact details to exercise unsent drafts only.

See [PLANNING-QA.md](PLANNING-QA.md) for this branch's validation and file inventory. Earlier QA files are historical records of prior branches.
