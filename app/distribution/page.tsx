import { KahawaDivider, KahawaMotif } from "@/components/KahawaAssets";

export default function DistributionPage() {
  return (
    <main className="bg-white min-h-screen">
      {/* HEADER */}
      <header className="space-y-4">
        <div className="flex flex-col items-center justify-center text-center pt-10 pb-6 gap-4">
          <p className="badge mb-2">Distribution</p>
          <h1 className="text-4xl font-bold max-w-3xl">
            A Coffee Distribution Network Across All 54 African Countries
          </h1>
          <p className="mb-2 text-lg max-w-2xl">
            Imbari Coffee is building Africa’s first integrated coffee distribution
            ecosystem — enabling brands, supermarkets, cafés, and wholesalers to
            access premium African coffee with unmatched speed and reliability.
          </p>
        </div>
      </header>

      <div className="text-center mb-8">
        <h2 className="text-4xl font-extrabold text-[#C8B06A] mb-4">
          Distribution
        </h2>
        <p className="text-lg text-neutral-100">
          Connecting coffee to the world.
        </p>
        <button className="bg-[#10b981] hover:bg-[#22c55e] text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-all duration-200 mb-4">
          Learn More
        </button>
        <button className="bg-white border-2 border-[#10b981] text-[#10b981] font-semibold py-3 px-8 rounded-full shadow hover:bg-[#f0fdf4] transition-all duration-200">
          Contact Us
        </button>
      </div>

      {/* TOP 3 PILLARS */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center items-center justify-center">
        <article className="card relative overflow-hidden p-6 sm:p-7 text-sm text-neutral-200">
          <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-emerald-400 via-amber-300 to-emerald-500" />
          <h2 className="font-semibold text-amber-200 mb-2 text-center">
            Wholesale Distribution
          </h2>
          <p className="text-xs text-neutral-300 max-w-xs mx-auto text-center">
            Tailored programs for supermarkets, cafés, hotels, retail chains, and
            food-service distributors across Africa.
          </p>
        </article>

        <article className="card relative overflow-hidden p-6 sm:p-7 text-sm text-neutral-200">
          <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-emerald-400 via-amber-300 to-emerald-500" />
          <h2 className="font-semibold text-amber-200 mb-2 text-center">
            Private Label Partnerships
          </h2>
          <p className="text-xs text-neutral-300 max-w-xs mx-auto text-center">
            Contract manufacturing and brand development for partners expanding
            into African markets or exporting African coffee globally.
          </p>
        </article>

        <article className="card relative overflow-hidden p-6 sm:p-7 text-sm text-neutral-200">
          <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-emerald-400 via-amber-300 to-emerald-500" />
          <h2 className="font-semibold text-amber-200 mb-2 text-center">
            Cross-Border B2B Shipping
          </h2>
          <p className="text-xs text-neutral-300 max-w-xs mx-auto text-center">
            Fast delivery across East, West, Central, North, and Southern Africa,
            leveraging strategic logistics partners and regional hubs.
          </p>
        </article>
      </section>

      {/* GLOBAL ROUTES */}
      <section className="card p-6 sm:p-8 text-sm text-neutral-200 space-y-4 text-center">
        <h2 className="font-semibold text-amber-200 text-lg text-center">
          Global Routes
        </h2>
        <p className="text-xs text-neutral-300 max-w-md mx-auto text-center">
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
      <section className="card p-6 sm:p-8 text-sm text-neutral-200 space-y-4 text-center">
        <h2 className="font-semibold text-amber-200 text-lg text-center">
          Become a Distributor
        </h2>
        <p className="text-xs text-neutral-300 max-w-md mx-auto text-center">
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
