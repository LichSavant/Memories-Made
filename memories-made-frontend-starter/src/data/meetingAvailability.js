import { localDateValue } from "./eventDate.js";

export const meetingTimeZone = "Asia/Manila";
export const availabilityNotice =
  "Preview times only — coordinator availability is not connected. Choose a preference; the team must confirm the date and time.";
// Development-only preferences, never real coordinator inventory. A live provider
// should return dated slots and a stable slot ID, and revalidate on submission.
const previewTimes = ["09:00", "10:30", "13:00", "14:30", "16:00"];
export function meetingDateValue(now = new Date()) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-CA", {
      timeZone: meetingTimeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
      .formatToParts(now)
      .map(({ type, value }) => [type, value]),
  );
  return `${parts.year}-${parts.month}-${parts.day}`;
}
function isValidDate(value) {
  return (
    /^\d{4}-\d{2}-\d{2}$/.test(value || "") &&
    localDateValue(new Date(`${value}T12:00:00`)) === value
  );
}
export function getMeetingAvailability(date, now = new Date()) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-CA", {
      timeZone: meetingTimeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    })
      .formatToParts(now)
      .map(({ type, value }) => [type, value]),
  );
  const today = `${parts.year}-${parts.month}-${parts.day}`;
  const time = `${parts.hour}:${parts.minute}`;
  return {
    source: "preview",
    timeZone: meetingTimeZone,
    slots:
      !isValidDate(date) || date < today
        ? []
        : previewTimes
            .filter((slot) => date > today || slot > time)
            .map((slot) => ({ id: `${date}T${slot}`, time: slot })),
  };
}
export function meetingSteps(type) {
  return [
    "Date",
    "Meeting type",
    ...(type === "In Person" ? ["Location"] : []),
    "Time",
    "Details",
    "Review",
  ];
}
export function validateMeeting(data, step) {
  const errors = {};
  if (
    (!step || step === "Date") &&
    (!isValidDate(data.date) || !getMeetingAvailability(data.date).slots.length)
  )
    errors.date =
      "Choose a current or future date with preview times remaining.";
  if (
    (!step || step === "Meeting type") &&
    !["Online", "In Person"].includes(data.type)
  )
    errors.type = "Choose how you would like to meet.";
  if ((!step || step === "Location") && data.type === "In Person") {
    if (!["enter", "later"].includes(data.locationChoice))
      errors.locationChoice = "Choose a location option.";
    if (data.locationChoice === "enter" && !data.location.trim())
      errors.location =
        "Enter your preferred meeting location, or choose decide later.";
  }
  if (
    (!step || step === "Time") &&
    !getMeetingAvailability(data.date).slots.some(
      (slot) => slot.time === data.time,
    )
  )
    errors.time =
      "Choose a preview time for your selected date. Times that have passed cannot be requested.";
  if (!step || step === "Details") {
    if (!data.name.trim()) errors.name = "Enter your full name.";
    if (!/^\S+@\S+\.\S+$/.test(data.email.trim()))
      errors.email = "Enter a valid email address.";
  }
  return errors;
}
// No transport exists in this frontend. Explicit draft result prevents false
// confirmations; replace with a server call only once submission is supported.
export function prepareMeetingRequest(data) {
  if (Object.keys(validateMeeting(data)).length)
    throw new Error("Please review your meeting details.");
  return {
    ...data,
    location:
      data.type === "In Person" && data.locationChoice === "enter"
        ? data.location.trim()
        : null,
    timeZone: meetingTimeZone,
    status: "draft",
    sent: false,
  };
}
export function meetingSummary(data) {
  return {
    "Meeting date": data.date,
    "Meeting time": `${data.time} · Manila time (UTC+08:00)`,
    "Meeting type": data.type,
    ...(data.type === "In Person"
      ? {
          Location:
            data.locationChoice === "later"
              ? "Decide location later"
              : data.location,
        }
      : {}),
    Name: data.name,
    Email: data.email,
    ...(data.notes.trim() ? { Notes: data.notes } : {}),
  };
}
