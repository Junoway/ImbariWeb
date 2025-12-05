export default function ValueChainPage() {
  return (
    <main className="main-container py-16 space-y-8">
      <header>
        <p className="badge mb-3">Our Value Chain</p>
        <h1 className="section-heading">Farmer → Mill → Roast → Export</h1>
        <p className="section-subtitle">
          Imbari Coffee operates a vertically integrated value chain that keeps
          quality, traceability, and trust at the center of every process.
        </p>
      </header>

      <section className="grid gap-6 lg:grid-cols-2">
        <article className="card p-6 sm:p-7 text-sm text-neutral-200 space-y-3">
          <h2 className="font-semibold text-amber-200">
            1. Farming & Cooperative Partnerships
          </h2>
          <ul className="text-xs text-neutral-300 space-y-1">
            <li>• Direct engagement with smallholder farmers</li>
            <li>• Agronomy training and good agricultural practices</li>
            <li>• Input support and quality incentives</li>
            <li>• Focus on organic and low-chemical systems where viable</li>
            <li>• Microlot sourcing for traceable premium profiles</li>
          </ul>
        </article>

        <article className="card p-6 sm:p-7 text-sm text-neutral-200 space-y-3">
          <h2 className="font-semibold text-amber-200">
            2. Processing & Washing Stations
          </h2>
          <ul className="text-xs text-neutral-300 space-y-1">
            <li>• Washed, natural, and honey process capability</li>
            <li>• Quality sorting and defect removal</li>
            <li>• Moisture control and controlled drying</li>
            <li>• Microlot grading and separate storage</li>
          </ul>
        </article>

        <article className="card p-6 sm:p-7 text-sm text-neutral-200 space-y-3">
          <h2 className="font-semibold text-amber-200">3. Roasting & Cupping</h2>
          <ul className="text-xs text-neutral-300 space-y-1">
            <li>• Sample roasting for buyers and QC</li>
            <li>• Roast profiling tailored to market preferences</li>
            <li>• Consistent sensory evaluation and cupping</li>
          </ul>
        </article>

        <article className="card p-6 sm:p-7 text-sm text-neutral-200 space-y-3">
          <h2 className="font-semibold text-amber-200">
            4. Instant Coffee Manufacturing
          </h2>
          <ul className="text-xs text-neutral-300 space-y-1">
            <li>• Advanced extraction for flavor retention</li>
            <li>• Freeze-drying and spray-drying capabilities</li>
            <li>• Contract manufacturing for partner brands</li>
            <li>• In-house quality control and batch testing</li>
          </ul>
        </article>
      </section>

      <section className="card p-6 sm:p-7 text-sm text-neutral-200 space-y-3">
        <h2 className="font-semibold text-amber-200">5. Export & Logistics</h2>
        <ul className="text-xs text-neutral-300 space-y-1">
          <li>• Global export routes to Africa, EU, USA, Asia, and the Middle East</li>
          <li>• Phytosanitary certification and compliant documentation</li>
          <li>• Customs clearing and shipping coordination</li>
          <li>• Africa-wide distribution network for finished products</li>
        </ul>
      </section>
    </main>
  );
}
