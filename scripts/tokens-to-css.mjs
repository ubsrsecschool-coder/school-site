import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const tokens = JSON.parse(readFileSync("content/design-tokens.json", "utf8"));
const kebab = (name) => name.replace(/([a-z])([A-Z0-9])/g, "$1-$2").toLowerCase();
const lines = [];

for (const [name, color] of Object.entries(tokens.colors)) {
  lines.push(`  --color-${kebab(name)}: ${color.value};`);
}
for (const [name, font] of Object.entries(tokens.typography)) {
  lines.push(`  --font-${kebab(name)}: ${font.family};`);
}
for (const [name, value] of Object.entries(tokens.radius)) {
  lines.push(`  --radius-${kebab(name)}: ${value};`);
}
for (const [name, value] of Object.entries(tokens.shadows)) {
  if (name === "note") continue;
  lines.push(`  --shadow-${name.replace(/^sh/, "")}: ${value};`);
}
lines.push(`  --ease-brand: ${tokens.motion.easing};`);

mkdirSync("src/styles", { recursive: true });
writeFileSync("src/styles/tokens.generated.css", `@theme {\n${lines.join("\n")}\n}\n`);
console.log(`tokens: wrote src/styles/tokens.generated.css (${lines.length} variables)`);
