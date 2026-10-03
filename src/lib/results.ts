import { academicResults } from "./content";
import { sessionLabel } from "./format";
import type { Achievement, ClassResult } from "./schema";

export const flagshipResult: Achievement | undefined = academicResults.find(
  (result) => (result.classes?.length ?? 0) >= 2 && result.classes?.every((c) => c.passPercent === 100),
);

export const resultTabLabel = (result: Achievement): string => {
  const date = sessionLabel(result.date ?? "");
  const classes = result.classes ?? [];
  return classes.length === 1 ? `${classes[0].label} · ${date}` : date;
};

export const REQUIRED_BOARD_CLASSES = ["Class X", "Class XII"] as const;

export const classResultFor = (result: Achievement, label: string): ClassResult | undefined =>
  result.classes?.find((c) => c.label === label);
