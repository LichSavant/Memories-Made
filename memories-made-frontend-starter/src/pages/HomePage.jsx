import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import heroBackground from "../assets/hero-background.jpg";
import Brand from "../components/Brand";
import PrimaryButton from "../components/PrimaryButton";
import Footer from "../components/Footer";

const sideNavigation = [
  ["Weddings", "/weddings"],
  ["Debuts", "/debuts"],
  ["Packages", "/packages"],
  ["Booking", "/booking"],
  ["Gallery", "/gallery"],
];
const bottomNavigation = [
  ["Packages", "/packages"],
  ["Process", "/process"],
  ["Gallery", "/gallery"],
  ["Availability", "/availability"],
  ["Contact", "/contact"],
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

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="site-shell">
      <main>
        <section className="hero">
          <div className="hero__background" aria-hidden="true">
            <div
              className="hero__photo"
              style={{ backgroundImage: `url(${heroBackground})` }}
            />
            <div className="hero__overlay" />
            <div className="hero__grain" />
          </div>
          <header className="topbar">
            <Link className="season" to="/">
              2026 <span>/</span> Booking Season
            </Link>
            <button
              className="menu-toggle"
              type="button"
              aria-label="Toggle navigation"
              aria-expanded={menuOpen}
              aria-controls="home-navigation"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span />
              <span />
            </button>
            <Brand />
          </header>
          <aside
            id="home-navigation"
            className={`side-menu${menuOpen ? " side-menu--open" : ""}`}
          >
            <span className="side-menu__accent" aria-hidden="true" />
            <nav aria-label="Primary navigation">
              {sideNavigation.map(([label, to]) => (
                <NavLink key={to} to={to} onClick={() => setMenuOpen(false)}>
                  {label}
                </NavLink>
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
              <br className="desktop-break" /> from inquiry to celebration.
            </p>
            <div className="hero__actions">
              <PrimaryButton to="/booking">Book Your Date</PrimaryButton>
              <Link className="text-link" to="/packages">
                Explore Packages
                <ArrowIcon />
              </Link>
            </div>
          </div>
          <div className="category-label">
            <span>Premium Event Booking</span>
            <strong>Wedding / Debut</strong>
          </div>
          <Link className="availability-card" to="/availability">
            <CalendarIcon />
            <p>Select a preferred date and include it in your event inquiry.</p>
          </Link>
          <nav className="bottom-nav" aria-label="More pages">
            {bottomNavigation.map(([label, to]) => (
              <Link key={to} to={to}>
                {label}
              </Link>
            ))}
          </nav>
          <span className="grid-line grid-line--one" aria-hidden="true" />
          <span className="grid-line grid-line--two" aria-hidden="true" />
          <span className="grid-line grid-line--three" aria-hidden="true" />
        </section>
        <section className="home-intro content-section">
          <div>
            <p className="section-kicker">Celebrations with intention</p>
            <h2>Wedding and debut experiences shaped around you.</h2>
          </div>
          <p>
            From the first conversation to the final celebration, each detail is
            considered with care, clarity, and a distinctly personal point of
            view.
          </p>
          <div className="home-links">
            <Link to="/weddings">Explore Weddings</Link>
            <Link to="/debuts">Explore Debuts</Link>
          </div>
        </section>
        <section className="home-preview content-section">
          <div>
            <p className="section-kicker">A thoughtful journey</p>
            <h2>Clear planning, beautifully paced.</h2>
            <p>
              Inquiry, consultation, proposal, planning, and celebration—guided
              one considered step at a time.
            </p>
            <Link className="text-link" to="/process">
              View Our Process <ArrowIcon />
            </Link>
          </div>
          <div>
            <p className="section-kicker">Featured packages</p>
            <h2>Support that meets your celebration.</h2>
            <p>
              Choose an Essential, Signature, or Bespoke starting point, with a
              custom quotation based on your requirements.
            </p>
            <Link className="text-link" to="/packages">
              Explore Packages <ArrowIcon />
            </Link>
          </div>
        </section>
        <section className="home-booking content-section">
          <p className="section-kicker">Begin your inquiry</p>
          <h2>Let’s plan a celebration that feels entirely yours.</h2>
          <PrimaryButton to="/booking">Book Your Date</PrimaryButton>
        </section>
      </main>
      <Footer />
    </div>
  );
}
