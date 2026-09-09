import { Link } from "react-router-dom";
import PrimaryButton from "../components/PrimaryButton";
import PageHero from "../components/PageHero";
const steps = [
  [
    "Initial Inquiry",
    "Share the essential details and the kind of celebration you are planning.",
  ],
  [
    "Consultation",
    "We discuss your priorities, preferences, and the support you need.",
  ],
  [
    "Proposal and Reservation",
    "A tailored proposal outlines the scope and next steps. Your preferred date becomes a reservation only after confirmation by the team.",
  ],
  [
    "Planning and Coordination",
    "Together, we shape the details and coordinate the celebration with care.",
  ],
  [
    "Event Celebration",
    "Your plans come together, supported by a clear and considered approach.",
  ],
];
export default function ProcessPage() {
  return (
    <>
      <PageHero
        label="Our Process"
        title="A calm, clear path from inquiry to celebration."
      >
        Each stage is designed to keep the planning experience focused,
        personal, and easy to follow.
      </PageHero>
      <section className="content-section">
        <ol className="timeline">
          {steps.map(([h, p], i) => (
            <li key={h} className="reveal-section" data-reveal>
              <span>0{i + 1}</span>
              <div>
                <h2>{h}</h2>
                <p>{p}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
      <section className="cta-section">
        <h2>Every celebration starts with a conversation.</h2>
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
