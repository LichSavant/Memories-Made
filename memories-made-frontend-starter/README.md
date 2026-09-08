# Memories Made Wedding & Events — Frontend Starter

This starter recreates the approved premium landing-page direction as a real
React + Vite frontend.

## Included

- Responsive editorial hero section
- Desktop service selector and inline mobile service buttons
- Fixed primary navigation with all five destinations available on mobile
- Wedding/debut branding
- Primary booking and package CTAs
- Availability information card
- Starter content sections for the next screens
- Local Enchanted-Wedding hero with service-specific carousel support

## Run locally

```bash
npm install
npm run dev
```

Open the local URL shown by Vite.

## Main files

- `src/App.jsx` — page structure and navigation
- `src/styles.css` — complete visual styling and responsive behavior
- `src/assets/Enchanted-Wedding.jpg` — optimized hero image asset

## Landing-page backgrounds

The homepage service buttons select a background collection without navigating.
The fixed bottom bar contains the five primary destinations; the existing
wedding/debut detail pages remain reachable from the introduction below the hero.

The homepage has four local backgrounds for each service. Temporary assets live
in `src/assets/placeholders/` and use clear `wedding-01` through `wedding-04`
and `debut-01` through `debut-04` filenames. Replace those files in place later,
or update their imports and focal positions in `src/data/serviceBackgrounds.js`.
The collection contains no empty slots, and the first wedding image remains the
safe fallback for an unknown service.

Collections with two or more photos rotate after a five-second hold, followed
by a 1.5-second crossfade. The foreground does not animate. Only the next image
is preloaded; failed loads retain the visible image. Rapid selections finish
the current fade, then use the latest service selection. Selecting a service
again resets its collection. A pause/resume control appears when photos can
rotate, hidden tabs stop scheduling rotation, and reduced motion disables
autoplay and fades while preserving service selection.

## Verification

Run `npm.cmd install` and `npm.cmd run build` on Windows (`npm` on other systems).
No lint or test runner dependency is configured. Browser regression scripts in
`scripts/` can be run against `npm.cmd run dev` using the standalone
`agent-browser` CLI (not an application dependency):

```powershell
npx.cmd --yes agent-browser open http://127.0.0.1:5173
Get-Content -Raw scripts/check-layout.js | npx.cmd --yes agent-browser eval --stdin
Get-Content -Raw scripts/check-carousel.js | npx.cmd --yes agent-browser eval --stdin
npx.cmd --yes agent-browser set media reduced-motion
Get-Content -Raw scripts/check-carousel.js | npx.cmd --yes agent-browser eval --stdin
npx.cmd --yes agent-browser set media light
Get-Content -Raw scripts/check-routes.js | npx.cmd --yes agent-browser eval --stdin
```

Run the layout check at desktop, laptop, tablet, and mobile viewport sizes using
`agent-browser set viewport WIDTH HEIGHT`. Carousel checks temporarily populate
collections in browser memory with fixture URLs for existing local images and
restore the original data afterward. They do not fill the pending photo slots
in the repository. Reload the page after checks to reset all browser state.

## Recommended next frontend screen

Build the interactive **Packages and Date Availability** page next, followed by
the multi-step booking form.
