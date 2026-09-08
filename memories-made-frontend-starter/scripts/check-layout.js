// Run in the browser against the homepage via agent-browser eval --stdin.
(() => {
  const rect = (selector) => document.querySelector(selector).getBoundingClientRect();
  const nav = document.querySelector(".bottom-nav");
  const before = nav.getBoundingClientRect();
  const availability = rect(".availability-card");
  const links = [...nav.querySelectorAll("a")];
  const checks = {
    noHorizontalOverflow: document.documentElement.scrollWidth === innerWidth,
    fiveVisibleDestinations: links.length === 5 && links.every((link) => link.getBoundingClientRect().width > 0),
    labelsFit: links.every((link) => link.scrollWidth <= link.clientWidth),
    fixedToViewport: getComputedStyle(nav).position === "fixed" && Math.abs(before.bottom - innerHeight) < 1,
    servicesAreButtons: document.querySelectorAll(".service-selector button").length === 2 && !document.querySelector(".side-menu a"),
    photoLoaded: document.querySelector(".hero__photo").naturalWidth > 0,
    ctaInsideHero: rect(".hero__actions").right <= innerWidth && rect(".hero__actions").bottom <= rect(".hero").bottom,
    ctaAndAvailabilityDoNotOverlap: rect(".hero__actions").bottom <= rect(".availability-card").top || rect(".hero__actions").right <= rect(".availability-card").left,
    visibleAvailabilityClearsNav: availability.top >= innerHeight || availability.bottom <= before.top,
  };
  const previousScroll = scrollY;
  window.scrollTo(0, document.documentElement.scrollHeight);
  checks.navRemainsFixedAfterScroll = Math.abs(nav.getBoundingClientRect().top - before.top) < 1;
  checks.footerClearsNav = rect(".site-footer").bottom <= nav.getBoundingClientRect().top + 1;
  window.scrollTo(0, previousScroll);
  if (Object.values(checks).some((passed) => !passed)) throw new Error(JSON.stringify(checks));
  return { viewport: `${innerWidth} x ${innerHeight}`, checks };
})();
