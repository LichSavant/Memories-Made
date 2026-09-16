import PageHero from "../components/PageHero";
import ServiceStories from "../components/ServiceStories";
export default function ServicesPage() {
  return (
    <>
      <PageHero
        label="Our Services"
        title="Every occasion begins with a story."
      >
        Explore the celebration you have in mind, then let’s talk about making
        it yours.
      </PageHero>
      <section className="content-section">
        <ServiceStories />
        <p className="form-note">
          Inspiration preview · Temporary imagery, pending approved MemoriesMade
          photography.
        </p>
      </section>
    </>
  );
}
