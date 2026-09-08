// Browser-only regression check against the Vite dev server. Fixture URLs use
// the two existing photos; no fixture modifies production data or adds photos.
(async () => {
  // Vite may attach an HMR timestamp; mutate the exact module used by the page.
  const pageModule = await fetch("/src/pages/HomePage.jsx").then((response) => response.text());
  const dataUrl = pageModule.match(/from ["']([^"']*serviceBackgrounds\.js[^"']*)["']/)[1];
  const { serviceBackgrounds } = await import(dataUrl);
  const originals = { ...serviceBackgrounds };
  const results = [];
  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const assert = (condition, name) => {
    if (!condition) throw new Error(name);
    results.push(name);
  };
  const until = async (predicate, timeout = 8000) => {
    const start = performance.now();
    while (!predicate()) {
      if (performance.now() - start > timeout) throw new Error("Timed out waiting for carousel state");
      await wait(50);
    }
  };
  const button = (service) => [...document.querySelectorAll(".service-selector button")].find((node) => node.textContent.toLowerCase() === service);
  const current = () => document.querySelector(".hero__photo");
  const incoming = () => document.querySelector(".hero__photo--incoming");
  const settled = (name) => !incoming() && current().src.includes(name);
  let observer;
  try {
    for (const service of ["weddings", "debuts"]) {
      serviceBackgrounds[service] = Array.from({ length: 4 }, (_, index) => ({
        src: `/src/assets/${index % 2 ? "hero-background.jpg" : "Enchanted-Wedding.jpg"}?fixture=${service}-${index}`,
        position: "62% center",
      }));
    }
    button("weddings").click();
    await until(() => settled("weddings-0"));
    assert(button("weddings").getAttribute("aria-pressed") === "true", "Weddings selected and starts at first photo");

    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      await wait(6800);
      assert(settled("weddings-0"), "Reduced motion disables autoplay");
      button("debuts").click();
      await until(() => settled("debuts-0"));
      assert(!incoming(), "Reduced motion preserves service switching without a fade");
      assert(!document.querySelector(".background-toggle"), "No inactive playback control in reduced motion");
      return results;
    }

    let mutations = 0;
    observer = new MutationObserver((changes) => { mutations += changes.length; });
    for (const selector of [".topbar", ".hero__content", ".side-menu", ".category-label", ".availability-card", ".bottom-nav"]) {
      observer.observe(document.querySelector(selector), { attributes: true, childList: true, subtree: true, characterData: true });
    }
    const headingBefore = document.querySelector("h1").getBoundingClientRect().toJSON();
    await until(() => incoming()?.src.includes("weddings-1"));
    await wait(650);
    assert(Number(getComputedStyle(incoming()).opacity) > 0 && Number(getComputedStyle(incoming()).opacity) < 1, "Incoming image crossfades gradually");
    assert(getComputedStyle(current()).opacity === "1" && current().naturalWidth > 0 && incoming().naturalWidth > 0, "Opaque decoded base prevents blank frames");
    await until(() => settled("weddings-1"));
    assert(mutations === 0, "Autoplay does not mutate foreground DOM");
    assert(JSON.stringify(document.querySelector("h1").getBoundingClientRect().toJSON()) === JSON.stringify(headingBefore), "Foreground remains stationary");
    observer.disconnect();

    button("debuts").click();
    await until(() => Boolean(incoming()));
    button("weddings").click();
    button("debuts").click();
    await until(() => settled("debuts-0"));
    assert(location.pathname === "/" && button("debuts").getAttribute("aria-pressed") === "true", "Rapid service switching stays on home and selects latest service");
    document.querySelector(".background-toggle").click();
    await wait(6800);
    assert(settled("debuts-0"), "Pause stops automatic rotation");
    document.querySelector(".background-toggle").click();
    await until(() => settled("debuts-1"));
    assert(true, "Resume continues rotation");
    button("debuts").click();
    await until(() => settled("debuts-0"));
    assert(true, "Re-selecting the active service resets its collection");
    return results;
  } finally {
    observer?.disconnect();
    Object.assign(serviceBackgrounds, originals);
    button("weddings")?.click();
  }
})();
