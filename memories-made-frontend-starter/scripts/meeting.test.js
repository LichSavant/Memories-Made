import test from "node:test";
import assert from "node:assert/strict";
import {
  getMeetingAvailability,
  meetingDateValue,
  meetingSteps,
  meetingSummary,
  prepareMeetingRequest,
  validateMeeting,
} from "../src/data/meetingAvailability.js";
import { packagesForEvent } from "../src/data/packages.js";
const valid = {
  date: "2099-06-15",
  type: "Online",
  locationChoice: "",
  location: "",
  time: "09:00",
  name: "Test Client",
  email: "client@example.com",
  notes: "",
};
test("Only existing Wedding and Debut package data is exposed", () => {
  for (const id of ["weddings", "debuts"])
    assert.equal(packagesForEvent(id).length, 3);
  for (const id of [
    "prenups",
    "anniversaries",
    "parties",
    "more",
    undefined,
    "unknown",
  ])
    assert.deepEqual(packagesForEvent(id), []);
});
test("Online omits location; in-person includes it", () => {
  assert.equal(meetingSteps("Online").includes("Location"), false);
  assert.equal(meetingSteps("In Person").includes("Location"), true);
  assert.equal(meetingSummary(valid).Location, undefined);
});
test("In-person location can be deferred but cannot be blank when entered", () => {
  assert.deepEqual(
    validateMeeting({ ...valid, type: "In Person", locationChoice: "later" }),
    {},
  );
  assert.ok(
    validateMeeting({
      ...valid,
      type: "In Person",
      locationChoice: "enter",
      location: "  ",
    }).location,
  );
  assert.ok(validateMeeting({ ...valid, type: "In Person" }).locationChoice);
});
test("Invalid dates, stale times and missing details are rejected", () => {
  for (const date of ["2020-01-01", "2099-02-30", "", "wrong"])
    assert.ok(validateMeeting({ ...valid, date }).date);
  assert.ok(validateMeeting({ ...valid, time: "02:00" }).time);
  assert.ok(validateMeeting({ ...valid, name: "  ", email: "invalid" }).email);
  assert.throws(() => prepareMeetingRequest({ ...valid, date: "2020-01-01" }));
});
test("Preview slots consistently use Manila time across date boundaries", () => {
  const now = new Date("2026-09-16T02:00:00Z");
  assert.equal(
    meetingDateValue(new Date("2026-09-15T17:00:00Z")),
    "2026-09-16",
  );
  assert.equal(
    getMeetingAvailability("2026-09-16", now).slots[0].time,
    "10:30",
  );
  assert.equal(getMeetingAvailability("2026-09-15", now).slots.length, 0);
  assert.equal(
    getMeetingAvailability("2026-09-16", new Date("2026-09-16T09:00:00Z")).slots
      .length,
    0,
  );
  assert.equal(getMeetingAvailability("2026-09-17", now).slots.length, 5);
});
test("Requests remain unsent drafts and omit irrelevant location", () => {
  const result = prepareMeetingRequest({ ...valid, location: "stale place" });
  assert.equal(result.sent, false);
  assert.equal(result.status, "draft");
  assert.equal(result.location, null);
  assert.equal(result.timeZone, "Asia/Manila");
});
