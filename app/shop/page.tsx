// app/shop/page.tsx
"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/components/CartContext";

type ProductType = "Beans" | "Ground" | "Instant" | "Green";

type Product = {
  id: number;
  name: string;
  type: ProductType;
  size: string;
  price: number;
  image: string;
  description: string;
};

const PRODUCTS: Product[] = [
  // BEANS
  {
    id: 1,
    name: "Medium Roast – Whole Beans",
    type: "Beans",
    size: "250g",
    price: 9,
    image: "/images/arabica.jpg",
    description:
      "Single-origin Mt. Elgon Arabica beans, freshly roasted for home grinding."
  },
  {
    id: 2,
    name: "Medium Roast – Whole Beans",
    type: "Beans",
    size: "500g",
    price: 16,
    image: "/images/arabica.jpg",
    description: "Family-size whole beans pack with excellent balance."
  },
  {
    id: 3,
    name: "Medium Roast – Whole Beans",
    type: "Beans",
    size: "1kg",
    price: 28,
    image: "/images/arabica.jpg",
    description: "Café and office pack for serious coffee drinkers."
  },
  {
    id: 4,
    name: "Dark Roast – Whole Beans",
    type: "Beans",
    size: "500g",
    price: 17,
    image: "/images/arabica.jpg",
    description: "Dark roast for bold flavor and rich crema."
  },
  {
    id: 5,
    name: "Espresso Roast – Whole Beans",
    type: "Beans",
    size: "1kg",
    price: 30,
    image: "/images/robusta.jpg",
    description: "Crafted for espresso machines with thick crema."
  },

  // GROUND
  {
    id: 6,
    name: "Medium Roast – Ground Coffee",
    type: "Ground",
    size: "250g",
    price: 8,
    image: "/images/shop.jpg",
    description: "Smooth grind for pour-over and French press."
  },
  {
    id: 7,
    name: "Medium Roast – Ground Coffee",
    type: "Ground",
    size: "500g",
    price: 14,
    image: "/images/shop2.jpg",
    description: "Ideal for homes and offices."
  },
  {
    id: 8,
    name: "Dark Roast – Ground Coffee",
    type: "Ground",
    size: "250g",
    price: 9,
    image: "/images/shop2.jpg",
    description: "Full-bodied cup for strong coffee lovers."
  },
  {
    id: 9,
    name: "Espresso Grind – Ground Coffee",
    type: "Ground",
    size: "500g",
    price: 18,
    image: "/images/shop3.jpg",
    description: "Fine grind ideal for espresso machines."
  },
  {
    id: 10,
    name: "Hotel & Restaurant Grind",
    type: "Ground",
    size: "1kg",
    price: 26,
    image: "/images/shop.jpg",
    description: "Foodservice grind for hotels and restaurants."
  },

  // INSTANT
  {
    id: 11,
    name: "Imbari Instant – Premium",
    type: "Instant",
    size: "100g",
    price: 10,
    image: "/images/shop2.jpg",
    description: "Smooth premium instant coffee."
  },
  {
    id: 12,
    name: "Imbari Instant – Classic Jar",
    type: "Instant",
    size: "200g",
    price: 16,
    image: "/images/shop3.jpg",
    description: "Everyday instant coffee for home and office."
  },
  {
    id: 13,
    name: "Imbari Instant – Travel Sticks",
    type: "Instant",
    size: "20 x 2g",
    price: 12,
    image: "/images/shop2.jpg",
    description: "Single-serve sticks for travel."
  },
  {
    id: 14,
    name: "Imbari Instant – Foodservice Pack",
    type: "Instant",
    size: "500g",
    price: 32,
    image: "/images/shop3.jpg",
    description: "Bulk instant for FMCG distributors."
  },
  {
    id: 15,
    name: "Imbari Instant – Vending Blend",
    type: "Instant",
    size: "1kg",
    price: 45,
    image: "/images/shop2.jpg",
    description: "Designed for vending machines."
  },

  // GREEN
  {
    id: 16,
    name: "Green Coffee – Arabica Sample",
    type: "Green",
    size: "1kg",
    price: 15,
    image: "/images/shop4.jpg",
    description: "Raw Arabica beans for sampling."
  },
  {
    id: 17,
    name: "Green Coffee – Washed Arabica",
    type: "Green",
    size: "30kg",
    price: 140,
    image: "/images/shop4.jpg",
    description: "Washed lot for importers."
  },
  {
    id: 18,
    name: "Green Coffee – Natural Arabica",
    type: "Green",
    size: "30kg",
    price: 150,
    image: "/images/shop4.jpg",
    description: "Fruit-forward natural process beans."
  },
  {
    id: 19,
    name: "Green Coffee – Fine Robusta",
    type: "Green",
    size: "60kg",
    price: 210,
    image: "/images/shop4.jpg",
    description: "Fine Robusta for espresso blends."
  },
  {
    id: 20,
    name: "Green Coffee – Export Sample Contract",
    type: "Green",
    size: "60kg x 5 bags",
    price: 980,
    image: "/images/shop4.jpg",
    description: "Full-scale export sample contract."
  }
];

export default function ShopPage() {
  const { items, addItem } = useCart();
  const [activeFilter, setActiveFilter] = useState<ProductType | "All">("All");
  const [searchTerm, setSearchTerm] = useState("");

  const router = useRouter();

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const filteredProducts =
    activeFilter === "All"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.type === activeFilter);

  const searchedProducts = searchTerm.trim()
    ? filteredProducts.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : filteredProducts;

  return (
    <div className="bg-white text-emerald-950 min-h-screen pb-16">
      {/* HEADER */}
      <section className="main-container pt-10 pb-6 text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-emerald-500">
          Imbari Coffee Shop
        </h1>
        <p className="text-sm text-emerald-900 max-w-2xl mx-auto">
          Discover premium roasted, instant, and green coffees from Uganda.
        </p>
      </section>

      {/* CART SUMMARY */}
      {totalItems > 0 && (
        <div className="sticky top-[60px] z-20 bg-emerald-100/95 backdrop-blur border-y border-emerald-300 shadow">
          <div className="main-container py-2.5 flex items-center justify-between text-sm">
            <span className="text-emerald-900">
              Cart: <strong>{totalItems}</strong>
            </span>
            <button
              onClick={() => router.push('/checkout')}
              className="px-4 py-1.5 rounded-full bg-emerald-500 text-white font-bold hover:bg-emerald-400 transition shadow"
            >
              Go to Checkout
            </button>
          </div>
        </div>
      )}

      {/* SEARCH */}
      <section className="main-container flex justify-center pt-3 pb-2">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search products..."
          className="w-full max-w-md px-4 py-2.5 rounded-full border border-emerald-300 bg-emerald-50 text-sm shadow-sm focus:border-emerald-500"
        />
      </section>

      {/* FILTERS */}
      <section className="main-container pt-1 pb-4">
        <div className="flex flex-wrap gap-2 justify-center text-xs">
          {(["All", "Beans", "Ground", "Instant", "Green"] as const).map(
            (filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter as ProductType | "All")}
                className={`px-3 py-1.5 rounded-full border text-xs font-semibold transition ${
                  activeFilter === filter
                    ? "bg-emerald-100 border-emerald-500 text-emerald-900"
                    : "bg-white border-emerald-100 text-emerald-700 hover:bg-emerald-50"
                }`}
              >
                {filter}
              </button>
            )
          )}
        </div>
      </section>

      {/* PRODUCT GRID */}
      <section className="w-full pt-1 pb-16">
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 px-4">
          {searchedProducts.map((product) => {
            const isInCart = items.some(
              (item) => item.id === product.id
            );

            return (
              <article
                key={product.id}
                className="rounded-xl border border-emerald-200 bg-white shadow-sm hover:shadow-md transition p-3 flex flex-col"
              >
                {/* IMAGE WITH ZOOM EFFECT */}
                <div className="w-full flex justify-center">
                  <div className="w-40 h-40 border border-emerald-200 rounded-md bg-white overflow-hidden flex items-center justify-center">
                    <Image
                      src={
                        product.image.startsWith("/")
                          ? `/images${product.image}`
                          : product.image
                      }
                      alt={product.name}
                      width={200}
                      height={200}
                      className="w-36 h-36 object-contain transition-transform duration-300 hover:scale-125"
                    />
                  </div>
                </div>

                {/* DETAILS */}
                <h2 className="text-sm font-bold text-emerald-800 mt-2 line-clamp-2">
                  {product.name}
                </h2>
                <p className="text-[11px] text-emerald-900/90 line-clamp-2">
                  {product.description}
                </p>

                {/* FOOTER (PRICE + BUTTON) */}
                <div className="mt-auto flex items-center justify-between pt-2 border-t border-emerald-100">
                  <div>
                    <span className="text-[10px] text-emerald-500 uppercase">
                      {product.size}
                    </span>
                    <div className="text-sm font-bold text-emerald-600">
                      ${product.price}
                    </div>
                  </div>

                  {/* ADD BUTTON WITH SELECTED STATE */}
                  <button
                    onClick={() => addItem({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      image: product.image,
                    }, 1)}
                    className={`px-4 py-1.5 rounded-full bg-emerald-500 text-white font-bold shadow text-[11px] flex items-center gap-1 hover:bg-emerald-400 transition ${
                      isInCart ? "opacity-95" : ""
                    }`}
                  >
                    {isInCart ? (
                      <>
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A1 1 0 007.5 17h9a1 1 0 00.85-1.53L17 13M7 13V6h10v7"
                          />
                        </svg>
                        <span>Add to Cart</span>
                      </>
                    )}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
