import Image from "next/image";
import { FaSeedling, FaIndustry, FaCoffee, FaShippingFast, FaFlask } from "react-icons/fa";

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
		<main className="relative min-h-screen py-16 px-4 flex flex-col items-center justify-center bg-gradient-to-br from-green-900 via-black to-green-700 overflow-hidden">
			{/* Background accents */}
			<div className="absolute top-0 left-0 w-96 h-96 bg-green-800 opacity-30 rounded-full blur-3xl -z-10" />
			<div className="absolute bottom-0 right-0 w-80 h-80 bg-emerald-400 opacity-20 rounded-full blur-2xl -z-10" />
			<div className="absolute top-1/2 left-1/2 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl -z-10" />

			<header className="text-center animate-fade-in-up">
				<p className="inline-block badge mb-3 bg-gradient-to-r from-green-500 to-emerald-400 text-white shadow-lg">
					Our Value Chain
				</p>
				<h1 className="section-heading text-4xl font-extrabold text-white drop-shadow-lg mb-2">
					Farmer → Mill → Roast → Export
				</h1>
				<p className="section-subtitle text-lg text-neutral-200 max-w-xl mx-auto">
					Imbari Coffee operates a vertically integrated value chain that keeps
					quality, traceability, and trust at the center of every process.
				</p>
			</header>

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
							<h2 className="font-semibold text-amber-200 text-lg mb-4 drop-shadow-lg">
								{stage.title}
							</h2>
							<div className="flex flex-col gap-3 w-full">
								{stage.points.map((point, i) => (
									<div
										key={point}
										className={`process-step px-4 py-2 rounded-lg bg-white/10 backdrop-blur-md text-neutral-100 font-medium shadow-md transition-all duration-500 animate-slide-in-up delay-[${i * 120}ms] group-hover:bg-emerald-700/30`}
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
					<h3 className="text-2xl font-bold text-green-300 mb-2">
						Ready to Experience the Imbari Difference?
					</h3>
					<p className="text-neutral-200 mb-4">
						Contact us to learn more about our value chain, sourcing, and
						partnership opportunities.
					</p>
					<a
						href="/contact"
						className="inline-block px-6 py-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-400 text-white font-semibold shadow-lg hover:scale-105 transition-transform focus:outline-emerald-400"
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
