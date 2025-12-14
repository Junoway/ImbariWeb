// app/careers/page.tsx
import Image from "next/image";
import Link from "next/link";
import ParallaxSection from "@/components/ParallaxSection";
import { withBasePath } from "@/lib/utils";
import { KahawaDivider, KahawaMotif } from "@/components/KahawaAssets";

export default function CareersPage() {
  return (
    <main className="bg-white min-h-screen">
      <h1 className="text-4xl font-bold mb-6">Careers</h1>
      <p className="mb-8 text-lg">Join our passionate team.</p>
      <button className="bg-[#10b981] hover:bg-[#22c55e] text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-all duration-200 mb-4">
        View Openings
      </button>
      <button className="bg-white border-2 border-[#10b981] text-[#10b981] font-semibold py-3 px-8 rounded-full shadow hover:bg-[#f0fdf4] transition-all duration-200">
        Apply Now
      </button>

      <div className="main-container py-16 space-y-16">
        {/* HERO SECTION */}
        <section className="relative rounded-3xl shadow-2xl p-0 flex items-stretch min-h-screen overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 w-full h-full z-0">
            <Image
              src={withBasePath("/images/career.jpg")}
              alt="Imbari Coffee delivery bike background"
              fill
              sizes="100vw"
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-black/60" />
          </div>
          {/* Content */}
          <div className="relative z-10 w-full flex items-center">
            <div className="grid gap-10 lg:grid-cols-2 w-full items-center px-8 py-12">
              <div className="space-y-5 text-center lg:text-left">
                <p className="badge inline-block mb-2">Careers at Imbari</p>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight drop-shadow-lg text-emerald-300">
                  Join the Imbari{" "}
                  <span className="text-emerald-300">Distribution Riders</span>
                </h1>
                <p className="text-base sm:text-lg max-w-xl mx-auto lg:mx-0 text-emerald-300 font-medium">
                  Imbari Coffee is building a pan-African distribution hub to
                  move specialty and instant coffee quickly and safely from
                  farms, roasteries and micro-brands to customers. Our branded
                  delivery bikes are the front line of that mission — and we are
                  hiring responsible, disciplined riders to lead the way.
                </p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-3 pt-2">
                  <a
                    href="#open-roles"
                    className="button-primary shadow-lg hover:scale-105 transition-transform"
                  >
                    View Rider Role
                  </a>
                  <a
                    href="#apply"
                    className="button-outline hover:border-emerald-400 hover:text-emerald-300 transition"
                  >
                    Apply Now
                  </a>
                </div>
              </div>
              <div className="hidden lg:block" />
            </div>
          </div>
        </section>

        {/* FEATURED CAREER IMAGE SECTION */}
        <section className="flex justify-center">
          <div className="relative w-full max-w-xl h-72 sm:h-96 bg-gradient-to-br from-emerald-400/30 via-white/10 to-emerald-900/20 rounded-3xl shadow-2xl border-4 border-emerald-300/40 overflow-hidden flex items-center justify-center">
            <Image
              src={withBasePath("/images/career.jpg")}
              alt="Imbari Coffee delivery bike"
              fill
              sizes="(max-width: 600px) 100vw, 600px"
              className="object-cover object-center scale-105 transition-transform duration-700 hover:scale-110"
              priority
            />
            <div className="absolute inset-0 rounded-3xl ring-4 ring-emerald-300/30 pointer-events-none" />
          </div>
        </section>

        {/* ABOUT THE DISTRIBUTION HUB */}
        <section className="card bg-[#050708] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-5 shadow-lg">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <h2 className="section-heading text-2xl sm:text-3xl font-bold text-emerald-200">
              Imbari Distribution Hub – Built for Africa’s Coffee Startups
            </h2>
            <p className="text-base sm:text-lg text-white">
              Our distribution hub operates a fleet of branded Imbari delivery
              motorcycles. These bikes are used to move green coffee, roasted
              beans, instant coffee and sampling kits for Imbari Coffee and for
              other coffee startups and roasteries across Africa.
            </p>
            <p className="text-base text-white">
              By joining our rider team, you are not only delivering parcels —
              you are powering a shared supply chain that small coffee brands
              can plug into, helping Africa's coffee entrepreneurs reach
              local and international markets.
            </p>
          </div>
        </section>

        {/* OPEN ROLE */}
        <section
          id="open-roles"
          className="card bg-[#050708] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-lg"
        >
          <header className="text-center space-y-2">
            <p className="badge inline-block mb-1">Open Role</p>
            <h2 className="section-heading text-2xl sm:text-3xl font-bold text-emerald-200">
              Motorcycle Delivery Rider – Imbari Distribution Hub
            </h2>
            <p className="text-base text-white max-w-2xl mx-auto">
              Location: Kampala (with planned rollout to other major African
              cities)
            </p>
          </header>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Responsibilities */}
            <div className="space-y-3 text-base text-white">
              <h3 className="font-semibold text-lg text-white">
                Key Responsibilities
              </h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  Safely collect and deliver coffee products (green, roasted,
                  instant and merchandise) to customers, warehouses and partner
                  brands.
                </li>
                <li>
                  Represent Imbari Coffee professionally on the road and at
                  every delivery point.
                </li>
                <li>
                  Use our mobile tools to confirm pickups, deliveries and
                  digital signatures.
                </li>
                <li>
                  Keep assigned Imbari bike clean, well-maintained and secure.
                </li>
                <li>
                  Communicate clearly with dispatch, customers and partner
                  startups about delivery status.
                </li>
              </ul>
            </div>

            {/* Requirements */}
            <div className="space-y-3 text-base text-white">
              <h3 className="font-semibold text-lg text-white">
                Minimum Requirements
              </h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Valid motorcycle riding license in your country.</li>
                <li>
                  Proven riding experience in urban and peri-urban environments.
                </li>
                <li>
                  Ability to read maps / use GPS and follow digital delivery
                  instructions.
                </li>
                <li>
                  Clean disciplinary record and willingness to undergo a{" "}
                  <strong>background check</strong>.
                </li>
                <li>
                  Strong personal integrity, punctuality and respect for traffic
                  laws.
                </li>
                <li>
                  Basic smartphone literacy (WhatsApp, maps, taking photos,
                  using apps).
                </li>
              </ul>
            </div>
          </div>

          {/* Safety & Culture */}
          <div className="border-t border-white/10 pt-6 grid gap-8 lg:grid-cols-2 text-base text-white">
            <div className="space-y-2">
              <h3 className="font-semibold text-lg text-white">
                Safety First – Always
              </h3>
              <p>
                All Imbari riders must wear helmets and approved riding gear,
                respect speed limits, and follow national traffic rules at all
                times. We do not tolerate dangerous riding, drunk driving or any
                form of harassment of passengers, customers or other road users.
              </p>
              <p>
                Bikes are inspected regularly and any mechanical issues must be
                reported immediately to dispatch. Your safety and the safety of
                the community come before speed.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-lg text-white">
                A Platform for Growth
              </h3>
              <p>
                Imbari riders are part of a growing logistics network that serves
                coffee startups, cafes and roasteries across Africa. High-
                performing riders may grow into team-lead, route-manager or hub
                supervisor roles as the network expands to new cities and
                countries.
              </p>
              <p>
                We pay fairly, on time, and we recognise reliability and
                professionalism.
              </p>
            </div>
          </div>
        </section>

        {/* APPLICATION FORM */}
        <section
          id="apply"
          className="card bg-gradient-to-br from-[#07110c] via-[#050708] to-[#1a2a1f] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-lg"
        >
          <header className="text-center space-y-2">
            <h2 className="section-heading text-2xl sm:text-3xl font-bold text-emerald-200">
              Apply to Ride with Imbari
            </h2>
            <p className="text-base text-white max-w-2xl mx-auto">
              Submit your details below and our team will contact shortlisted
              candidates for interviews and background verification.
            </p>
          </header>

          {/* Note: form is frontend-only for now; connect to backend or email later */}
          <form className="grid gap-5 md:grid-cols-2 text-base">
            <div className="space-y-2 md:col-span-1">
              <label className="block text-xs uppercase tracking-[0.18em] text-white">
                Full Name
              </label>
              <input
                type="text"
                className="w-full rounded-xl bg-black/40 border border-white/15 px-3 py-2 text-sm focus:outline-none focus:border-emerald-400"
                placeholder="Your full legal name"
              />
            </div>

            <div className="space-y-2 md:col-span-1">
              <label className="block text-xs uppercase tracking-[0.18em] text-white">
                Phone / WhatsApp
              </label>
              <input
                type="tel"
                className="w-full rounded-xl bg-black/40 border border-white/15 px-3 py-2 text-sm focus:outline-none focus:border-emerald-400"
                placeholder="+256 ..."
              />
            </div>

            <div className="space-y-2 md:col-span-1">
              <label className="block text-xs uppercase tracking-[0.18em] text-white">
                Email
              </label>
              <input
                type="email"
                className="w-full rounded-xl bg-black/40 border border-white/15 px-3 py-2 text-sm focus:outline-none focus:border-emerald-400"
                placeholder="you@example.com"
              />
            </div>

            <div className="space-y-2 md:col-span-1">
              <label className="block text-xs uppercase tracking-[0.18em] text-white">
                City / Area
              </label>
              <input
                type="text"
                className="w-full rounded-xl bg-black/40 border border-white/15 px-3 py-2 text-sm focus:outline-none focus:border-emerald-400"
                placeholder="e.g. Kampala, Wakiso, Nairobi"
              />
            </div>

            <div className="space-y-2 md:col-span-1">
              <label className="block text-xs uppercase tracking-[0.18em] text-white">
                Years of Riding Experience
              </label>
              <input
                type="number"
                min={0}
                className="w-full rounded-xl bg-black/40 border border-white/15 px-3 py-2 text-sm focus:outline-none focus:border-emerald-400"
                placeholder="e.g. 3"
              />
            </div>

            <div className="space-y-2 md:col-span-1">
              <label className="block text-xs uppercase tracking-[0.18em] text-white">
                License Number / Class
              </label>
              <input
                type="text"
                className="w-full rounded-xl bg-black/40 border border-white/15 px-3 py-2 text-sm focus:outline-none focus:border-emerald-400"
                placeholder="As shown on your riding permit"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="block text-xs uppercase tracking-[0.18em] text-white">
                Tell Us About Yourself
              </label>
              <textarea
                className="w-full rounded-xl bg-black/40 border border-white/15 px-3 py-2 text-sm focus:outline-none focus:border-emerald-400 min-h-[90px]"
                placeholder="Share any experience with deliveries, customer service, or logistics."
              />
            </div>

            <div className="md:col-span-2 flex flex-wrap items-center justify-between gap-4 pt-2">
              <p className="text-[11px] text-white max-w-md">
                By submitting this form you confirm that the information provided
                is true and that you are willing to undergo a background check
                as part of our safety policy.
              </p>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-full bg-emerald-400 text-black text-sm font-semibold hover:bg-emerald-300 transition"
              >
                Submit Application
              </button>
            </div>
          </form>

          <p className="text-[11px] text-center text-neutral-500 pt-3">
            Prefer email? Send your CV and license details to{" "}
            <a
              href="mailto:imbaricoffee@gmail.com?subject=Imbari%20Delivery%20Rider%20Application"
              className="text-emerald-300 hover:underline"
            >
              imbaricoffee@gmail.com
            </a>{" "}
            with subject line{" "}
            <span className="italic">“Imbari Delivery Rider Application”</span>.
          </p>
        </section>

        {/* REPORT A BAD DRIVER */}
        <section className="card bg-gradient-to-br from-[#2a0909] via-[#3a1a1a] to-[#1a0a0a] border border-red-700/60 rounded-3xl p-6 sm:p-8 space-y-6 shadow-lg">
          <header className="text-center space-y-2">
            <h2 className="section-heading text-xl sm:text-2xl text-red-100 font-bold">
              Report a Bad Driver or Safety Concern
            </h2>
            <p className="text-base text-red-100/80 max-w-2xl mx-auto">
              Imbari is serious about safety and respect on the road. If you
              experience or witness dangerous riding, harassment or misconduct
              involving an Imbari-branded bike, please report it here.
            </p>
          </header>

          <form className="grid gap-5 md:grid-cols-2 text-base">
            <div className="space-y-2 md:col-span-1">
              <label className="block text-xs uppercase tracking-[0.18em] text-red-100/80">
                Your Name (optional)
              </label>
              <input
                type="text"
                className="w-full rounded-xl bg-black/50 border border-red-400/60 px-3 py-2 text-sm focus:outline-none focus:border-red-300"
                placeholder="You may leave this blank"
              />
            </div>

            <div className="space-y-2 md:col-span-1">
              <label className="block text-xs uppercase tracking-[0.18em] text-red-100/80">
                Phone / Email (optional)
              </label>
              <input
                type="text"
                className="w-full rounded-xl bg-black/50 border border-red-400/60 px-3 py-2 text-sm focus:outline-none focus:border-red-300"
                placeholder="For follow-up if needed"
              />
            </div>

            <div className="space-y-2 md:col-span-1">
              <label className="block text-xs uppercase tracking-[0.18em] text-red-100/80">
                Bike Plate or Rider ID
              </label>
              <input
                type="text"
                className="w-full rounded-xl bg-black/50 border border-red-400/60 px-3 py-2 text-sm focus:outline-none focus:border-red-300"
                placeholder="Registration number or any identifier"
              />
            </div>

            <div className="space-y-2 md:col-span-1">
              <label className="block text-xs uppercase tracking-[0.18em] text-red-100/80">
                Date & Location
              </label>
              <input
                type="text"
                className="w-full rounded-xl bg-black/50 border border-red-400/60 px-3 py-2 text-sm focus:outline-none focus:border-red-300"
                placeholder="e.g. 12 May 2025, Jinja Road, Kampala"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="block text-xs uppercase tracking-[0.18em] text-red-100/80">
                What Happened?
              </label>
              <textarea
                className="w-full rounded-xl bg-black/50 border border-red-400/60 px-3 py-2 text-sm focus:outline-none focus:border-red-300 min-h-[90px]"
                placeholder="Describe the behaviour or incident in as much detail as possible."
              />
            </div>

            <div className="md:col-span-2 flex items-center justify-between flex-wrap gap-4">
              <p className="text-[11px] text-red-100/70 max-w-md">
                We review every report seriously. Providing accurate details
                helps us protect the public and maintain a high standard for
                Imbari riders.
              </p>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-full bg-red-500 text-black text-base font-semibold hover:bg-red-400 transition"
              >
                Submit Report
              </button>
            </div>
          </form>
        </section>

        {/* BACK TO OTHER PAGES */}
        <div className="flex justify-center gap-4 text-xs text-white pt-8">
          <Link href="/products" className="hover:text-emerald-300">
            Explore Imbari Products
          </Link>
          <span>•</span>
          <Link href="/our-impact" className="hover:text-emerald-300">
            View Our Impact
          </Link>
        </div>
      </div>
    </main>
  );
}




