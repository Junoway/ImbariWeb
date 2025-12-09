"use client";

import { KahawaDivider, KahawaMotif } from "@/components/KahawaAssets";
import { useState } from "react";
import emailjs from "@emailjs/browser";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    country: "",
    productInterest: "Arabica",
    volumes: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      // Initialize EmailJS with public key
      emailjs.init("VR5vwO_VVQQML0jZ5");

      // Send to both emails via EmailJS template
      await emailjs.send(
        "service_aos7b6k",
        "template_dt4cyeh",
        {
          from_name: formData.name,
          company: formData.company,
          email: formData.email,
          country: formData.country,
          product_interest: formData.productInterest,
          expected_volumes: formData.volumes,
          message: formData.message,
        }
      );

      setSuccess(true);
      setFormData({
        name: "",
        company: "",
        email: "",
        country: "",
        productInterest: "Arabica",
        volumes: "",
        message: "",
      });
    } catch (err) {
      console.error("Failed to send message:", err);
      setError("Failed to send message. Please try again or email us directly.");
    } finally {
      setLoading(false);
    }
  };

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

          <form onSubmit={handleSubmit} className="card p-6 sm:p-7 text-sm text-neutral-200 space-y-4 flex flex-col items-center text-center">
            <h2 className="font-semibold text-amber-200 mb-1">
              Wholesale / Distribution Request Form
            </h2>
            
            {success && (
              <div className="w-full p-4 rounded-lg bg-green-900/50 border border-green-500 text-green-200 text-sm">
                ✅ Thank you! Your inquiry has been sent. We'll get back to you soon.
              </div>
            )}
            
            {error && (
              <div className="w-full p-4 rounded-lg bg-red-900/50 border border-red-500 text-red-200 text-sm">
                ⚠️ {error}
              </div>
            )}
            
            <div className="grid gap-3 sm:grid-cols-2 w-full">
              <div className="space-y-1 flex flex-col items-center text-center">
                <label className="text-xs text-neutral-300">Name *</label>
                <input
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-lg bg-[#120b08] border border-coffee-dark/70 px-3 py-2 text-xs outline-none focus:border-coffee-accent"
                  placeholder="Your full name"
                />
              </div>
              <div className="space-y-1 flex flex-col items-center text-center">
                <label className="text-xs text-neutral-300">Company *</label>
                <input
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full rounded-lg bg-[#120b08] border border-coffee-dark/70 px-3 py-2 text-xs outline-none focus:border-coffee-accent"
                  placeholder="Company name"
                />
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 w-full">
              <div className="space-y-1 flex flex-col items-center text-center">
                <label className="text-xs text-neutral-300">Email *</label>
                <input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-lg bg-[#120b08] border border-coffee-dark/70 px-3 py-2 text-xs outline-none focus:border-coffee-accent"
                  placeholder="you@example.com"
                />
              </div>
              <div className="space-y-1 flex flex-col items-center text-center">
                <label className="text-xs text-neutral-300">Country *</label>
                <input
                  required
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full rounded-lg bg-[#120b08] border border-coffee-dark/70 px-3 py-2 text-xs outline-none focus:border-coffee-accent"
                  placeholder="Country of operation"
                />
              </div>
            </div>

            <div className="space-y-1 w-full flex flex-col items-center text-center">
              <label className="text-xs text-neutral-300">Product Interest *</label>
              <select 
                required
                value={formData.productInterest}
                onChange={(e) => setFormData({ ...formData, productInterest: e.target.value })}
                className="w-full rounded-lg bg-[#120b08] border border-coffee-dark/70 px-3 py-2 text-xs outline-none focus:border-coffee-accent"
              >
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
                value={formData.volumes}
                onChange={(e) => setFormData({ ...formData, volumes: e.target.value })}
                className="w-full rounded-lg bg-[#120b08] border border-coffee-dark/70 px-3 py-2 text-xs outline-none focus:border-coffee-accent"
                placeholder="e.g. 1 container / month, 500 cartons / quarter"
              />
            </div>

            <div className="space-y-1 w-full flex flex-col items-center text-center">
              <label className="text-xs text-neutral-300">Additional Notes *</label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full rounded-lg bg-[#120b08] border border-coffee-dark/70 px-3 py-2 text-xs outline-none focus:border-coffee-accent resize-none"
                placeholder="Tell us about your brand, channels, and timelines."
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="button-primary w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Sending..." : "Submit Inquiry"}
            </button>
            <p className="text-[11px] text-neutral-500">
              Your inquiry will be sent to imbaricoffee@gmail.com and info@imbaricoffee.com
            </p>
          </form>
        </section>
      </div>
    </main>
  );
}
