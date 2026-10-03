import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { achievements, gallery, notices, withheld, galleryItem } from "./content";

const publicDir = join(process.cwd(), "public");

describe("published content", () => {
  it("contains only verified items", () => {
    for (const item of [...achievements, ...notices, ...gallery]) {
      expect(item.verified).toBe(true);
    }
  });

  it("contains no gallery asset marked unusable", () => {
    for (const item of gallery) expect(item.usable).toBe(true);
  });

  it("only references image files that exist", () => {
    for (const item of gallery) expect(existsSync(join(publicDir, item.src))).toBe(true);
  });

  it("keeps the tan block and the raster crest out of the public gallery", () => {
    expect(galleryItem("campus-tan-block")).toBeUndefined();
    expect(galleryItem("crest")).toBeUndefined();
  });

  it("never publishes individual-student data", () => {
    for (const item of achievements) {
      expect(JSON.stringify(item)).not.toMatch(/topper|rank holder/i);
    }
  });

  it("reports every withheld item with a reason", () => {
    expect(withheld.length).toBeGreaterThan(0);
    for (const item of withheld) expect(item.reason.length).toBeGreaterThan(0);
  });
});

const sourceFiles = (dir: string): string[] =>
  readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return sourceFiles(path);
    return /\.(tsx?|css|html)$/.test(name) && !/\.test\./.test(name) ? [path] : [];
  });

describe("wording rules from CLAUDE.md", () => {
  const sources = sourceFiles(join(process.cwd(), "src")).map((path) => ({
    path,
    text: readFileSync(path, "utf8"),
  }));

  const forbidden: [string, RegExp][] = [
    ["CBSE-affiliated", /CBSE[- ]affiliated/i],
    ["Bharati spelling", /Bharati/],
    ["Chairperson", /Chairperson/],
    ["Bhojkalan", /Bhojkalan/i],
  ];

  for (const [label, pattern] of forbidden) {
    it(`never uses ${label}`, () => {
      const offenders = sources.filter((s) => pattern.test(s.text)).map((s) => s.path);
      expect(offenders).toEqual([]);
    });
  }
});
