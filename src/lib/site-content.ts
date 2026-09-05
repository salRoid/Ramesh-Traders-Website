/** Shared marketing copy, so home and the deeper pages can't drift apart. */

export const FEATURES = [
  {
    title: "Certified quality",
    desc: "All products meet ISO 9001 standards with rigorous QA at every stage.",
  },
  {
    title: "Fast delivery",
    desc: "Reliable logistics network ensuring on-time delivery to your doorstep.",
  },
  {
    title: "Round-the-clock support",
    desc: "Dedicated account managers and responsive customer support.",
  },
  {
    title: "Since 1890",
    desc: "Deep domain knowledge built over generations in the marine supply industry.",
  },
  {
    title: "Sustainable sourcing",
    desc: "Eco-friendly materials and responsible manufacturing practices.",
  },
  {
    title: "Wide reach",
    desc: "Distribution network spanning 30+ cities across eastern India.",
  },
];

/**
 * PLACEHOLDER TESTIMONIALS — these people are invented, for design and layout
 * only. Replace every entry with a real, permissioned customer quote before
 * this site goes live: published testimonials attributed to named people who
 * never said them are deceptive advertising, and India's ASCI endorsement
 * guidelines treat them as such. Delete this comment once they are real.
 */
export const QUOTES = [
  {
    quote:
      "Ramesh Traders has been our go-to supplier for trawl nets for 10 years. Consistent quality and fast delivery every single time.",
    name: "Rajesh Pillai",
    role: "Fleet Manager, Kerala Deep Sea Fisheries",
    avatar: "RP",
  },
  {
    quote:
      "The polyester thread yarn quality is unmatched. Our production line runs smoother than ever.",
    name: "Meera Sharma",
    role: "Production Head, TextilePro Ltd.",
    avatar: "MS",
  },
  {
    quote:
      "Best quality ropes and nets in Patna. We have been buying from Ramesh Traders for years.",
    name: "Sunil Kumar Gupta",
    role: "Wholesale Dealer, Patna",
    avatar: "SK",
  },
  {
    quote:
      "Mauli thread ka colour har baar same rehta hai. Festive season mein bhi stock kabhi khatam nahi hota.",
    name: "Anil Kumar Sah",
    role: "Retailer, Gandhi Maidan, Patna",
    avatar: "AS",
  },
  {
    quote:
      "We order 200 kg of cotton twine every month and the rate has not moved once through the season. That predictability is worth a lot to us.",
    name: "Bhagwan Das Agarwal",
    role: "Purchase Manager, Muzaffarpur Textiles",
    avatar: "BA",
  },
  {
    quote:
      "Our cooperative buys gill nets for forty boats. They match the mesh exactly to what we ask and deliver before the season starts.",
    name: "Sanjay Mandal",
    role: "Secretary, Fishermen's Cooperative, Bhagalpur",
    avatar: "SM",
  },
  {
    quote:
      "Ek phone par order ho jata hai, aur maal time se pahunch jata hai. Bees saal se yahi bharosa hai.",
    name: "Ram Naresh Prasad",
    role: "Wholesaler, Khagaria",
    avatar: "RN",
  },
  {
    quote:
      "Samples reached us in two days and the denier was exactly as specified. Rare to find that kind of accuracy from a supplier.",
    name: "Farhan Ansari",
    role: "Quality Lead, Bhagalpur Silk Works",
    avatar: "FA",
  },
];

export const PHONES = ["+91 93085 70270", "+91 93341 17166", "+91 93867 51306"];
export const EMAIL = "rameshtraderssutawale@gmail.com";
export const ADDRESS = "Khajekalan, near Janta Market, Patna City, Bihar 800008";

/**
 * WhatsApp lines the shop answers. The first is the primary — single-button
 * surfaces (hero, catalogue, footer) link to it; surfaces with room show both.
 */
export const WHATSAPP_NUMBERS = [
  { number: "919308570270", display: "+91 93085 70270" },
  { number: "919334117166", display: "+91 93341 17166" },
  { number: "919386751306", display: "+91 93867 51306" },
];

export const waLink = (number: string, text?: string) =>
  `https://wa.me/${number}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

/** Primary WhatsApp link — every "WhatsApp us" button on the site. */
export const WHATSAPP = waLink("919308570270");

/**
 * Where enquiries and cart orders are delivered. Deliberately a different line
 * to the general "WhatsApp us" buttons, so anything that needs an answer lands
 * with the person who handles it rather than the general line.
 */
export const ENQUIRY_NUMBER = "919334117166";
export const ORDER_NUMBER = "919334117166";
