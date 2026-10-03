import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes, ReactNode } from "react";

interface FieldShellProps {
  id: string;
  label: string;
  error?: string;
  optional?: boolean;
  children: (describedBy: string | undefined) => ReactNode;
}

function FieldShell({ id, label, error, optional, children }: FieldShellProps) {
  const errorId = error ? `${id}-error` : undefined;
  return (
    <div className="field">
      <label htmlFor={id}>
        {label}
        {optional && <span className="opt"> (optional)</span>}
      </label>
      {children(errorId)}
      {error && (
        <span id={errorId} className="msg">
          {error}
        </span>
      )}
    </div>
  );
}

interface CommonProps {
  id: string;
  label: string;
  error?: string;
  optional?: boolean;
  onClearError?: () => void;
}

export function TextField({
  id,
  label,
  error,
  optional,
  onClearError,
  ...input
}: CommonProps & Omit<InputHTMLAttributes<HTMLInputElement>, "id">) {
  return (
    <FieldShell id={id} label={label} error={error} optional={optional}>
      {(describedBy) => (
        <input id={id} aria-invalid={Boolean(error)} aria-describedby={describedBy} onInput={onClearError} {...input} />
      )}
    </FieldShell>
  );
}

export function SelectField({
  id,
  label,
  error,
  optional,
  onClearError,
  children,
  ...select
}: CommonProps & Omit<SelectHTMLAttributes<HTMLSelectElement>, "id">) {
  return (
    <FieldShell id={id} label={label} error={error} optional={optional}>
      {(describedBy) => (
        <select id={id} aria-invalid={Boolean(error)} aria-describedby={describedBy} onChange={onClearError} {...select}>
          {children}
        </select>
      )}
    </FieldShell>
  );
}

export function TextAreaField({
  id,
  label,
  error,
  optional,
  onClearError,
  ...area
}: CommonProps & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "id">) {
  return (
    <FieldShell id={id} label={label} error={error} optional={optional}>
      {(describedBy) => (
        <textarea id={id} aria-invalid={Boolean(error)} aria-describedby={describedBy} onInput={onClearError} {...area} />
      )}
    </FieldShell>
  );
}
