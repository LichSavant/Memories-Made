import { Link } from "react-router-dom";
import { services } from "../data/services";
import { getBackgrounds } from "../data/serviceBackgrounds";

export default function ServiceStories({ items = services }) {
  return (
    <div className="service-stories">
      {items.map((service, index) => {
        const photo = getBackgrounds(service.id)[0];
        return (
          <article className="service-story" key={service.id}>
            <Link
              className="service-story__image editorial-image"
              to={service.path}
              aria-label={`Explore ${service.name}`}
            >
              <img
                src={photo.src}
                style={{ objectPosition: photo.position }}
                alt={`${service.name} inspiration — temporary imagery`}
                loading="lazy"
              />
            </Link>
            <div className="service-story__copy">
              <span className="section-kicker">
                0{index + 1} / {service.eyebrow}
              </span>
              <h3>
                {service.name === "More"
                  ? "More ways to celebrate."
                  : service.name}
              </h3>
              <p>{service.description}</p>
              <Link className="text-link" to={service.path}>
                {service.id === "more"
                  ? "Explore a custom event"
                  : `Explore ${service.name}`}{" "}
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </article>
        );
      })}
    </div>
  );
}
