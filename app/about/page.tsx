import { KahawaDivider, KahawaMotif } from "@/components/KahawaAssets";

export default function AboutPage() {
  return (
    <main className="bg-white min-h-screen">
      <div className="flex flex-col items-center justify-center text-center pt-10 pb-6 gap-4">
        <h1 className="text-4xl font-bold">About Imbari Coffee</h1>
        <p className="mb-2 text-lg">Our story, values, and mission.</p>
        <div className="flex gap-4">
          <button className="bg-[#10b981] hover:bg-[#22c55e] text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-all duration-200 mb-0">
            Meet the Team
          </button>
          <button className="bg-white border-2 border-[#10b981] text-[#10b981] font-semibold py-3 px-8 rounded-full shadow hover:bg-[#f0fdf4] transition-all duration-200 mb-0">
            Our Values
          </button>
        </div>
      </div>

      <section className="w-full min-h-screen max-w-7xl mx-auto flex flex-col gap-16 animate-fade-in justify-center py-20 pb-32">
        <header className="text-center space-y-4 min-h-[40vh] flex flex-col justify-center items-center">
          <p className="badge mb-3">About Imbari Coffee</p>
          <h1 className="section-heading">
            Coffee Rooted in African Excellence
          </h1>
          <p className="section-subtitle max-w-2xl mx-auto">
            Imbari Coffee was founded to reshape the global perception of African coffee. While Uganda produces some of the world’s finest Arabicas and Robustas, many farmers remain locked out of global markets. We built Imbari Coffee to change that narrative permanently.
          </p>
        </header>

        {/* Regions Section */}
        <section className="grid gap-12 md:grid-cols-3 w-full min-h-[60vh] items-center">
          <div className="card p-16 text-center flex flex-col items-center bg-gradient-to-br from-black/80 via-neutral-900 to-black/90 border border-emerald-500/10 shadow-2xl rounded-3xl min-h-[48vh] h-full">
            <h2 className="font-semibold text-amber-200 mb-4 text-2xl">The Regions That Define Us</h2>
            <div className="space-y-8 mt-6 w-full">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">🌄 Mt. Elgon — Bugisu Arabica</h3>
                <p className="text-base text-white">High-altitude Arabica grown on volcanic soils, hand-picked and traditionally sun-dried.</p>
                <p className="text-base text-white mt-1"><span className="font-semibold">Notes:</span> floral, citrus, chocolate, winey acidity.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">🏔️ Rwenzori Mountains — Fine Robusta</h3>
                <p className="text-base text-white">Uganda’s legendary strong, clean Robusta known for crema, strength, and body.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">🌱 Victoria Basin — Microlot Farms</h3>
                <p className="text-base text-white">Experimental washing stations and microlots enabling traceable, unique profiles that respond to the needs of specialty buyers.</p>
              </div>
            </div>
          </div>

          <div className="card p-16 text-center flex flex-col items-center bg-gradient-to-br from-black/80 via-neutral-900 to-black/90 border border-emerald-500/10 shadow-2xl rounded-3xl md:col-span-2 min-h-[48vh] h-full">
            <h2 className="font-semibold text-amber-200 mb-4 text-2xl">Our Vision & Commitment</h2>
            <p className="text-base text-white max-w-2xl mx-auto mb-6">
              To become Africa’s leading premium coffee brand, setting global standards in quality, sustainability, and innovation — while enabling farmers and cooperatives to thrive.
            </p>
            <div className="grid gap-6 md:grid-cols-2 w-full">
              <div className="bg-white/5 rounded-xl px-8 py-6 text-base text-white font-medium shadow-lg">
                Long-term, values-based partnerships
              </div>
              <div className="bg-white/5 rounded-xl px-8 py-6 text-base text-white font-medium shadow-lg">
                Transparent pricing and traceability
              </div>
              <div className="bg-white/5 rounded-xl px-8 py-6 text-base text-white font-medium shadow-lg">
                Investment in quality and training
              </div>
              <div className="bg-white/5 rounded-xl px-8 py-6 text-base text-white font-medium shadow-lg">
                A value chain that works for farmers and buyers
              </div>
            </div>
          </div>
        </section>

        {/* Value Chain & Women Empowerment Section */}
        <section className="grid gap-12 md:grid-cols-2 w-full min-h-[60vh] items-center">
          <div className="card p-16 text-center flex flex-col items-center bg-gradient-to-br from-black/80 via-neutral-900 to-black/90 border border-emerald-500/10 shadow-2xl rounded-3xl min-h-[48vh] h-full">
            <h2 className="font-semibold text-amber-200 mb-4 text-2xl">An Integrated Value Chain</h2>
            <p className="text-base text-white max-w-xl mx-auto mb-6">
              We operate a fully integrated value chain that keeps quality and traceability under one roof:
            </p>
            <div className="grid gap-4 w-full">
              <div className="bg-white/5 rounded-xl px-8 py-5 text-base text-white font-medium shadow-lg">Farmer partnerships &amp; agronomy training</div>
              <div className="bg-white/5 rounded-xl px-8 py-5 text-base text-white font-medium shadow-lg">Sustainable farm practices and inputs</div>
              <div className="bg-white/5 rounded-xl px-8 py-5 text-base text-white font-medium shadow-lg">Microlot profiling &amp; cupping</div>
              <div className="bg-white/5 rounded-xl px-8 py-5 text-base text-white font-medium shadow-lg">Processing, roasting, and instant manufacturing</div>
              <div className="bg-white/5 rounded-xl px-8 py-5 text-base text-white font-medium shadow-lg">Export logistics and distribution across Africa &amp; beyond</div>
            </div>
          </div>

          <div className="card p-16 text-center flex flex-col items-center bg-gradient-to-br from-black/80 via-neutral-900 to-black/90 border border-emerald-500/10 shadow-2xl rounded-3xl min-h-[48vh] h-full">
            <h2 className="font-semibold text-amber-200 mb-4 text-2xl">Women Empowerment at the Core</h2>
            <p className="text-base text-white max-w-xl mx-auto mb-6">
              Many of our partner cooperatives in Bugisu (Mt Elgon) and Kween are women-led. We see them not as suppliers, but as partners.
            </p>
            <div className="grid gap-4 w-full">
              <div className="bg-white/5 rounded-xl px-8 py-5 text-base text-white font-medium shadow-lg">Above-market pricing and reliable offtake</div>
              <div className="bg-white/5 rounded-xl px-8 py-5 text-base text-white font-medium shadow-lg">Long-term purchasing contracts</div>
              <div className="bg-white/5 rounded-xl px-8 py-5 text-base text-white font-medium shadow-lg">Agronomy and quality training</div>
              <div className="bg-white/5 rounded-xl px-8 py-5 text-base text-white font-medium shadow-lg">Access to financial tools and new markets</div>
              <div className="bg-white/5 rounded-xl px-8 py-5 text-base text-white font-medium shadow-lg">Distribution access across Africa’s 54 states</div>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}




