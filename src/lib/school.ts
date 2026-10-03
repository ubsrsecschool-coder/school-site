export const school = {
  name: "Uma Bharti Senior Secondary School",
  shortName: "Uma Bharti Sr. Sec. School",
  established: 1999,
  location: { locality: "Bhora Kalan", city: "Gurugram", region: "Haryana", country: "IN" },
  medium: "English",
  classes: "Nursery to Class XII",
  affiliation: "HBSE-affiliated, CBSE-pattern curriculum",
  chairman: { name: "Mr. Randhir Singh Chauhan", title: "Chairman" },
  phones: [
    { display: "98132 18913", href: "tel:+919813218913" },
    { display: "80531 70444", href: "tel:+918053170444" },
    { display: "80531 70448", href: "tel:+918053170448" },
  ],
  email: "umabhartischool@gmail.com",
  tagline: "Building Strong Foundation for Tomorrow",
  motto: {
    devanagari: "तमसो मा ज्योतिर्गमय",
    transliteration: "Tamaso Ma Jyotirgamaya",
    translation: "Lead me from darkness to light",
  },
  session: "2026–27",
} as const;

export const addressLine = `${school.location.locality}, ${school.location.city}, ${school.location.region}`;
export const emailHref = `mailto:${school.email}`;
export const primaryPhone = school.phones[0];
