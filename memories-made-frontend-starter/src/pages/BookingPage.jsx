import { useState } from "react";
import PageHero from "../components/PageHero";
const initial = {
  eventType: "",
  date: "",
  alternativeDate: "",
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
  const [step, setStep] = useState(0),
    [data, setData] = useState(initial),
    [errors, setErrors] = useState({}),
    [submitted, setSubmitted] = useState(false);
  const change = (e) => setData({ ...data, [e.target.name]: e.target.value });
  const validate = () => {
    const next = {};
    if (step === 0 && !data.eventType) next.eventType = "Choose an event type.";
    if (step === 1 && !data.date) next.date = "Choose a preferred date.";
    if (step === 2 && !data.package)
      next.package = "Choose a preferred package.";
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
  if (submitted)
    return (
      <>
        <PageHero
          label="Inquiry Prepared"
          title="Thank you for sharing your celebration plans."
        >
          Your inquiry has been prepared. Final date confirmation will be
          provided by Memories Made after review.
        </PageHero>
        <section className="content-section editorial-note">
          <p>
            This is a frontend inquiry flow. Connect it to the business backend
            before production submission.
          </p>
        </section>
      </>
    );
  return (
    <>
      <PageHero
        label="Booking Inquiry"
        title="Begin with the details that matter most."
      >
        This frontend form prepares an inquiry only. A preferred date is not
        officially reserved until the Memories Made team confirms it.
      </PageHero>
      <section className="content-section form-section">
        <ol className="progress-steps" aria-label="Booking progress">
          {steps.map((s, i) => (
            <li
              className={
                i === step ? "is-current" : i < step ? "is-complete" : ""
              }
              key={s}
            >
              <span>{i + 1}</span>
              {s}
            </li>
          ))}
        </ol>
        <form
          className="booking-form"
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
          noValidate
        >
          {step === 0 && (
            <fieldset>
              <legend>What are you planning?</legend>
              <div className="choice-grid">
                {["Wedding", "Debut"].map((v) => (
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
                ))}
              </div>
              <ErrorText id="eventType-error" text={errors.eventType} />
            </fieldset>
          )}
          {step === 1 && (
            <fieldset>
              <legend>Which dates do you prefer?</legend>
              <div className="field-grid">
                <Field
                  label="Preferred event date"
                  name="date"
                  type="date"
                  value={data.date}
                  onChange={change}
                  error={errors.date}
                />
                <Field
                  label="Alternative date"
                  name="alternativeDate"
                  type="date"
                  value={data.alternativeDate}
                  onChange={change}
                />
              </div>
            </fieldset>
          )}
          {step === 2 && (
            <fieldset>
              <legend>Tell us about the event.</legend>
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
                    <option>Essential</option>
                    <option>Signature</option>
                    <option>Bespoke</option>
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
              <legend>How may we contact you?</legend>
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
              <legend>Review your inquiry.</legend>
              <dl className="review-list">
                {Object.entries({
                  "Event type": data.eventType,
                  "Preferred date": data.date,
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
                Submitting prepares this inquiry in the frontend; it does not
                send data or reserve a date.
              </p>
            </fieldset>
          )}
          <div className="form-actions">
            {step > 0 && (
              <button
                className="secondary-button"
                type="button"
                onClick={() => setStep((s) => s - 1)}
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
