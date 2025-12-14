// app/imbari-story/page.tsx
import Image from "next/image";
import Link from "next/link";
import ParallaxSection from "@/components/ParallaxSection";
import { withBasePath } from "@/lib/utils";
import { KahawaDivider, KahawaMotif } from "@/components/KahawaAssets";

export default function ImbariStoryPage() {
  return (
    <main className="bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-20 space-y-20">
        {/* HERO */}
        <section className="grid gap-12 lg:grid-cols-2 items-center min-h-[60vh]">
          <div className="text-center lg:text-left space-y-6 flex flex-col items-center lg:items-start justify-center">
            <p className="badge inline-block">The True Meaning of Imbari</p>
            <h1 className="text-5xl sm:text-6xl font-semibold leading-tight">
              "Cup of Unity"
            </h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto lg:mx-0">
              Imbari is not just a name. It is an ancient African covenant — a
              sacred rite that predates colonial distortions and the rewriting
              of our ancestral history. Coffee was more than a drink: it was
              law, bond, promise, and birthright.
            </p>
          </div>
          <div className="relative h-80 w-full flex items-center justify-center">
            <div className="absolute inset-0 rounded-3xl overflow-hidden border border-white/10 bg-black/60 shadow-2xl">
              <Image
                src={withBasePath("/images/mt-elgon.jpg")}
                alt="Mountain spine of Africa where Imbari coffee and covenant culture were born"
                fill
                className="object-cover opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            </div>
            <div className="absolute bottom-4 left-4 max-w-xs text-xs sm:text-sm text-white space-y-1">
              <p className="font-medium text-emerald-300"></p>
              <p>
                From Mt. Elgon through the Eastern Rift — the cradle of coffee
                and the covenant cultures that inspired Imbari.
              </p>
            </div>
          </div>
        </section>

        {/* NAME & ORIGINS */}
        <section className="card bg-[#050708] border border-white/10 rounded-3xl p-12 space-y-10 text-center flex flex-col items-center">
          <h2 className="section-heading text-3xl mb-2">
            Imbari — More Than a Name
          </h2>
          <p className="text-lg max-w-2xl mx-auto mb-4 text-emerald-300">
            Imbari is the etymological ancestor of the Hebrew word{" "}
            <strong>Berit</strong> — <em>covenant</em>.
          </p>
          <div className="grid gap-8 md:grid-cols-2 w-full max-w-4xl mx-auto">
            <div className="flex flex-col gap-6 items-center">
              <p className="text-base text-white">
                It is the ceremony through which men were ushered into unity,
                brotherhood, and nationhood: through circumcision and the
                exchanging of coffee seeds.
              </p>
              <p className="text-base text-white">
                Coffee, in this tradition, was not a casual drink. It was a
                sacred symbol of law and obligation, bond and loyalty, promise
                and inheritance, shared identity and destiny.
              </p>
              <p className="text-base text-white">
                To drink together under Imbari was to enter a covenant — a
                binding agreement that lived beyond documents, beyond signatures,
                and beyond time.
              </p>
            </div>
            <div className="flex flex-col gap-6 items-center">
              <p className="text-base text-white">
                Every Imbari shipment and every Imbari cup is designed as a
                living continuation of that ancient agreement.
              </p>
              <div className="bg-emerald-900/10 border border-emerald-400/20 rounded-2xl px-8 py-6 text-emerald-200 font-semibold text-lg shadow-lg mt-2">
                Imbari is the Cup of Covenant — the unity cup of Africa, where
                coffee is the seal of brotherhood, peace, and shared destiny.
              </div>
            </div>
          </div>
        </section>

        {/* COFFEE COVENANT / OMUKAGO */}
        <section className="card bg-[#050708] border border-white/10 rounded-3xl p-12 space-y-10 text-center flex flex-col items-center">
          <h2 className="section-heading text-3xl mb-2">Imbari — Omukago</h2>
          <p className="text-lg max-w-2xl mx-auto mb-4 text-emerald-300">
            Before colonial borders, before the “Age of Discovery,” before foreign
            religions reinterpreted African traditions —{" "}
            <strong>kings made covenants with coffee.</strong>
          </p>
          <div className="grid gap-8 md:grid-cols-2 w-full max-w-4xl mx-auto">
            <div className="flex flex-col gap-6 items-center">
              <p className="text-base text-white">
                Two leaders would meet. They would cut themselves at the{" "}
                <strong>navel</strong> — the ancient center of life. A coffee seed
                was dipped into their blood, exchanged, and swallowed.
              </p>
              <p className="text-base text-white">
                This ritual formed an unbreakable bond known as Omukago — unity,
                trust, peace, alliance, shared destiny.
              </p>
              <p className="text-base text-white">
                This wasn’t symbolic. It was binding, spiritual, and eternal — a
                covenant recognized by clans, kingdoms, and generations.
              </p>
              <p className="text-base text-white">
                It mirrors the ancient <strong>Habiru (Hebrew)</strong> covenant
                traditions — the blood bond God demanded when forming a nation.
                Not by accident, but by memory: a shared spiritual pattern
                carried across time.
              </p>
            </div>
            <div className="flex flex-col gap-6 items-center">
              <p className="text-base text-white">
                The people who kept these rites —{" "}
                <strong>the People of Kisu (Cush), the Ba’Masaba (Sabaeans)</strong>
                {" "}and other highland communities — form part of the ancestral
                corridor connecting Ethiopia, Eritrea, Sudan, Uganda, Kenya,
                Tanzania, Congo, Rwanda, and Burundi.
              </p>
              <div className="bg-emerald-900/10 border border-emerald-400/20 rounded-2xl px-8 py-6 text-emerald-200 font-semibold text-lg shadow-lg mt-2">
                This region — the{" "}
                <span className="font-semibold text-emerald-300">
                  Mountain Spine of Africa
                </span>{" "}
                — is both the birthplace of coffee and the cradle of this sacred
                covenant culture.
              </div>
            </div>
          </div>
        </section>

        {/* MOUNTAIN PEOPLE */}
        <section className="card bg-[#050708] border border-white/10 rounded-3xl p-12 space-y-10 text-center flex flex-col items-center">
          <h2 className="section-heading text-3xl mb-2">
            Where the Covenant Lived — The Mountain People
          </h2>
          <p className="text-lg max-w-2xl mx-auto mb-4 text-emerald-300">
            The culture of Imbari lived among highland peoples whose lives were
            intertwined with coffee, covenant, and ceremony.
          </p>
          <div className="grid gap-8 md:grid-cols-2 w-full max-w-4xl mx-auto">
            <div className="flex flex-col gap-6 items-center">
              <p className="text-base text-white">
                The ancient culture of Imbari lived among the Ba’Masaba
                (Bugisu), Sabaeans of Southern Ethiopia, People of Kisu
                (Cushitic ancestors), highland clans of Mt. Elgon, and Eastern
                Rift Mountains communities.
              </p>
              <p className="text-base text-white">
                These communities carried with them the knowledge of coffee, the
                ceremony of covenant, the tradition of unity, and the sacred
                exchange of the seed.
              </p>
              <p className="text-base text-white">
                Across centuries, this ritual survived in Ethiopia, Uganda, Kenya,
                Congo, Rwanda, Burundi, and Tanzania — the true coffee belt of
                Africa.
              </p>
              <p className="text-base text-white font-medium">
                Imbari is born from this heritage.
              </p>
            </div>
            <div className="relative h-72 w-full flex items-center justify-center">
              <Image
                src={withBasePath("/images/farm.jpg")}
                alt="Coffee farmers and covenant culture in the highlands"
                fill
                className="rounded-3xl border border-white/10 object-cover shadow-xl"
              />
            </div>
          </div>
        </section>

        {/* IMBARI – THE UNITY CUP */}
        <section className="card bg-[#050708] border border-white/10 rounded-3xl p-12 space-y-10 text-center flex flex-col items-center">
          <h2 className="section-heading text-3xl mb-2">Imbari — Ubuntu</h2>
          <p className="text-lg max-w-2xl mx-auto mb-4 text-emerald-300">
            Imbari is more than a beverage company. It is a restoration project — a
            return to Africa’s own story of coffee, covenant, and unity.
          </p>
          <div className="grid gap-8 md:grid-cols-2 w-full max-w-4xl mx-auto">
            <div className="flex flex-col gap-6 items-center">
              <p className="text-base text-white">
                Imbari is the revival of African brotherhood, unity, truth, ritual,
                and heritage.
              </p>
              <p className="text-base text-white">
                Imbari is the <strong>Cup of Covenant</strong>: a cup that unites, a
                cup that reconciles, a cup that remembers who we were before the
                world named us.
              </p>
              <p className="text-base text-white">
                Every cup of Imbari is a modern expression of an ancient promise:
              </p>
              <p className="text-lg font-semibold text-emerald-300">
                One people. One bond. One Africa.
              </p>
            </div>
          </div>
        </section>

        {/* OUR BRAND PURPOSE */}
        <section className="card bg-[#050708] border border-white/10 rounded-3xl p-12 space-y-8 text-center flex flex-col items-center">
          <h2 className="section-heading text-2xl uppercase tracking-wider text-emerald-300 mb-2">
            Our Brand Purpose
          </h2>
          <p className="text-base text-white max-w-2xl mx-auto">
            We chose the name <strong>Imbari</strong> because we believe the cup
            can unite Africa again — not only through treaties, politics, or
            conferences, but{" "}
            <span className="font-semibold">
              cup by cup, bond by bond, covenant by covenant.
            </span>
          </p>
          <p className="text-base text-white max-w-2xl mx-auto">
            Coffee began with us. The unity it once carried should return to us —
            and flow outwards again to the world.
          </p>
          <p className="text-base text-white max-w-2xl mx-auto">
            Imbari is the return of the unity cup of Africa.
          </p>
        </section>

        {/* CLOSING CTA */}
        <section className="card bg-[#050708] border border-white/10 rounded-3xl p-12 flex flex-col md:flex-row gap-10 md:items-center md:justify-between">
          <div className="space-y-4 max-w-xl text-center md:text-left mx-auto md:mx-0">
            <p className="badge inline-block mb-1">From Covenant to Cup</p>
            <h2 className="section-heading text-2xl sm:text-3xl">
              Taste the Covenant. Partner with the Origin.
            </h2>
            <p className="text-base text-white">
              Imbari Coffee carries this story from the highlands of Mt. Elgon and
              the Mountain Spine of Africa into every bag, every jar, every instant
              blend, and every roasted lot we ship.
            </p>
            <p className="text-base text-white">
              When you work with Imbari — as an importer, roaster, retailer,
              distributor, or brand — you are not just buying coffee. You are
              entering a covenant of quality, traceability, and African unity.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2">
              <Link href="/contact" className="button-primary">
                Speak with the Imbari Team
              </Link>
              <Link href="/products" className="button-outline">
                Explore Coffee Lines
              </Link>
            </div>
          </div>
          <div className="relative w-full md:w-80 h-52 md:h-64 flex items-center justify-center">
            <Image
              src={withBasePath("/images/export.jpg")}
              alt="Export containers and Imbari Coffee supply chain"
              fill
              className="rounded-2xl border border-white/10 object-cover shadow-lg"
            />
          </div>
        </section>
      </div>
    </main>
  );
}




