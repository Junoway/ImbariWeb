"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const heroImages = [
	{
		src: "/mt-elgon.jpg",
		alt: "Mt. Elgon region where Imbari Coffee is grown",
	},
	{
		src: "/farm.jpg",
		alt: "Coffee harvest at Imbari Coffee farms",
	},
	{
		src: "/warehouse.jpg",
		alt: "Imbari Coffee warehouse with export-ready sacks",
	},
];

export default function Hero() {
	const [index, setIndex] = useState(0);

	// auto-rotate every 6 seconds
	useEffect(() => {
		const id = setInterval(() => {
			setIndex((prev) => (prev + 1) % heroImages.length);
		}, 6000);
		return () => clearInterval(id);
	}, []);

	const current = heroImages[index];

	return (
		<section className="relative w-full min-h-screen flex items-center justify-center">
			{/* Background Image */}
			<Image
				key={current.src}
				src={current.src}
				alt={current.alt}
				fill
				priority={index === 0}
				className="object-cover w-full h-full absolute inset-0 z-0 transition-opacity duration-700 rounded-none"
			/>
			{/* Overlay Tint */}
			<div className="absolute inset-0 bg-black/70 z-10" />
			{/* Centered Content */}
			<div className="relative z-20 w-full flex flex-col items-center justify-center h-full px-4">
				<p className="badge mb-4 text-center">
					Uganda Specialty Coffee Exporter
				</p>
				<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-center text-white drop-shadow-lg">
					Africa’s Premium Coffee,
					<br />
					<span className="text-emerald-300">Perfected.</span>
				</h1>
				<p className="mt-5 text-base sm:text-lg text-neutral-200 max-w-2xl text-center drop-shadow">
					From the volcanic slopes of Mt. Elgon and the Rwenzori Mountains,
					Imbari Coffee produces and exports world-class Arabica, fine Robusta,
					and next-generation instant coffees — sustainably grown, expertly
					processed, and delivered globally with uncompromising quality.
				</p>
				<div className="mt-8 flex flex-wrap gap-4 justify-center">
					<Link
						href="/contact"
						className="button-primary text-center"
					>
						Request Wholesale Pricing
					</Link>
					<Link
						href="/distribution"
						className="button-outline text-center"
					>
						Become a Distributor
					</Link>
				</div>
				<p className="mt-4 text-xs text-neutral-100 max-w-md text-center drop-shadow">
					Serving importers, roasters, retailers, coffee brands, hotels, cafés,
					and FMCG distributors across Africa, Europe, North America, China,
					India, and the Middle East.
				</p>
			</div>
			{/* Dots indicator */}
			<div className="absolute bottom-6 right-6 flex gap-1.5 z-30">
				{heroImages.map((_, i) => (
					<span
						key={i}
						className={`h-2 w-2 rounded-full ${
							i === index ? "bg-emerald-300" : "bg-white/40"
						}`}
					/>
				))}
			</div>
		</section>
	);
}

