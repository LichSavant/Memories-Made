export default function SectionHeading({ label, children }) {
  return (
    <header className="section-heading">
      {label && <p className="section-kicker">{label}</p>}
      <h2>{children}</h2>
    </header>
  );
}
