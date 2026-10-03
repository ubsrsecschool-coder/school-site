import { describe, expect, it, vi } from "vitest";
import { normalizePhone, validateEnquiry } from "./enquiry";
import { buildMailto, submitEnquiry } from "./submitEnquiry";

const admission = { name: "Asha Rani", phone: "98132 18913", classInterest: "Class 6–8", message: "" };

describe("phone normalisation", () => {
  it("strips spaces, dashes and country codes", () => {
    expect(normalizePhone("98132 18913")).toBe("9813218913");
    expect(normalizePhone("+91 98132-18913")).toBe("9813218913");
    expect(normalizePhone("098132 18913")).toBe("9813218913");
  });
});

describe("enquiry validation", () => {
  it("accepts a complete admission enquiry and normalises the phone", () => {
    const result = validateEnquiry("admission", admission);
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.data.phone).toBe("9813218913");
  });

  it("reports an error per invalid field", () => {
    const result = validateEnquiry("admission", { name: "A", phone: "12345", classInterest: "", message: "" });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(Object.keys(result.errors).sort()).toEqual(["classInterest", "name", "phone"]);
      expect(result.errors.classInterest).toBe("Please choose a class.");
    }
  });

  it("rejects numbers that cannot be Indian mobiles", () => {
    expect(validateEnquiry("contact", { name: "Asha", phone: "5813218913", message: "Hello there" }).ok).toBe(false);
  });

  it("requires a message on the contact form but not the admission form", () => {
    expect(validateEnquiry("contact", { name: "Asha", phone: "9813218913", message: "" }).ok).toBe(false);
    expect(validateEnquiry("admission", admission).ok).toBe(true);
  });

  it("never accepts student-identifying fields into the validated payload", () => {
    const result = validateEnquiry("admission", { ...admission, studentName: "X", dob: "2015-01-01" });
    expect(result.ok).toBe(true);
    if (result.ok) expect(Object.keys(result.data).sort()).toEqual(["classInterest", "message", "name", "phone"]);
  });
});

describe("submitEnquiry", () => {
  const data = { name: "Asha Rani", phone: "9813218913", classInterest: "Class 6–8", message: "" };

  it("reports unconfigured without an endpoint and sends nothing", async () => {
    const fetchImpl = vi.fn();
    expect(await submitEnquiry("admission", data, { endpoint: "", fetchImpl })).toEqual({ status: "unconfigured" });
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it("posts JSON to the endpoint and reports success", async () => {
    const fetchImpl = vi.fn().mockResolvedValue({ ok: true });
    const result = await submitEnquiry("admission", data, { endpoint: "https://example.test/f", fetchImpl });
    expect(result).toEqual({ status: "ok" });
    const [url, init] = fetchImpl.mock.calls[0];
    expect(url).toBe("https://example.test/f");
    expect(JSON.parse(init.body)).toMatchObject({ name: "Asha Rani", _subject: expect.stringContaining("Admission") });
  });

  it("reports an error for a rejected response and for a network failure", async () => {
    const rejected = vi.fn().mockResolvedValue({ ok: false });
    const offline = vi.fn().mockRejectedValue(new Error("offline"));
    expect(await submitEnquiry("contact", data, { endpoint: "https://e.test", fetchImpl: rejected })).toEqual({ status: "error" });
    expect(await submitEnquiry("contact", data, { endpoint: "https://e.test", fetchImpl: offline })).toEqual({ status: "error" });
  });

  it("builds a mailto fallback that keeps the entered details", () => {
    const href = buildMailto("admission", data);
    expect(href.startsWith("mailto:umabhartischool@gmail.com?subject=")).toBe(true);
    expect(decodeURIComponent(href)).toContain("Phone: 9813218913");
    expect(decodeURIComponent(href)).not.toContain("Message:");
  });
});
