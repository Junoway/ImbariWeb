import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Script from "next/script";
import { Inter, Playfair_Display } from "next/font/google";
import { CartProvider } from "@/components/CartContext";
import { AuthProvider } from "@/components/AuthContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Imbari Coffee | Africa’s Premium Coffee, Perfected",
  description:
    "Imbari Coffee is a Uganda specialty coffee exporter and African instant coffee manufacturer, offering Mt Elgon Arabica micro-lots, fine Robusta, and private-label instant coffees.",
  openGraph: {
    title: "Imbari Coffee | Africa’s Premium Coffee, Perfected",
    description:
      "Premium African coffee from Mt. Elgon and the Rwenzori Mountains. Instant coffee, specialty Arabica, fine Robusta, and private-label manufacturing.",
    url: "http://localhost:3000", // change to https://imbari.coffee in production
    siteName: "Imbari Coffee",
    type: "website",
  },
};

// Organization + LocalBusiness JSON-LD for SEO
const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness"],
  name: "Imbari Coffee",
  url: "http://localhost:3000",
  logo: "http://localhost:3000/logo-main.jpg",
  description:
    "Imbari Coffee is a Uganda specialty coffee exporter and African instant coffee manufacturer, producing Mt Elgon Arabica micro-lots, fine Robusta, and private-label instant coffees.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kampala",
    addressRegion: "Central",
    addressCountry: "UG",
  },
  email: "info@imbari.coffee",
  telephone: "+256000000000",
  areaServed: ["Africa", "Europe", "North America", "Asia", "Middle East"],
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

        <AuthProvider>
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
        </AuthProvider>
      </body>
    </html>
  );
}
