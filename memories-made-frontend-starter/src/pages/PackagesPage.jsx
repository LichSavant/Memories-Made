import PageHero from "../components/PageHero";
import PrimaryButton from "../components/PrimaryButton";
const names = ["Essential", "Signature", "Bespoke"];
const inclusions = [
  "Planning consultation",
  "Coordination",
  "Styling direction",
  "Event-day support",
];
function PackageGroup({ title }) {
  return (
    <section className="content-section package-group">
      <h2>{title}</h2>
      <div className="card-grid">
        {names.map((name, i) => (
          <article className="package-card" key={name}>
            <span>0{i + 1}</span>
            <h3>{name}</h3>
            <p className="quote-label">
              Custom quotation based on event requirements
            </p>
            <ul>
              {inclusions.slice(0, i + 2).map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
export default function PackagesPage() {
  return (
    <>
      <PageHero
        label="Planning Packages"
        title="A considered starting point for every celebration."
      >
        Explore flexible levels of planning support for weddings and debuts.
        Every proposal is tailored to the event.
      </PageHero>
      <PackageGroup title="Wedding Packages" />
      <PackageGroup title="Debut Packages" />
      <section className="cta-section">
        <h2>Receive a proposal shaped around your event.</h2>
        <PrimaryButton to="/booking">Request a Custom Proposal</PrimaryButton>
      </section>
    </>
  );
}
