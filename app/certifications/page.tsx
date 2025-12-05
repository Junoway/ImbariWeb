export default function CertificationsPage() {
  return (
    <main className="main-container py-16 space-y-8">
      <header>
        <p className="badge mb-3">Certifications & Standards</p>
        <h1 className="section-heading">Compliance, Quality & Sustainability</h1>
        <p className="section-subtitle">
          Imbari Coffee is built for global trade. Our value chain is designed to
          comply with evolving regulatory frameworks while protecting farmers,
          buyers, and the environment.
        </p>
      </header>

      <section className="grid-cards">
        <article className="card p-6 sm:p-7 text-sm text-neutral-200">
          <h2 className="font-semibold text-amber-200 mb-2">
            EUDR (European Deforestation Regulation) Ready
          </h2>
          <p className="text-xs text-neutral-300">
            Imbari Coffee maintains a transparent, traceable value chain aligned
            with the latest EUDR requirements, enabling deforestation-free
            sourcing for European buyers.
          </p>
        </article>

        <article className="card p-6 sm:p-7 text-sm text-neutral-200">
          <h2 className="font-semibold text-amber-200 mb-2">
            UCDA Certified Exporter
          </h2>
          <p className="text-xs text-neutral-300">
            Registered with the Uganda Coffee Development Authority and fully
            compliant with national export standards, grading, and documentation
            requirements.
          </p>
        </article>

        <article className="card p-6 sm:p-7 text-sm text-neutral-200">
          <h2 className="font-semibold text-amber-200 mb-2">
            SCA-Aligned Quality Practices
          </h2>
          <p className="text-xs text-neutral-300">
            Our cupping, grading, and processing protocols align with global
            Specialty Coffee Association (SCA) criteria to meet specialty buyers’
            expectations.
          </p>
        </article>
      </section>

      <section className="card p-6 sm:p-7 text-sm text-neutral-200 space-y-3">
        <h2 className="font-semibold text-amber-200">
          Sustainability & Ethical Sourcing
        </h2>
        <ul className="text-xs text-neutral-300 space-y-1">
          <li>• Fair farmer pricing and long-term contracts</li>
          <li>• Women-led cooperative support</li>
          <li>• Regenerative agricultural practices where possible</li>
          <li>• Zero child-labor guarantee</li>
          <li>• Clean water & soil stewardship in coffee-growing communities</li>
        </ul>
      </section>
    </main>
  );
}
