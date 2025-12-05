import Link from "next/link";
import Image from "next/image";
import ImpactChatBot from "@/components/ImpactChatBot";

export default function Footer() {
  return (
    <>
      <footer className="bg-gradient-to-b from-[#0a1813] via-[#010a07] to-black border-t border-white/10 pt-20 pb-10">
        <div className="main-container grid gap-12 md:grid-cols-4">
          {/* BRAND + DESCRIPTION */}
          <div className="flex flex-col items-start gap-5">
            <Image
              src="/images/logo-foot.jpg"
              alt="Imbari Coffee Logo"
              width={90}
              height={90}
              className="rounded-xl shadow-lg border border-white/10"
            />
            <p className="text-sm text-neutral-400 leading-relaxed max-w-xs">
              <span className="font-semibold text-white">Imbari Coffee</span> —
              Africa’s Premium Coffee, Perfected.
              <br />
              Specialty Arabica, Fine Robusta & Instant Coffee manufactured and
              exported from Uganda.
            </p>
            <a
              href="https://ugandacoffee.go.ug/sites/default/files/2024-07/Uganda%20Coffee%20Roasters%20Company%20Profile%20Catalogue%20July%202024.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-2 px-3 py-2 rounded-lg border border-emerald-700/40 bg-emerald-900/20 text-emerald-200 text-xs font-semibold hover:bg-emerald-900/40 transition"
            >
              <svg
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M12 19V5M5 12l7 7 7-7" />
              </svg>
              UCDA Registered Exporter
            </a>
          </div>

          {/* NAVIGATION */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4 tracking-wide">
              Explore
            </h3>
            <ul className="grid grid-cols-2 gap-2 text-sm text-neutral-300">
              <li>
                <Link
                  href="/"
                  className="hover:text-emerald-300 transition"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-emerald-300 transition"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/our-impact"
                  className="hover:text-emerald-300 transition"
                >
                  Our Impact
                </Link>
              </li>
              <li>
                <Link
                  href="/imbari-story"
                  className="hover:text-emerald-300 transition"
                >
                  Imbari Story
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="hover:text-emerald-300 transition"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/shop"
                  className="hover:text-emerald-300 transition"
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  href="/checkout"
                  className="hover:text-emerald-300 transition"
                >
                  Checkout
                </Link>
              </li>
              <li>
                <Link
                  href="/value-chain"
                  className="hover:text-emerald-300 transition"
                >
                  Value Chain
                </Link>
              </li>
              <li>
                <Link
                  href="/certifications"
                  className="hover:text-emerald-300 transition"
                >
                  Certifications
                </Link>
              </li>
              <li>
                <Link
                  href="/distribution"
                  className="hover:text-emerald-300 transition"
                >
                  Distribution
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="hover:text-emerald-300 transition"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-emerald-300 transition"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* SOCIAL MEDIA */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4 tracking-wide">
              Connect
            </h3>
            <div className="flex gap-3 mb-4">
              <a
                href="https://www.instagram.com/imbaricoffeecorp?igsh=MXg5cmFmcmJkcmJieA=="
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="rounded-full bg-emerald-900/30 border border-emerald-400/30 p-2 hover:bg-emerald-500/20 transition"
              >
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  viewBox="0 0 24 24"
                >
                  <rect
                    x="2"
                    y="2"
                    width="20"
                    height="20"
                    rx="6"
                  />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="17.5" cy="6.5" r="1.5" />
                </svg>
              </a>
              <a
                href="https://x.com/imbaricoffee?s=11"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter/X"
                className="rounded-full bg-emerald-900/30 border border-emerald-400/30 p-2 hover:bg-emerald-500/20 transition"
              >
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  viewBox="0 0 24 24"
                >
                  <path d="M4 4l16 16M20 4L4 20" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/share/1TN8AeuTRE/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="rounded-full bg-emerald-900/30 border border-emerald-400/30 p-2 hover:bg-emerald-500/20 transition"
              >
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  viewBox="0 0 24 24"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H6v4h4v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
            </div>
            <p className="text-xs text-neutral-400">
              Follow us for updates, stories, and impact.
            </p>
          </div>

          {/* CONTACT BLOCK */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4 tracking-wide">
              Contact
            </h3>
            <div className="space-y-2 text-sm text-neutral-300">
              <div>
                <span className="font-semibold text-white">
                  Imbari Coffee Inc.
                </span>
                <br />
                P.O. Box 119199
                <br />
                Plot 29 Kampala Road
                <br />
                Uganda, East African Community (EAC)
              </div>
              <div>
                <span className="font-semibold">Tel:</span>{" "}
                <a
                  href="tel:+256779344894"
                  className="hover:text-emerald-300 transition"
                >
                  +256 779 344 894
                </a>
                <br />
                <span className="font-semibold">WhatsApp:</span>{" "}
                <a
                  href="tel:+256779344984"
                  className="hover:text-emerald-300 transition"
                >
                  +256 779 344 984
                </a>
              </div>
              <div>
                <span className="font-semibold">Email:</span>
                <br />
                <a
                  href="mailto:imbaricoffee@gmail.com"
                  className="hover:text-emerald-300 transition"
                >
                  imbaricoffee@gmail.com
                </a>
                <br />
                <a
                  href="mailto:info@imbaricoffee.com"
                  className="hover:text-emerald-300 transition"
                >
                  info@imbaricoffee.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* DIVIDER / COPYRIGHT */}
        <div className="main-container mt-14 border-t border-white/10 pt-8 flex flex-col items-center">
          <p className="text-center text-xs text-neutral-500">
            © {new Date().getFullYear()} Imbari Coffee. All Rights Reserved.
          </p>
          <div className="mt-2 text-xs text-neutral-400 flex gap-4">
            <Link href="/legal" className="hover:text-emerald-300 underline transition">Legal</Link>
          </div>
        </div>
      </footer>

      {/* FLOATING CHAT WIDGET */}
      <ImpactChatBot />
    </>
  );
}
