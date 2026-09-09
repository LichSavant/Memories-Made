import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import PrimaryButton from "../components/PrimaryButton";
import { packages } from "../data/packages";

export default function PackagesPage() {
  return (
    <>
      <PageHero
        label="Planning Packages"
        title="A considered starting point for every celebration."
      >
        Planning support for weddings and debuts, with room to make it personal.
        These starting points guide your inquiry; final inclusions and pricing
        are confirmed in your proposal.
      </PageHero>
      <section
        className="content-section package-group reveal-section"
        data-reveal
      >
        <p className="section-kicker">Weddings &amp; debuts</p>
        <h2>Find your level of support.</h2>
        <div className="card-grid">
          {packages.map((item, index) => (
            <article className="package-card" key={item.name}>
              <span>0{index + 1} / Planning support</span>
              <h3>{item.name}</h3>
              <p>{item.audience}</p>
              <p className="quote-label">Custom quotation</p>
              <ul aria-label={`${item.name} starting inclusions`}>
                {item.inclusions.map((value) => (
                  <li key={value}>{value}</li>
                ))}
              </ul>
              <p className="form-note">
                Customizable to your event. Scope confirmed with your proposal.
              </p>
              <Link className="text-link" to={`/booking?package=${item.name}`}>
                Inquire about {item.name} <span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </div>
      </section>
      <section
        className="content-section editorial-note reveal-section"
        data-reveal
      >
        <p className="section-kicker">Made to fit</p>
        <h2>Something a little different?</h2>
        <p>
          Share your plans for reception styling, a prenup setting, or a
          customized event. We can discuss the details and shape the support
          around your brief.
        </p>
      </section>
      <section className="cta-section">
        <h2>Let’s shape your celebration.</h2>
        <div className="cta-links">
          <PrimaryButton to="/booking">Start Your Inquiry</PrimaryButton>
          <Link className="text-link" to="/availability">
            Check Availability
          </Link>
        </div>
      </section>
    </>
  );
}
