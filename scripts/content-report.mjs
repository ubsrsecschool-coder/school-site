import { readFileSync } from "node:fs";
import { z } from "zod";
import { AchievementSchema, GalleryItemSchema, NoticeSchema } from "../src/lib/schema.ts";
import { partitionByGate, withheldReason } from "../src/lib/gate.ts";

const files = [
  ["achievements.json", AchievementSchema],
  ["notices.json", NoticeSchema],
  ["gallery.json", GalleryItemSchema],
];

const held = [];
let invalid = false;

for (const [file, schema] of files) {
  const parsed = z.array(schema).safeParse(JSON.parse(readFileSync(`content/${file}`, "utf8")));
  if (!parsed.success) {
    invalid = true;
    console.error(`\ncontent/${file} failed validation. Fix the JSON, do not loosen the schema.\n${z.prettifyError(parsed.error)}\n`);
    continue;
  }
  for (const item of partitionByGate(parsed.data).withheld) {
    held.push({ file, id: item.id, reason: withheldReason(item) });
  }
}

if (invalid) process.exit(1);

if (!held.length) {
  console.log("\ncontent: nothing held back, everything is published.\n");
} else {
  console.log(`\ncontent: ${held.length} item(s) held back from the public site:\n`);
  for (const h of held) console.log(`  - ${h.file} -> ${h.id}\n      ${h.reason}\n`);
  console.log("  Chase these with the school; see docs/content-checklist.md\n");
}
