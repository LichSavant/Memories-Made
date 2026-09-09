# Layout cleanup validation

Branch: `feature/layout-symmetry-cleanup`, based on `68b7282`.

## Changes

- Shared 75rem content grid and responsive gutters across all nine pages,
  headers, footer, and bottom navigation. Shared section and column spacing.
- Preserved the hero's asymmetric composition with a separate 90rem grid.
- Balanced split sections, service cards, featured images, gallery rows, and
  process/package previews; aligned forms, headings, and calls to action.
- Replaced hover/focus image scaling with a subtle border accent. Hero
  crossfades, ambient gradients, section reveals, and reduced-motion behavior
  remain intact.
- Removed obsolete gallery variants, duplicated rules, compensating horizontal
  margins, and the featured-image stagger. Tablet gallery orphans span the row;
  mobile buttons and forms use the same gutters as surrounding content.

## Verification

- `npm install`: passed; no dependency changes retained.
- `npm run build`: passed, 74 modules transformed.
- No lint or unit-test script is configured.
- `scripts/check-layout.js`: passed at 1920x1080, 1440x1000, 1366x768,
  1024x768, 768x1024, 430x932, and 390x844. Includes navigation clearance,
  touch targets, image loading, and overflow checks.
- `scripts/check-symmetry.js`: all nine routes passed at all seven sizes.
  Checks equal outer gutters, section/form alignment, grid rows, and actual
  content bounds. Desktop 1440 and mobile 390 checks were repeated after the
  final spacing polish.
- `scripts/check-flow.js`: all 22 assertions passed, covering inquiry dates,
  validation, package selection, review/back navigation, gallery filters,
  and contact draft editing.
- `scripts/check-carousel.js`: all 17 normal-motion and 10 reduced-motion
  assertions passed.
- Actual image hover: dimensions, transform, and object position remained
  identical after the transition; the border changed to the blush accent.
- Screenshots reviewed for wide desktop/mobile hero, service cards, featured
  photos, process/package previews, desktop/tablet gallery, and mobile contact.
- Browser error log empty; console contained only Vite and React development
  messages.
- `git diff --check`: passed.

The palette, typography, navigation concept, and inquiry functionality are
preserved. This change does not add backend functionality or replace the
existing launch prerequisites documented in `QA.md`.
