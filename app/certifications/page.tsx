import ParallaxSection from "@/components/ParallaxSection";
import { KahawaDivider, KahawaMotif } from "@/components/KahawaAssets";

export default function CertificationsPage() {
  return (
    <main className="bg-white min-h-screen">
      <header className="text-center space-y-4 animate-fade-in">
        <p className="badge mb-3 bg-emerald-400/20 text-emerald-300 border border-emerald-300">
          Certifications & Standards
        </p>
        <h1 className="section-heading text-4xl font-extrabold text-emerald-300 drop-shadow-lg">
          Compliance, Quality & Sustainability
        </h1>
        <p className="section-subtitle max-w-2xl mx-auto text-white text-lg">
          Imbari Coffee is built for global trade. Our value chain is designed to
          comply with evolving regulatory frameworks while protecting farmers,
          buyers, and the environment.
        </p>
      </header>

      <section className="grid gap-10 md:grid-cols-3 w-full animate-slide-in-up">
        {/* EUDR */}
        <article className="card bg-gradient-to-br from-emerald-400/10 via-white/5 to-black/30 border border-emerald-400/40 rounded-3xl shadow-2xl p-8 flex flex-col items-center text-center space-y-4 hover:scale-[1.04] hover:shadow-emerald-400/30 transition-all duration-400">
          <div className="text-4xl mb-2 text-amber-300">🌱</div>
          <h2 className="font-bold text-lg text-emerald-400 mb-1">
            EUDR Ready
          </h2>
          <p className="text-sm text-white">
            Transparent, traceable value chain aligned with European
            Deforestation Regulation for deforestation-free sourcing.
          </p>
        </article>
        {/* UCDA */}
        <article className="card bg-gradient-to-br from-emerald-400/10 via-white/5 to-black/30 border border-emerald-400/40 rounded-3xl shadow-2xl p-8 flex flex-col items-center text-center space-y-4 hover:scale-[1.04] hover:shadow-emerald-400/30 transition-all duration-400">
          <div className="text-4xl mb-2 text-emerald-300">🏅</div>
          <h2 className="font-bold text-lg text-emerald-400 mb-1">
            UCDA Certified Exporter
          </h2>
          <p className="text-sm text-white">
            Registered with Uganda Coffee Development Authority, fully compliant
            with export standards, grading, and documentation.
          </p>
        </article>
        {/* SCA */}
        <article className="card bg-gradient-to-br from-emerald-400/10 via-white/5 to-black/30 border border-emerald-400/40 rounded-3xl shadow-2xl p-8 flex flex-col items-center text-center space-y-4 hover:scale-[1.04] hover:shadow-emerald-400/30 transition-all duration-400">
          <div className="text-4xl mb-2 text-emerald-200">☕</div>
          <h2 className="font-bold text-lg text-emerald-400 mb-1">
            SCA-Aligned Quality
          </h2>
          <p className="text-sm text-white">
            Cupping, grading, and processing protocols meet global Specialty
            Coffee Association criteria for specialty buyers.
          </p>
        </article>
      </section>

      <section className="card bg-gradient-to-br from-emerald-400/10 via-white/5 to-black/30 border border-emerald-400/40 rounded-3xl shadow-2xl p-8 flex flex-col items-center text-center space-y-6 animate-fade-in">
        <h2 className="font-bold text-2xl text-emerald-300 mb-2 drop-shadow-lg">
          Sustainability & Ethical Sourcing
        </h2>
        <div className="grid gap-4 md:grid-cols-2 w-full max-w-2xl mx-auto">
          <div className="flex items-center gap-3 justify-center">
            <span className="text-emerald-400 text-xl">✔</span>
            <span className="text-white text-base font-medium">
              Fair farmer pricing & long-term contracts
            </span>
          </div>
          <div className="flex items-center gap-3 justify-center">
            <span className="text-emerald-400 text-xl">✔</span>
            <span className="text-white text-base font-medium">
              Women-led cooperative support
            </span>
          </div>
          <div className="flex items-center gap-3 justify-center">
            <span className="text-emerald-400 text-xl">✔</span>
            <span className="text-white text-base font-medium">
              Regenerative agricultural practices
            </span>
          </div>
          <div className="flex items-center gap-3 justify-center">
            <span className="text-emerald-400 text-xl">✔</span>
            <span className="text-white text-base font-medium">
              Zero child-labor guarantee
            </span>
          </div>
          <div className="flex items-center gap-3 justify-center md:col-span-2">
            <span className="text-emerald-400 text-xl">✔</span>
            <span className="text-white text-base font-medium">
              Clean water & soil stewardship in coffee-growing communities
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}




