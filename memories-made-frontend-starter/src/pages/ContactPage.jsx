import { useState } from "react";
import PageHero from "../components/PageHero";
export default function ContactPage() {
  const [data, setData] = useState({
      name: "",
      email: "",
      phone: "",
      type: "",
      message: "",
    }),
    [errors, setErrors] = useState({}),
    [done, setDone] = useState(false);
  const change = (e) => setData({ ...data, [e.target.name]: e.target.value });
  const submit = (e) => {
    e.preventDefault();
    const x = {};
    if (!data.name.trim()) x.name = "Enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(data.email))
      x.email = "Enter a valid email address.";
    if (!data.message.trim()) x.message = "Enter a message.";
    setErrors(x);
    if (!Object.keys(x).length) setDone(true);
  };
  return (
    <>
      <PageHero label="Contact" title="Tell us what you are planning.">
        Share a few details about your celebration and the support you are
        looking for. Online sending is not available yet; you can prepare a
        message here.
      </PageHero>
      <section className="content-section contact-wrap">
        {done ? (
          <div className="success-panel" role="status">
            <p className="section-kicker">Message Prepared</p>
            <h2>Thank you, {data.name}.</h2>
            <p>
              Your message has been prepared on this page. Nothing has been
              sent.
            </p>
            <p className="prepared-message">{data.message}</p>
            <button
              type="button"
              className="secondary-button"
              onClick={() => setDone(false)}
            >
              Edit Message
            </button>
          </div>
        ) : (
          <form className="contact-form" onSubmit={submit} noValidate>
            <div className="field-grid">
              <Field
                label="Name"
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
              />
              <label>
                Event type
                <select name="type" value={data.type} onChange={change}>
                  <option value="">Select one</option>
                  <option>Wedding</option>
                  <option>Debut</option>
                  <option>Other celebration</option>
                </select>
              </label>
              <label className="full-field">
                Message
                <textarea
                  name="message"
                  value={data.message}
                  onChange={change}
                  aria-invalid={!!errors.message}
                  aria-describedby={
                    errors.message ? "message-error" : undefined
                  }
                />
                {errors.message && (
                  <span id="message-error" className="field-error" role="alert">
                    {errors.message}
                  </span>
                )}
              </label>
            </div>
            <button className="primary-button" type="submit">
              Prepare Message
            </button>
          </form>
        )}
      </section>
    </>
  );
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
      {error && (
        <span id={`${name}-error`} className="field-error" role="alert">
          {error}
        </span>
      )}
    </label>
  );
}
