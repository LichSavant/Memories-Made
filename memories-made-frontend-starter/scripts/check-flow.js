// Run with agent-browser eval --stdin on the running app.
(async () => {
  const results = [];
  const wait = (ms = 100) => new Promise((resolve) => setTimeout(resolve, ms));
  const assert = (value, message) => {
    if (!value) throw new Error(message);
    results.push(message);
  };
  const click = async (selector) => {
    const node = document.querySelector(selector);
    if (!node) throw new Error(`Missing: ${selector}`);
    node.click();
    await wait();
  };
  const fill = async (name, value) => {
    const node = document.querySelector(`[name="${name}"]`);
    Object.getOwnPropertyDescriptor(
      Object.getPrototypeOf(node),
      "value",
    ).set.call(node, value);
    node.dispatchEvent(
      new Event(node.tagName === "SELECT" ? "change" : "input", {
        bubbles: true,
      }),
    );
    await wait();
  };
  const go = async (path) => click(`.footer-links a[href="${path}"]`);
  const next = async () => click(".form-actions .primary-button");
  const back = async () => click(".form-actions .secondary-button");
  const radio = async (name, value) =>
    click(`input[name="${name}"][value="${value}"]`);
  const step = () =>
    document.querySelector('[aria-current="step"]')?.textContent;
  await go("/packages");
  assert(
    !document.querySelector(".package-option"),
    "Packages requires event selection first",
  );
  await click(".event-selector button:first-child");
  assert(
    document.querySelectorAll(".package-option").length === 3,
    "Wedding shows existing packages",
  );
  await click(".package-option:first-child > button");
  assert(
    document
      .querySelector(".package-detail:not([hidden])")
      ?.textContent.includes("Planning consultation"),
    "Package details expand in-page",
  );
  await click(".package-detail:not([hidden]) a");
  assert(
    document.querySelector('input[name="eventType"]:checked')?.value ===
      "Wedding",
    "Package inquiry retains event",
  );
  await next();
  await fill("date", "2099-06-15");
  await next();
  assert(
    document.querySelector('[name="package"]').value === "Essential",
    "Package inquiry retains package",
  );
  await back();
  await back();
  await radio("eventType", "Prenup");
  await next();
  await next();
  assert(
    document.querySelector('[name="package"]').value === "" &&
      document.querySelector('[name="package"]').options.length === 2,
    "Changing event clears unrelated package choices",
  );
  await fill("package", "Help me decide");
  await next();
  await next();
  assert(
    document.querySelector("#email-error"),
    "Inquiry validates contact details",
  );
  await fill("name", "Test Client");
  await fill("email", "test@example.com");
  await fill("phone", "123456789");
  await next();
  await next();
  assert(
    document
      .querySelector(".draft-status")
      ?.textContent.includes("Nothing has been sent"),
    "Event inquiry remains an honest unsent draft",
  );
  await go("/packages");
  for (const index of [2, 3, 4, 5, 6]) {
    await click(`.event-selector button:nth-child(${index})`);
    assert(
      location.pathname === "/packages",
      `Event ${index} switches in-page`,
    );
    assert(
      index === 2
        ? document.querySelectorAll(".package-option").length === 3
        : !!document.querySelector(".package-empty"),
      `Event ${index} only shows relevant packages or inquiry state`,
    );
  }
  await click(".package-empty a");
  assert(
    document.querySelector('input[name="eventType"]:checked')?.value ===
      "Other / Custom Event",
    "Custom-event inquiry retains selection",
  );

  await go("/availability");
  await next();
  assert(
    step().includes("Date") && document.querySelector('[role="alert"]'),
    "Cannot skip date",
  );
  await click('[aria-label="Next month"]');
  await click(".calendar-grid button:last-child");
  const selected = document.querySelector(
    '.calendar [role="status"]',
  ).textContent;
  await click('[aria-label="Next month"]');
  assert(
    document.querySelector('.calendar [role="status"]').textContent ===
      selected &&
      !document.querySelector('.calendar-grid [aria-pressed="true"]'),
    "Calendar preserves full date across month navigation",
  );
  await next();
  await radio("type", "Online");
  await next();
  assert(
    step().includes("Time") && !document.querySelector('[name="location"]'),
    "Online skips physical location",
  );
  await next();
  assert(
    step().includes("Time") && document.querySelector('[role="alert"]'),
    "Cannot skip time",
  );
  await radio("time", "09:00");
  await next();
  await next();
  assert(
    step().includes("Details") && document.querySelector('[role="alert"]'),
    "Meeting validates contact details",
  );
  await fill("name", "Test Client");
  await fill("email", "test@example.com");
  await next();
  assert(
    document.querySelector(".review-list").textContent.includes("Online") &&
      !document.querySelector(".review-list").textContent.includes("Location"),
    "Online review omits location",
  );
  await next();
  assert(
    document
      .querySelector(".draft-status")
      ?.textContent.includes("Nothing has been sent or booked"),
    "Meeting request clearly remains an unsent draft",
  );
  await back();
  await back();
  await back();
  await radio("type", "In Person");
  await next();
  assert(step().includes("Location"), "In-person includes location step");
  await radio("locationChoice", "enter");
  await next();
  assert(
    step().includes("Location") && document.querySelector('[role="alert"]'),
    "Entered location cannot be blank",
  );
  await fill("location", "Preferred cafe");
  await next();
  assert(
    !document.querySelector('input[name="time"]:checked'),
    "Changing meeting setup clears previous time",
  );
  await radio("time", "10:30");
  await next();
  await next();
  assert(
    document
      .querySelector(".review-list")
      .textContent.includes("Preferred cafe"),
    "In-person review retains entered location",
  );
  await back();
  await back();
  await back();
  await radio("locationChoice", "later");
  await next();
  await next();
  await next();
  assert(
    document
      .querySelector(".review-list")
      .textContent.includes("Decide location later") &&
      !document
        .querySelector(".review-list")
        .textContent.includes("Preferred cafe"),
    "Deferred location is optional and clears stale location",
  );
  await next();
  assert(
    !!document.querySelector(".draft-status"),
    "Deferred-location request completes",
  );
  await back();
  await back();
  await back();
  await back();
  await back();
  await click('[aria-label="Next month"]');
  await click(".calendar-grid button:last-child");
  await next();
  await next();
  await next();
  assert(
    !document.querySelector('input[name="time"]:checked'),
    "Changing date clears stale time selection",
  );
  assert(
    !document.querySelector('a[href*="zoom.us"], a[href*="meet.google"]'),
    "No fabricated meeting links",
  );
  return { viewport: `${innerWidth}x${innerHeight}`, results };
})();
