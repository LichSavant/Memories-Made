# Immersive light-theme validation

Branch: `feature/immersive-light-theme`, based on layout cleanup commit `011d995`.

## Experience

- Warm ivory/paper surfaces, layered rose/champagne gradients, dark readable text,
  and selective dark hero, experience section, and footer. Text accent shades
  are darker than decorative blush to maintain contrast on warm backgrounds.
- Retained typography, local photography, shared 75rem grid, and hero service
  switching. Reduced desktop and mobile image darkening.
- Alternating service stories, a landscape gallery lead followed by paired
  details, and a short experience section before the compact process/packages
  preview. Feedback remains explicitly pending authentic approved content.
- Same primary navigation on every page, now translucent ivory with dark labels,
  rose active state, prominent inquiry action, and compact mobile menu.
- Photo clicks open an in-page native dialog. Gallery navigation follows the
  active filter; featured photos have their own set. Text CTAs navigate normally.
- Viewer supports close/Escape/backdrop, arrows, previous/next, explicit Tab
  cycling, background scroll lock, and original scroll/focus restoration.
- Section reveals use 700ms opacity/20px translation; image reveals use opacity.
  Shared easing, 1500ms hero fades, 26s ambient drift, and reduced motion remain.
- Creative additions: photo-viewing caption hint and viewer image numbering.
  No new libraries or assets, autoplay video, or continuous JS animation loops.

## Checks

- `npm install` and production build passed; no dependency changes retained.
- No lint/unit-test script is configured.
- Existing layout checks passed at 1920x1080, 1440x1000, 1366x768, 1024x768,
  768x1024, 430x932, and 390x844: navigation clearance, CTA placement,
  touch targets, photography loading, and horizontal overflow.
- Shared symmetry checks passed on all nine routes at those seven sizes.
- All 22 inquiry/contact/gallery flow checks passed.
- All 17 normal-motion and 10 reduced-motion carousel checks passed.
- New `check-lightbox.js`: 12 checks passed at all seven sizes, including
  unchanged route, scroll and focus restoration, and closing/navigation controls.
- Actual browser clicks and Escape verified; Shift+Tab from Close reaches Next,
  and Tab returns to Close. Native modal keeps background content inert.
- Desktop/mobile hero, service stories, gallery, viewer, and contact screenshots
  reviewed. Console contained only development messages; no page errors.
- React review: modal effect cleans up body styles and focus, controls use native
  buttons, IDs are unique, viewer mounts only when needed, and no nested links
  surround image buttons. Existing route scroll/focus behavior is preserved.
- Diff reviewed and whitespace checks passed.

## Existing limitations

Portfolio images remain inspiration previews; authentic testimonials are not
available locally. Inquiry/contact forms still prepare drafts rather than send.

`npm audit` reports three high entries: `nanoid`, `react-router`, and its dependent
`react-router-dom`. These come from the unchanged lockfile; package upgrades are
outside this design branch. The router advisory describes RSC mode, which this
client-side Vite application does not use. Audit is not claimed as passing.

Validation used Chromium browser automation, not physical-device Safari testing.
Main was not modified or merged.
