// Extra accessibility/content checks on the existing gallery and contact flows.
(async () => {
  const wait = (ms = 120) => new Promise((resolve) => setTimeout(resolve, ms));
  const results = [];
  const check = (ok, text) => {
    if (!ok) throw new Error(text);
    results.push(text);
  };
  const go = async (path) => {
    document.querySelector(`.footer-links a[href="${path}"]`).click();
    await wait();
  };
  const fill = async (name, value) => {
    const node = document.querySelector(`[name="${name}"]`);
    Object.getOwnPropertyDescriptor(
      Object.getPrototypeOf(node),
      "value",
    ).set.call(node, value);
    node.dispatchEvent(new Event("input", { bubbles: true }));
    await wait();
  };
  await go("/gallery");
  for (const button of document.querySelectorAll(".gallery-filters button")) {
    button.click();
    await wait();
    check(
      document.querySelectorAll(".gallery-item").length > 0,
      `${button.textContent} filter has existing content`,
    );
  }
  document.querySelector(".gallery-filters button").click();
  await wait();
  for (const img of document.querySelectorAll(".gallery-item img"))
    check(
      getComputedStyle(img).transform === "none",
      "Gallery images retain unscaled presentation",
    );
  await go("/contact");
  check(
    document.querySelector('[name="type"]').options.length === 7,
    "Contact uses the centralized six event types",
  );
  document.querySelector("form").requestSubmit();
  await wait();
  check(
    !!document.querySelector("#email-error"),
    "Contact rejects missing details",
  );
  await fill("name", "Test Client");
  await fill("email", "client@example.com");
  await fill("message", "Test draft only");
  document.querySelector("form").requestSubmit();
  await wait();
  check(
    document
      .querySelector(".success-panel")
      ?.textContent.includes("Nothing has been"),
    "Contact remains an unsent draft",
  );
  if (innerWidth <= 900) {
    const menu = document.querySelector(".mobile-navigation button");
    menu.focus();
    menu.click();
    await wait();
    check(menu.getAttribute("aria-expanded") === "true", "Mobile menu opens");
    const panel = document.querySelector("#mobile-navigation-panel");
    check(
      panel.scrollHeight >= panel.clientHeight &&
        getComputedStyle(panel).overflowY === "auto",
      "Expanded mobile menu can scroll",
    );
    check(
      panel.querySelectorAll(".mobile-services a").length === 7,
      "Mobile services includes all six and overview",
    );
    panel.dispatchEvent(
      new KeyboardEvent("keydown", { key: "Escape", bubbles: true }),
    );
    await wait();
    check(
      menu.getAttribute("aria-expanded") === "false" &&
        document.activeElement === menu,
      "Escape closes mobile menu and restores focus",
    );
  }
  check(
    !/Memories Made|MEMORIES MADE/.test(document.body.innerText),
    "User-facing brand is one word",
  );
  return results;
})();
