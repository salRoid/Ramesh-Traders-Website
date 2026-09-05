/**
 * Machine-readable facts about the business.
 *
 * Everything in here is read by search engines and AI assistants as
 * authoritative, so only put verified facts in it. Human-facing marketing copy
 * lives in `src/lib/site-content.ts`; this file is the structured-data mirror
 * of the subset of that copy we are willing to stand behind.
 *
 * Deliberately NOT asserted here (see `content/SEO-AI.md`):
 *  - the ISO 9001 line in `FEATURES` — unverified, so no `hasCertification`
 *  - the `QUOTES` testimonials — marked placeholder, so no `Review`/`aggregateRating`
 *  - any presence in Nepal or Jharkhand — the sourced reach is eastern India
 */

import { EMAIL, PHONES } from "@/lib/site-content";

export const SITE_URL = "https://store.salroid.me";

export const SITE_NAME = "Ramesh Traders";

/**
 * Founding year, as given by the owner (corrected to 1960, 2026-09; it was
 * briefly recorded as 1890).
 *
 * The owner is the tie-breaker if the marketing copy ever disagrees with this
 * again — change it here and every structured-data surface follows. Nothing in
 * this repo should derive a duration ("45 years") from it; state the year and
 * let the reader do the sum.
 */
export const FOUNDING_YEAR = "1960";

/**
 * Khajekalan, Patna City. Matches the Google Maps embed on /contact — do not
 * substitute a more "precise" figure without an actual survey.
 */
export const GEO = { lat: 25.6097, lng: 85.2017 } as const;

/** Mon–Sat 9:00–18:00 IST; closed Sunday. */
export const OPENING_HOURS = {
  days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  opens: "09:00",
  closes: "18:00",
} as const;

export const DESCRIPTION =
  `Wholesale supplier of cotton and polyester thread yarn, fishing nets, ropes ` +
  `and cordage from Khajekalan, Patna City, Bihar. Family-run since ${FOUNDING_YEAR}, ` +
  `mill-direct sourcing, custom mesh sizes made to specification, and quotes ` +
  `within 24 hours.`;

/** The product lines the shop actually stocks, as sold. */
export const PRODUCT_LINES = [
  {
    name: "Thread yarn",
    description:
      "Cotton and polyester thread yarn in a wide range of weights and colours, sourced mill-direct for wholesale and bulk buyers.",
  },
  {
    name: "Fishing nets",
    description:
      "Trawl, gill, drag and cast nets, manufactured to custom mesh sizes on specification.",
  },
  {
    name: "Ropes and cordage",
    description: "Rope and cordage for fishing, marine and industrial use.",
  },
  {
    name: "Hooks, float balls and sinkers",
    description: "Fishing hooks, float balls and sinkers for commercial fleets and retailers.",
  },
  {
    name: "Mauli and festive thread",
    description: "Mauli and festive thread supplied in bulk to retailers and wholesalers.",
  },
];

const POSTAL_ADDRESS = {
  "@type": "PostalAddress",
  streetAddress: "Khajekalan, near Janta Market",
  addressLocality: "Patna City",
  addressRegion: "Bihar",
  postalCode: "800008",
  addressCountry: "IN",
};

/**
 * The whole site's structured data, as one `@graph` so the business, the
 * organisation behind it and the website itself can reference each other.
 * Rendered into a single <script type="application/ld+json"> in the root
 * layout — no JavaScript required for it to be present in the HTML.
 */
export function siteJsonLd() {
  const businessId = `${SITE_URL}/#business`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["WholesaleStore", "LocalBusiness"],
        "@id": businessId,
        name: SITE_NAME,
        legalName: SITE_NAME,
        description: DESCRIPTION,
        url: SITE_URL,
        foundingDate: FOUNDING_YEAR,
        address: POSTAL_ADDRESS,
        geo: {
          "@type": "GeoCoordinates",
          latitude: GEO.lat,
          longitude: GEO.lng,
        },
        hasMap: "https://www.google.com/maps/search/?api=1&query=25.6097,85.2017",
        telephone: PHONES[0],
        email: EMAIL,
        image: `${SITE_URL}/img/hero/shopfront.jpg`,
        logo: `${SITE_URL}/icon.png`,
        currenciesAccepted: "INR",
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [...OPENING_HOURS.days],
            opens: OPENING_HOURS.opens,
            closes: OPENING_HOURS.closes,
          },
        ],
        contactPoint: PHONES.map((telephone) => ({
          "@type": "ContactPoint",
          telephone,
          contactType: "sales",
          areaServed: "IN",
          availableLanguage: ["Hindi", "English"],
        })),
        areaServed: [
          { "@type": "AdministrativeArea", name: "Bihar" },
          { "@type": "Place", name: "Eastern India" },
        ],
        knowsAbout: PRODUCT_LINES.map((p) => p.name),
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Thread, nets and cordage",
          itemListElement: PRODUCT_LINES.map((p) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Product",
              name: p.name,
              description: p.description,
              category: p.name,
            },
            businessFunction: "http://purl.org/goodrelations/v1#Sell",
            eligibleCustomerType: "http://purl.org/goodrelations/v1#Business",
            availability: "https://schema.org/InStock",
            url: `${SITE_URL}/products`,
          })),
        },
      },
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/icon.png`,
        foundingDate: FOUNDING_YEAR,
        address: POSTAL_ADDRESS,
        email: EMAIL,
        telephone: PHONES[0],
        subOrganization: { "@id": businessId },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        description: DESCRIPTION,
        inLanguage: "en-IN",
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}/#breadcrumbs`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Catalogue", item: `${SITE_URL}/products` },
          { "@type": "ListItem", position: 3, name: "About", item: `${SITE_URL}/about` },
          { "@type": "ListItem", position: 4, name: "Contact", item: `${SITE_URL}/contact` },
        ],
      },
    ],
  };
}
