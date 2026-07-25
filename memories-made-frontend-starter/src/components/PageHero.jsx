export default function PageHero({ label, title, children }) {
  return (
    <section className="page-hero">
      <p className="section-kicker">{label}</p>
      <h1>{title}</h1>
      {children && <p className="page-hero__copy">{children}</p>}
    </section>
  );
}
