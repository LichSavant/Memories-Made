# Brand depth and UX polish — validation record

Date: 2026-09-09

Branch: `feature/brand-depth-ux-polish`, created directly from fetched `origin/main` at `f849e55`.
Local `main` remained at `cdb96d25a112951ef15fae205e4293b4b1d1518d`. No merge into main was performed.

## Design and behavior

- Warm espresso `#171211`, layered charcoal `#211a18`, warm ivory `#f5eee5`, muted blush `#ce9b94`, rosewood `#b7827c`, and champagne `#d2b899`. Fine borders, serif typography, photographic hero, and restrained depth remain.
- Shared bottom navigation: Services (Weddings / Debuts), Packages, Gallery, Process, Availability, Contact, and Start Your Inquiry. Mobile uses Home / Menu / Start Your Inquiry with a compact disclosure panel. Active underlines, 48px main navigation targets, Escape/focus/outside-click dismissal, and shared skip links improve access.
- Home now follows hero → service stories → curated photography preview → process → packages → temporary feedback → availability/inquiry → footer. Process and packages retain the existing paired section.
- Local photographs gain reserved aspect ratios, intentional cropping, subtle overlays, and 650ms image settling. Section reveals reuse the existing observer with 20px movement over 700ms. The cinematic carousel and slow ambient drift are preserved; reduced-motion preference disables movement.
- Packages use one shared collection instead of duplicate wedding/debut grids, with intended audience, starting inclusions, customization notes, and inquiry links. Gallery filters operate on real local image records, replacing empty decorative tiles.

## Bugs and usability fixes

- Header booking CTA previously led to availability; consistent inquiry links now lead to `/booking`.
- Calendar selection previously used only a day number, allowing it to change silently when switching months. It now retains the complete date and carries date/time into the inquiry.
- Past event dates and invalid guest counts are rejected. Enter cannot skip required form steps. Package and service links preselect the corresponding inquiry fields.
- Inquiry preparation retains the review and supports editing instead of discarding the visible details. Contact preparation also remains editable. Both explicitly state that nothing is sent.
- Removed competing header navigation, hidden offscreen menu links, unused gallery placeholders, and obsolete navigation styles. Shared footer padding and scroll margins keep content reachable above the fixed bar.
- Tightened the mobile hero so its availability panel clears the fixed bar at 390×844. Replaced cramped mobile progress labels with numbered steps and one readable current-step label.

## Verification

| Check | Result |
| --- | --- |
| `npm.cmd install` | Passed; no new application dependencies |
| `npm.cmd run build` | Passed; Vite 6.4.3, 74 modules; JS approximately 220 kB / 70 kB gzip; CSS approximately 32 kB / 8 kB gzip |
| Existing lint/unit-test scripts | None configured |
| `check-layout.js` | Passed at 1440×1000, 1366×768, 1024×768, 768×1024, 430×932, 390×844 |
| `check-routes.js` | All eight internal routes and home return passed at all six widths; no horizontal overflow |
| `check-flow.js` | 22 assertions passed on desktop and mobile: date retention, validation, package carryover, review/editing, four gallery filters, contact draft |
| Existing `check-carousel.js` | 17 normal-motion checks passed; 10 reduced-motion checks passed |
| Keyboard/navigation | Desktop Services and mobile Menu close on Escape and restore button focus; real navigation clicks close panels and internal routes focus main content |
| Visual inspection | Desktop hero/services/packages/gallery/calendar, mobile hero/menu/inquiry; image crops, spacing, footer clearance checked |
| Browser errors | No page errors or application console errors/React warnings observed |
| Homepage axe accessibility scan | Zero violations; gradient-backed contrast checks require manual review and are not an automated contrast certification |
| Diff review | Scoped source changes; no changed assets, package manifests, routing definitions, or carousel implementation |

The build required execution outside the filesystem sandbox because esbuild could not read ancestor directories inside it; the build then completed successfully. Browser checks used a headless Chromium session against the local Vite server. These checks do not constitute Safari or real-device testing.

## Recommendations not implemented

- Replace temporary inspiration photos with approved Memories Made event photos and image credits, then remove preview labeling.
- Supply authentic client testimonials and approved contact/social destinations. No quotes, ratings, counts, prices, or contact details were fabricated.
- Confirm the inherited Essential / Signature / Bespoke package names and scopes with the business before launch.
- Connect inquiry/contact delivery and a real availability source in a separately scoped backend task. Current forms prepare in-memory drafts only; leaving or refreshing loses them, and no date is reserved.

Ready for merge review of this frontend refinement, subject to business content review. Not a production launch approval.

## Changed files

All paths below are relative to `memories-made-frontend-starter/`.

- `QA.md`
- `README.md`
- `scripts/check-flow.js`
- `scripts/check-layout.js`
- `scripts/check-routes.js`
- `src/components/CelebrationImage.jsx`
- `src/components/Footer.jsx`
- `src/components/SiteHeader.jsx`
- `src/components/SiteNavigation.jsx`
- `src/data/celebrations.js`
- `src/data/eventDate.js`
- `src/data/packages.js`
- `src/hooks/useSectionReveal.js`
- `src/layouts/SiteLayout.jsx`
- `src/pages/AvailabilityPage.jsx`
- `src/pages/BookingPage.jsx`
- `src/pages/ContactPage.jsx`
- `src/pages/DebutsPage.jsx`
- `src/pages/GalleryPage.jsx`
- `src/pages/HomePage.jsx`
- `src/pages/PackagesPage.jsx`
- `src/pages/ProcessPage.jsx`
- `src/pages/WeddingsPage.jsx`
- `src/styles.css`
- `src/styles/pages.css`
