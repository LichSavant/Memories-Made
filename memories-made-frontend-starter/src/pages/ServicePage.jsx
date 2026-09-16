import { Link, useParams } from "react-router-dom";
import PageHero from "../components/PageHero";
import PrimaryButton from "../components/PrimaryButton";
import { findService, inquiryPath } from "../data/services";
import { getBackgrounds } from "../data/serviceBackgrounds";
import NotFoundPage from "./NotFoundPage";

export default function ServicePage() {
  const { serviceId } = useParams();
  const service = findService(serviceId);
  if (!service) return <NotFoundPage />;
  const photo = getBackgrounds(service.id)[0];
  return (
    <>
      <PageHero
        label={service.name === "More" ? "Custom Events" : service.name}
        title={service.eyebrow}
      >
        {service.description}
      </PageHero>
      <section className="content-section service-overview">
        <figure className="service-detail-photo">
          <div className="editorial-image">
            <img
              src={photo.src}
              style={{ objectPosition: photo.position }}
              alt="Celebration styling inspiration"
            />
          </div>
          <figcaption className="form-note">
            Temporary inspiration image · Your event’s direction will be shaped
            around your brief.
          </figcaption>
        </figure>
        <div className="split-section">
          <h2>Begin with what you imagine.</h2>
          <div>
            <p>
              Share your ideas, priorities, and the kind of gathering you have
              in mind. We’ll discuss the scope and possibilities together;
              details are confirmed in your proposal.
            </p>
            <Link className="text-link" to="/gallery">
              Explore the gallery →
            </Link>
          </div>
        </div>
      </section>
      <section className="cta-section">
        <h2>Let’s start a conversation.</h2>
        <div className="cta-links">
          <PrimaryButton to={inquiryPath(service)}>
            Start an Inquiry
          </PrimaryButton>
          <Link className="text-link" to={`/packages?event=${service.id}`}>
            Explore planning options
          </Link>
          <Link className="text-link" to="/services">
            All services
          </Link>
        </div>
      </section>
    </>
  );
}
