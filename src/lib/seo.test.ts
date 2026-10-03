import { describe, expect, it } from "vitest";
import { organizationJsonLd } from "./seo";
import { routes } from "./routes";

describe("organisation JSON-LD", () => {
  const data = organizationJsonLd();

  it("states only confirmed facts", () => {
    expect(data.name).toBe("Uma Bharti Senior Secondary School");
    expect(data.foundingDate).toBe("1999");
    expect(data.address.addressLocality).toContain("Bhora Kalan");
    expect(data.telephone).toEqual(["+919813218913", "+918053170444", "+918053170448"]);
    expect(data.description).toContain("HBSE-affiliated, CBSE-pattern curriculum");
  });

  it("omits properties that have no confirmed value", () => {
    const keys = Object.keys(organizationJsonLd());
    expect(keys).not.toContain("sameAs");
    expect(keys).not.toContain("logo");
    expect(keys).not.toContain("url");
    expect(JSON.stringify(data)).not.toMatch(/affiliation number|registration/i);
  });

  it("adds the url only when a site URL is supplied", () => {
    expect(organizationJsonLd("https://example.test").url).toBe("https://example.test");
  });
});

describe("route list", () => {
  it("has unique paths and unique titles", () => {
    expect(new Set(routes.map((r) => r.path)).size).toBe(routes.length);
    expect(new Set(routes.map((r) => r.title)).size).toBe(routes.length);
  });

  it("keeps descriptions within search-snippet length", () => {
    for (const route of routes) {
      expect(route.description.length).toBeGreaterThan(50);
      expect(route.description.length).toBeLessThanOrEqual(200);
    }
  });

  it("never lists the placeholder pages for indexing", () => {
    const paths = routes.filter((r) => r.index).map((r) => r.path);
    expect(paths).not.toContain("/about/chairman-message");
  });

  it("does not create routes that have no content", () => {
    const paths = routes.map((r) => r.path);
    for (const missing of ["/about/principal-message", "/faculty", "/student-life"]) {
      expect(paths).not.toContain(missing);
    }
  });
});
