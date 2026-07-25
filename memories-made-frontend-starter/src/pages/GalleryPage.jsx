import { useState } from "react";
import PageHero from "../components/PageHero";
import hero from "../assets/hero-background.jpg";
const items = [
  { type: "Weddings", image: hero, alt: "Elegant floral event setting" },
  { type: "Debuts", label: "A celebration in bloom" },
  { type: "Weddings", label: "Considered details" },
  { type: "Debuts", label: "A personal milestone" },
  { type: "Weddings", label: "An intimate gathering" },
  { type: "Debuts", label: "A memorable evening" },
];
export default function GalleryPage() {
  const [filter, setFilter] = useState("All");
  const shown =
    filter === "All" ? items : items.filter((x) => x.type === filter);
  return (
    <>
      <PageHero
        label="Selected Celebrations"
        title="Moments shaped with intention."
      >
        A restrained collection of wedding and debut inspiration.
      </PageHero>
      <section className="content-section">
        <div className="gallery-filters" aria-label="Gallery filters">
          {["All", "Weddings", "Debuts"].map((x) => (
            <button
              className={filter === x ? "is-active" : ""}
              aria-pressed={filter === x}
              onClick={() => setFilter(x)}
              key={x}
            >
              {x}
            </button>
          ))}
        </div>
        <div className="gallery-grid">
          {shown.map((item, i) => (
            <figure
              className={`gallery-item gallery-item--${i % 3}`}
              key={`${item.type}-${i}`}
            >
              {item.image ? (
                <img src={item.image} alt={item.alt} />
              ) : (
                <div
                  className="gallery-placeholder"
                  role="img"
                  aria-label={`${item.type}: ${item.label}`}
                >
                  <span>✦</span>
                </div>
              )}
              <figcaption>
                <span>{item.type}</span>
                {item.label || "Floral celebration setting"}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </>
  );
}
