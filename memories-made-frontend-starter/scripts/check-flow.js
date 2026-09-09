// Run with agent-browser eval --stdin against the Vite dev server.
(async () => {
  const results = [];
  const wait = () => new Promise((resolve) => setTimeout(resolve, 120));
  const assert = (value, message) => {
    if (!value) throw new Error(message);
    results.push(message);
  };
  const click = async (selector) => {
    const node = document.querySelector(selector);
    if (!node) throw new Error(`Missing control: ${selector}`);
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
  const advance = async () => click(".form-actions .primary-button");
  const currentStep = () =>
    document.querySelector('[aria-current="step"]')?.textContent;

  await go("/availability");
  assert(
    document.querySelector(
      '.bottom-nav a[href="/availability"][aria-current="page"]',
    ),
    "Availability has an active navigation state",
  );
  await click('.calendar header button[aria-label="Next month"]');
  await click(".calendar-grid button:last-child");
  const chosen = document.querySelector(".date-summary h2").textContent;
  await click('.calendar header button[aria-label="Next month"]');
  assert(
    document.querySelector(".date-summary h2").textContent === chosen,
    "Changing months preserves the full selected date",
  );
  assert(
    !document.querySelector('.calendar-grid [aria-pressed="true"]'),
    "Another month does not falsely select the same day number",
  );
  await click(".period-choices button:last-child");
  const bookingHref = document
    .querySelector(".date-summary a")
    .getAttribute("href");
  const expectedDate = new URL(bookingHref, location.origin).searchParams.get(
    "date",
  );
  await click(".date-summary a");
  document.querySelector("form").requestSubmit();
  await wait();
  assert(
    currentStep().includes("Event Type") &&
      document.querySelector("#eventType-error"),
    "Enter/submit cannot bypass the required event type",
  );
  await click('[name="eventType"][value="Wedding"]');
  await advance();
  assert(
    document.querySelector('[name="date"]').value === expectedDate &&
      document.querySelector('[name="period"]').value === "Evening",
    "Date and time carry from availability into the inquiry",
  );
  await fill("alternativeDate", "2020-01-01");
  await advance();
  assert(
    document.querySelector("#alternativeDate-error"),
    "Past alternative dates are rejected",
  );
  await fill("alternativeDate", "");
  await advance();
  await fill("package", "Help me decide");
  await fill("guests", "0");
  await advance();
  assert(
    document.querySelector("#guests-error"),
    "Invalid guest counts are rejected",
  );
  await fill("guests", "80");
  await advance();
  await advance();
  assert(
    document.querySelector("#name-error") &&
      document.querySelector("#email-error") &&
      document.querySelector("#phone-error"),
    "Required contact details are validated",
  );
  await fill("name", "Browser QA");
  await fill("email", "qa@example.com");
  await fill("phone", "09000000000");
  await advance();
  assert(
    document.querySelector(".review-list").textContent.includes(expectedDate) &&
      document.querySelector(".review-list").textContent.includes("Evening"),
    "Review retains selected event details",
  );
  await advance();
  assert(
    document
      .querySelector(".draft-status")
      .textContent.includes("Nothing has been sent"),
    "Preparation clearly reports a draft without claiming submission",
  );
  await click(".form-actions .secondary-button");
  assert(
    document.querySelector('[name="name"]').value === "Browser QA",
    "Back preserves entered contact details",
  );
  await go("/packages");
  await click(".package-card:nth-child(2) a");
  await click('[name="eventType"][value="Debut"]');
  await advance();
  await fill("date", expectedDate);
  await advance();
  assert(
    document.querySelector('[name="package"]').value === "Signature",
    "Package inquiry carries the selected package",
  );
  await go("/gallery");
  for (const filter of ["Weddings", "Debuts", "Styling", "All"]) {
    const button = [
      ...document.querySelectorAll(".gallery-filters button"),
    ].find((node) => node.textContent === filter);
    button.click();
    await wait();
    assert(
      document.querySelectorAll(".gallery-item").length ===
        (filter === "All" ? 3 : 1),
      `${filter} gallery filter shows matching image data`,
    );
    assert(
      button.getAttribute("aria-pressed") === "true",
      `${filter} gallery filter announces selection`,
    );
  }
  await go("/contact");
  await fill("name", "Browser QA");
  await fill("email", "qa@example.com");
  await fill("message", "Local browser test only.");
  await click('.contact-form button[type="submit"]');
  assert(
    document
      .querySelector(".success-panel")
      .textContent.includes("Nothing has been sent"),
    "Contact draft does not imply a message was sent",
  );
  await click(".success-panel button");
  assert(
    document.querySelector('[name="message"]').value ===
      "Local browser test only.",
    "Contact draft remains editable",
  );
  await click(".site-header .brand");
  return results;
})();
