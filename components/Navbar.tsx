"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/components/CartContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { totalQuantity } = useCart() || { totalQuantity: 0 };

  return (
    <header className="border-b border-white/10 bg-[#050403]/95 backdrop-blur-md">
      <div className="main-container relative flex items-center justify-between py-3 sm:py-4">
        {/* LOGO LEFT */}
        <Link href="/" className="flex items-center mr-2">
          <Image
            src="/images/logo-main.jpg"
            alt="Imbari Coffee logo"
            width={56}
            height={56}
            className="rounded-full border border-white/20 shadow-md"
          />
        </Link>

        {/* DESKTOP NAV + CHECKOUT (md and up) */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-neutral-100 flex-1 justify-center">
          <Link href="/about" className="hover:text-emerald-300 transition">
            About
          </Link>
          <Link href="/our-impact" className="hover:text-emerald-300 transition">
            Our Impact
          </Link>
          <Link href="/imbari-story" className="hover:text-emerald-300 transition">
            Imbari Story
          </Link>
          <Link href="/products" className="hover:text-emerald-300 transition">
            Products
          </Link>
          <Link href="/shop" className="hover:text-emerald-300 transition">
            Shop
          </Link>
          <Link href="/distribution" className="hover:text-emerald-300 transition">
            Distribution
          </Link>
          <Link href="/contact" className="hover:text-emerald-300 transition">
            Contact
          </Link>
        </nav>

        {/* RIGHT SIDE ICONS (cart, menu) */}
        <div className="flex items-center gap-2 ml-auto">
          {/* CART ICON WITH COUNT */}
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

          {/* MENU BUTTON */}
          <div className="relative">
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle navigation"
              className="flex items-center justify-center w-10 h-10 rounded-full border border-white/15 bg-black/30 hover:bg-white/10 transition shadow"
            >
              {!open ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="white"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="opacity-90"
                >
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="white"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="opacity-90"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              )}
            </button>

            {/* MOBILE DROPDOWN MENU */}
            {open && (
              <div className="absolute right-0 mt-2 z-40 w-64 rounded-2xl border border-white/10 bg-[#050403]/98 shadow-2xl backdrop-blur-xl py-3 text-base text-neutral-100 animate-fade-in">
                <div className="px-5 py-2 border-b border-white/10 flex items-center gap-2">
                  <Image
                    src="/images/logo-main.jpg"
                    alt="Imbari Coffee logo"
                    width={32}
                    height={32}
                    className="rounded-full border border-white/20"
                  />
                  <span className="font-bold text-emerald-200 text-lg">
                    Imbari Coffee
                  </span>
                </div>
                <MobileItem href="/about" onClick={() => setOpen(false)}>
                  About
                </MobileItem>
                <MobileItem href="/our-impact" onClick={() => setOpen(false)}>
                  Our Impact
                </MobileItem>
                <MobileItem href="/imbari-story" onClick={() => setOpen(false)}>
                  Our Story
                </MobileItem>
                <MobileItem href="/products" onClick={() => setOpen(false)}>
                  Products
                </MobileItem>
                <MobileItem href="/shop" onClick={() => setOpen(false)}>
                  Shop
                </MobileItem>
                <MobileItem href="/distribution" onClick={() => setOpen(false)}>
                  Distribution
                </MobileItem>
                <MobileItem href="/contact" onClick={() => setOpen(false)}>
                  Contact
                </MobileItem>
                <div className="border-t border-white/10 mt-2 pt-2">
                  <MobileItem href="/checkout" onClick={() => setOpen(false)}>
                    <span className="inline-flex items-center gap-2 font-semibold text-emerald-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
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
                      Checkout
                    </span>
                  </MobileItem>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

/* MOBILE LINK COMPONENT */
function MobileItem({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block px-4 py-2 hover:bg-white/5 transition"
    >
      {children}
    </Link>
  );
}
