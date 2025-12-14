// app/our-impact/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { withBasePath } from "@/lib/utils";
import ImpactChatBot from "@/components/ImpactChatBot";
import { KahawaDivider, KahawaMotif } from "@/components/KahawaAssets";

export default function OurImpactPage() {
  return (
    <main className="bg-white min-h-screen">
      <div className="flex flex-col items-center justify-center text-center pt-10 pb-6 gap-4">
        <h1 className="text-4xl font-bold">Our Impact</h1>
        <p className="mb-2 text-lg">Empowering communities and sustainability.</p>
        <div className="flex gap-4">
          <button className="bg-[#10b981] hover:bg-[#22c55e] text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-all duration-200 mb-0">
            See Our Impact
          </button>
          <button className="bg-white border-2 border-[#10b981] text-[#10b981] font-semibold py-3 px-8 rounded-full shadow hover:bg-[#f0fdf4] transition-all duration-200 mb-0">
            Get Involved
          </button>
        </div>
      </div>

      <section className="main-container py-20 pb-32 space-y-24 max-w-7xl mx-auto">
        {/* HERO */}
        <header className="max-w-4xl mx-auto text-center space-y-4">
          <p className="badge mb-2">Our Impact</p>
          <h1 className="text-4xl sm:text-5xl font-semibold leading-tight">
            "Coffee as Unifying Force"
            <br />
            <span className="text-emerald-300"> </span>
          </h1>
          <p className="text-base sm:text-lg text-white max-w-2xl mx-auto">
            Imbari Coffee is building more than a supply chain. We are building a
            covenant between African farmers, African women, African markets, and
            global buyers — using coffee as a bridge for dignity, income, and
            unity across the continent.
          </p>
        </header>

        {/* KEY IMPACT PILLARS */}
        <section className="grid gap-12 md:grid-cols-2 w-full items-center">
          {/* TEXT PILLARS */}
          <div className="flex flex-col gap-12">
            <div className="card p-16 text-center flex flex-col items-center bg-gradient-to-br from-black/80 via-neutral-900 to-black/90 border border-emerald-500/10 shadow-2xl rounded-3xl min-h-[44vh] h-full">
              <h2 className="text-2xl font-semibold text-emerald-200 mb-4">
                Women at the Center of the Value Chain
              </h2>
              <p className="text-base text-white max-w-lg mx-auto mb-6">
                In Bugisu, Kween, and other Mt. Elgon communities, women are
                often the backbone of coffee production but the last to see the
                financial rewards. Imbari is changing that.
              </p>
              <div className="grid gap-4 w-full">
                <div className="bg-white/5 rounded-xl px-8 py-5 text-base text-white font-medium shadow-lg">
                  Prioritizing women-led cooperatives in sourcing
                </div>
                <div className="bg-white/5 rounded-xl px-8 py-5 text-base text-white font-medium shadow-lg">
                  Training programs in agronomy, quality, and finance
                </div>
                <div className="bg-white/5 rounded-xl px-8 py-5 text-base text-white font-medium shadow-lg">
                  Contracts that name and recognize women producers
                </div>
                <div className="bg-white/5 rounded-xl px-8 py-5 text-base text-white font-medium shadow-lg">
                  Story-first branding that celebrates African women in coffee
                </div>
              </div>
            </div>
            <div className="card p-16 text-center flex flex-col items-center bg-gradient-to-br from-black/80 via-neutral-900 to-black/90 border border-emerald-500/10 shadow-2xl rounded-3xl min-h-[44vh] h-full">
              <h2 className="text-2xl font-semibold text-emerald-200 mb-4">
                Farmer Empowerment, Not Just Procurement
              </h2>
              <p className="text-base text-white max-w-lg mx-auto mb-6">
                We treat farmers as partners, not suppliers. Imbari’s model
                focuses on long-term relationships and transparent pricing so
                that smallholder farmers can actually plan, invest, and grow.
              </p>
              <div className="grid gap-4 w-full">
                <div className="bg-white/5 rounded-xl px-8 py-5 text-base text-white font-medium shadow-lg">
                  Performance-based premiums for quality microlots
                </div>
                <div className="bg-white/5 rounded-xl px-8 py-5 text-base text-white font-medium shadow-lg">
                  Transparent cupping feedback and grading
                </div>
                <div className="bg-white/5 rounded-xl px-8 py-5 text-base text-white font-medium shadow-lg">
                  Multi-season purchasing commitments
                </div>
                <div className="bg-white/5 rounded-xl px-8 py-5 text-base text-white font-medium shadow-lg">
                  Direct introductions to foreign buyers where possible
                </div>
              </div>
            </div>
          </div>

          {/* IMAGE / VISUAL */}
          <div className="flex flex-col gap-8 items-center justify-center">
            <div className="relative h-80 w-full overflow-hidden rounded-3xl border border-white/10 bg-black/40 shadow-xl">
              <Image
                src={withBasePath("/images/farm.jpg")}
                alt="Women sorting and processing coffee at origin"
                fill
                className="object-cover"
              />
            </div>
            <p className="text-xs text-white max-w-md text-center">
              Imbari partners with smallholder communities across Mt. Elgon,
              Rwenzori, and Victoria basin coffee belts — focusing on women,
              youth, and underrepresented farming groups.
            </p>
          </div>
        </section>

        {/* CONNECTING FARMS TO FOREIGN MARKETS */}
        <section className="grid gap-12 md:grid-cols-3 w-full items-center">
          <div className="card p-16 text-center flex flex-col items-center bg-gradient-to-br from-black/80 via-neutral-900 to-black/90 border border-emerald-500/10 shadow-2xl rounded-3xl min-h-[44vh] h-full">
            <h2 className="text-2xl font-semibold text-emerald-200 mb-4">
              Export-Ready Supply Chains
            </h2>
            <p className="text-base text-white max-w-lg mx-auto">
              Imbari manages end-to-end export logistics — from parchment and
              green beans to roasted and instant coffee formats — ensuring that
              farmers can reliably reach buyers in Africa, Europe, USA, China,
              India, and the Middle East.
            </p>
          </div>
          <div className="card p-16 text-center flex flex-col items-center bg-gradient-to-br from-black/80 via-neutral-900 to-black/90 border border-emerald-500/10 shadow-2xl rounded-3xl min-h-[44vh] h-full">
            <h2 className="text-2xl font-semibold text-emerald-200 mb-4">
              Pan-African Distribution
            </h2>
            <p className="text-base text-white max-w-lg mx-auto">
              Using a growing network of distributors, retail partners, and
              hospitality clients, we aim to move African coffee across all 54
              African states — so African consumers experience African excellence
              first.
            </p>
          </div>
          <div className="card p-16 text-center flex flex-col items-center bg-gradient-to-br from-black/80 via-neutral-900 to-black/90 border border-emerald-500/10 shadow-2xl rounded-3xl min-h-[44vh] h-full">
            <h2 className="text-2xl font-semibold text-emerald-200 mb-4">
              Brand &amp; Private Label Support
            </h2>
            <p className="text-base text-white max-w-lg mx-auto">
              We work with emerging African brands, hotels, and retailers to create
              their own coffee lines — giving farmers stable demand and consumers
              more locally rooted choices.
            </p>
          </div>
        </section>

        {/* PAN-AFRICAN UNITY + 10% CHARITY */}
        <section className="grid gap-12 md:grid-cols-2 w-full items-center">
          <div className="flex flex-col gap-12">
            <div className="card p-16 text-center flex flex-col items-center bg-gradient-to-br from-black/80 via-neutral-900 to-black/90 border border-emerald-500/10 shadow-2xl rounded-3xl min-h-[44vh] h-full">
              <h2 className="text-2xl font-semibold text-emerald-200 mb-4">
                A 10% Impact Covenant
              </h2>
              <p className="text-base text-white max-w-lg mx-auto mb-6">
                Imbari is committed to dedicating up to{" "}
                <strong>10% of profits</strong> from select product lines and
                contracts to reinvest directly into:
              </p>
              <div className="grid gap-4 w-full">
                <div className="bg-white/5 rounded-xl px-8 py-5 text-base text-white font-medium shadow-lg">
                  Farmer training and capacity-building programs
                </div>
                <div className="bg-white/5 rounded-xl px-8 py-5 text-base text-white font-medium shadow-lg">
                  Women and youth entrepreneurship in coffee
                </div>
                <div className="bg-white/5 rounded-xl px-8 py-5 text-base text-white font-medium shadow-lg">
                  Community infrastructure in key coffee regions
                </div>
                <div className="bg-white/5 rounded-xl px-8 py-5 text-base text-white font-medium shadow-lg">
                  Cross-border initiatives that link African markets
                </div>
              </div>
            </div>
            <div className="card p-16 text-center flex flex-col items-center bg-gradient-to-br from-black/80 via-neutral-900 to-black/90 border border-emerald-500/10 shadow-2xl rounded-3xl min-h-[44vh] h-full">
              <h2 className="text-2xl font-semibold text-emerald-200 mb-4">
                One Continent, Many Origins
              </h2>
              <p className="text-base text-white max-w-lg mx-auto">
                Our long-term vision is to serve as a platform where African coffee
                brands — from Uganda, Ethiopia, Kenya, Rwanda, Burundi, Tanzania,
                Congo, and beyond — can plug into a shared distribution network
                and reach African and global markets together.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-8 items-center justify-center">
            <div className="relative h-80 w-full overflow-hidden rounded-3xl border border-white/10 bg-black/40 shadow-xl">
              <Image
                src={withBasePath("/images/export.jpg")}
                alt="Container export representing African coffee moving across borders"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="card p-10 sm:p-14 flex flex-col md:flex-row gap-8 md:items-center md:justify-between bg-gradient-to-br from-black/80 via-neutral-900 to-black/90 border border-emerald-500/10 shadow-2xl rounded-3xl mt-8">
          <div className="space-y-4 max-w-xl text-center md:text-left mx-auto md:mx-0">
            <h2 className="text-2xl font-semibold">
              Partner With Imbari on Impact
            </h2>
            <p className="text-base text-white">
              Whether you’re a roaster, retailer, hotel group, NGO, or foundation,
              we can design coffee programs that deliver measurable value to
              African farmers and communities while giving your customers
              world-class coffee.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 min-w-[220px] justify-center items-center">
            <Link href="/contact" className="button-primary text-center">
              Start an Impact Conversation
            </Link>
            <Link href="/shop" className="button-outline text-center">
              Explore Products &amp; Buy
            </Link>
          </div>
        </section>
      </section>

      {/* Floating Chatbot */}
      <ImpactChatBot />
    </main>
  );
}






