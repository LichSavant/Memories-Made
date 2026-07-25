import { useMemo, useState } from "react";
import PageHero from "../components/PageHero";
import PrimaryButton from "../components/PrimaryButton";
const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export default function AvailabilityPage() {
  const now = new Date(),
    [view, setView] = useState(new Date(now.getFullYear(), now.getMonth(), 1)),
    [selected, setSelected] = useState(null),
    [period, setPeriod] = useState("");
  const cells = useMemo(() => {
    const first = view.getDay(),
      count = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
    return [
      ...Array(first).fill(null),
      ...Array.from({ length: count }, (_, i) => i + 1),
    ];
  }, [view]);
  const move = (n) =>
    setView(new Date(view.getFullYear(), view.getMonth() + n, 1));
  const dateLabel = selected
    ? `${months[view.getMonth()]} ${selected}, ${view.getFullYear()}`
    : "No date selected";
  return (
    <>
      <PageHero
        label="Preferred Date"
        title="Choose a date to include in your inquiry."
      >
        This calendar collects your preference only. Final availability is
        confirmed by the Memories Made team.
      </PageHero>
      <section className="content-section availability-layout">
        <div className="calendar">
          <header>
            <button onClick={() => move(-1)} aria-label="Previous month">
              ←
            </button>
            <h2>
              {months[view.getMonth()]} {view.getFullYear()}
            </h2>
            <button onClick={() => move(1)} aria-label="Next month">
              →
            </button>
          </header>
          <div className="calendar-grid">
            {days.map((d) => (
              <span className="weekday" key={d}>
                {d}
              </span>
            ))}
            {cells.map((d, i) =>
              d ? (
                <button
                  className={selected === d ? "is-selected" : ""}
                  aria-pressed={selected === d}
                  onClick={() => setSelected(d)}
                  key={i}
                >
                  {d}
                </button>
              ) : (
                <span key={i} />
              ),
            )}
          </div>
        </div>
        <aside className="date-summary">
          <p className="section-kicker">Your preference</p>
          <h2>{dateLabel}</h2>
          <p>Select the time of day you prefer.</p>
          <div className="period-choices">
            {["Morning", "Afternoon", "Evening"].map((x) => (
              <button
                className={period === x ? "is-selected" : ""}
                aria-pressed={period === x}
                onClick={() => setPeriod(x)}
                key={x}
              >
                {x}
              </button>
            ))}
          </div>
          <p className="form-note">
            Final availability is confirmed by the Memories Made team.
          </p>
          <PrimaryButton to="/booking">Continue to Booking</PrimaryButton>
        </aside>
      </section>
    </>
  );
}
