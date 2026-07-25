import PrimaryButton from "../components/PrimaryButton";
export default function NotFoundPage() {
  return (
    <section className="not-found">
      <p className="section-kicker">404</p>
      <h1>Page Not Found</h1>
      <p>The page you were looking for may have moved or no longer exists.</p>
      <PrimaryButton to="/">Return Home</PrimaryButton>
    </section>
  );
}
