# Memories Made Weddings & Events

React/Vite frontend for Memories Made Events Organizing Services. The existing photographic hero, editorial typography, and service-aware carousel are preserved.

## Run locally

```sh
npm install
npm run dev
npm run build
```

On Windows, use `npm.cmd` if PowerShell blocks the npm script.

## Page flow and shared systems

- Home: hero → photographic service discovery → curated gallery preview → process and package introductions → temporary client-feedback area → availability/inquiry CTA → structured footer.
- `SiteNavigation` shares the same destination hierarchy across every page. Desktop uses the fixed bottom bar with a small Services disclosure; widths up to 900px use Home / Menu / Start Your Inquiry. Both disclosures close on Escape, outside click, focus leaving navigation, or navigation. Closed panels are absent from keyboard navigation.
- `useSectionReveal` reuses IntersectionObserver for 20px/700ms section reveals and 650ms image settling. Reduced motion disables movement; content is visible if the observer is unavailable. Keyboard focus reveals its containing section.
- `serviceBackgrounds` remains the single source for the four wedding and four debut hero photos. The five-second hold, 1.5-second cinematic crossfade, pause/resume, visibility handling, failed-image fallback, and rapid-switch handling are unchanged.
- `celebrations` selects three existing local images for the public preview and functional All / Weddings / Debuts / Styling filters. No additional image downloads or application dependencies were introduced.
- `packages` shares the existing Essential / Signature / Bespoke starting points between package discovery and the inquiry form.

## Availability and inquiry

Availability collects a preferred date and time, carried to `/booking` in URL parameters. It is not a live availability feed. Month navigation retains the entire selected date. Past dates are disabled.

Package links preselect a package; wedding/debut inquiry links preselect the event type. The multi-step form validates required details, dates, and guest counts, then shows an editable review. Enter cannot skip required steps.

**Booking and contact prepare drafts only. They do not send data or reserve dates.** Drafts remain in component memory and are lost when leaving/reloading the page. The interface states this limitation. No backend, account system, payment flow, or speculative contact destination has been added.

## Content awaiting approval

All existing service images are documented as temporary assets in `src/assets/placeholders/`. The gallery and home preview explicitly label them as inspiration pending approved Memories Made photography. Replace the assets and update captions/credits in `src/data/celebrations.js` when approved content is available. Do not remove the preview note until then.

There is no verified local testimonial dataset or contact/social-link dataset. The client-feedback section is explicitly temporary and contains no quotes, ratings, or client counts. Package names and base inclusions are inherited from the starter; final business-approved scopes and prices must be confirmed before launch.

## Browser regression checks

No lint script or unit-test runner is configured. The browser checks use the standalone `agent-browser` CLI, not an application dependency, against the Vite dev server:

```powershell
npx.cmd --yes agent-browser open http://127.0.0.1:5173
Get-Content -Raw scripts/check-layout.js | npx.cmd --yes agent-browser eval --stdin
Get-Content -Raw scripts/check-routes.js | npx.cmd --yes agent-browser eval --stdin
Get-Content -Raw scripts/check-flow.js | npx.cmd --yes agent-browser eval --stdin
Get-Content -Raw scripts/check-carousel.js | npx.cmd --yes agent-browser eval --stdin
npx.cmd --yes agent-browser set media reduced-motion
Get-Content -Raw scripts/check-carousel.js | npx.cmd --yes agent-browser eval --stdin
npx.cmd --yes agent-browser close
```

Run layout and route checks at 1440×1000, 1366×768, 1024×768, 768×1024, 430×932, and 390×844 via `agent-browser set viewport WIDTH HEIGHT`. Start with the homepage and closed navigation panels. Carousel checks temporarily replace collections in browser memory with local fixture URLs, then restore them. Reload after testing to reset the page.

See [QA.md](QA.md) for the feature-branch validation record and remaining launch prerequisites.

## Layout symmetry

Content sections, page heroes, headers, footer, and bottom navigation share the
`--content-max-width` (75rem) and `--content-gutter` container rule. Backgrounds
remain full bleed. `--section-gap` controls vertical section padding and
`--grid-gap` controls the major column gaps. The hero retains a separate 90rem
composition with a shared rail/gutter calculation to preserve its asymmetric
layout on wide screens.

Featured photos use aligned equal columns. Gallery images use three columns on
desktop, two on tablet with a full-width final odd item, and one on mobile.
Filters retain the same data and behavior. Hover/focus highlights photo borders;
it never changes image scale or crop. Non-hover image reveals and hero motion
remain enabled, respecting reduced motion.

Run `scripts/check-symmetry.js` through `agent-browser eval --stdin` on the
homepage to check all nine pages at the current viewport. It checks shared
gutters, section/form edges, matching image rows, and content overflow.
See [LAYOUT-QA.md](LAYOUT-QA.md) for the layout cleanup validation record.

## Immersive light theme

The shared grid now uses semantic surface/text tokens, warm ivory paper, rose
accents, and dark contrast scoped to the hero, experience section, and footer.
`src/styles/immersive.css` contains the photographic presentation and viewer.

`CelebrationImage` opens a native modal dialog without changing routes. Pass
`images` to define its previous/next collection; Gallery uses the current filter.
The viewer supports Escape, backdrop/close buttons, arrow keys, Tab cycling,
scroll locking, and focus restoration. Text CTAs remain normal route links.
No viewer dependency was added. Photography and client feedback remain clearly
marked previews until approved material is available.

Run `scripts/check-lightbox.js` through `agent-browser eval --stdin` on Home or
Gallery. See [IMMERSIVE-QA.md](IMMERSIVE-QA.md) for validation and known limits.
