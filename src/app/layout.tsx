import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Figtree, Lora } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import { CartButton, CartDrawer } from "@/components/Cart";
import { ThemeProvider } from "@/components/ThemeProvider";
import { getSiteSettings } from "@/lib/site";
import { DESCRIPTION, SITE_NAME, SITE_URL, siteJsonLd } from "@/lib/seo";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["700", "800"],
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
});

const TITLE = "Ramesh Traders — Thread Yarn, Fishing Nets & Rope, Patna City";

/**
 * `metadataBase` makes every relative OG/canonical URL resolve against the
 * production host. store.salroid.me is the only public host for this business —
 * nothing here should ever point anywhere else.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s",
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "thread yarn wholesale",
    "cotton thread yarn supplier",
    "polyester thread yarn",
    "fishing net supplier",
    "trawl net",
    "gill net",
    "cast net",
    "custom mesh fishing nets",
    "rope and cordage supplier",
    "mauli thread wholesale",
    "Patna City",
    "Bihar",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    locale: "en_IN",
    images: [
      {
        url: "/img/hero/shopfront.jpg",
        width: 1200,
        height: 1600,
        alt: "The Ramesh Traders shopfront at Khajekalan, Patna City",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/img/hero/shopfront.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

// Applied before paint so a dark-mode visitor never sees a light flash.
const themeBootstrap = `(function(){try{var s=localStorage.getItem("rt-theme");var d=s?s==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;if(d)document.documentElement.setAttribute("data-theme","dark");}catch(e){}})();`;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Accent is chosen in the RT admin; "default" means the built-in palette.
  const { accent } = await getSiteSettings();

  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${figtree.variable} ${lora.variable}`}
      data-accent={accent === "default" ? undefined : accent}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
        {/* Structured data. Server-rendered into the HTML, so crawlers and
            assistants that never run JavaScript still get the full record. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd()) }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <ThemeProvider>
          <CartProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <CartButton />
            <CartDrawer />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
