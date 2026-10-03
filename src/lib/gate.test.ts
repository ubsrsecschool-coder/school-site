import { describe, expect, it } from "vitest";
import { isPublishable, partitionByGate } from "./gate";

describe("publish gate", () => {
  it("publishes only items that are verified", () => {
    expect(isPublishable({ verified: true })).toBe(true);
    expect(isPublishable({ verified: false })).toBe(false);
  });

  it("holds back a verified asset that is marked unusable", () => {
    expect(isPublishable({ verified: true, usable: false })).toBe(false);
  });

  it("treats a missing usable flag as usable", () => {
    expect(isPublishable({ verified: true, usable: undefined })).toBe(true);
  });

  it("never publishes an unverified item even if usable", () => {
    expect(isPublishable({ verified: false, usable: true })).toBe(false);
  });

  it("partitions without losing or duplicating items", () => {
    const items = [
      { id: "a", verified: true },
      { id: "b", verified: false },
      { id: "c", verified: true, usable: false },
    ];
    const { published, withheld } = partitionByGate(items);
    expect(published.map((i) => i.id)).toEqual(["a"]);
    expect(withheld.map((i) => i.id)).toEqual(["b", "c"]);
  });
});
