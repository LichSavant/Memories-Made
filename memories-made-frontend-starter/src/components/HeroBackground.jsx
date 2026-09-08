import { useEffect, useState } from "react";
import { getBackgrounds } from "../data/serviceBackgrounds";

const DISPLAY_MS = 5000;
const FADE_MS = 1500;

// Keep only load promises, not decoded Image objects. The browser manages its
// image cache; only the next photo is requested ahead of time.
const loadedImages = new Map();
function loadImage(src) {
  if (!loadedImages.has(src)) {
    const image = new Image();
    image.src = src;
    const promise = image.decode().catch((error) => {
      loadedImages.delete(src);
      throw error;
    });
    loadedImages.set(src, promise);
  }
  return loadedImages.get(src);
}

export default function HeroBackground({ selection, paused, reducedMotion }) {
  const [current, setCurrent] = useState(() => ({
    selection,
    index: 0,
    photo: getBackgrounds(selection.service)[0],
  }));
  const [incoming, setIncoming] = useState(null);
  const [visible, setVisible] = useState(() => !document.hidden);

  useEffect(() => {
    const update = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  // Finish an in-progress fade before responding to another selection. Rapid
  // clicks coalesce to the latest selection without clearing a visible layer.
  useEffect(() => {
    if (!incoming) return;
    const timer = window.setTimeout(() => {
      setCurrent(incoming);
      setIncoming(null);
    }, reducedMotion ? 0 : FADE_MS);
    return () => window.clearTimeout(timer);
  }, [incoming, reducedMotion]);

  useEffect(() => {
    if (incoming || !visible) return;
    const photos = getBackgrounds(selection.service);
    const switching = current.selection !== selection;
    if (!switching && (paused || reducedMotion || photos.length < 2)) return;

    let cancelled = false;
    const startIndex = switching ? 0 : (current.index + 1) % photos.length;

    // Failed loads never replace a visible image. Try the remaining collection
    // sequentially, and stop if none can load (no retry loop or blank frames).
    const advance = async () => {
      for (let offset = 0; offset < photos.length && !cancelled; offset += 1) {
        const index = (startIndex + offset) % photos.length;
        const photo = photos[index];
        try {
          await loadImage(photo.src);
          if (cancelled) return;
          const next = { selection, index, photo };
          if (reducedMotion || photo.src === current.photo.src) setCurrent(next);
          else setIncoming(next);
          return;
        } catch {
          // Retain the current photograph while trying another local asset.
        }
      }
    };

    // Preload one image while the current image holds for five seconds.
    void loadImage(photos[startIndex].src).catch(() => {});
    const timer = window.setTimeout(advance, switching ? 0 : DISPLAY_MS);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [selection, current, incoming, paused, reducedMotion, visible]);

  return (
    <div
      className="hero__background"
      aria-hidden="true"
      style={{ "--hero-fade-duration": `${FADE_MS}ms` }}
    >
      <img
        className="hero__photo"
        src={current.photo.src}
        alt=""
        fetchpriority="high"
        style={{ objectPosition: current.photo.position }}
      />
      {incoming && (
        <img
          key={incoming.photo.src}
          className="hero__photo hero__photo--incoming"
          src={incoming.photo.src}
          alt=""
          style={{ objectPosition: incoming.photo.position }}
        />
      )}
      <div className="hero__overlay" />
      <div className="hero__grain" />
    </div>
  );
}
