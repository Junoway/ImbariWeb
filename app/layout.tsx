import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Script from "next/script";
import { Inter, Playfair_Display } from "next/font/google";
import { CartProvider } from "@/components/CartContext";
import { AuthProvider } from "@/components/AuthContext";
import { ReviewAuthProvider } from "@/components/ReviewAuthContext";
import FAQSchema from "@/components/FAQSchema";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Imbari Coffee | Uganda Coffee Exporter | Premium Arabica & Robusta | East Africa Specialty Coffee",
  description:
    "Imbari Coffee - Uganda's #1 specialty coffee exporter. Premium Mt. Elgon Arabica, Uganda Robusta, Ethiopian coffee, Kenya AA, Rwanda coffee. East Africa's finest kahawa. Organic certified instant coffee manufacturer. Sustainable coffee since 1893.",
  keywords: [
    "imbari",
    "imbari coffee",
    "uganda coffee",
    "uganda coffee exporters",
    "uganda robusta",
    "specialty coffee",
    "east africa coffee",
    "kahawa1893",
    "kahawa",
    "kenya coffee",
    "rwanda coffee",
    "ethiopian coffee",
    "ethiopian best arabica",
    "ethiopian best coffee",
    "mt elgon arabica",
    "african coffee",
    "uganda arabica",
    "specialty robusta",
    "instant coffee manufacturer",
    "private label coffee",
    "organic coffee uganda",
    "fair trade coffee",
    "sustainable coffee",
    "direct trade coffee",
    "single origin coffee",
    "premium african coffee",
    "east african coffee beans",
    "uganda coffee beans",
    "coffee from uganda",
  ],
  authors: [{ name: "Imbari Coffee" }],
  creator: "Imbari Coffee",
  publisher: "Imbari Coffee",
  metadataBase: new URL("https://www.imbaricoffee.com"),
  alternates: {
    canonical: "https://www.imbaricoffee.com",
  },
  openGraph: {
    title: "Imbari Coffee | Uganda's Premium Coffee Exporter | Arabica & Robusta",
    description:
      "Premium East African coffee: Uganda Arabica, Robusta, Ethiopian, Kenyan, Rwanda specialty beans. Organic instant coffee manufacturer. Sustainable since 1893.",
    url: "https://www.imbaricoffee.com",
    siteName: "Imbari Coffee",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://www.imbaricoffee.com/images/mt-elgon.jpg",
        width: 1200,
        height: 630,
        alt: "Imbari Coffee - Uganda Premium Coffee Beans",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Imbari Coffee | Uganda Coffee Exporter",
    description: "Premium East African specialty coffee: Uganda Arabica, Robusta, Ethiopian, Kenyan beans",
    images: ["https://www.imbaricoffee.com/images/mt-elgon.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "GOOGLE_VERIFICATION_CODE", // Add after Google Search Console setup
  },
};

// Organization + LocalBusiness JSON-LD for SEO
const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness", "Store"],
  name: "Imbari Coffee",
  alternateName: ["Kahawa1893", "Imbari"],
  url: "https://www.imbaricoffee.com",
  logo: "https://www.imbaricoffee.com/images/logo-main.jpg",
  image: "https://www.imbaricoffee.com/images/mt-elgon.jpg",
  description:
    "Imbari Coffee is Uganda's premier specialty coffee exporter and East Africa's leading instant coffee manufacturer. We produce premium Mt. Elgon Arabica, fine Uganda Robusta, Ethiopian Arabica, Kenya AA, and Rwanda specialty coffee. Organic certified, fair trade, sustainable coffee since 1893.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kampala",
    addressRegion: "Central",
    addressCountry: "UG",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "0.3476",
    longitude: "32.5825",
  },
  email: "info@imbaricoffee.com",
  telephone: "+256-XXX-XXXXX", // Add actual phone
  sameAs: [
    "https://www.facebook.com/imbaricoffee",
    "https://www.instagram.com/imbaricoffee",
    "https://twitter.com/imbaricoffee",
    "https://www.linkedin.com/company/imbari-coffee",
  ],
  founder: {
    "@type": "Person",
    name: "Imbari Founders",
  },
  foundingDate: "1893",
  areaServed: [
    "Uganda",
    "Kenya",
    "Rwanda",
    "Ethiopia",
    "Tanzania",
    "United States",
    "Europe",
    "Asia",
    "Worldwide",
  ],
  knowsAbout: [
    "Coffee Farming",
    "Arabica Coffee",
    "Robusta Coffee",
    "Instant Coffee Manufacturing",
    "Specialty Coffee",
    "Organic Coffee",
    "Fair Trade Coffee",
    "Sustainable Agriculture",
    "Coffee Exporting",
    "Private Label Coffee",
  ],
  slogan: "Africa's Premium Coffee, Perfected",
  priceRange: "$$",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} min-h-screen flex flex-col`}
      >
        {/* JSON-LD for Google / SEO */}
        <Script
          id="imbari-org-schema"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        
        {/* FAQ Schema for SEO */}
        <FAQSchema />

        <AuthProvider>
          <ReviewAuthProvider>
            <CartProvider>
              <Navbar />
              <main className="flex-1 flex flex-col items-center justify-center w-full mx-auto overflow-hidden">
                {children}
              {/* Back to Top Button (Client Only) */}
              {typeof window !== 'undefined' && (
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-6 py-3 rounded-full shadow-lg shadow-emerald-400/30 transition-all text-base animate-fade-in"
                  aria-label="Back to top"
                >
                  ↑ Back to Top
                </button>
              )}
            </main>
            <Footer />
          </CartProvider>
        </ReviewAuthProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
