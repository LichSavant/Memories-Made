import { Link } from "react-router-dom";
import CelebrationImage from "../components/CelebrationImage";
import { celebrations } from "../data/celebrations";
import PageHero from "../components/PageHero";
import SectionHeading from "../components/SectionHeading";
import PrimaryButton from "../components/PrimaryButton";
const services = [
  [
    "Full Wedding Planning",
    "Thoughtful guidance across the complete planning journey.",
  ],
  [
    "Event Styling and Coordination",
    "A cohesive visual direction paired with considered coordination.",
  ],
  [
    "On-the-Day Coordination",
    "Focused support that keeps the celebration moving with ease.",
  ],
];
export default function WeddingsPage() {
  return (
    <>
      <PageHero
        label="Wedding Experiences"
        title="A celebration thoughtfully planned around your story."
      >
        We shape a clear, considered planning experience around your priorities,
        style, and vision for the day.
      </PageHero>
      <section
        className="content-section service-overview reveal-section"
        data-reveal
      >
        <figure className="service-detail-photo">
          <CelebrationImage item={celebrations[0]} />
          <figcaption className="form-note">
            Inspiration preview · Approved event photography coming soon.
          </figcaption>
        </figure>
        <SectionHeading label="Planning support">
          Choose the level of guidance your celebration needs.
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
        className="content-section split-section reveal-section"
        data-reveal
      >
        <SectionHeading label="The journey">
          From first conversation to celebration.
        </SectionHeading>
        <ol className="mini-process">
          <li>
            <b>01</b>
            <span>
              <strong>Consultation</strong>We begin with your story, priorities,
              and plans.
            </span>
          </li>
          <li>
            <b>02</b>
            <span>
              <strong>Planning</strong>Details are shaped into one thoughtful
              direction.
            </span>
          </li>
          <li>
            <b>03</b>
            <span>
              <strong>Celebration</strong>Your plans come together with calm
              support.
            </span>
          </li>
        </ol>
      </section>
      <section className="cta-section">
        <h2>Begin planning your wedding.</h2>
        <div className="cta-links">
          <PrimaryButton to="/booking?eventType=Wedding">
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
