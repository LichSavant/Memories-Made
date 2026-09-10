import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { celebrations } from "../data/celebrations";

export default function CelebrationImage({ item, images = celebrations }) {
  const [active, setActive] = useState(null);
  const trigger = useRef(null);
  const dialog = useRef(null);
  const titleId = useId();
  const collection = images.some((image) => image.id === item.id)
    ? images
    : [item];
  const open = active !== null;
  const photo = collection[active] || item;
  const advance = (step) =>
    setActive(
      (index) => (index + step + collection.length) % collection.length,
    );

  useEffect(() => {
    if (!open) return;
    const node = dialog.current;
    const scrollY = window.scrollY;
    const body = document.body;
    const previous = {
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
    };
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";
    node.showModal();
    return () => {
      node.close();
      Object.assign(body.style, previous);
      window.scrollTo(0, scrollY);
      trigger.current?.focus({ preventScroll: true });
    };
  }, [open]);

  return (
    <>
      <button
        ref={trigger}
        type="button"
        className="photo-trigger"
        aria-label={`View photo: ${item.label}`}
        aria-haspopup="dialog"
        onClick={() =>
          setActive(collection.findIndex((image) => image.id === item.id))
        }
      >
        <span className="editorial-image">
          <img
            src={item.src}
            alt={item.alt}
            loading="lazy"
            decoding="async"
            width="1600"
            height="1000"
            style={{ objectPosition: item.position }}
          />
          <span className="photo-hint" aria-hidden="true">
            View photograph +
          </span>
        </span>
      </button>
      {open &&
        createPortal(
          <dialog
            ref={dialog}
            className="photo-viewer"
            aria-labelledby={titleId}
            onCancel={(event) => {
              event.preventDefault();
              setActive(null);
            }}
            onClick={(event) => {
              if (event.target === event.currentTarget) setActive(null);
            }}
            onKeyDown={(event) => {
              if (event.key === "Tab") {
                const buttons = [
                  ...event.currentTarget.querySelectorAll("button"),
                ];
                const first = buttons[0],
                  last = buttons[buttons.length - 1];
                if (event.shiftKey && document.activeElement === first) {
                  event.preventDefault();
                  last.focus();
                } else if (!event.shiftKey && document.activeElement === last) {
                  event.preventDefault();
                  first.focus();
                }
              }
              if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
                event.preventDefault();
                advance(event.key === "ArrowRight" ? 1 : -1);
              }
            }}
          >
            <div className="photo-viewer__content">
              <header>
                <span>Memories Made / Portfolio preview</span>
                <button
                  type="button"
                  autoFocus
                  onClick={() => setActive(null)}
                  aria-label="Close photo viewer"
                >
                  Close
                </button>
              </header>
              <img key={photo.src} src={photo.src} alt={photo.alt} />
              <footer>
                <div aria-live="polite" aria-atomic="true">
                  <p id={titleId}>{photo.label}</p>
                  <span>
                    {photo.type} / {active + 1} of {collection.length}
                  </span>
                </div>
                {collection.length > 1 && (
                  <div className="photo-viewer__controls">
                    <button
                      type="button"
                      aria-label="Previous photo"
                      onClick={() => advance(-1)}
                    >
                      Previous
                    </button>
                    <button
                      type="button"
                      aria-label="Next photo"
                      onClick={() => advance(1)}
                    >
                      Next
                    </button>
                  </div>
                )}
              </footer>
              <p className="photo-viewer__note">
                Inspiration preview; approved event photography coming soon.
              </p>
            </div>
          </dialog>,
          document.body,
        )}
    </>
  );
}
