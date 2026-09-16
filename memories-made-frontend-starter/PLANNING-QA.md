# Services, packages and meeting flow — QA report

## Branch and scope

- Branch: `feature/services-packages-meeting-flow`.
- Based on the existing immersive light design at `18c0616` on `feature/immersive-light-theme`.
- Main remains at `cdb96d25a112951ef15fae205e4293b4b1d1518d`. No merge performed.
- Commit and pushed branch revision are reported with the delivery message.

## Delivered behavior

1. **Services:** centralized Weddings, Debuts, Prenups, Anniversaries, Parties, More; dedicated overview and reusable service-detail route. More remains a custom-event inquiry, without claims about specific additional offerings.
2. **Brand:** MemoriesMade in the wordmark, accessibility labels, footer, metadata, gallery notices and page copy. Existing code/file identifiers and URLs are retained.
3. **Hero:** exactly five selectors, excluding More. All five have decoded local image collections. Visible Pause Backgrounds and its unused styles/state are removed. Autoplay, image preloading, crossfade, failed-image fallback, rapid switching and reduced motion are preserved. Hero CTAs retain selected event context.
4. **Packages:** photographic event selector, in-page filtering, expandable details, event/package-aware inquiries. Only inherited Wedding/Debut content is shown; other event types invite an inquiry.
5. **Gallery:** warm layered exhibition presentation, featured landscape, portrait/detail pairing, generous whitespace, editorial captions and champagne rules. The existing lightbox and content-backed filters remain; no hover zoom or fabricated images.
6. **Meetings:** progressive date/type/location/time/details/review. Online skips location. In-person supports entered or deferred location. Dates/times use Manila time. Name/email required, notes optional. Review lists the meeting setup and relevant location. Request Meeting creates an explicitly unsent, downloadable draft.
7. **Navigation:** Schedule a Meeting keeps `/availability`; service overview and categories are discoverable from desktop/mobile navigation and footer. Booking and contact use the shared event taxonomy. Process copy distinguishes consultation from event reservation.
8. **Validation fixes:** changing event clears incompatible packages; changing date/setup clears stale times; online/deferred meetings clear stale location; invalid/past dates and elapsed times cannot be submitted; month changes preserve the full selected date.

## Validation results

| Check | Result |
| --- | --- |
| `npm install` (Windows `npm.cmd`) | Pass; dependencies already current; npm reported an existing esbuild install-script approval notice. Build uses the working existing installation. |
| `npm run build` | Pass; Vite 6.4.3, 81 modules. |
| `npm test` | 6 passing tests: package safety, conditional steps, deferred location, invalid/stale data, Manila date boundaries, honest drafts. |
| Lint | No lint script configured. Changed implementation files formatted with Prettier. |
| Diff review | Reviewed; `git diff --check` passes. |
| Desktop 1440×900 | Shared alignment, full carousel and five collections verified; Packages screenshot reviewed. |
| Laptop 1262×624 | All 13 internal routes, fixed navigation, layout, 34 planning-flow assertions, 12 gallery lightbox assertions pass; Home/Gallery visually reviewed. |
| Tablet 768×1024 | Routes, layout and shared alignment pass; reduced-motion carousel passes. |
| Mobile 390×844 | Routes, layout/alignment and all 34 planning-flow assertions pass; Home, Packages and meeting screen visually reviewed. |
| Mobile navigation/contact/gallery filters | 15 checks pass, including menu scrolling, Escape/focus return, shared taxonomy and honest contact drafts. |
| Gallery viewer | Opens in place; previous/next, arrows, Escape, backdrop, close, focus return and scroll lock/restoration pass. |
| Reduced motion | Autoplay stops; switching services remains available without fades. New progressive reveals/transitions also honor the preference. |
| Browser errors | No application console errors, uncaught page errors, or Vite error overlays observed. |
| Horizontal overflow | None in verified routes/viewports; content bounds and fixed navigation checks pass. |

Browser scripts are in `scripts/`; screenshots are local, ignored `.qa/` artifacts. Browser checks run against the development server; a separate production build passes. No production deployment or live scheduling integration was attempted.

## Temporary data and future work

- **Photography:** all existing gallery images are inspiration previews; the new services explicitly reuse existing files through `placeholderCollections`. Supply approved category-specific images and truthful captions/credits before presenting these as client work.
- **Packages:** inherited Essential/Signature/Bespoke descriptions are unchanged. Supply approved scopes/prices and genuine packages for Prenups, Anniversaries and Parties before filling those states.
- **Availability:** isolated preview times (09:00, 10:30, 13:00, 14:30, 16:00 Manila time), never confirmed coordinator availability. Connect a calendar source, dated slot IDs, conflict checking and real submission/status handling.
- **Requests:** meeting, event and contact requests are unsent drafts. Meeting drafts can be downloaded. Add an approved transport/contact destination; only arrange online meeting links after actual confirmation.
- **Next:** approved imagery/data and real scheduling/submission integration are the recommended priorities. Keep the existing editorial system and regression checks when implementing them.

## Files changed

All paths below are relative to `memories-made-frontend-starter/`.

- `.gitignore`
- `PLANNING-QA.md`
- `README.md`
- `index.html`
- `package-lock.json`
- `package.json`
- `scripts/check-carousel.js`
- `scripts/check-flow.js`
- `scripts/check-layout.js`
- `scripts/check-planning-access.js`
- `scripts/check-routes.js`
- `scripts/meeting.test.js`
- `src/App.jsx`
- `src/components/Brand.jsx`
- `src/components/CelebrationImage.jsx`
- `src/components/Footer.jsx`
- `src/components/HeroBackground.jsx`
- `src/components/ServiceStories.jsx`
- `src/components/SiteHeader.jsx`
- `src/components/SiteNavigation.jsx`
- `src/data/celebrations.js`
- `src/data/meetingAvailability.js`
- `src/data/packages.js`
- `src/data/serviceBackgrounds.js`
- `src/data/services.js`
- `src/main.jsx`
- `src/pages/AvailabilityPage.jsx`
- `src/pages/BookingPage.jsx`
- `src/pages/ContactPage.jsx`
- `src/pages/DebutsPage.jsx`
- `src/pages/GalleryPage.jsx`
- `src/pages/HomePage.jsx`
- `src/pages/PackagesPage.jsx`
- `src/pages/ProcessPage.jsx`
- `src/pages/ServicePage.jsx`
- `src/pages/ServicesPage.jsx`
- `src/pages/WeddingsPage.jsx`
- `src/styles.css`
- `src/styles/planning.css`
