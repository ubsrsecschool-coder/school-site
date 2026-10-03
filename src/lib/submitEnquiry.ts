import { school } from "./school";
import type { EnquiryKind } from "./enquiry";

export type SubmitResult = { status: "ok" } | { status: "unconfigured" } | { status: "error" };

export interface SubmitOptions {
  endpoint?: string;
  fetchImpl?: typeof fetch;
}

const subjects: Record<EnquiryKind, string> = {
  admission: "Admission enquiry from the website",
  contact: "Message from the website",
};

export const labelForField = (field: string): string =>
  ({ name: "Name", phone: "Phone", classInterest: "Class applying for", message: "Message" })[field] ?? field;

export function buildMailto(kind: EnquiryKind, data: Record<string, string>): string {
  const body = Object.entries(data)
    .filter(([, value]) => value)
    .map(([field, value]) => `${labelForField(field)}: ${value}`)
    .join("\n");
  return `mailto:${school.email}?subject=${encodeURIComponent(subjects[kind])}&body=${encodeURIComponent(body)}`;
}

export async function submitEnquiry(
  kind: EnquiryKind,
  data: Record<string, string>,
  options: SubmitOptions = {},
): Promise<SubmitResult> {
  const endpoint = options.endpoint ?? import.meta.env.VITE_ENQUIRY_ENDPOINT;
  if (!endpoint) return { status: "unconfigured" };

  const send = options.fetchImpl ?? fetch;
  try {
    const response = await send(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ ...data, _subject: subjects[kind] }),
    });
    return response.ok ? { status: "ok" } : { status: "error" };
  } catch {
    return { status: "error" };
  }
}
