// Run through agent-browser eval --stdin on home or Gallery.
(async () => {
  const wait = (ms = 100) => new Promise((resolve) => setTimeout(resolve, ms));
  const results = [];
  const assert = (ok, label) => {
    if (!ok) throw new Error(label);
    results.push(label);
  };
  const trigger = document.querySelector(".photo-trigger");
  trigger.scrollIntoView({ block: "center" });
  await wait(800);
  const route = location.href,
    position = scrollY;
  trigger.focus();
  trigger.click();
  await wait();
  let dialog = document.querySelector("dialog[open]");
  assert(dialog?.matches(":modal"), "Native modal opens");
  assert(location.href === route, "Image click preserves route");
  assert(dialog.contains(document.activeElement), "Focus enters viewer");
  assert(document.body.style.position === "fixed", "Background scroll locked");
  const original = dialog.querySelector("img").src;
  const next = dialog.querySelector('[aria-label="Next photo"]');
  if (next) {
    next.click();
    await wait();
    assert(
      dialog.querySelector("img").src !== original,
      "Next photo changes image",
    );
    dialog.dispatchEvent(
      new KeyboardEvent("keydown", { key: "ArrowLeft", bubbles: true }),
    );
    await wait();
    assert(
      dialog.querySelector("img").src === original,
      "Left arrow returns to previous image",
    );
  }
  dialog.dispatchEvent(new Event("cancel", { cancelable: true }));
  await wait();
  assert(
    !document.querySelector("dialog[open]"),
    "Escape cancel closes viewer",
  );
  assert(
    document.activeElement === trigger,
    "Focus restored to original photo",
  );
  assert(Math.abs(scrollY - position) < 2, "Scroll position restored");
  trigger.click();
  await wait();
  dialog = document.querySelector("dialog[open]");
  dialog.click();
  await wait();
  assert(!document.querySelector("dialog[open]"), "Backdrop closes viewer");
  trigger.click();
  await wait();
  document.querySelector('[aria-label="Close photo viewer"]').click();
  await wait();
  assert(!document.querySelector("dialog[open]"), "Close button closes viewer");
  assert(location.href === route, "All viewer controls preserve route");
  return { viewport: `${innerWidth}x${innerHeight}`, results };
})();
