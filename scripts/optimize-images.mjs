import { readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const gallery = JSON.parse(readFileSync("content/gallery.json", "utf8"));
const kb = (file) => `${(statSync(file).size / 1024).toFixed(0)}KB`;

for (const item of gallery) {
  if (!item.webp) continue;
  const input = join("public", item.src);
  const output = join("public", item.webp);
  await sharp(input).webp({ quality: 74, effort: 6 }).toFile(output);
  console.log(`images: ${item.id}  ${kb(input)} jpg -> ${kb(output)} webp`);
}
