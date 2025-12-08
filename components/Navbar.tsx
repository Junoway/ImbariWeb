"use client";

import Link from "next/link";
import Image from "next/image";
import { withBasePath } from "@/lib/utils";
import { useState } from "react";
import { useCart } from "@/components/CartContext";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { totalQuantity } = useCart() || { totalQuantity: 0 };

  return (
    <header className="relative z-50 border-b border-white/10 bg-[#050403]/95 backdrop-blur-md">
      <div className="main-container relative flex items-center justify-between py-3 sm:py-4">

        {/* LOGO */}
        <Link href="/" className="flex items-center mr-2">
          <Image
            src={withBasePath("/images/logo-main.jpg")}
            alt="Imbari Coffee logo"
            width={56}
            height={56}
            className="rounded-full border border-white/20 shadow-md"
          />
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-neutral-100 flex-1 justify-center">
          <Link href="/about" className="hover:text-emerald-300 transition">About</Link>
          <Link href="/our-impact" className="hover:text-emerald-300 transition">Our Impact</Link>
          <Link href="/imbari-story" className="hover:text-emerald-300 transition">Imbari Story</Link>
          <Link href="/products" className="hover:text-emerald-300 transition">Products</Link>
          <Link href="/shop" className="hover:text-emerald-300 transition">Shop</Link>
          <Link href="/distribution" className="hover:text-emerald-300 transition">Distribution</Link>
          <Link href="/contact" className="hover:text-emerald-300 transition">Contact</Link>
        </nav>

        {/* RIGHT SIDE (CART + MENU) */}
        <div className="flex items-center gap-8 ml-auto relative">
          {/* MENU BUTTON – now with 'MORE' text and animation */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle navigation"
            className="flex items-center justify-center w-20 h-12 rounded-full border-2 border-[#C8B06A] bg-gradient-to-tr from-[#7C5A2A] via-[#C8B06A] to-[#3C2A14] hover:from-[#C8B06A] hover:to-[#7C5A2A] transition shadow-lg group"
            type="button"
          >
            <span className="text-[#C8B06A] font-bold text-lg tracking-wide transition-transform duration-300 group-hover:scale-110 group-hover:animate-pulse">
              MORE
            </span>
          </button>

          {/* CART ICON */}
          <Link
            href="/checkout"
            aria-label="Go to checkout"
            className="flex items-center justify-center w-10 h-10 rounded-full border border-emerald-400/60 bg-black/40 hover:bg-emerald-500/10 transition shadow relative"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#6ee7b7"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 6h15l-1.5 8.5H7.5L6 6z" />
              <circle cx="9" cy="18.5" r="1" />
              <circle cx="17" cy="18.5" r="1" />
              <path d="M6 6L5 3H3" />
            </svg>

            {totalQuantity > 0 && (
              <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-xs font-bold rounded-full px-1.5 py-0.5 shadow-lg">
                {totalQuantity}
              </span>
            )}
          </Link>

          {/* MOBILE MENU DROPDOWN */}
          {open && (
            <div className="absolute right-0 top-[60px] z-40 w-72 rounded-2xl border border-emerald-300 bg-gradient-to-br from-[#050403] via-emerald-900 to-emerald-700 shadow-2xl backdrop-blur-xl py-4 text-base text-neutral-100 animate-fade-in">
              <div className="px-6 py-3 border-b border-emerald-400 flex items-center gap-3 animate-slide-down">
                <Image
                  src={withBasePath("/images/logo-main.jpg")}
                  alt="Imbari Coffee logo"
                  width={36}
                  height={36}
                  className="rounded-full border border-emerald-300 shadow-md"
                />
                <span className="font-extrabold text-emerald-200 text-xl tracking-wide">
                  Imbari Coffee
                </span>
              </div>

              <div className="py-2 px-4 flex flex-col gap-1">
                <MobileItem href="/about" onClick={() => setOpen(false)}>About</MobileItem>
                <MobileItem href="/our-impact" onClick={() => setOpen(false)}>Our Impact</MobileItem>
                <MobileItem href="/imbari-story" onClick={() => setOpen(false)}>Our Story</MobileItem>
                <MobileItem href="/products" onClick={() => setOpen(false)}>Products</MobileItem>
                <MobileItem href="/shop" onClick={() => setOpen(false)}>Shop</MobileItem>
                <MobileItem href="/distribution" onClick={() => setOpen(false)}>Distribution</MobileItem>
                <MobileItem href="/contact" onClick={() => setOpen(false)}>Contact</MobileItem>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

function MobileItem({ href, children, onClick }: any) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block px-4 py-2 hover:bg-white/5 transition font-semibold text-emerald-100 hover:text-emerald-300"
    >
      {children}
    </Link>
  );
}
