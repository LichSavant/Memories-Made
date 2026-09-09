import { useState } from "react";
import PageHero from "../components/PageHero";
import PrimaryButton from "../components/PrimaryButton";
import CelebrationImage from "../components/CelebrationImage";
import { celebrations, portfolioNote } from "../data/celebrations";

const filters = ["All", ...new Set(celebrations.map((item) => item.type))];
export default function GalleryPage() {
  const [filter, setFilter] = useState("All");
  const shown =
    filter === "All"
      ? celebrations
      : celebrations.filter((item) => item.type === filter);
  return (
    <>
      <PageHero
        label="Celebration Gallery / Preview"
        title="Moments shaped with intention."
      >
        Explore the mood, flowers, and thoughtful details behind a celebration.{" "}
        {portfolioNote}
      </PageHero>
      <section className="content-section">
        <div
          className="gallery-filters"
          role="group"
          aria-label="Gallery filters"
        >
          {filters.map((value) => (
            <button
              type="button"
              aria-pressed={filter === value}
              className={filter === value ? "is-active" : ""}
              onClick={() => setFilter(value)}
              key={value}
            >
              {value}
            </button>
          ))}
        </div>
        <p className="form-note" role="status">
          {shown.length} {shown.length === 1 ? "image" : "images"} · {filter}
        </p>
        <div className="gallery-grid">
          {shown.map((item) => (
            <figure className="gallery-item" key={item.id}>
              <CelebrationImage item={item} />
              <figcaption>
                <span>{item.type}</span>
                {item.label}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
      <section className="cta-section">
        <h2>What does your celebration look like?</h2>
        <PrimaryButton to="/booking">Start Your Inquiry</PrimaryButton>
      </section>
    </>
  );
}
