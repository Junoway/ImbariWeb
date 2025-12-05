import Script from "next/script";

const productsJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Imbari Coffee Products",
  description:
    "Instant coffee, specialty Arabica from Mt Elgon, fine Robusta from Rwenzori and Victoria Basin, and private-label coffee manufacturing by Imbari Coffee.",
  itemListElement: [
    {
      "@type": "Product",
      position: 1,
      name: "Imbari Instant Coffee Collection",
      brand: { "@type": "Brand", name: "Imbari Coffee" },
      category: "Instant Coffee",
      description:
        "Export-grade instant coffee including freeze-dried and spray-dried varieties, 3-in-1 and 2-in-1 blends, and OEM/private-label packaging.",
      url: "http://localhost:3000/products#instant-coffee",
      offers: {
        "@type": "Offer",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: "http://localhost:3000/contact"
      }
    },
    {
      "@type": "Product",
      position: 2,
      name: "Imbari Specialty Arabica — Mt Elgon",
      brand: { "@type": "Brand", name: "Imbari Coffee" },
      category: "Specialty Coffee",
      description:
        "High-grown Arabica from 1,600–2,300m on Mt Elgon, available as green beans, roasted whole bean, and ground coffee.",
      url: "http://localhost:3000/products#arabica",
      offers: {
        "@type": "Offer",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: "http://localhost:3000/contact"
      },
      additionalProperty: [
        { "@type": "PropertyValue", name: "Origin", value: "Mt Elgon, Uganda" }
      ]
    },
    {
      "@type": "Product",
      position: 3,
      name: "Imbari Fine Robusta — Rwenzori & Victoria Basin",
      brand: { "@type": "Brand", name: "Imbari Coffee" },
      category: "Coffee",
      description:
        "Fine Robusta from the Rwenzori Mountains and Victoria Basin, available as green beans, roasted whole bean, and roast & grind.",
      url: "http://localhost:3000/products#robusta",
      offers: {
        "@type": "Offer",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: "http://localhost:3000/contact"
      }
    },
    {
      "@type": "Product",
      position: 4,
      name: "Imbari Private Label Coffee Manufacturing",
      brand: { "@type": "Brand", name: "Imbari Coffee" },
      category: "Private Label Coffee",
      description:
        "OEM and contract manufacturing for instant coffee and roasted coffee lines, including custom blends, packaging design, and export logistics.",
      url: "http://localhost:3000/products#private-label",
      offers: {
        "@type": "Offer",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: "http://localhost:3000/contact"
      }
    }
  ]
};

export default function ProductsPage() {
  return (
    <main className="bg-[#050304] min-h-screen text-neutral-50">
      {/* JSON-LD for Google */}
      <Script
        id="imbari-products-schema"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productsJsonLd) }}
      />

      <section className="w-full max-w-6xl mx-auto py-20 px-4 sm:px-8 space-y-16 animate-fade-in">
        <header className="text-center space-y-4">
          <p className="badge mb-3">Products</p>
          <h1 className="section-heading text-4xl sm:text-5xl">
            Instant Coffee, Specialty Arabica, Fine Robusta &amp; Private Label
          </h1>
          <p className="section-subtitle max-w-2xl mx-auto">
            Export-grade coffees and manufacturing solutions designed for FMCG
            brands, cafés, hotels, supermarkets, roasters, and distributors
            globally.
          </p>
        </header>

        <section className="grid gap-12 md:grid-cols-3 w-full animate-slide-in-up">
          {/* Instant Coffee */}
          <article id="instant-coffee" className="card p-10 text-center flex flex-col items-center bg-gradient-to-br from-black/80 via-neutral-900 to-black/90 border border-amber-400/10 shadow-xl rounded-3xl transition-transform hover:scale-105">
            <div className="mb-5 flex items-center justify-center w-full">
              <img
                src="/images/imbari-6b.jpg"
                alt="Imbari Instant Coffee"
                className="object-contain w-32 h-32 rounded-xl shadow border border-white/10 bg-black/30"
                style={{ minWidth: '8rem', minHeight: '8rem', maxWidth: '8rem', maxHeight: '8rem' }}
              />
            </div>
            <h2 className="font-semibold text-amber-200 mb-2 text-xl">
              Instant Coffee Collection
            </h2>
            <p className="text-base text-neutral-300 mb-4">
              Export-grade instant coffee ideal for FMCGs, cafés, hotels,
              supermarkets, and private-label brands.
            </p>
            <div className="grid gap-3 w-full">
              <div className="bg-white/5 rounded-xl px-6 py-3 text-sm text-neutral-200 font-medium shadow">
                Freeze-dried premium instant coffee
              </div>
              <div className="bg-white/5 rounded-xl px-6 py-3 text-sm text-neutral-200 font-medium shadow">
                Spray-dried instant coffee
              </div>
              <div className="bg-white/5 rounded-xl px-6 py-3 text-sm text-neutral-200 font-medium shadow">
                3-in-1 / 2-in-1 blends (custom formulation)
              </div>
              <div className="bg-white/5 rounded-xl px-6 py-3 text-sm text-neutral-200 font-medium shadow">
                OEM/private label packaging (jars, sachets, pouches)
              </div>
            </div>
            <p className="mt-4 text-xs text-neutral-400">
              As an{" "}
              <strong>African instant coffee manufacturer</strong>, Imbari Coffee
              supports both domestic and export-focused brands seeking reliable,
              high-quality instant coffee supply.
            </p>
          </article>

          {/* Arabica */}
          <article id="arabica" className="card p-10 text-center flex flex-col items-center bg-gradient-to-br from-black/80 via-neutral-900 to-black/90 border border-amber-400/10 shadow-xl rounded-3xl transition-transform hover:scale-105">
            <div className="mb-5 flex items-center justify-center w-full">
              <img
                src="/images/sort.jpg"
                alt="Imbari Arabica Coffee"
                className="object-contain w-32 h-32 rounded-xl shadow border border-white/10 bg-black/30"
                style={{ minWidth: '8rem', minHeight: '8rem', maxWidth: '8rem', maxHeight: '8rem' }}
              />
            </div>
            <h2 className="font-semibold text-amber-200 mb-2 text-xl">
              Specialty Arabica — Mt Elgon
            </h2>
            <p className="text-base text-neutral-300 mb-4">
              High-grown Arabica between{" "}
              <strong>1,600–2,300m</strong> on the slopes of Mt. Elgon, offering
              layered complexity and clean cups.
            </p>
            <div className="grid gap-3 w-full">
              <div className="bg-white/5 rounded-xl px-6 py-3 text-sm text-neutral-200 font-medium shadow">
                Green beans (washed, natural, honey)
              </div>
              <div className="bg-white/5 rounded-xl px-6 py-3 text-sm text-neutral-200 font-medium shadow">
                Roasted whole beans
              </div>
              <div className="bg-white/5 rounded-xl px-6 py-3 text-sm text-neutral-200 font-medium shadow">
                Roasted ground (espresso, filter, Turkish, capsule-ready)
              </div>
            </div>
            <div className="grid gap-3 w-full mt-4">
              <div className="bg-amber-900/10 rounded-xl px-6 py-3 text-xs text-amber-200 font-semibold shadow">
                Bright acidity • Floral notes • Citrus, chocolate • Clean cup
              </div>
            </div>
            <p className="mt-4 text-xs text-neutral-400">
              Ideal for roasters seeking{" "}
              <strong>Mt Elgon Arabica microlots</strong> and buyers focused on a
              long-term{" "}
              <strong>Uganda specialty coffee exporter</strong> partnership.
            </p>
          </article>

          {/* Robusta */}
          <article id="robusta" className="card p-10 text-center flex flex-col items-center bg-gradient-to-br from-black/80 via-neutral-900 to-black/90 border border-amber-400/10 shadow-xl rounded-3xl transition-transform hover:scale-105">
            <div className="mb-5 flex items-center justify-center w-full">
              <img
                src="/images/farm.jpg"
                alt="Imbari Robusta Coffee"
                className="object-contain w-32 h-32 rounded-xl shadow border border-white/10 bg-black/30"
                style={{ minWidth: '8rem', minHeight: '8rem', maxWidth: '8rem', maxHeight: '8rem' }}
              />
            </div>
            <h2 className="font-semibold text-amber-200 mb-2 text-xl">
              Fine Robusta — Rwenzori &amp; Victoria Basin
            </h2>
            <p className="text-base text-neutral-300 mb-4">
              Renowned for its strength, crema, and balance, our fine Robusta forms
              the backbone of powerful espresso blends and robust instant
              formulations.
            </p>
            <div className="grid gap-3 w-full">
              <div className="bg-white/5 rounded-xl px-6 py-3 text-sm text-neutral-200 font-medium shadow">
                Green beans
              </div>
              <div className="bg-white/5 rounded-xl px-6 py-3 text-sm text-neutral-200 font-medium shadow">
                Roasted whole bean
              </div>
              <div className="bg-white/5 rounded-xl px-6 py-3 text-sm text-neutral-200 font-medium shadow">
                Roast &amp; grind
              </div>
              <div className="bg-white/5 rounded-xl px-6 py-3 text-sm text-neutral-200 font-medium shadow">
                Special blends for espresso
              </div>
            </div>
            <div className="grid gap-3 w-full mt-4">
              <div className="bg-amber-900/10 rounded-xl px-6 py-3 text-xs text-amber-200 font-semibold shadow">
                Strength • Crema • Balance • Espresso blends
              </div>
            </div>
            <p className="mt-4 text-xs text-neutral-400">
              Sourced from the{" "}
              <strong>Rwenzori Mountains</strong> and{" "}
              <strong>Victoria Basin</strong>, this fine Robusta maintains the
              reputation of <strong>fine Robusta Uganda</strong> in the global
              coffee landscape.
            </p>
          </article>
        </section>

        {/* Private Label Section */}
        <section id="private-label" className="w-full mt-12 animate-fade-in-up">
          <article className="card p-12 text-center flex flex-col items-center bg-gradient-to-br from-black/80 via-neutral-900 to-black/90 border border-amber-400/10 shadow-2xl rounded-3xl max-w-3xl mx-auto">
            <h2 className="font-semibold text-amber-200 mb-3 text-2xl">
              Private Label Manufacturing (White Label)
            </h2>
            <p className="text-base text-neutral-300 mb-3">
              Imbari Coffee partners with brands globally to design, produce, and
              deliver full coffee product lines under private labels.
            </p>
            <div className="grid gap-3 w-full mb-4">
              <div className="bg-white/5 rounded-xl px-6 py-3 text-sm text-neutral-200 font-medium shadow">
                Instant coffee manufacturing
              </div>
              <div className="bg-white/5 rounded-xl px-6 py-3 text-sm text-neutral-200 font-medium shadow">
                Custom blends
              </div>
              <div className="bg-white/5 rounded-xl px-6 py-3 text-sm text-neutral-200 font-medium shadow">
                Packaging design
              </div>
              <div className="bg-white/5 rounded-xl px-6 py-3 text-sm text-neutral-200 font-medium shadow">
                OEM / contract manufacturing
              </div>
              <div className="bg-white/5 rounded-xl px-6 py-3 text-sm text-neutral-200 font-medium shadow">
                Export logistics
              </div>
              <div className="bg-white/5 rounded-xl px-6 py-3 text-sm text-neutral-200 font-medium shadow">
                Bulk procurement options
              </div>
            </div>
            <p className="mt-2 text-xs text-neutral-400">
              MOQ:{" "}
              <strong>Negotiable depending on product line.</strong> Imbari Coffee
              is your strategic partner for{" "}
              <strong>private label instant coffee Uganda</strong> and{" "}
              <strong>wholesale green coffee Africa → USA/China/EU</strong>.
            </p>
          </article>
        </section>
      </section>
    </main>
  );
}
