const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const ISO_DATE = /^(\d{4})-(\d{2})-(\d{2})$/;

export const sessionLabel = (value: string): string => value.replace("-", "–");

export interface NoticeDateParts {
  primary: string;
  secondary: string;
}

export function noticeDateParts(value: string): NoticeDateParts {
  const match = ISO_DATE.exec(value);
  if (!match) return { primary: value, secondary: "Year" };
  const [, year, month, day] = match;
  return { primary: day, secondary: `${MONTHS[Number(month) - 1]} ${year.slice(2)}` };
}

export function longDate(value: string): string {
  const match = ISO_DATE.exec(value);
  if (!match) return value;
  const [, year, month, day] = match;
  return `${Number(day)} ${MONTHS[Number(month) - 1]} ${year}`;
}
