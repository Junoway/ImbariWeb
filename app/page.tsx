"use client";
// app/page.tsx  (or pages/index.tsx)

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const heroSlides = [
  { src: "/images/mt-elgon.jpg", alt: "Uganda coffee farm 1" },
  { src: "/images/mt-elgon.jpg", alt: "Uganda coffee beans 2" },
  { src: "/images/mt-elgon.jpg", alt: "Uganda coffee harvest 3" },
  // add more as needed
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="bg-white text-neutral-900">
      {/* HERO SECTION with simple slider */}
      <section className="relative w-full h-screen overflow-hidden bg-red-200">
        {/* Mt. Elgon background image - always visible */}
        <div className="absolute inset-0 w-full h-full -z-10">
          <Image
            src="/images/mt-elgon.jpg"
            alt="Mt. Elgon background"
            fill
            className="object-cover object-center w-full h-full"
            priority
          />
        </div>
        {/* Slider images overlay - add opacity so background is always visible */}
        {heroSlides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 h-full w-full ${
              idx === currentSlide ? "opacity-100" : "opacity-0"
            }`}
            style={{ opacity: idx === currentSlide ? 0.4 : 0 }}
          >
            <div className="relative h-full w-full">
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                className="object-cover object-center"
                priority
              />
            </div>
          </div>
        ))}

        {/* Hero overlay content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
          <h1 style={{ color: '#fff', textShadow: '0 4px 32px #0008, 0 1px 0 #fff4' }} className="text-6xl sm:text-7xl md:text-8xl font-extrabold mb-4 animate-fade-in drop-shadow-2xl">
            Uganda Specialty Coffee Exporter
          </h1>
          <h2 style={{ color: '#fff', textShadow: '0 2px 16px #0006, 0 1px 0 #fff3' }} className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 animate-fade-in drop-shadow-xl">
            "Africa’s Premium Coffee"
          </h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/shop"
              style={{ color: '#fff' }}
              className="relative font-bold py-4 px-12 rounded-full shadow-2xl transition-all duration-300 text-2xl bg-yellow-400 hover:bg-yellow-500 border-4 border-white/60 focus:outline-none focus:ring-4 focus:ring-yellow-300 overflow-hidden group animate-fade-in"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-yellow-300 to-emerald-500 opacity-30 group-hover:opacity-50 transition-all duration-300 blur-xl"></span>
              <span className="relative flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-7 h-7 text-emerald-700 animate-pulse">
                  <path d="M6 19a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2H8a2 2 0 00-2 2v12zm2-12h8v12H8V7zm2 2v8h4V9h-4z" />
                </svg>
                Buy Coffee
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* BELOW-THE-FOLD CONTENT */}

      {/* Global Export & Distribution */}
      <section className="w-full bg-gradient-to-br from-yellow-100 via-emerald-50 to-white py-24 relative overflow-hidden">
        {/* Decorative motif background */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-yellow-200 via-emerald-100 to-transparent rounded-full blur-3xl opacity-40" />
          <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-to-tr from-emerald-200 via-yellow-100 to-transparent rounded-full blur-2xl opacity-30" />
        </div>
        <div className="max-w-5xl mx-auto px-4 flex flex-col items-center space-y-10 relative z-10">
          <header className="text-center">
            <h2 className="text-5xl sm:text-6xl font-extrabold text-emerald-600 mb-6 drop-shadow-lg animate-fade-in">
              Global Export & Distribution
            </h2>
            <p className="text-xl sm:text-2xl text-neutral-700 mb-8 font-medium animate-fade-in max-w-3xl mx-auto">
              <span className="bg-yellow-100 px-2 py-1 rounded-xl shadow-sm">From the volcanic slopes of Mt. Elgon and the Rwenzori Mountains</span>, Imbari Coffee produces and exports world-class <span className="text-emerald-600 font-semibold">Arabica</span>, <span className="text-emerald-700 font-semibold">fine Robusta</span>, and <span className="text-yellow-500 font-semibold">next-generation instant coffees</span> — sustainably grown, expertly processed, and delivered globally with uncompromising quality.
            </p>
          </header>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 animate-fade-in">
            <Link
              href="/contact"
              className="bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 hover:from-emerald-500 hover:to-emerald-700 text-white font-bold py-3 px-8 rounded-full shadow-xl transition-all duration-200 text-lg tracking-wide"
            >
              Request Wholesale Pricing
            </Link>
            <Link
              href="/distribution"
              className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-400 hover:from-yellow-400 hover:to-orange-500 text-emerald-900 font-bold py-3 px-8 rounded-full shadow-xl transition-all duration-200 text-lg tracking-wide"
            >
              Become a Distributor
            </Link>
          </div>
          <p className="mt-8 max-w-xl text-base text-neutral-700 text-center font-medium animate-fade-in">
            <span className="bg-white/60 px-2 py-1 rounded-lg">Serving importers, roasters, retailers, coffee brands, hotels, cafés, and FMCG distributors</span> across <span className="text-emerald-600 font-semibold">Africa</span>, <span className="text-yellow-600 font-semibold">Europe</span>, <span className="text-emerald-700 font-semibold">North America</span>, <span className="text-orange-500 font-semibold">China</span>, <span className="text-emerald-500 font-semibold">India</span>, and the <span className="text-yellow-500 font-semibold">Middle East</span>.
          </p>
        </div>
      </section>

      {/* Our Promise */}
      <section className="w-full py-24 px-4 bg-white relative overflow-hidden">
        {/* Decorative motif background */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-emerald-100 via-yellow-100 to-transparent rounded-full blur-2xl opacity-30" />
        </div>
        <div className="max-w-5xl mx-auto flex flex-col items-center space-y-10 relative z-10">
          <header className="text-center">
            <p className="uppercase text-lg text-emerald-600 mb-3 tracking-widest font-bold animate-fade-in">Our Promise</p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 text-neutral-900 drop-shadow-lg animate-fade-in">
              Exceptional Coffee. Ethical Sourcing. African Excellence.
            </h2>
            <p className="text-neutral-700 mb-8 text-lg animate-fade-in">
              Imbari Coffee is a vertically integrated coffee company committed to elevating Uganda’s most prized origins — <span className="text-emerald-600 font-semibold">Bugisu Arabica</span>, <span className="text-emerald-700 font-semibold">Rwenzori Robusta</span>, and <span className="text-yellow-500 font-semibold">Victoria-region microlots</span> — to global specialty standards.
            </p>
          </header>
          <div className="bg-gradient-to-br from-green-50 via-yellow-50 to-white p-8 sm:p-10 rounded-2xl shadow-2xl max-w-2xl space-y-6 animate-fade-in flex flex-col items-center text-center">
            <p className="text-neutral-800 text-lg font-medium text-center">
              We partner directly with <span className="text-emerald-600 font-semibold">smallholder farmers</span>, <span className="text-yellow-600 font-semibold">women-led cooperatives</span>, and <span className="text-emerald-700 font-semibold">micro-lot communities</span> to ensure traceability, transparency, and fair pricing at every step of the chain.
            </p>
            <div className="space-y-3 w-full flex flex-col items-center text-center">
              <div className="bg-white/80 border-l-4 border-emerald-400 px-4 py-2 rounded-lg shadow-sm font-semibold w-full">Direct farmer and cooperative partnerships</div>
              <div className="bg-white/80 border-l-4 border-yellow-400 px-4 py-2 rounded-lg shadow-sm font-semibold w-full">Traceable microlots and specialty profiles</div>
              <div className="bg-white/80 border-l-4 border-emerald-300 px-4 py-2 rounded-lg shadow-sm font-semibold w-full">Instant coffee manufacturing for export markets</div>
              <div className="bg-white/80 border-l-4 border-emerald-600 px-4 py-2 rounded-lg shadow-sm font-semibold w-full">Distribution capabilities across all 54 African states</div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Produce */}
      <section className="w-full py-20 px-4 bg-green-50">
        <div className="max-w-5xl mx-auto space-y-12">
          <header className="text-center">
            <p className="uppercase text-sm text-emerald-600 mb-2">What We Produce</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">Instant Coffee, Specialty Arabica & Fine Robusta</h2>
            <p className="text-neutral-800 text-sm sm:text-lg max-w-xl mx-auto">
              A consolidated platform for brands and buyers seeking reliable, high-quality Uganda specialty coffee and African instant coffee manufacturing.
            </p>
          </header>
          <div className="grid gap-8 md:grid-cols-3">
            {/* Instant Coffee */}
              <article className="bg-white rounded-2xl p-6 flex flex-col items-center text-center shadow-lg space-y-4">
                <div className="h-32 w-full relative">
                  <Image
                    src="/images/imbari-6b.jpg"
                  alt="Imbari Coffee packaged instant & roasted"
                  fill
                  className="object-cover rounded-xl"
                />
              </div>
              <h3 className="font-semibold text-green-700">Instant Coffee</h3>
              <p className="text-sm text-neutral-600">
                Premium freeze-dried and spray-dried instant coffee, export ready for FMCG brands, supermarkets, hotels, cafés.
              </p>
            </article>

            {/* Specialty Arabica */}
              <article className="bg-white rounded-2xl p-6 flex flex-col items-center text-center shadow-lg space-y-4">
                <div className="h-32 w-full relative">
                  <Image
                    src="/images/sort.jpg"
                  alt="Specialty Arabica drying beds"
                  fill
                  className="object-cover rounded-xl"
                />
              </div>
              <h3 className="font-semibold text-green-700">Specialty Arabica — Mt. Elgon</h3>
              <p className="text-sm text-neutral-600">
                High-altitude Arabica on volcanic soils, processed with care for clean, expressive cups.
              </p>
            </article>

            {/* Fine Robusta */}
              <article className="bg-white rounded-2xl p-6 flex flex-col items-center text-center shadow-lg space-y-4">
                <div className="h-32 w-full relative">
                  <Image
                    src="/images/farm.jpg"
                  alt="Ugandan Robusta coffee plantation"
                  fill
                  className="object-cover rounded-xl"
                />
              </div>
              <h3 className="font-semibold text-green-700">Fine Robusta — Rwenzori & Victoria Basin</h3>
              <p className="text-sm text-neutral-600">
                Strong, bold Robusta ideal for espresso, blends, and instant formulations.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Add more sections (e.g. footer) as needed */}
    </main>
  );
}
