import { describe, expect, it } from "vitest";
import { longDate, noticeDateParts, sessionLabel } from "./format";

describe("format helpers", () => {
  it("uses an en dash in session labels", () => {
    expect(sessionLabel("2024-25")).toBe("2024–25");
  });

  it("splits a full date for the notice badge", () => {
    expect(noticeDateParts("2026-02-08")).toEqual({ primary: "08", secondary: "Feb 26" });
  });

  it("keeps a year-only notice date intact", () => {
    expect(noticeDateParts("2026")).toEqual({ primary: "2026", secondary: "Year" });
  });

  it("writes a long date without a leading zero", () => {
    expect(longDate("2026-02-08")).toBe("8 Feb 2026");
    expect(longDate("2026")).toBe("2026");
  });
});
