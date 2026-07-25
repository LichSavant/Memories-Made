import React, { useState } from "react";
import heroBackground from "./assets/hero-background.jpg";

const sideNavigation = [
  { label: "Weddings", href: "#weddings" },
  { label: "Debuts", href: "#debuts" },
  { label: "Packages", href: "#packages" },
  { label: "Booking", href: "#booking" },
  { label: "Gallery", href: "#gallery" },
];

const footerNavigation = [
  { label: "Packages", href: "#packages" },
  { label: "Process", href: "#process" },
  { label: "Gallery", href: "#gallery" },
  { label: "Availability", href: "#availability" },
  { label: "Contact", href: "#contact" },
];

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

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main className="site-shell">
      <section className="hero" id="home">
        <div className="hero__background" aria-hidden="true">
          <div
            className="hero__photo"
            style={{ backgroundImage: `url(${heroBackground})` }}
          />
          <div className="hero__overlay" />
          <div className="hero__grain" />
        </div>

        <header className="topbar">
          <a className="season" href="#home" aria-label="Return to homepage">
            2026 <span>/</span> Booking Season
          </a>

          <button
            className="menu-toggle"
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((value) => !value)}
          >
            <span />
            <span />
          </button>

          <a className="brand" href="#home" aria-label="Memories Made home">
            <span className="brand__ornament" aria-hidden="true">
              <i />
              <b>✦</b>
              <i />
            </span>
            <strong>MEMORIES MADE</strong>
            <small>WEDDINGS &amp; EVENTS</small>
          </a>
        </header>

        <aside className={`side-menu ${menuOpen ? "side-menu--open" : ""}`}>
          <span className="side-menu__accent" aria-hidden="true" />
          <nav aria-label="Primary navigation">
            {sideNavigation.map((item, index) => (
              <a
                key={item.label}
                className={index === 0 ? "is-active" : ""}
                href={item.href}
                onClick={closeMenu}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </aside>

        <div className="hero__content">
          <p className="eyebrow">Wedding &amp; Debut Planning</p>

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
            A booking and planning experience for weddings and debuts—
            <br className="desktop-break" />
            from inquiry to celebration.
          </p>

          <div className="hero__actions">
            <a className="primary-button" href="#booking">
              Book Your Date
            </a>

            <a className="text-link" href="#packages">
              Explore Packages
              <ArrowIcon />
            </a>
          </div>
        </div>

        <div className="category-label" aria-label="Service category">
          <span>Premium Event Booking</span>
          <strong>Wedding / Debut</strong>
        </div>

        <article className="availability-card" id="availability">
          <CalendarIcon />
          <p>
            Check date availability, reserve your event, and track planning
            progress in one place.
          </p>
        </article>

        <nav className="bottom-nav" aria-label="Page sections">
          {footerNavigation.map((item) => (
            <a key={item.label} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <span className="grid-line grid-line--one" aria-hidden="true" />
        <span className="grid-line grid-line--two" aria-hidden="true" />
        <span className="grid-line grid-line--three" aria-hidden="true" />
      </section>

      <section className="intro-section" id="weddings">
        <div>
          <p className="section-kicker">Memories made with intention</p>
          <h2>Every celebration begins with a thoughtful plan.</h2>
        </div>
        <p>
          This first frontend build establishes the premium visual language for
          the client-facing website. The next screens can extend the same system
          into package browsing, date selection, booking forms, client tracking,
          and the administrative dashboard.
        </p>
      </section>

      <section className="service-grid" aria-label="Core services">
        <article id="debuts">
          <span>01</span>
          <h3>Weddings</h3>
          <p>Elegant planning experiences from consultation to wedding day.</p>
        </article>
        <article id="packages">
          <span>02</span>
          <h3>Debuts</h3>
          <p>Personalized packages for milestone celebrations and programs.</p>
        </article>
        <article id="process">
          <span>03</span>
          <h3>Booking Journey</h3>
          <p>Availability, reservation, requirements, payments, and progress.</p>
        </article>
      </section>

      <section className="placeholder-section" id="booking">
        <p className="section-kicker">Next screen</p>
        <h2>Booking and date availability flow</h2>
        <p>
          This area is intentionally prepared for the next development phase:
          an interactive calendar, event details form, package selection, and
          reservation summary.
        </p>
      </section>

      <section className="placeholder-section placeholder-section--dark" id="gallery">
        <p className="section-kicker">Portfolio</p>
        <h2>Wedding and debut gallery</h2>
        <p>
          A visual gallery can be added here using actual Memories Made event
          photography and category filters.
        </p>
      </section>

      <footer id="contact">
        <a className="brand brand--footer" href="#home">
          <strong>MEMORIES MADE</strong>
          <small>WEDDINGS &amp; EVENTS</small>
        </a>
        <p>Premium booking and event planning experience.</p>
      </footer>
    </main>
  );
}

export default App;
