// Run on home with agent-browser eval --stdin at each target viewport.
(async () => {
  const results = [];
  const wait = (ms = 150) => new Promise((resolve) => setTimeout(resolve, ms));
  const near = (a, b) => Math.abs(a - b) < 1;
  const assert = (value, message) => {
    if (!value) throw new Error(`${location.pathname}: ${message}`);
  };
  const rect = (node) => node.getBoundingClientRect();
  const contentEdges = (node) => {
    const box = rect(node),
      css = getComputedStyle(node);
    return [
      box.left + parseFloat(css.paddingLeft),
      box.right - parseFloat(css.paddingRight),
    ];
  };
  const inspect = () => {
    const width = document.documentElement.clientWidth;
    const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const gutter = Math.max(
      Math.min(4 * rem, Math.max(1.4 * rem, width * 0.04)),
      (width - 75 * rem) / 2,
    );
    const sections = [
      ...document.querySelectorAll(
        ".page-hero, .content-section, .cta-section, .site-header, .site-footer, .bottom-nav",
      ),
    ];
    sections.forEach((node) => {
      const [left, right] = contentEdges(node);
      assert(
        near(left, gutter) && near(width - right, gutter),
        `Unequal/shared gutters on ${node.className}: ${left}, ${width - right}; expected ${gutter}`,
      );
    });
    assert(
      document.documentElement.scrollWidth === width,
      "Horizontal document overflow",
    );
    const overflow = [
      ...document.querySelectorAll(
        "main h1, main h2, main h3, main p, main button, main input, main select, main textarea, main fieldset, main a",
      ),
    ].filter((node) => {
      const box = rect(node);
      return box.width > 0 && (box.left < -1 || box.right > width + 1);
    });
    assert(
      !overflow.length,
      `Clipped content: ${overflow.map((node) => node.className || node.tagName).join(", ")}`,
    );
    for (const selector of [
      ".card-grid",
      ".gallery-grid",
      ".service-stories",
      ".featured-grid",
      ".booking-form",
      ".contact-form",
      ".progress-steps",
      ".timeline",
      ".section-heading",
    ]) {
      document.querySelectorAll(selector).forEach((node) => {
        const box = rect(node);
        const halfWidthHeading =
          selector === ".section-heading" &&
          node.parentElement.classList.contains("split-section");
        assert(
          near(box.left, gutter) &&
            (halfWidthHeading || near(box.right, width - gutter)),
          `Content edges do not align: ${selector}`,
        );
      });
    }
    document
      .querySelectorAll(".section-heading h2, .page-hero h1")
      .forEach((node) =>
        assert(
          near(rect(node).left, gutter),
          "Heading is offset from the shared edge",
        ),
      );
    for (const selector of [
      ".featured-grid",
      ".service-stories",
      ".gallery-grid",
      ".card-grid",
    ]) {
      const grid = document.querySelector(selector);
      if (!grid) continue;
      const items = [...grid.children].map((node) =>
        rect(node.querySelector(".editorial-image") || node),
      );
      items.forEach((item, index) =>
        items.slice(index + 1).forEach((other) => {
          if (near(item.top, other.top))
            assert(
              near(item.width, other.width) && near(item.bottom, other.bottom),
              `Unequal image/card row in ${selector}`,
            );
        }),
      );
    }
    const preview = document.querySelector(".home-preview");
    if (preview && width > 760) {
      const [left, right] = [...preview.children].map(rect);
      assert(
        near(left.width, right.width) &&
          near(left.left, gutter) &&
          near(right.right, width - gutter),
        "Unbalanced process/package columns",
      );
    }
    results.push({
      path: location.pathname,
      gutter: Number(gutter.toFixed(2)),
      sharedSections: sections.length,
      aligned: true,
    });
  };
  inspect();
  for (const path of [
    "/weddings",
    "/debuts",
    "/packages",
    "/process",
    "/gallery",
    "/availability",
    "/booking",
    "/contact",
  ]) {
    document.querySelector(`.footer-links a[href="${path}"]`).click();
    await wait();
    inspect();
  }
  document.querySelector(".site-header .brand").click();
  await wait();
  return { viewport: `${innerWidth} x ${innerHeight}`, results };
})();
