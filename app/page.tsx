import Link from "next/link";
import Image from "next/image";
import Hero from "../components/Hero";

export default function Home() {
  return (
    <main className="snap-y snap-mandatory h-screen overflow-y-scroll scroll-smooth">
      {/* HERO SECTION */}
      <section className="snap-start min-h-screen w-full flex items-center justify-center relative">
        <Hero />
      </section>

      {/* OUR PROMISE – CARD + FARM IMAGE */}
      <section className="snap-start min-h-screen w-full flex items-center justify-center bg-[#010a07] relative">
        <div className="main-container w-full flex flex-col justify-center items-center space-y-8 animate-fade-in">
          <header className="text-center">
            <p className="badge mb-3">Our Promise</p>
            <h2 className="section-heading">
              Exceptional Coffee. Ethical Sourcing. African Excellence.
            </h2>
            <p className="section-subtitle">
              Imbari Coffee is a vertically integrated coffee company committed to
              elevating Uganda’s most prized origins — Bugisu Arabica, Rwenzori
              Robusta, and Victoria-region microlots — to global specialty
              standards.
            </p>
          </header>
          <div className="grid gap-6 lg:grid-cols-[2fr,2.2fr] items-center w-full max-w-5xl mx-auto">
            <div className="card p-6 sm:p-7 text-sm text-neutral-200 space-y-3 text-center animate-slide-in-left">
              <p className="text-xs text-neutral-300">
                We partner directly with smallholder farmers, women-led
                cooperatives, and micro-lot communities to ensure traceability,
                transparency, and fair pricing at every step of the chain.
              </p>
              <div className="flex flex-col gap-2 items-center">
                <div className="bg-white/5 rounded-lg px-4 py-2 w-full max-w-xs">
                  Direct farmer and cooperative partnerships
                </div>
                <div className="bg-white/5 rounded-lg px-4 py-2 w-full max-w-xs">
                  Traceable microlots and specialty profiles
                </div>
                <div className="bg-white/5 rounded-lg px-4 py-2 w-full max-w-xs">
                  Instant coffee manufacturing for export markets
                </div>
                <div className="bg-white/5 rounded-lg px-4 py-2 w-full max-w-xs">
                  Distribution capabilities across all 54 African states
                </div>
              </div>
            </div>
            <div className="relative w-full h-56 sm:h-72 animate-slide-in-right">
              <Image
                src="/images/farm.jpg"
                alt="Coffee harvest at Imbari Coffee farms"
                fill
                className="rounded-3xl border border-white/10 object-cover shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE PRODUCE */}
      <section className="snap-start min-h-screen w-full flex items-center justify-center bg-neutral-950 relative">
        <div className="main-container w-full flex flex-col justify-center items-center space-y-8 animate-fade-in">
          <header className="text-center">
            <p className="badge mb-3">What We Produce</p>
            <h2 className="section-heading">
              Instant Coffee, Specialty Arabica &amp; Fine Robusta
            </h2>
            <p className="section-subtitle">
              A consolidated platform for brands and buyers seeking reliable,
              high-quality{" "}
              <strong>Uganda specialty coffee</strong> and{" "}
              <strong>African instant coffee manufacturing</strong>.
            </p>
          </header>
          <div className="grid-cards w-full animate-slide-in-up">
            {/* Instant Coffee */}
            <article className="card p-6 sm:p-7 text-sm text-neutral-200 text-center">
              <div
                className="mb-3 overflow-hidden rounded-2xl border border-white/10 bg-black/30 flex items-center justify-center"
                style={{
                  height: "120px",
                  minHeight: "120px",
                  maxHeight: "120px",
                }}
              >
                <Image
                  src="/images/imbari-6b.jpg"
                  alt="Imbari Coffee packaged instant and roasted products"
                  width={160}
                  height={120}
                  className="object-contain w-auto h-full mx-auto"
                />
              </div>
              <h3 className="font-semibold text-emerald-200 mb-1">
                Instant Coffee
              </h3>
              <p className="text-xs text-neutral-300">
                Premium freeze-dried and spray-dried instant coffee produced to
                export standards, designed for FMCG brands, supermarkets, hotels,
                and café chains.
              </p>
              <div className="flex flex-col gap-2 items-center mt-2">
                <div className="bg-white/5 rounded-lg px-4 py-2 w-full max-w-xs">
                  Freeze-dried &amp; spray-dried options
                </div>
                <div className="bg-white/5 rounded-lg px-4 py-2 w-full max-w-xs">
                  3-in-1 and 2-in-1 blends
                </div>
                <div className="bg-white/5 rounded-lg px-4 py-2 w-full max-w-xs">
                  Jars, sachets, and pouch formats
                </div>
                <div className="bg-white/5 rounded-lg px-4 py-2 w-full max-w-xs">
                  OEM / private-label production
                </div>
              </div>
            </article>

            {/* Specialty Arabica */}
            <article className="card p-6 sm:p-7 text-sm text-neutral-200 text-center">
              <div
                className="mb-3 overflow-hidden rounded-2xl border border-white/10 bg-black/30 flex items-center justify-center"
                style={{
                  height: "120px",
                  minHeight: "120px",
                  maxHeight: "120px",
                }}
              >
                <Image
                  src="/images/sort.jpg"
                  alt="Specialty Arabica coffee drying on raised beds"
                  width={160}
                  height={120}
                  className="object-contain w-auto h-full mx-auto"
                />
              </div>
              <h3 className="font-semibold text-emerald-200 mb-1">
                Specialty Arabica — Mt. Elgon
              </h3>
              <p className="text-xs text-neutral-300">
                High-altitude Arabica from 1,800–2,300m in Bugisu, grown on
                volcanic soils and carefully processed for clean, expressive cups.
              </p>
              <div className="flex flex-col gap-2 items-center mt-2">
                <div className="bg-white/5 rounded-lg px-4 py-2 w-full max-w-xs">
                  Green beans (washed, natural, honey)
                </div>
                <div className="bg-white/5 rounded-lg px-4 py-2 w-full max-w-xs">
                  Roasted whole bean &amp; grind
                </div>
                <div className="bg-white/5 rounded-lg px-4 py-2 w-full max-w-xs">
                  Notes: floral, citrus, chocolate, winey acidity
                </div>
              </div>
            </article>

            {/* Fine Robusta */}
            <article className="card p-6 sm:p-7 text-sm text-neutral-200 text-center">
              <div
                className="mb-3 overflow-hidden rounded-2xl border border-white/10 bg-black/30 flex items-center justify-center"
                style={{
                  height: "120px",
                  minHeight: "120px",
                  maxHeight: "120px",
                }}
              >
                <Image
                  src="/images/farm.jpg"
                  alt="Fine Robusta coffee grown in Uganda"
                  width={160}
                  height={120}
                  className="object-contain w-auto h-full mx-auto"
                />
              </div>
              <h3 className="font-semibold text-emerald-200 mb-1">
                Fine Robusta — Rwenzori &amp; Victoria Basin
              </h3>
              <p className="text-xs text-neutral-300">
                Strong, bold, and clean Robusta ideal for espressos, blends, and
                instant formulations, sourced from Rwenzori and Victoria-region
                smallholders.
              </p>
              <div className="flex flex-col gap-2 items-center mt-2">
                <div className="bg-white/5 rounded-lg px-4 py-2 w-full max-w-xs">
                  Green beans, whole bean, and roast &amp; grind
                </div>
                <div className="bg-white/5 rounded-lg px-4 py-2 w-full max-w-xs">
                  Excellent crema, body, and strength
                </div>
              </div>
            </article>
          </div>
          {/* Private Label */}
          <div className="w-full max-w-2xl mt-10">
            <article className="card p-6 sm:p-7 text-sm text-neutral-200 text-center">
              <h3 className="font-semibold text-emerald-200 mb-1">
                Private Label Manufacturing
              </h3>
              <p className="text-xs text-neutral-300">
                We develop and manufacture coffee lines for brands worldwide:
                instant, roasted, and blended coffees under your own label.
              </p>
              <div className="flex flex-col gap-2 items-center mt-2">
                <div className="bg-white/5 rounded-lg px-4 py-2 w-full max-w-xs">
                  Custom blends &amp; formats
                </div>
                <div className="bg-white/5 rounded-lg px-4 py-2 w-full max-w-xs">
                  Packaging design and brand support
                </div>
                <div className="bg-white/5 rounded-lg px-4 py-2 w-full max-w-xs">
                  Bulk and retail-ready options
                </div>
                <div className="bg-white/5 rounded-lg px-4 py-2 w-full max-w-xs">
                  Export logistics to Africa, USA, EU, China, India &amp; more
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* EXPERTISE & TRAINING SECTION */}
      <section className="snap-start w-full flex items-center justify-center bg-gradient-to-br from-[#07110c] via-[#020403] to-[#1a2a1f] py-20">
        <div className="main-container w-full max-w-6xl mx-auto grid gap-10 md:grid-cols-3">
          {/* Farmer Training */}
          <article className="card bg-black/40 border border-emerald-400/20 rounded-3xl shadow-lg p-7 flex flex-col items-center text-center space-y-4">
            <h3 className="text-xl font-bold text-emerald-300">Ugandan Coffee Expertise</h3>
            <p className="text-base text-neutral-300">Farmer Training Programs</p>
            <p className="text-sm text-neutral-400">We empower Ugandan coffee farmers with modern agricultural techniques, quality control methods, and sustainable practices to improve yields and bean quality for export markets.</p>
            <Link href="/our-impact" className="button-primary mt-2">Learn More</Link>
          </article>
          {/* Export Quality Standards */}
          <article className="card bg-black/40 border border-emerald-400/20 rounded-3xl shadow-lg p-7 flex flex-col items-center text-center space-y-4">
            <h3 className="text-xl font-bold text-emerald-300">Export Quality Standards</h3>
            <p className="text-base text-neutral-300">Our technical programs focus on post-harvest processing, grading, and preparation methods that meet international export requirements and premium market expectations.</p>
            <Link href="/certifications" className="button-primary mt-2">Quality Standards</Link>
          </article>
          {/* Sustainability Workshops */}
          <article className="card bg-black/40 border border-emerald-400/20 rounded-3xl shadow-lg p-7 flex flex-col items-center text-center space-y-4">
            <h3 className="text-xl font-bold text-emerald-300">Sustainability Workshops</h3>
            <p className="text-base text-neutral-300">Educational initiatives promoting environmentally responsible farming practices that protect Uganda's ecosystems while producing exceptional coffee for global markets.</p>
            <Link href="/about" className="button-primary mt-2">Our Approach</Link>
          </article>
        </div>
      </section>
    </main>
  );
}
