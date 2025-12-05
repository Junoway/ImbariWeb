export default function DistributionPage() {
  return (
    <main className="main-container py-16 space-y-10 text-center">
      {/* HEADER */}
      <header className="space-y-4">
        <p className="badge mx-auto mb-2">Distribution</p>
        <h1 className="section-heading max-w-3xl mx-auto">
          A Coffee Distribution Network Across All 54 African Countries
        </h1>
        <p className="section-subtitle max-w-2xl mx-auto">
          Imbari Coffee is building Africa’s first integrated coffee distribution
          ecosystem — enabling brands, supermarkets, cafés, and wholesalers to
          access premium African coffee with unmatched speed and reliability.
        </p>
      </header>

      {/* TOP 3 PILLARS */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <article className="card relative overflow-hidden p-6 sm:p-7 text-sm text-neutral-200">
          <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-emerald-400 via-amber-300 to-emerald-500" />
          <h2 className="font-semibold text-amber-200 mb-2">
            Wholesale Distribution
          </h2>
          <p className="text-xs text-neutral-300 max-w-xs mx-auto">
            Tailored programs for supermarkets, cafés, hotels, retail chains, and
            food-service distributors across Africa.
          </p>
        </article>

        <article className="card relative overflow-hidden p-6 sm:p-7 text-sm text-neutral-200">
          <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-emerald-400 via-amber-300 to-emerald-500" />
          <h2 className="font-semibold text-amber-200 mb-2">
            Private Label Partnerships
          </h2>
          <p className="text-xs text-neutral-300 max-w-xs mx-auto">
            Contract manufacturing and brand development for partners expanding
            into African markets or exporting African coffee globally.
          </p>
        </article>

        <article className="card relative overflow-hidden p-6 sm:p-7 text-sm text-neutral-200">
          <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-emerald-400 via-amber-300 to-emerald-500" />
          <h2 className="font-semibold text-amber-200 mb-2">
            Cross-Border B2B Shipping
          </h2>
          <p className="text-xs text-neutral-300 max-w-xs mx-auto">
            Fast delivery across East, West, Central, North, and Southern Africa,
            leveraging strategic logistics partners and regional hubs.
          </p>
        </article>
      </section>

      {/* GLOBAL ROUTES */}
      <section className="card p-6 sm:p-8 text-sm text-neutral-200 space-y-4">
        <h2 className="font-semibold text-amber-200 text-lg">
          Global Routes
        </h2>
        <p className="text-xs text-neutral-300 max-w-md mx-auto">
          In addition to African markets, Imbari Coffee supports export routes to
          major global hubs — connecting African-origin coffee to the world.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
          {[
            "USA & North America",
            "Europe",
            "China & East Asia",
            "India",
            "Middle East",
            "Southeast Asia"
          ].map((region) => (
            <div
              key={region}
              className="rounded-lg border border-emerald-500/30 bg-emerald-950/40 px-3 py-2 text-[11px] text-neutral-100 shadow-sm mx-auto"
            >
              {region}
            </div>
          ))}
        </div>
      </section>

      {/* BECOME A DISTRIBUTOR */}
      <section className="card p-6 sm:p-8 text-sm text-neutral-200 space-y-4">
        <h2 className="font-semibold text-amber-200 text-lg">
          Become a Distributor
        </h2>
        <p className="text-xs text-neutral-300 max-w-md mx-auto">
          We partner with committed distributors who want to build long-term,
          premium African coffee portfolios in their markets.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
          {[
            "Competitive pricing",
            "Potential regional exclusivity",
            "Marketing and brand support",
            "Logistics and export assistance",
            "Retail-ready packaging options"
          ].map((benefit) => (
            <div
              key={benefit}
              className="rounded-lg border border-emerald-500/30 bg-emerald-950/40 px-4 py-3 text-[11px] text-neutral-100 shadow-sm mx-auto"
            >
              {benefit}
            </div>
          ))}
        </div>

        <p className="text-[11px] text-neutral-300 max-w-md mx-auto pt-2">
          Imbari Coffee is designed to be the backbone of African coffee
          distribution — from farm and factory to shelf, café, and cup.
        </p>
      </section>
    </main>
  );
}
