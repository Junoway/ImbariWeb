"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/components/CartContext";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

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
        <div className="flex items-center gap-4 ml-auto">
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
              className="flex items-center justify-center w-10 h-10 rounded-full border border-emerald-400 bg-gradient-to-tr from-emerald-500 via-emerald-400 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 transition shadow-lg"
            >
              {!open ? (
                <Bars3Icon className="w-7 h-7 text-white drop-shadow" />
              ) : (
                <XMarkIcon className="w-7 h-7 text-white drop-shadow" />
              )}
            </button>

            {/* MOBILE DROPDOWN MENU */}
            {open && (
              <div className="absolute right-0 mt-2 z-40 w-72 rounded-2xl border border-emerald-300 bg-gradient-to-br from-[#050403] via-emerald-900 to-emerald-700 shadow-2xl backdrop-blur-xl py-4 text-base text-neutral-100 animate-fade-in">
                <div className="px-6 py-3 border-b border-emerald-400 flex items-center gap-3 animate-slide-down">
                  <Image
                    src="/images/logo-main.jpg"
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
                  <MobileItem href="/about" onClick={() => setOpen(false)}>
                    <span className="font-semibold text-emerald-100 hover:text-emerald-300 transition">
                      About
                    </span>
                  </MobileItem>
                  <MobileItem href="/our-impact" onClick={() => setOpen(false)}>
                    <span className="font-semibold text-emerald-100 hover:text-emerald-300 transition">
                      Our Impact
                    </span>
                  </MobileItem>
                  <MobileItem href="/imbari-story" onClick={() => setOpen(false)}>
                    <span className="font-semibold text-emerald-100 hover:text-emerald-300 transition">
                      Our Story
                    </span>
                  </MobileItem>
                  <MobileItem href="/products" onClick={() => setOpen(false)}>
                    <span className="font-semibold text-emerald-100 hover:text-emerald-300 transition">
                      Products
                    </span>
                  </MobileItem>
                  <MobileItem href="/shop" onClick={() => setOpen(false)}>
                    <span className="font-semibold text-emerald-100 hover:text-emerald-300 transition">
                      Shop
                    </span>
                  </MobileItem>
                  <MobileItem href="/distribution" onClick={() => setOpen(false)}>
                    <span className="font-semibold text-emerald-100 hover:text-emerald-300 transition">
                      Distribution
                    </span>
                  </MobileItem>
                  <MobileItem href="/contact" onClick={() => setOpen(false)}>
                    <span className="font-semibold text-emerald-100 hover:text-emerald-300 transition">
                      Contact
                    </span>
                  </MobileItem>
                </div>
                <div className="border-t border-emerald-400 mt-2 pt-2 px-4">
                  <MobileItem href="/checkout" onClick={() => setOpen(false)}>
                    <span className="inline-flex items-center gap-2 font-semibold text-emerald-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#6ee7b7"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="drop-shadow"
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

/* Add to global CSS or Tailwind config:
.animate-slide-down { animation: slideDown 0.5s cubic-bezier(0.23, 1, 0.32, 1); }
@keyframes slideDown { 0% { opacity: 0; transform: translateY(-24px); } 100% { opacity: 1; transform: translateY(0); } }
*/
