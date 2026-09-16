import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import { localDateValue } from "../data/eventDate";
import {
  availabilityNotice,
  meetingDateValue,
  getMeetingAvailability,
  meetingSteps,
  meetingSummary,
  prepareMeetingRequest,
  validateMeeting,
} from "../data/meetingAvailability";

const empty = {
  date: "",
  type: "",
  locationChoice: "",
  location: "",
  time: "",
  name: "",
  email: "",
  notes: "",
};
const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export default function AvailabilityPage() {
  const [data, setData] = useState(empty);
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [draft, setDraft] = useState(null);
  const formRef = useRef(null);
  const steps = meetingSteps(data.type);
  const current = steps[step];
  const availability = getMeetingAvailability(data.date);
  useEffect(() => {
    if (step > 0) formRef.current?.querySelector("legend")?.focus();
  }, [step]);
  const update = (name, value) => {
    setDraft(null);
    setErrors({});
    setData((previous) => ({
      ...previous,
      [name]: value,
      ...(name === "date" ? { time: "" } : {}),
      ...(name === "type"
        ? { location: "", locationChoice: "", time: "" }
        : {}),
      ...(name === "locationChoice" && value === "later"
        ? { location: "" }
        : {}),
    }));
  };
  const advance = (event) => {
    event.preventDefault();
    const issues = validateMeeting(
      data,
      current === "Review" ? undefined : current,
    );
    setErrors(issues);
    if (Object.keys(issues).length) {
      requestAnimationFrame(() =>
        formRef.current?.querySelector('[role="alert"]')?.focus(),
      );
      return;
    }
    if (current === "Review") setDraft(prepareMeetingRequest(data));
    else setStep((value) => value + 1);
  };
  const download = () => {
    const text = [
      "MemoriesMade meeting request — UNSENT DRAFT",
      "Preview time only. Coordinator confirmation required.",
      ...Object.entries(meetingSummary(draft)).map(
        ([label, value]) => `${label}: ${value}`,
      ),
    ].join("\n");
    const url = URL.createObjectURL(
      new Blob([text], { type: "text/plain;charset=utf-8" }),
    );
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "MemoriesMade-meeting-request.txt";
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  return (
    <>
      <PageHero label="Meeting Availability" title="Plan a meeting.">
        Choose a convenient date and meeting setup to connect with a
        MemoriesMade coordinator. Meet online or in person to talk about your
        celebration.
      </PageHero>
      <section className="content-section meeting-layout">
        <aside className="meeting-intro">
          <p className="section-kicker">A conversation comes first</p>
          <h2>Space for your ideas.</h2>
          <p>
            This is a meeting preference, separate from your event date or
            reservation.
          </p>
          <p className="form-note">{availabilityNotice}</p>
          <p className="form-note">
            Online sending is not available yet. This flow prepares an unsent
            request draft for you to keep.
          </p>
          <Link className="text-link" to="/booking">
            Planning an event? Start an inquiry →
          </Link>
          {data.date && (
            <dl className="meeting-recap">
              <div>
                <dt>Preferred meeting date</dt>
                <dd>{data.date}</dd>
              </div>
              {data.type && (
                <div>
                  <dt>Meeting setup</dt>
                  <dd>{data.type}</dd>
                </div>
              )}
              {data.time && (
                <div>
                  <dt>Preferred time · Manila</dt>
                  <dd>{data.time}</dd>
                </div>
              )}
            </dl>
          )}
        </aside>
        <div className="meeting-panel">
          <ol className="meeting-progress" aria-label="Meeting progress">
            {steps.map((label, index) => (
              <li
                key={label}
                aria-current={index === step ? "step" : undefined}
                className={
                  index === step
                    ? "is-current"
                    : index < step
                      ? "is-complete"
                      : ""
                }
              >
                <span>{index + 1}</span>
                <span>{label}</span>
              </li>
            ))}
          </ol>
          <form ref={formRef} onSubmit={advance} noValidate>
            <fieldset key={current} className="step-reveal">
              <legend tabIndex={-1}>
                {
                  {
                    Date: "Choose your meeting date.",
                    "Meeting type": "How would you like to meet?",
                    Location: "Where would you like to meet?",
                    Time: "Choose a preferred time.",
                    Details: "A few details to connect.",
                    Review: "Review your meeting request.",
                  }[current]
                }
              </legend>
              {Object.keys(errors).length > 0 && (
                <div className="meeting-errors" role="alert" tabIndex={-1}>
                  {Object.values(errors).map((error) => (
                    <p key={error}>{error}</p>
                  ))}
                </div>
              )}
              {current === "Date" && (
                <MeetingCalendar
                  value={data.date}
                  onChange={(value) => update("date", value)}
                />
              )}
              {current === "Meeting type" && (
                <Choices
                  name="type"
                  values={[
                    ["In Person", "In Person"],
                    ["Online", "Online"],
                  ]}
                  value={data.type}
                  onChange={update}
                />
              )}
              {current === "Location" && (
                <>
                  <Choices
                    name="locationChoice"
                    values={[
                      ["enter", "Enter location"],
                      ["later", "Decide location later"],
                    ]}
                    value={data.locationChoice}
                    onChange={update}
                  />
                  {data.locationChoice === "enter" && (
                    <div className="field-grid meeting-location">
                      <label className="full-field">
                        Preferred meeting location
                        <input
                          name="location"
                          value={data.location}
                          onChange={(event) =>
                            update("location", event.target.value)
                          }
                          autoComplete="off"
                          required
                          aria-invalid={!!errors.location}
                        />
                      </label>
                    </div>
                  )}
                  {data.locationChoice === "later" && (
                    <p className="form-note">
                      You can agree on a location with your coordinator later.
                    </p>
                  )}
                </>
              )}
              {current === "Time" && (
                <>
                  <p className="form-note">{availabilityNotice}</p>
                  <p>For {data.date} · Manila time (UTC+08:00)</p>
                  <Choices
                    name="time"
                    values={availability.slots.map((slot) => [
                      slot.time,
                      slot.time,
                    ])}
                    value={data.time}
                    onChange={update}
                  />
                  {!availability.slots.length && (
                    <p role="status">
                      No preview times remain for this date. Go back and choose
                      another date.
                    </p>
                  )}
                  {data.type === "Online" && (
                    <p className="form-note">
                      Online meeting details can be arranged after confirmation.
                    </p>
                  )}
                </>
              )}
              {current === "Details" && (
                <div className="field-grid">
                  <label>
                    Full name
                    <input
                      name="name"
                      autoComplete="name"
                      value={data.name}
                      onChange={(event) => update("name", event.target.value)}
                      required
                      aria-invalid={!!errors.name}
                    />
                  </label>
                  <label>
                    Email
                    <input
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={data.email}
                      onChange={(event) => update("email", event.target.value)}
                      required
                      aria-invalid={!!errors.email}
                    />
                  </label>
                  <label className="full-field">
                    What would you like to discuss? (optional)
                    <textarea
                      name="notes"
                      value={data.notes}
                      onChange={(event) => update("notes", event.target.value)}
                    />
                  </label>
                </div>
              )}
              {current === "Review" && (
                <>
                  <dl className="review-list">
                    {Object.entries(meetingSummary(data)).map(
                      ([label, value]) => (
                        <div key={label}>
                          <dt>{label}</dt>
                          <dd>{value}</dd>
                        </div>
                      ),
                    )}
                  </dl>
                  <p className="form-note">
                    Request Meeting prepares a draft only. Nothing is sent, no
                    time is reserved, and coordinator confirmation is still
                    required.
                  </p>
                </>
              )}
            </fieldset>
            {draft && (
              <div className="draft-status" role="status">
                <strong>Your meeting request draft is ready.</strong>
                <p>
                  Nothing has been sent or booked. Download your details to keep
                  them; leaving or refreshing this page clears this draft.
                </p>
                <button
                  type="button"
                  className="secondary-button"
                  onClick={download}
                >
                  Download request draft
                </button>
                <Link className="text-link" to="/contact">
                  General contact →
                </Link>
              </div>
            )}
            <div className="form-actions">
              {step > 0 && (
                <button
                  className="secondary-button"
                  type="button"
                  onClick={() => {
                    setStep((value) => value - 1);
                    setErrors({});
                    setDraft(null);
                  }}
                >
                  Back
                </button>
              )}
              <button
                className="primary-button"
                type="submit"
                disabled={!!draft}
              >
                {current === "Review" ? "Request Meeting" : "Continue"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
function Choices({ name, values, value, onChange }) {
  return (
    <div
      className={`meeting-choices ${name === "time" ? "meeting-times" : ""}`}
    >
      {values.map(([id, label]) => (
        <label key={id} className="choice-card">
          <input
            type="radio"
            name={name}
            value={id}
            checked={value === id}
            onChange={() => onChange(name, id)}
          />
          <span>{label}</span>
        </label>
      ))}
    </div>
  );
}
function MeetingCalendar({ value, onChange }) {
  const now = new Date(`${meetingDateValue()}T12:00:00`);
  const [view, setView] = useState(() =>
    value
      ? new Date(`${value.slice(0, 7)}-01T12:00:00`)
      : new Date(now.getFullYear(), now.getMonth(), 1),
  );
  const count = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
  const cells = [
    ...Array(view.getDay()).fill(null),
    ...Array.from({ length: count }, (_, i) => i + 1),
  ];
  const move = (offset) =>
    setView(new Date(view.getFullYear(), view.getMonth() + offset, 1));
  return (
    <div className="calendar">
      <header>
        <button
          type="button"
          aria-label="Previous month"
          disabled={
            view.getFullYear() === now.getFullYear() &&
            view.getMonth() === now.getMonth()
          }
          onClick={() => move(-1)}
        >
          ←
        </button>
        <h2 aria-live="polite">
          {view.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
        </h2>
        <button type="button" aria-label="Next month" onClick={() => move(1)}>
          →
        </button>
      </header>
      <div className="calendar-grid">
        {weekdays.map((day) => (
          <span className="weekday" key={day}>
            {day}
          </span>
        ))}
        {cells.map((day, index) => {
          if (!day) return <span key={`blank-${index}`} />;
          const date = new Date(view.getFullYear(), view.getMonth(), day);
          const dateValue = localDateValue(date);
          return (
            <button
              type="button"
              key={dateValue}
              disabled={dateValue < localDateValue(now)}
              aria-label={date.toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
              aria-pressed={value === dateValue}
              className={value === dateValue ? "is-selected" : ""}
              onClick={() => onChange(dateValue)}
            >
              {day}
            </button>
          );
        })}
      </div>
      <p className="form-note" role="status">
        {value ? `Preferred meeting date: ${value}` : "Select a date to begin."}
      </p>
    </div>
  );
}
