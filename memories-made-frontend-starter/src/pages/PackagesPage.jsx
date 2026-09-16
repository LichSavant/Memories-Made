import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import PageHero from "../components/PageHero";
import PrimaryButton from "../components/PrimaryButton";
import { packagesForEvent } from "../data/packages";
import { services, findService, inquiryPath } from "../data/services";
import { getBackgrounds } from "../data/serviceBackgrounds";

export default function PackagesPage() {
  const [params, setParams] = useSearchParams();
  const selected = findService(params.get("event"));
  const [detail, setDetail] = useState("");
  const available = packagesForEvent(selected?.id);
  return (
    <>
      <PageHero
        label="Planning Packages"
        title="First, the occasion. Then, the details."
      >
        Choose your celebration to explore planning options. Final scope,
        inclusions, and pricing are confirmed in your proposal.
      </PageHero>
      <section className="content-section package-experience">
        <div className="section-topline">
          <div>
            <p className="section-kicker">01 / Choose your celebration</p>
            <h2>What are you planning?</h2>
          </div>
          <p className="form-note">
            Choose an event · Explore · Review · Inquire
          </p>
        </div>
        <div
          className="event-selector"
          role="group"
          aria-label="Choose your celebration"
        >
          {services.map((service) => (
            <button
              key={service.id}
              type="button"
              aria-pressed={selected?.id === service.id}
              onClick={() => {
                setParams(
                  { event: service.id },
                  { replace: true, preventScrollReset: true },
                );
                setDetail("");
              }}
            >
              <img
                src={getBackgrounds(service.id)[0].src}
                alt=""
                loading="lazy"
              />
              <span>
                {service.eventType}
                <small>
                  {selected?.id === service.id ? "Selected" : "Explore"}
                </small>
              </span>
            </button>
          ))}
        </div>
        <div className="package-results" aria-live="polite" aria-atomic="false">
          {!selected ? (
            <p className="selection-prompt">
              A celebration as individual as you. Select an occasion above to
              begin.
            </p>
          ) : (
            <div key={selected.id} className="step-reveal">
              <p className="section-kicker">02 / {selected.eventType}</p>
              {available.length ? (
                <>
                  <h2>Find your level of support.</h2>
                  <p className="form-note">
                    Existing planning starting points · Scope confirmed in your
                    proposal.
                  </p>
                  <div className="package-options">
                    {available.map((item, index) => (
                      <article className="package-option" key={item.name}>
                        <span className="section-kicker">0{index + 1}</span>
                        <div>
                          <h3>{item.name}</h3>
                          <p>{item.audience}</p>
                        </div>
                        <button
                          className="secondary-button"
                          type="button"
                          aria-expanded={detail === item.name}
                          aria-controls={`package-${item.name}`}
                          onClick={() =>
                            setDetail(detail === item.name ? "" : item.name)
                          }
                        >
                          {detail === item.name
                            ? "Close details"
                            : "Review details"}
                          <span className="sr-only">: {item.name}</span>
                        </button>
                        <div
                          id={`package-${item.name}`}
                          className="package-detail"
                          hidden={detail !== item.name}
                        >
                          <p className="section-kicker">
                            03 / {item.name} details
                          </p>
                          <ul>
                            {item.inclusions.map((value) => (
                              <li key={value}>{value}</li>
                            ))}
                          </ul>
                          <p>
                            Custom quotation. Final inclusions are agreed in
                            your proposal.
                          </p>
                          <Link
                            className="text-link"
                            to={inquiryPath(selected, item.name)}
                          >
                            Customize / inquire about {item.name} →
                          </Link>
                        </div>
                      </article>
                    ))}
                  </div>
                </>
              ) : (
                <div className="package-empty">
                  <h2>Planning something special?</h2>
                  <p>
                    Tell us what you have in mind and we’ll help shape a
                    celebration around it.
                  </p>
                  <p className="form-note">
                    Package details for this occasion are not published yet.
                    Start with a conversation about your brief.
                  </p>
                  <PrimaryButton to={inquiryPath(selected)}>
                    Start an Inquiry
                  </PrimaryButton>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
      <section className="cta-section">
        <h2>A little guidance, from the very beginning.</h2>
        <div className="cta-links">
          <PrimaryButton to="/availability">Schedule a Meeting</PrimaryButton>
          <Link className="text-link" to="/process">
            Discover our process
          </Link>
        </div>
      </section>
    </>
  );
}
