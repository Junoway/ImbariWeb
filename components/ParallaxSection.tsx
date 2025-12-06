import React from "react";
import Image from "next/image";

// ParallaxSection: Reusable section with parallax effect, SVG divider, and motif overlay
export default function ParallaxSection({
  image,
  children,
  motif,
  divider,
  overlayColor = "rgba(60, 40, 20, 0.45)",
  height = "60vh",
  reverse = false,
}: {
  image: string;
  children: React.ReactNode;
  motif?: React.ReactNode;
  divider?: React.ReactNode;
  overlayColor?: string;
  height?: string;
  reverse?: boolean;
}) {
  return (
    <section
      className="relative overflow-hidden flex items-center justify-center w-full"
      style={{ height }}
    >
      {/* Parallax background image */}
      <div
        className={`absolute inset-0 w-full h-full will-change-transform z-0`}
        style={{
          transform: `translateY(0px)`,
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          transition: "transform 0.5s cubic-bezier(.25,.8,.25,1)",
        }}
        data-parallax
      />
      {/* Overlay for premium effect */}
      <div
        className="absolute inset-0 z-10"
        style={{ background: overlayColor }}
      />
      {/* Motif overlay (SVG, etc.) */}
      {motif && (
        <div className="absolute inset-0 z-20 pointer-events-none opacity-70">
          {motif}
        </div>
      )}
      {/* Content */}
      <div className="relative z-30 w-full max-w-4xl px-6 py-12 flex flex-col items-center justify-center text-center">
        {children}
      </div>
      {/* Custom SVG divider */}
      {divider && (
        <div className={`absolute ${reverse ? "top-0" : "bottom-0"} left-0 w-full z-40 pointer-events-none`}>{divider}</div>
      )}
    </section>
  );
}

// Usage: See page files for examples. Add data-parallax to enable JS transform effect.
