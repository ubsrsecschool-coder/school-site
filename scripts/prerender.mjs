import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { pathToFileURL } from "node:url";

const DIST = "dist";
const SSR = "dist-ssr";

const rawSite = (process.env.SITE_URL ?? "").trim().replace(/\/+$/, "");
if (rawSite && !/^https?:\/\/[^\s/]+/.test(rawSite)) {
  console.error(`prerender: SITE_URL must start with http:// or https:// (got "${rawSite}")`);
  process.exit(1);
}
const siteUrl = rawSite || undefined;

const escapeAttr = (value) =>
  value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const escapeJson = (value) => JSON.stringify(value).replace(/</g, "\\u003c");

const swap = (html, pattern, replacement, label) => {
  if (!pattern.test(html)) throw new Error(`prerender: could not find ${label} in dist/index.html`);
  return html.replace(pattern, () => replacement);
};

const server = await import(pathToFileURL(join(process.cwd(), SSR, "entry-server.js")).href);
const { render, routes, notFoundMeta, organizationJsonLd, school, heroImage } = server;
const template = readFileSync(join(DIST, "index.html"), "utf8");
const hero = heroImage();

const FIRST_SCREEN_FONTS = [
  /^fraunces-latin-opsz-normal-.*\.woff2$/,
  /^plus-jakarta-sans-latin-wght-normal-.*\.woff2$/,
  /^noto-serif-devanagari-devanagari-700-normal-.*\.woff2$/,
];
const assetFiles = readdirSync(join(DIST, "assets"));
const fontPreloads = FIRST_SCREEN_FONTS.map((pattern) => {
  const file = assetFiles.find((name) => pattern.test(name));
  if (!file) throw new Error(`prerender: could not find a built font matching ${pattern}`);
  return `<link rel="preload" as="font" type="font/woff2" crossorigin href="/assets/${file}" />`;
});

function headTags({ path, title, description, index, isHome }) {
  const tags = [...fontPreloads];
  const url = siteUrl ? `${siteUrl}${path === "/" ? "/" : path}` : undefined;
  if (!index) tags.push('<meta name="robots" content="noindex" />');
  if (url && index) tags.push(`<link rel="canonical" href="${escapeAttr(url)}" />`);
  tags.push(
    '<meta property="og:type" content="website" />',
    `<meta property="og:site_name" content="${escapeAttr(school.name)}" />`,
    '<meta property="og:locale" content="en_IN" />',
    `<meta property="og:title" content="${escapeAttr(title)}" />`,
    `<meta property="og:description" content="${escapeAttr(description)}" />`,
  );
  if (url) tags.push(`<meta property="og:url" content="${escapeAttr(url)}" />`);
  if (hero && siteUrl) {
    tags.push(
      `<meta property="og:image" content="${escapeAttr(siteUrl + hero.src)}" />`,
      `<meta property="og:image:alt" content="${escapeAttr(hero.alt)}" />`,
      `<meta property="og:image:width" content="${hero.width}" />`,
      `<meta property="og:image:height" content="${hero.height}" />`,
      '<meta name="twitter:card" content="summary_large_image" />',
    );
  }
  if (isHome) {
    if (hero) tags.push(
        `<link rel="preload" as="image" href="${escapeAttr(hero.webp ?? hero.src)}"${hero.webp ? ' type="image/webp"' : ""} media="(min-width: 1081px)" fetchpriority="high" />`,
      );
    tags.push(`<script type="application/ld+json">${escapeJson(organizationJsonLd(siteUrl))}</script>`);
  }
  return tags.join("\n    ");
}

const deferredScript = (html) =>
  html.replace(/<script type="module" crossorigin src=/, '<script type="module" crossorigin fetchpriority="low" src=');

function page({ renderPath, ...meta }) {
  let html = deferredScript(template);
  html = swap(html, /<title>[\s\S]*?<\/title>/, `<title>${escapeAttr(meta.title)}</title>`, "<title>");
  html = swap(
    html,
    /<meta\s+name="description"[\s\S]*?\/>/,
    `<meta name="description" content="${escapeAttr(meta.description)}" />`,
    'meta name="description"',
  );
  html = swap(html, /\s*<\/head>/, `\n    ${headTags(meta)}\n  </head>`, "</head>");
  html = swap(html, /<div id="root"><\/div>/, `<div id="root">${render(renderPath)}</div>`, '<div id="root">');
  return html;
}

const write = (file, contents) => {
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, contents);
};

const written = [];
for (const route of routes) {
  const file = route.path === "/" ? join(DIST, "index.html") : join(DIST, route.path, "index.html");
  write(file, page({ renderPath: route.path, ...route, isHome: route.path === "/" }));
  written.push(route.path);
}
write(
  join(DIST, "404.html"),
  page({ renderPath: "/page-that-does-not-exist", path: "/404", ...notFoundMeta, index: false, isHome: false }),
);

const indexable = routes.filter((r) => r.index);
if (siteUrl) {
  const urls = indexable
    .map((r) => `  <url>\n    <loc>${siteUrl}${r.path === "/" ? "/" : r.path}</loc>\n    <priority>${r.priority.toFixed(1)}</priority>\n  </url>`)
    .join("\n");
  write(
    join(DIST, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
  );
  write(join(DIST, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`);
} else {
  write(join(DIST, "robots.txt"), "User-agent: *\nAllow: /\n");
}

rmSync(SSR, { recursive: true, force: true });

console.log(`\nprerender: wrote ${written.length} routes + 404.html`);
console.log(`prerender: ${indexable.length} indexable, ${routes.length - indexable.length} noindex`);
if (siteUrl) {
  console.log(`prerender: canonical, og:url, JSON-LD url and sitemap.xml use ${siteUrl}`);
} else {
  console.warn("prerender: WARNING SITE_URL is not set. No canonical URLs, og:url, og:image or sitemap.xml were written.");
}
if (!process.env.VITE_ENQUIRY_ENDPOINT) {
  console.warn("prerender: WARNING VITE_ENQUIRY_ENDPOINT is not set. Enquiry forms will offer an email fallback instead of sending.");
}
