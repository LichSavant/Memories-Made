import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Brand from "../components/Brand";
import PrimaryButton from "../components/PrimaryButton";
import Footer from "../components/Footer";
import SiteNavigation from "../components/SiteNavigation";
import CelebrationImage from "../components/CelebrationImage";
import { celebrations, portfolioNote } from "../data/celebrations";
import HeroBackground from "../components/HeroBackground";
import { getBackgrounds } from "../data/serviceBackgrounds";
import useReducedMotion from "../hooks/useReducedMotion";
import useSectionReveal from "../hooks/useSectionReveal";

const services = [
  ["Weddings", "weddings"],
  ["Debuts", "debuts"],
];
const serviceContent = {
  weddings: {
    eyebrow: "Premium Wedding Planning",
    category: "Weddings",
  },
  debuts: {
    eyebrow: "Signature Debut Planning",
    category: "Debuts",
  },
};
function CalendarIcon() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="M14 7v7M34 7v7M8 19h32M11 11h26a3 3 0 0 1 3 3v25H8V14a3 3 0 0 1 3-3Z" />
      <path d="m27 31 4 4 8-9" />
    </svg>
  );
}
function ArrowIcon() {
  return (
    <svg viewBox="0 0 32 16" aria-hidden="true">
      <path d="M1 8h28M23 2l6 6-6 6" />
    </svg>
  );
}

export default function HomePage() {
  const [selection, setSelection] = useState({ service: "weddings" });
  const [slideIndex, setSlideIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useReducedMotion();
  const mainRef = useSectionReveal(reducedMotion);
  const backgrounds = getBackgrounds(selection.service);
  const canRotate = backgrounds.length > 1;
  const activeContent = serviceContent[selection.service];
  const hasRotatingCollections = services.some(
    ([, service]) => getBackgrounds(service).length > 1,
  );
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="site-shell home-shell" data-service={selection.service}>
      <a className="skip-link" href="#home-content">
        Skip to content
      </a>
      <main id="home-content" ref={mainRef} tabIndex={-1}>
        <section className="hero">
          <HeroBackground
            selection={selection}
            paused={paused}
            reducedMotion={reducedMotion}
            onSlideChange={setSlideIndex}
          />
          <header className="topbar">
            <Link className="season" to="/">
              {new Date().getFullYear()} <span>/</span> Booking Season
            </Link>
            <Brand />
          </header>
          <aside className="side-menu" aria-label="Event services">
            <span className="side-menu__accent" aria-hidden="true" />
            <div
              className="service-selector"
              role="group"
              aria-label="Choose an event service"
            >
              {services.map(([label, service]) => (
                <button
                  key={service}
                  type="button"
                  aria-pressed={selection.service === service}
                  onClick={() => {
                    setSlideIndex(0);
                    setSelection({ service });
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
            {hasRotatingCollections && !reducedMotion && (
              <button
                className="background-toggle"
                type="button"
                onClick={() => setPaused((value) => !value)}
                aria-pressed={paused}
                disabled={!canRotate}
              >
                {paused ? "Resume backgrounds" : "Pause backgrounds"}
              </button>
            )}
            <p className="carousel-progress" aria-hidden="true">
              <span>{String(slideIndex + 1).padStart(2, "0")}</span>
              <i aria-hidden="true" />
              <span>{String(backgrounds.length).padStart(2, "0")}</span>
            </p>
          </aside>
          <div className="hero__content">
            <p className="eyebrow">{activeContent.eyebrow}</p>
            <h1>
              Beautiful
              <br />
              Moments,
              <br />
              <em>Seamlessly</em>
              <br />
              Planned
            </h1>
            <p className="hero__copy">
              Memories Made Events Organizing Services. Personal planning and
              styling for weddings, debuts, and the moments in between.
            </p>
            <div className="hero__actions">
              <PrimaryButton to="/booking">Start Your Inquiry</PrimaryButton>
              <Link className="text-link" to="/packages">
                Explore Packages
                <ArrowIcon />
              </Link>
            </div>
          </div>
          <div className="category-label">
            <span>Thoughtfully planned</span>
            <strong>{activeContent.category}</strong>
          </div>
          <Link className="availability-card" to="/availability">
            <CalendarIcon />
            <p>
              <strong>Check Availability</strong>Select a preferred date for the
              team to confirm.
            </p>
          </Link>
          <span className="grid-line grid-line--one" aria-hidden="true" />
          <span className="grid-line grid-line--two" aria-hidden="true" />
          <span className="grid-line grid-line--three" aria-hidden="true" />
        </section>
        <section
          className="home-intro content-section reveal-section"
          data-reveal
        >
          <div>
            <p className="section-kicker">Celebrations with intention</p>
            <h2>For your once-in-a-lifetime moments.</h2>
          </div>
          <p>
            From intimate ceremonies to full-scale celebrations, we bring
            planning, coordination, and styling together around what matters to
            you.
          </p>
          <div className="service-stories">
            {celebrations.slice(0, 2).map((item, index) => (
              <article className="service-story" key={item.id}>
                <div className="service-story__image">
                  <CelebrationImage item={item} />
                </div>
                <div className="service-story__copy">
                  <span className="section-kicker">
                    0{index + 1} / {item.type}
                  </span>
                  <h3>
                    {index === 0
                      ? "Your story, beautifully celebrated."
                      : "A milestone that feels like you."}
                  </h3>
                  <p>
                    {index === 0
                      ? "From intimate ceremonies to full-scale celebrations."
                      : "Elegant milestone celebrations shaped around the celebrant."}
                  </p>
                  <Link
                    className="text-link"
                    to={index === 0 ? "/weddings" : "/debuts"}
                  >
                    Explore {item.type} <ArrowIcon />
                  </Link>
                </div>
              </article>
            ))}
          </div>
          <p className="service-scope">
            Reception &amp; event styling · Prenup styling · Customized
            celebrations
          </p>
          <Link className="text-link" to="/contact">
            Discuss your vision <ArrowIcon />
          </Link>
        </section>
        <section
          className="home-featured content-section reveal-section"
          data-reveal
        >
          <div className="section-topline">
            <div>
              <p className="section-kicker">Featured celebrations / Preview</p>
              <h2>A feeling, in every detail.</h2>
            </div>
            <Link className="text-link" to="/gallery">
              View Full Gallery <ArrowIcon />
            </Link>
          </div>
          <div className="featured-grid">
            {[celebrations[0], celebrations[2]].map((item) => (
              <figure key={item.id}>
                <div>
                  <CelebrationImage
                    item={item}
                    images={[celebrations[0], celebrations[2]]}
                  />
                </div>
                <figcaption>
                  <span>{item.type}</span>
                  {item.label}
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="form-note">{portfolioNote}</p>
        </section>
        <section
          className="home-experience content-section editorial-note reveal-section"
          data-reveal
        >
          <p className="section-kicker">The Memories Made experience</p>
          <h2>Present for the moments that matter.</h2>
          <div>
            <p>
              A considered plan makes room for the personal details: the flowers
              you love, the people closest to you, and a celebration that feels
              your own.
            </p>
            <Link className="text-link" to="/process">
              Discover our approach <ArrowIcon />
            </Link>
          </div>
        </section>
        <section
          className="home-preview content-section reveal-section"
          data-reveal
        >
          <div>
            <p className="section-kicker">A thoughtful journey</p>
            <h2>Clear planning, beautifully paced.</h2>
            <p>
              Inquiry, consultation, proposal, planning, and celebration—guided
              one considered step at a time.
            </p>
            <Link className="text-link" to="/process">
              Our Process <ArrowIcon />
            </Link>
          </div>
          <div>
            <p className="section-kicker">Featured packages</p>
            <h2>Support that meets your celebration.</h2>
            <p>
              Explore our Essential, Signature, and Bespoke planning starting
              points, with a custom quotation based on your requirements.
            </p>
            <Link className="text-link" to="/packages">
              Explore Packages <ArrowIcon />
            </Link>
          </div>
        </section>
        <section
          className="home-feedback content-section editorial-note reveal-section"
          data-reveal
        >
          {/* Placeholder: publish only approved, authentic client feedback. */}
          <p className="section-kicker">Client feedback / Coming soon</p>
          <h2>The stories after the celebration.</h2>
          <p>
            We are preparing this space for verified client feedback. Approved
            stories will be shared here soon.
          </p>
        </section>
        <section
          className="home-booking content-section reveal-section"
          data-reveal
        >
          <p className="section-kicker">Begin your inquiry</p>
          <h2>Let’s plan a celebration that feels entirely yours.</h2>
          <p className="booking-copy">
            Have a date in mind? Choose your preference, then tell us about your
            plans. The team confirms availability before a reservation.
          </p>
          <div className="booking-actions">
            <PrimaryButton to="/booking">Start Your Inquiry</PrimaryButton>
            <Link className="text-link" to="/availability">
              Check Availability <ArrowIcon />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <SiteNavigation />
    </div>
  );
}
