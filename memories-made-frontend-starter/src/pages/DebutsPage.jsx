import { Link } from "react-router-dom";
import CelebrationImage from "../components/CelebrationImage";
import { celebrations } from "../data/celebrations";
import PageHero from "../components/PageHero";
import SectionHeading from "../components/SectionHeading";
import PrimaryButton from "../components/PrimaryButton";
const services = [
  [
    "Concept and Theme Development",
    "A considered direction that reflects your personality and preferences.",
  ],
  [
    "Program and Event Coordination",
    "A clear celebration flow shaped around the moments you choose.",
  ],
  [
    "Styling and Celebration Management",
    "Cohesive styling with careful support throughout the event.",
  ],
];
export default function DebutsPage() {
  return (
    <>
      <PageHero
        label="Debut Celebrations"
        title="A milestone designed to feel entirely your own."
      >
        We bring structure and creative direction to a celebration that reflects
        the person at its heart.
      </PageHero>
      <section
        className="content-section service-overview reveal-section"
        data-reveal
      >
        <figure className="service-detail-photo">
          <CelebrationImage item={celebrations[1]} />
          <figcaption className="form-note">
            Inspiration preview · Approved event photography coming soon.
          </figcaption>
        </figure>
        <SectionHeading label="Celebration support">
          A personal approach to every detail.
        </SectionHeading>
        <div className="card-grid">
          {services.map(([h, p], i) => (
            <article className="service-card" key={h}>
              <span>0{i + 1}</span>
              <h3>{h}</h3>
              <p>{p}</p>
            </article>
          ))}
        </div>
      </section>
      <section
        className="content-section editorial-note reveal-section"
        data-reveal
      >
        <p className="section-kicker">Made personal</p>
        <h2>Your traditions, your way.</h2>
        <p>
          Debut details and program traditions can be customized around your
          preferences. We help create a celebration flow that feels meaningful
          without assuming a fixed format.
        </p>
      </section>
      <section className="cta-section">
        <h2>Tell us about your celebration.</h2>
        <div className="cta-links">
          <PrimaryButton to="/booking?eventType=Debut">
            Start Your Inquiry
          </PrimaryButton>
          <Link className="text-link" to="/packages">
            Explore Packages
          </Link>
        </div>
      </section>
    </>
  );
}
