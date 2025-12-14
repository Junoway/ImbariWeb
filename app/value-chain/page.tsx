import Image from "next/image";
import { FaSeedling, FaIndustry, FaCoffee, FaShippingFast, FaFlask } from "react-icons/fa";
import { KahawaDivider, KahawaMotif } from "@/components/KahawaAssets";

const stages = [
	{
		title: "Farming & Cooperative Partnerships",
		icon: <FaSeedling className="text-emerald-400 text-5xl animate-bounce" aria-label="Farming" />,
		image: "/images/farm.jpg",
		color: "from-green-700 via-green-500 to-green-300",
		points: [
			"Direct engagement with smallholder farmers",
			"Agronomy training and good agricultural practices",
			"Input support and quality incentives",
			"Focus on organic and low-chemical systems where viable",
			"Microlot sourcing for traceable premium profiles",
		],
	},
	{
		title: "Processing & Washing Stations",
		icon: <FaIndustry className="text-green-300 text-5xl animate-bounce" aria-label="Processing" />,
		image: "/images/warehouse.jpg",
		color: "from-amber-700 via-amber-500 to-amber-200",
		points: [
			"Washed, natural, and honey process capability",
			"Quality sorting and defect removal",
			"Moisture control and controlled drying",
			"Microlot grading and separate storage",
		],
	},
	{
		title: "Roasting & Cupping",
		icon: <FaCoffee className="text-amber-300 text-5xl animate-bounce" aria-label="Roasting" />,
		image: "/images/imbari-6b.jpg",
		color: "from-neutral-800 via-neutral-600 to-neutral-400",
		points: [
			"Sample roasting for buyers and QC",
			"Roast profiling tailored to market preferences",
			"Consistent sensory evaluation and cupping",
		],
	},
	{
		title: "Instant Coffee Manufacturing",
		icon: <FaFlask className="text-green-200 text-5xl animate-bounce" aria-label="Manufacturing" />,
		image: "/images/export.jpg",
		color: "from-green-900 via-green-700 to-green-400",
		points: [
			"Advanced extraction for flavor retention",
			"Freeze-drying and spray-drying capabilities",
			"Contract manufacturing for partner brands",
			"In-house quality control and batch testing",
		],
	},
	{
		title: "Export & Logistics",
		icon: <FaShippingFast className="text-white text-5xl animate-bounce" aria-label="Export" />,
		image: "/images/globe.svg",
		color: "from-black via-green-900 to-green-500",
		points: [
			"Global export routes to Africa, EU, USA, Asia, and the Middle East",
			"Phytosanitary certification and compliant documentation",
			"Customs clearing and shipping coordination",
			"Africa-wide distribution network for finished products",
		],
	},
];

export default function ValueChainPage() {
	return (
		<main className="bg-white min-h-screen">
			<div className="flex flex-col items-center justify-center text-center pt-10 pb-6 gap-4">
				<h1 className="text-4xl font-bold">Value Chain</h1>
				<p className="mb-2 text-lg">From farm to cup.</p>
				<div className="flex gap-4">
					<button className="bg-[#10b981] hover:bg-[#22c55e] text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-all duration-200 mb-0">
						Explore Value Chain
					</button>
					<button className="bg-white border-2 border-[#10b981] text-[#10b981] font-semibold py-3 px-8 rounded-full shadow hover:bg-[#f0fdf4] transition-all duration-200 mb-0">
						Learn More
					</button>
				</div>
			</div>

			<header className="text-center animate-fade-in-up">
				<p className="inline-block badge mb-3 bg-gradient-to-r from-green-500 to-emerald-400 text-white shadow-lg text-center">
					Our Value Chain
				</p>
				<h1 className="section-heading text-4xl font-extrabold text-white drop-shadow-lg mb-2 text-center">
					Farmer → Mill → Roast → Export
				</h1>
				<p className="section-subtitle text-lg text-neutral-200 max-w-xl mx-auto text-center">
					Imbari Coffee operates a vertically integrated value chain that keeps
					quality, traceability, and trust at the center of every process.
				</p>
			</header>

			{/* Value Chain Sections */}
			<section className="w-full max-w-6xl mt-12 mb-8 flex flex-col gap-12 items-center">
				<div className="text-center group">
					<h2 className="text-5xl font-extrabold text-[#C8B06A] mb-4 transition-colors duration-200 group-hover:text-yellow-400 cursor-pointer text-center">
						Value Chain
					</h2>
					<p className="text-2xl text-neutral-800 transition-colors duration-200 group-hover:text-emerald-600 cursor-pointer text-center">
						From farm to cup.
					</p>
				</div>
				<div className="text-center group">
					<h3 className="text-4xl font-bold text-[#7C5A2A] mb-2 transition-colors duration-200 group-hover:text-yellow-600 cursor-pointer text-center">
						Farming
					</h3>
					<p className="text-xl text-neutral-700 transition-colors duration-200 group-hover:text-emerald-600 cursor-pointer text-center">
						Sustainable practices and innovation.
					</p>
				</div>
				<div className="text-center group">
					<h3 className="text-4xl font-bold text-[#C8B06A] mb-2 transition-colors duration-200 group-hover:text-yellow-600 cursor-pointer text-center">
						Processing
					</h3>
					<p className="text-xl text-neutral-700 transition-colors duration-200 group-hover:text-emerald-600 cursor-pointer text-center">
						Quality control and expertise.
					</p>
				</div>
				<div className="text-center group">
					<h3 className="text-4xl font-bold text-[#C8B06A] mb-2 transition-colors duration-200 group-hover:text-yellow-600 cursor-pointer text-center">
						Export
					</h3>
					<p className="text-xl text-neutral-700 transition-colors duration-200 group-hover:text-emerald-600 cursor-pointer text-center">
						Global logistics and distribution.
					</p>
				</div>
				<div className="text-center group">
					<h3 className="text-4xl font-bold text-[#C8B06A] mb-2 transition-colors duration-200 group-hover:text-yellow-600 cursor-pointer text-center">
						Imbari Value
					</h3>
					<p className="text-xl text-neutral-700 transition-colors duration-200 group-hover:text-emerald-600 cursor-pointer text-center">
						Premium quality at every step.
					</p>
				</div>
			</section>

			{/* Animated Process Slides */}
			<section className="w-full max-w-6xl mt-12 mb-8">
				<div className="grid gap-8 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 items-stretch justify-between">
					{stages.map((stage, idx) => (
						<div
							key={stage.title}
							className={`glass-card flex-1 min-w-[220px] max-w-md p-6 flex flex-col items-center text-center transition-transform duration-300 hover:scale-105 animate-fade-in-up delay-[${idx}00ms] border-2 border-transparent bg-gradient-to-br ${stage.color} relative group shadow-xl`}
							tabIndex={0}
							aria-label={stage.title}
						>
							<div className="relative w-24 h-24 mb-3 rounded-xl overflow-hidden shadow-lg">
								<Image
									src={stage.image}
									alt={stage.title}
									fill
									className="object-cover group-hover:scale-110 transition-transform duration-500"
									sizes="96px"
								/>
								<div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm rounded-xl">
									{stage.icon}
								</div>
							</div>
							<h2 className="font-semibold text-amber-200 text-lg mb-4 drop-shadow-lg text-center">
								{stage.title}
							</h2>
							<div className="flex flex-col gap-3 w-full items-center">
								{stage.points.map((point, i) => (
									<div
										key={point}
										className={`process-step px-4 py-2 rounded-lg bg-white/10 backdrop-blur-md text-neutral-100 font-medium shadow-md transition-all duration-500 animate-slide-in-up delay-[${i * 120}ms] group-hover:bg-emerald-700/30 text-center`}
									>
										{point}
									</div>
								))}
							</div>
							{/* Timeline connector */}
							{idx < stages.length - 1 && (
								<div className="hidden lg:block absolute right-0 top-1/2 transform -translate-y-1/2 w-12 h-1 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-progress" />
							)}
						</div>
					))}
				</div>
			</section>

			{/* Call to Action */}
			<section className="mt-12 animate-fade-in-up delay-500">
				<div className="glass-card p-8 text-center max-w-2xl mx-auto shadow-xl">
					<h3 className="text-2xl font-bold text-green-300 mb-2 text-center">
						Ready to Experience the Imbari Difference?
					</h3>
					<p className="text-neutral-200 mb-4 text-center">
						Contact us to learn more about our value chain, sourcing, and
						partnership opportunities.
					</p>
					<a
						href="/contact"
						className="inline-block px-6 py-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-400 text-white font-semibold shadow-lg hover:scale-105 transition-transform focus:outline-emerald-400 text-center"
					>
						Get in Touch
					</a>
				</div>
			</section>
		</main>
	);
}

// Custom glassmorphism card style (add to global CSS or Tailwind config)
// .glass-card {
//   @apply bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 shadow-lg transition-all;
// }
// .process-step {
//   @apply transition-all duration-500;
// }
// .animate-fade-in-up {
//   animation: fadeInUp 1s cubic-bezier(0.23, 1, 0.32, 1);
// }
// @keyframes fadeInUp {
//   0% { opacity: 0; transform: translateY(40px); }
//   100% { opacity: 1; transform: translateY(0); }
// }
// .animate-bounce {
//   animation: bounce 1.2s infinite alternate;
// }
// @keyframes bounce {
//   0% { transform: translateY(0); }
//   100% { transform: translateY(-12px); }
// }
// .animate-progress {
//   animation: progressLine 1.2s cubic-bezier(0.23, 1, 0.32, 1);
// }
// @keyframes progressLine {
//   0% { width: 0; opacity: 0; }
//   100% { width: 3rem; opacity: 1; }
// }
// .animate-slide-in-up {
//   animation: slideInUp 0.7s cubic-bezier(0.23, 1, 0.32, 1);
// }
// @keyframes slideInUp {
//   0% { opacity: 0; transform: translateY(32px); }
//   100% { opacity: 1; transform: translateY(0); }
// }

