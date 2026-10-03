import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { classOptions } from "@/lib/admissions";
import { validateEnquiry, type EnquiryKind, type FieldErrors } from "@/lib/enquiry";
import { buildMailto, submitEnquiry } from "@/lib/submitEnquiry";
import { emailHref, primaryPhone, school } from "@/lib/school";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { SelectField, TextAreaField, TextField } from "./Field";

type Phase = "idle" | "sending" | "sent" | "unconfigured" | "failed";

const MIN_FILL_MS = 2000;
const FIELD_ORDER = ["name", "phone", "classInterest", "message"];

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

interface EnquiryFormProps {
  kind: EnquiryKind;
}

export function EnquiryForm({ kind }: EnquiryFormProps) {
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const shownAt = useRef(0);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [phase, setPhase] = useState<Phase>("idle");
  const [mailto, setMailto] = useState("");

  useEffect(() => {
    shownAt.current = Date.now();
  }, []);

  useEffect(() => {
    if (phase === "sent") successRef.current?.focus();
  }, [phase]);

  const clearError = (field: string) => () => setErrors((current) => (current[field] ? { ...current, [field]: undefined } : current));
  const fieldId = (field: string) => `${uid}-${field}`;

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const entries = Object.fromEntries(new FormData(form).entries());
    const values = Object.fromEntries(Object.entries(entries).map(([key, value]) => [key, String(value)]));

    if (values._gotcha) {
      setPhase("sent");
      return;
    }

    const result = validateEnquiry(kind, values);
    if (!result.ok) {
      setErrors(result.errors);
      const first = FIELD_ORDER.find((field) => result.errors[field]);
      if (first) (form.elements.namedItem(first) as HTMLElement | null)?.focus();
      return;
    }

    setErrors({});
    setPhase("sending");
    const remaining = MIN_FILL_MS - (Date.now() - shownAt.current);
    if (remaining > 0) await wait(remaining);

    const outcome = await submitEnquiry(kind, result.data);
    if (outcome.status === "ok") {
      setPhase("sent");
    } else if (outcome.status === "unconfigured") {
      setMailto(buildMailto(kind, result.data));
      setPhase("unconfigured");
    } else {
      setMailto(buildMailto(kind, result.data));
      setPhase("failed");
    }
  }

  if (phase === "sent") {
    return (
      <div ref={successRef} tabIndex={-1} className="py-[30px] text-center outline-none" role="status">
        <div className="mx-auto mb-4 grid h-[52px] w-[52px] place-items-center rounded-full bg-green/10 text-green">
          <Icon name="check" strokeWidth={2.2} className="h-6 w-6" />
        </div>
        <h3 className="text-[22px]">Thank you. We have your enquiry.</h3>
        <p className="mt-2 text-sm text-muted">The school office will get back to you on the number you gave.</p>
      </div>
    );
  }

  const sending = phase === "sending";

  return (
    <form ref={formRef} className="fields" onSubmit={onSubmit} noValidate aria-describedby={`${uid}-privacy`}>
      {(phase === "unconfigured" || phase === "failed") && (
        <div className="form-alert" role="alert">
          {phase === "unconfigured"
            ? "Online enquiries are not switched on yet, so this message has not been sent."
            : "We could not send your enquiry just now."}{" "}
          <a href={mailto}>Send it by email instead</a>, or call{" "}
          <a href={primaryPhone.href}>{primaryPhone.display}</a>.
        </div>
      )}

      <TextField
        id={fieldId("name")}
        name="name"
        label="Parent / guardian name"
        type="text"
        autoComplete="name"
        placeholder="Full name"
        error={errors.name}
        onClearError={clearError("name")}
      />
      <div className={kind === "admission" ? "grid gap-4 min-[681px]:grid-cols-2" : "grid gap-4"}>
        <TextField
          id={fieldId("phone")}
          name="phone"
          label="Phone number"
          type="tel"
          inputMode="numeric"
          autoComplete="tel"
          placeholder="10-digit mobile"
          error={errors.phone}
          onClearError={clearError("phone")}
        />
        {kind === "admission" && (
          <SelectField
            id={fieldId("classInterest")}
            name="classInterest"
            label="Class applying for"
            defaultValue=""
            error={errors.classInterest}
            onClearError={clearError("classInterest")}
          >
            <option value="">Select</option>
            {classOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </SelectField>
        )}
      </div>
      <TextAreaField
        id={fieldId("message")}
        name="message"
        label="Message"
        optional={kind === "admission"}
        placeholder={kind === "admission" ? "Anything you would like to ask" : "How can the school help?"}
        error={errors.message}
        onClearError={clearError("message")}
      />

      <div className="hp" aria-hidden="true">
        <label htmlFor={fieldId("gotcha")}>Leave this field empty</label>
        <input id={fieldId("gotcha")} name="_gotcha" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <Button type="submit" variant="primary" arrow disabled={sending} className="w-full">
        {sending ? "Sending…" : kind === "admission" ? "Send enquiry" : "Send message"}
      </Button>
      <p id={`${uid}-privacy`} className="text-center text-[11.5px] leading-normal text-muted">
        We use these details only to reply to you. Please do not include a child&rsquo;s name, date of birth or marks.
        You can also call {primaryPhone.display} or write to{" "}
        <a href={emailHref} className="underline underline-offset-2">
          {school.email}
        </a>
        .
      </p>
    </form>
  );
}
