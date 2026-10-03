export interface Gated {
  verified: boolean;
  usable?: boolean;
  note?: string;
}

export const isPublishable = (item: Gated): boolean =>
  item.verified === true && item.usable !== false;

export const withheldReason = (item: Gated): string => item.note ?? "not verified";

export const partitionByGate = <T extends Gated>(items: readonly T[]) => ({
  published: items.filter(isPublishable),
  withheld: items.filter((item) => !isPublishable(item)),
});
