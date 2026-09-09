(async () => {
  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const results = [];
  for (const path of [
    "/weddings",
    "/debuts",
    "/packages",
    "/process",
    "/gallery",
    "/availability",
    "/contact",
    "/booking",
  ]) {
    const link = [...document.querySelectorAll("a")].find(
      (node) => node.getAttribute("href") === path,
    );
    if (!link) throw new Error(`Missing homepage link to ${path}`);
    link.click();
    await wait(150);
    const heading = document.querySelector("h1")?.textContent;
    if (
      location.pathname !== path ||
      !heading ||
      document.querySelector(".not-found")
    )
      throw new Error(`Broken route: ${path}`);
    if (document.documentElement.scrollWidth > innerWidth)
      throw new Error(`Horizontal overflow: ${path}`);
    if (
      !document.querySelector(".skip-link") ||
      !document.querySelector('.bottom-nav a[href="/booking"]')
    )
      throw new Error(`Missing shared access: ${path}`);
    results.push({ path, heading, noOverflow: true });
    document.querySelector('.site-header a[href="/"]').click();
    await wait(150);
    if (
      location.pathname !== "/" ||
      document.querySelector('.service-selector button[aria-pressed="true"]')
        ?.textContent !== "Weddings"
    )
      throw new Error("Homepage did not remount correctly");
  }
  return results;
})();
