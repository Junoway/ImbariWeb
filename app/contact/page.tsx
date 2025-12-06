import { KahawaDivider, KahawaMotif } from "@/components/KahawaAssets";

export default function ContactPage() {
  return (
    <main className="bg-white min-h-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-6 text-center">Contact Us</h1>
        <p className="mb-8 text-lg text-center">We'd love to hear from you.</p>
        <div className="flex flex-col sm:flex-row gap-4 mb-6 w-full justify-center items-center">
          <button className="bg-[#10b981] hover:bg-[#22c55e] text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-all duration-200">
            Send Message
          </button>
          <button className="bg-white border-2 border-[#10b981] text-[#10b981] font-semibold py-3 px-8 rounded-full shadow hover:bg-[#f0fdf4] transition-all duration-200">
            Customer Support
          </button>
        </div>

        <header className="w-full flex flex-col items-center text-center mb-8">
          <p className="badge mb-3">Contact & Wholesale</p>
          <h1 className="section-heading">
            Let’s Build Something Exceptional Together
          </h1>
          <p className="section-subtitle">
            For wholesale, distribution, private label, or export inquiries, please
            share a few details about your company and requirements.
          </p>
        </header>

        <section className="grid gap-8 lg:grid-cols-2 w-full">
          <article className="card p-6 sm:p-7 text-sm text-neutral-200 space-y-3 flex flex-col items-center text-center">
            <h2 className="font-semibold text-amber-200">Direct Contact</h2>
            <p className="text-xs text-neutral-300">
              Email:{" "}
              <span className="font-mono">info@imbaricoffee.com</span>
            </p>
            <p className="text-xs text-neutral-300">
              Phone: <span className="font-mono">+256 779 344 984</span>
            </p>
            <p className="text-xs text-neutral-300">
              Office: 119199, Plot 29, Commercial Plaza, Kampala Rd, Uganda
              <br />
              Export Warehouse: (Add location when confirmed)
            </p>
          </article>

          <form className="card p-6 sm:p-7 text-sm text-neutral-200 space-y-4 flex flex-col items-center text-center">
            <h2 className="font-semibold text-amber-200 mb-1">
              Wholesale / Distribution Request Form
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 w-full">
              <div className="space-y-1 flex flex-col items-center text-center">
                <label className="text-xs text-neutral-300">Name</label>
                <input
                  className="w-full rounded-lg bg-[#120b08] border border-coffee-dark/70 px-3 py-2 text-xs outline-none focus:border-coffee-accent"
                  placeholder="Your full name"
                />
              </div>
              <div className="space-y-1 flex flex-col items-center text-center">
                <label className="text-xs text-neutral-300">Company</label>
                <input
                  className="w-full rounded-lg bg-[#120b08] border border-coffee-dark/70 px-3 py-2 text-xs outline-none focus:border-coffee-accent"
                  placeholder="Company name"
                />
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 w-full">
              <div className="space-y-1 flex flex-col items-center text-center">
                <label className="text-xs text-neutral-300">Email</label>
                <input
                  type="email"
                  className="w-full rounded-lg bg-[#120b08] border border-coffee-dark/70 px-3 py-2 text-xs outline-none focus:border-coffee-accent"
                  placeholder="you@example.com"
                />
              </div>
              <div className="space-y-1 flex flex-col items-center text-center">
                <label className="text-xs text-neutral-300">Country</label>
                <input
                  className="w-full rounded-lg bg-[#120b08] border border-coffee-dark/70 px-3 py-2 text-xs outline-none focus:border-coffee-accent"
                  placeholder="Country of operation"
                />
              </div>
            </div>

            <div className="space-y-1 w-full flex flex-col items-center text-center">
              <label className="text-xs text-neutral-300">Product Interest</label>
              <select className="w-full rounded-lg bg-[#120b08] border border-coffee-dark/70 px-3 py-2 text-xs outline-none focus:border-coffee-accent">
                <option>Arabica</option>
                <option>Robusta</option>
                <option>Instant Coffee</option>
                <option>Private Label</option>
                <option>Multiple / Not sure</option>
              </select>
            </div>

            <div className="space-y-1 w-full flex flex-col items-center text-center">
              <label className="text-xs text-neutral-300">Expected Volumes</label>
              <input
                className="w-full rounded-lg bg-[#120b08] border border-coffee-dark/70 px-3 py-2 text-xs outline-none focus:border-coffee-accent"
                placeholder="e.g. 1 container / month, 500 cartons / quarter"
              />
            </div>

            <div className="space-y-1 w-full flex flex-col items-center text-center">
              <label className="text-xs text-neutral-300">Additional Notes</label>
              <textarea
                rows={4}
                className="w-full rounded-lg bg-[#120b08] border border-coffee-dark/70 px-3 py-2 text-xs outline-none focus:border-coffee-accent resize-none"
                placeholder="Tell us about your brand, channels, and timelines."
              />
            </div>

            <button type="button" className="button-primary w-full sm:w-auto">
              Submit Inquiry (demo only)
            </button>
            <p className="text-[11px] text-neutral-500">
              This is a demo form on your local development site. Your developer
              can wire this to an email service or CRM later.
            </p>
          </form>
        </section>
      </div>
    </main>
  );
}
