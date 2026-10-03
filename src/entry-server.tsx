import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import { App } from "./App";
import { galleryItem } from "./lib/content";

export { routes, notFoundMeta } from "./lib/routes";
export { organizationJsonLd } from "./lib/seo";
export { school } from "./lib/school";

export const heroImage = () => galleryItem("campus-peach-facade");

export function render(url: string): string {
  return renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>,
  );
}
