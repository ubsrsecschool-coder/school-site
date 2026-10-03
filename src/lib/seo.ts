import { school } from "./school";

export function organizationJsonLd(siteUrl?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: school.name,
    description: `An English-medium school in ${school.location.locality}, ${school.location.city}, teaching ${school.classes}. ${school.affiliation}.`,
    foundingDate: String(school.established),
    address: {
      "@type": "PostalAddress",
      addressLocality: `${school.location.locality}, ${school.location.city}`,
      addressRegion: school.location.region,
      addressCountry: school.location.country,
    },
    telephone: school.phones.map((phone) => `+91${phone.display.replace(/\s/g, "")}`),
    email: school.email,
    ...(siteUrl ? { url: siteUrl } : {}),
  };
}
