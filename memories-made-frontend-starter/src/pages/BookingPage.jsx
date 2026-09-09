import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { packages } from "../data/packages";
import { isFutureOrToday, localDateValue } from "../data/eventDate";
import PageHero from "../components/PageHero";
const initial = {
  eventType: "",
  date: "",
  alternativeDate: "",
  period: "",
  venue: "",
  guests: "",
  package: "",
  name: "",
  email: "",
  phone: "",
  notes: "",
};
const steps = [
  "Event Type",
  "Preferred Date",
  "Event Details",
  "Contact Information",
  "Review",
];
export default function BookingPage() {
  const [params] = useSearchParams();
  const formRef = useRef(null);
  const [step, setStep] = useState(0),
    [data, setData] = useState(() => ({
      ...initial,
      date: isFutureOrToday(params.get("date")) ? params.get("date") : "",
      period: ["Morning", "Afternoon", "Evening"].includes(params.get("period"))
        ? params.get("period")
        : "",
      package: packages.some((item) => item.name === params.get("package"))
        ? params.get("package")
        : "",
      eventType: ["Wedding", "Debut"].includes(params.get("eventType"))
        ? params.get("eventType")
        : "",
    })),
    [errors, setErrors] = useState({}),
    [submitted, setSubmitted] = useState(false);
  useEffect(() => {
    formRef.current?.querySelector("legend")?.focus();
  }, [step]);
  const change = (e) => setData({ ...data, [e.target.name]: e.target.value });
  const validate = () => {
    const next = {};
    if (step === 0 && !data.eventType) next.eventType = "Choose an event type.";
    if (step === 1) {
      if (!isFutureOrToday(data.date))
        next.date = "Choose today or a future date.";
      if (data.alternativeDate && !isFutureOrToday(data.alternativeDate))
        next.alternativeDate = "Choose today or a future date.";
    }
    if (step === 2) {
      if (!data.package)
        next.package = "Choose a package or let us help you decide.";
      if (
        data.guests &&
        (!Number.isInteger(Number(data.guests)) || Number(data.guests) < 1)
      )
        next.guests = "Enter a whole number of guests, at least 1.";
    }
    if (step === 3) {
      if (!data.name.trim()) next.name = "Enter your full name.";
      if (!/^\S+@\S+\.\S+$/.test(data.email))
        next.email = "Enter a valid email address.";
      if (!data.phone.trim()) next.phone = "Enter a contact number.";
    }
    setErrors(next);
    return !Object.keys(next).length;
  };
  const next = () => validate() && setStep((s) => s + 1);
  return (
    <>
      <PageHero
        label="Booking Inquiry"
        title="Begin with the details that matter most."
      >
        Prepare your event details in a few simple steps. Online sending is not
        available yet; this creates a draft only. Your date is reserved only
        after the team confirms it.
      </PageHero>
      <section className="content-section form-section">
        <ol className="progress-steps" aria-label="Booking progress">
          {steps.map((s, i) => (
            <li
              className={
                i === step ? "is-current" : i < step ? "is-complete" : ""
              }
              aria-current={i === step ? "step" : undefined}
              key={s}
            >
              <span>{i + 1}</span>
              <span className="progress-label">{s}</span>
            </li>
          ))}
        </ol>
        <form
          className="booking-form"
          ref={formRef}
          onSubmit={(e) => {
            e.preventDefault();
            if (step < 4) next();
            else if (validate()) setSubmitted(true);
          }}
          noValidate
        >
          {step === 0 && (
            <fieldset>
              <legend tabIndex={-1}>What are you planning?</legend>
              <div className="choice-grid">
                {["Wedding", "Debut", "Styling / Other celebration"].map(
                  (v) => (
                    <label className="choice-card" key={v}>
                      <input
                        type="radio"
                        name="eventType"
                        value={v}
                        checked={data.eventType === v}
                        onChange={change}
                        aria-describedby={
                          errors.eventType ? "eventType-error" : undefined
                        }
                      />
                      <span>{v}</span>
                    </label>
                  ),
                )}
              </div>
              <ErrorText id="eventType-error" text={errors.eventType} />
            </fieldset>
          )}
          {step === 1 && (
            <fieldset>
              <legend tabIndex={-1}>Which dates do you prefer?</legend>
              <div className="field-grid">
                <Field
                  label="Preferred event date"
                  name="date"
                  type="date"
                  min={localDateValue()}
                  value={data.date}
                  onChange={change}
                  error={errors.date}
                />
                <Field
                  label="Alternative date"
                  name="alternativeDate"
                  type="date"
                  min={localDateValue()}
                  error={errors.alternativeDate}
                  value={data.alternativeDate}
                  onChange={change}
                />
                <label>
                  Preferred time of day
                  <select name="period" value={data.period} onChange={change}>
                    <option value="">No preference</option>
                    <option>Morning</option>
                    <option>Afternoon</option>
                    <option>Evening</option>
                  </select>
                </label>
              </div>
            </fieldset>
          )}
          {step === 2 && (
            <fieldset>
              <legend tabIndex={-1}>Tell us about the event.</legend>
              <div className="field-grid">
                <Field
                  label="Venue, if selected"
                  name="venue"
                  value={data.venue}
                  onChange={change}
                />
                <Field
                  label="Estimated guest count"
                  name="guests"
                  type="number"
                  min="1"
                  error={errors.guests}
                  value={data.guests}
                  onChange={change}
                />
                <label>
                  Preferred package
                  <select
                    name="package"
                    value={data.package}
                    onChange={change}
                    aria-invalid={!!errors.package}
                    aria-describedby={
                      errors.package ? "package-error" : undefined
                    }
                  >
                    <option value="">Select one</option>
                    {packages.map((item) => (
                      <option key={item.name}>{item.name}</option>
                    ))}
                    <option>Help me decide</option>
                  </select>
                  <ErrorText id="package-error" text={errors.package} />
                </label>
                <label className="full-field">
                  Additional notes
                  <textarea name="notes" value={data.notes} onChange={change} />
                </label>
              </div>
            </fieldset>
          )}
          {step === 3 && (
            <fieldset>
              <legend tabIndex={-1}>How may we contact you?</legend>
              <div className="field-grid">
                <Field
                  label="Client full name"
                  name="name"
                  value={data.name}
                  onChange={change}
                  error={errors.name}
                />
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  value={data.email}
                  onChange={change}
                  error={errors.email}
                />
                <Field
                  label="Contact number"
                  name="phone"
                  type="tel"
                  value={data.phone}
                  onChange={change}
                  error={errors.phone}
                />
              </div>
            </fieldset>
          )}
          {step === 4 && (
            <fieldset>
              <legend tabIndex={-1}>Review your inquiry.</legend>
              <dl className="review-list">
                {Object.entries({
                  "Event type": data.eventType,
                  "Preferred date": data.date,
                  "Time of day": data.period || "No preference",
                  "Alternative date": data.alternativeDate || "Not provided",
                  Venue: data.venue || "Not provided",
                  "Guest count": data.guests || "Not provided",
                  Package: data.package,
                  Name: data.name,
                  Email: data.email,
                  "Contact number": data.phone,
                  Notes: data.notes || "Not provided",
                }).map(([k, v]) => (
                  <div key={k}>
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="form-note">
                Preparing this draft does not send your details or reserve a
                date. Keep this page open to retain your draft.
              </p>
            </fieldset>
          )}
          {submitted && (
            <p className="draft-status" role="status">
              Your draft is ready. Nothing has been sent and your date is not
              reserved. You can go back to edit your details.
            </p>
          )}
          <div className="form-actions">
            {step > 0 && (
              <button
                className="secondary-button"
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setStep((s) => s - 1);
                }}
              >
                Back
              </button>
            )}
            {step < 4 ? (
              <button className="primary-button" type="button" onClick={next}>
                Next
              </button>
            ) : (
              <button className="primary-button" type="submit">
                Prepare Inquiry
              </button>
            )}
          </div>
        </form>
      </section>
    </>
  );
}
function ErrorText({ id, text }) {
  return text ? (
    <span className="field-error" id={id} role="alert">
      {text}
    </span>
  ) : null;
}
function Field({ label, name, error, ...props }) {
  return (
    <label>
      {label}
      <input
        name={name}
        {...props}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
      />
      <ErrorText id={`${name}-error`} text={error} />
    </label>
  );
}
