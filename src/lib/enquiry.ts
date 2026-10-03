import { z } from "zod";
import { classOptions } from "./admissions";

export const normalizePhone = (raw: string): string => {
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) return digits.slice(2);
  if (digits.length === 11 && digits.startsWith("0")) return digits.slice(1);
  return digits;
};

const name = z.string().trim().min(2, "Please enter a name.").max(80, "Please use 80 characters or fewer.");

const phone = z
  .string()
  .transform(normalizePhone)
  .pipe(z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number."));

const optionalMessage = z.string().trim().max(1000, "Please use 1000 characters or fewer.");

export const admissionEnquirySchema = z.object({
  name,
  phone,
  classInterest: z.enum(classOptions, { error: "Please choose a class." }),
  message: optionalMessage,
});

export const contactMessageSchema = z.object({
  name,
  phone,
  message: z.string().trim().min(5, "Please write a short message.").max(1000, "Please use 1000 characters or fewer."),
});

export type EnquiryKind = "admission" | "contact";
export type FieldErrors = Partial<Record<string, string>>;

export const schemaFor = (kind: EnquiryKind) => (kind === "admission" ? admissionEnquirySchema : contactMessageSchema);

export function validateEnquiry(kind: EnquiryKind, values: Record<string, string>) {
  const parsed = schemaFor(kind).safeParse(values);
  if (parsed.success) return { ok: true as const, data: parsed.data as Record<string, string> };
  const fieldErrors = z.flattenError(parsed.error).fieldErrors as Record<string, string[] | undefined>;
  const errors: FieldErrors = {};
  for (const [field, messages] of Object.entries(fieldErrors)) {
    if (messages?.[0]) errors[field] = messages[0];
  }
  return { ok: false as const, errors };
}
