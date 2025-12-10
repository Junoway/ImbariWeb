// app/shop/page.tsx
"use client";
import { withBasePath } from "@/lib/utils";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/components/CartContext";
import { useAuth } from "@/components/AuthContext";

type ProductType = "Beans" | "Ground" | "Instant" | "Green" | "Pods" | "Concentrate" | "Gift";

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
  // ROASTED BEANS
  {
    id: 1,
    name: "Medium Roast – Whole Beans",
    type: "Beans",
    size: "12oz (340g)",
    price: 17.99,
    image: withBasePath("/images/imb7.jpg"),
    description:
      "Single-origin Mt. Elgon Arabica beans, freshly roasted for home grinding."
  },
  {
    id: 2,
    name: "Medium Roast – Whole Beans",
    type: "Beans",
    size: "2lb (907g)",
    price: 44.99,
    image: withBasePath("/images/imb1.jpg"),
    description: "Family-size whole beans pack with excellent balance."
  },
  {
    id: 4,
    name: "Dark Roast – Whole Beans",
    type: "Beans",
    size: "12oz (340g)",
    price: 17.99,
    image: withBasePath("/images/imb8.jpg"),
    description: "Dark roast for bold flavor and rich crema."
  },
  {
    id: 5,
    name: "Espresso Roast – Whole Beans",
    type: "Beans",
    size: "12oz (340g)",
    price: 17.99,
    image: withBasePath("/images/imb3.jpg"),
    description: "Crafted for espresso machines with thick crema."
  },

  // GROUND COFFEE
  {
    id: 6,
    name: "Medium Roast – Ground Coffee",
    type: "Ground",
    size: "12oz (340g)",
    price: 17.99,
    image: withBasePath("/images/imb5.jpg"),
    description: "Smooth grind for pour-over and French press."
  },
  {
    id: 7,
    name: "Medium Roast – Ground Coffee",
    type: "Ground",
    size: "2lb (907g)",
    price: 44.99,
    image: withBasePath("/images/shop2.jpg"),
    description: "Ideal for homes and offices."
  },
  {
    id: 8,
    name: "Dark Roast – Ground Coffee",
    type: "Ground",
    size: "12oz (340g)",
    price: 17.99,
    image: withBasePath("/images/shop2.jpg"),
    description: "Full-bodied cup for strong coffee lovers."
  },
  {
    id: 9,
    name: "Espresso Grind – Ground Coffee",
    type: "Ground",
    size: "12oz (340g)",
    price: 17.99,
    image: withBasePath("/images/imb4.jpg"),
    description: "Fine grind ideal for espresso machines."
  },

  // SINGLE SERVE PACKS & SACHETS
  {
    id: 11,
    name: "Sample Light Roast Sachet",
    type: "Instant",
    size: "0.5oz (14.2g)",
    price: 2.49,
    image: withBasePath("/images/imb6.jpg"),
    description: "Try our light roast in convenient single-serve sachet."
  },
  {
    id: 13,
    name: "12-Pack Sachets Box",
    type: "Instant",
    size: "Box of 12",
    price: 24.99,
    image: withBasePath("/images/imb9.jpg"),
    description: "12 single-serve sachets for travel and convenience."
  },

  // K-CUP PODS
  {
    id: 18,
    name: "Dark Roast Keurig K-Cups",
    type: "Pods",
    size: "Box of 24",
    price: 20.99,
    image: withBasePath("/images/imb2.jpg"),
    description: "24 Dark Roast Keurig-compatible K-Cup pods for bold single-serve brewing."
  },

  // ULTRA CONCENTRATE
  {
    id: 19,
    name: "Ultra Concentrate",
    type: "Concentrate",
    size: "250ml",
    price: 21.99,
    image: withBasePath("/images/shop3.jpg"),
    description: "Concentrated coffee extract for instant iced or hot coffee."
  },

  // GREEN BEANS
  {
    id: 16,
    name: "Green Bean Robusta",
    type: "Green",
    size: "1kg (2.2lb)",
    price: 6.99,
    image: withBasePath("/images/shop4.jpg"),
    description: "Unroasted Robusta beans for home or commercial roasting."
  },
  {
    id: 17,
    name: "Green Bean Arabica",
    type: "Green",
    size: "1kg (2.2lb)",
    price: 15.99,
    image: withBasePath("/images/arabica.jpg"),
    description: "Premium unroasted Arabica beans from Mt. Elgon."
  },

  // ADDITIONAL ROAST VARIETIES
  {
    id: 22,
    name: "Light Roast – Whole Beans",
    type: "Beans",
    size: "12oz (340g)",
    price: 17.99,
    image: withBasePath("/images/arabica.jpg"),
    description: "Bright and fruity light roast for delicate flavor profiles."
  },
  {
    id: 23,
    name: "Light Roast – Ground Coffee",
    type: "Ground",
    size: "12oz (340g)",
    price: 17.99,
    image: withBasePath("/images/shop.jpg"),
    description: "Light roast ground coffee for bright morning cups."
  },
  {
    id: 24,
    name: "Espresso Roast – Whole Beans",
    type: "Beans",
    size: "2lb (907g)",
    price: 44.99,
    image: withBasePath("/images/robusta.jpg"),
    description: "Large pack of espresso beans for coffee enthusiasts."
  },
  {
    id: 25,
    name: "Imbari Logo Golf Cap",
    type: "Gift",
    size: "Adjustable",
    price: 44.99,
    image: withBasePath("/images/imb10.jpg"),
    description: "Premium golf cap with embroidered Imbari logo."
  },
  {
    id: 26,
    name: "Dark Roast – Whole Beans",
    type: "Beans",
    size: "2lb (907g)",
    price: 44.99,
    image: withBasePath("/images/shop4.jpg"),
    description: "Bold dark roast in family-size 2lb pack."
  },
  {
    id: 27,
    name: "Dark Roast – Ground Coffee",
    type: "Ground",
    size: "2lb (907g)",
    price: 44.99,
    image: withBasePath("/images/shop3.jpg"),
    description: "Rich dark roast ground coffee for strong, bold brews."
  },
  {
    id: 28,
    name: "Espresso Grind – Ground Coffee",
    type: "Ground",
    size: "2lb (907g)",
    price: 44.99,
    image: withBasePath("/images/shop4.jpg"),
    description: "Large pack of fine espresso grind for machines."
  },
  {
    id: 29,
    name: "Light Roast – Whole Beans",
    type: "Beans",
    size: "2lb (907g)",
    price: 44.99,
    image: withBasePath("/images/arabica.jpg"),
    description: "Light roast beans in bulk for daily brewing."
  },
  {
    id: 30,
    name: "Light Roast – Ground Coffee",
    type: "Ground",
    size: "2lb (907g)",
    price: 44.99,
    image: withBasePath("/images/shop.jpg"),
    description: "Family-size light roast ground coffee."
  },

  // GIFT ITEMS
  {
    id: 20,
    name: "Imbari The Unity Mug",
    type: "Gift",
    size: "12oz ceramic",
    price: 15.00,
    image: withBasePath("/images/shop.jpg"),
    description: "Premium ceramic mug with Imbari Unity design."
  },
  {
    id: 21,
    name: "Imbari Safari Tote Bag",
    type: "Gift",
    size: "Canvas",
    price: 25.00,
    image: withBasePath("/images/shop2.jpg"),
    description: "Stylish canvas tote bag with safari-inspired Imbari design."
  }
];

export default function ShopPage() {
  const { items, addItem } = useCart();
  const { user } = useAuth();
  const [activeFilter, setActiveFilter] = useState<ProductType | "All">("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [showGiftModal, setShowGiftModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [giftOption, setGiftOption] = useState<"single" | "monthly">("single");

  const router = useRouter();

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  
  // 10% discount for subscribers
  const isSubscriber = user?.isSubscribed || false;
  const DISCOUNT_RATE = 0.10;
  
  const getDiscountedPrice = (price: number) => {
    if (isSubscriber) {
      return Number((price * (1 - DISCOUNT_RATE)).toFixed(2));
    }
    return price;
  };

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
    <div className="bg-gradient-to-br from-yellow-50 via-orange-50 to-emerald-50 text-[#10b981] min-h-screen pb-16">
      {/* HEADER */}
      <section className="main-container pt-10 pb-6 text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-emerald-600 via-yellow-500 to-orange-500 bg-clip-text text-transparent drop-shadow-sm">
          Imbari Coffee Shop
        </h1>
        <p className="text-sm text-emerald-900 max-w-2xl mx-auto mt-2">
          🌿 100% Arabica Coffee from Uganda's finest regions 🌿
        </p>
        <p className="text-xs text-emerald-700 max-w-xl mx-auto mt-1">
          Premium roasted beans, fine ground, instant, and green coffee for import.
        </p>
        
        {/* SUBSCRIBER BADGE */}
        {isSubscriber && (
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 text-white font-bold shadow-lg border-2 border-orange-600">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span>Subscriber - 10% OFF All Products!</span>
          </div>
        )}
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

      {/* PROMOTIONAL SECTIONS - Only show to non-logged-in users */}
      {!user && (
        <section className="main-container pt-6 pb-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Ready to Gift */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-yellow-400">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent mb-3">
                🎁 Ready to Gift
              </h2>
              <p className="text-emerald-900 mb-3 leading-relaxed">
                Imbari Coffee makes a great gift! Choose a beautifully curated bundle for your loved ones.
              </p>
              <p className="text-emerald-700 mb-4">
                In a rush? Check out our digital gift cards!
              </p>
              <p className="text-xs text-emerald-600 italic">
                *Premade bundles are not eligible for further promotions or discount codes.
              </p>
              <button
                onClick={() => setActiveFilter("Gift")}
                className="mt-4 w-full px-6 py-3 rounded-full bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-600 text-white font-bold shadow-lg hover:shadow-xl transition"
              >
                View Gifts
              </button>
            </div>

            {/* 10% Off for New Subscribers */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-emerald-400">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-3">
                📧 10% Off for New Subscribers
              </h2>
              <p className="text-emerald-900 mb-3 leading-relaxed">
                Sign up for our mailing list and get <strong>10% off</strong> your next order + subscriber-only deals.
              </p>
              <button
                onClick={() => router.push('/subscriptions')}
                className="mt-4 w-full px-6 py-3 rounded-full bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 text-white font-bold shadow-lg hover:shadow-xl transition"
              >
                Subscribe Now
              </button>
            </div>
          </div>
        </section>
      )}

      {/* FILTERS */}
      <section className="main-container pt-1 pb-4">
        <div className="flex flex-wrap gap-2 justify-center text-xs">
          {(["All", "Beans", "Ground", "Instant", "Pods", "Concentrate", "Green", "Gift"] as const).map(
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
                className="rounded-xl border-2 border-emerald-200 bg-gradient-to-br from-white via-yellow-50/30 to-emerald-50/30 shadow-md hover:shadow-xl hover:border-emerald-400 transition-all duration-300 p-3 flex flex-col"
              >
                {/* IMAGE WITH ZOOM EFFECT & COLORED BACKGROUND */}
                <div className="w-full flex justify-center">
                  <div className="w-40 h-40 border-2 border-emerald-300 rounded-lg bg-gradient-to-br from-green-100 via-yellow-100 to-orange-100 overflow-hidden flex items-center justify-center shadow-inner">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={200}
                      height={200}
                      className="w-36 h-36 object-contain transition-transform duration-300 hover:scale-110 drop-shadow-lg"
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

                {/* FOOTER (PRICE + BUTTONS) */}
                <div className="mt-auto pt-2 border-t border-emerald-100 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-emerald-500 uppercase">
                        {product.size}
                      </span>
                      <div className="flex flex-col">
                        {user ? (
                          <>
                            <div className="text-sm font-bold text-emerald-600">
                              ${getDiscountedPrice(product.price)}
                            </div>
                            <div className="text-[10px] text-gray-400 line-through">
                              ${product.price.toFixed(2)}
                            </div>
                          </>
                        ) : (
                          <div className="text-sm font-bold text-emerald-600">
                            ${product.price.toFixed(2)}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* ADD BUTTON */}
                    <button
                      onClick={() => addItem({
                        id: product.id,
                        name: product.name,
                        price: user ? getDiscountedPrice(product.price) : product.price,
                        image: product.image,
                      }, 1)}
                      className={`px-3 py-1.5 rounded-full bg-emerald-500 text-white font-bold shadow text-[10px] flex items-center gap-1 hover:bg-emerald-400 transition ${
                        isInCart ? "opacity-95" : ""
                      }`}
                    >
                      {isInCart ? (
                        <>
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A1 1 0 007.5 17h9a1 1 0 00.85-1.53L17 13M7 13V6h10v7" />
                          </svg>
                          <span>Add</span>
                        </>
                      )}
                    </button>
                  </div>
                  
                  {/* GIFT BUTTON */}
                  <button
                    onClick={() => {
                      setSelectedProduct(product);
                      setShowGiftModal(true);
                    }}
                    className="w-full py-1.5 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 text-white font-bold shadow text-[10px] flex items-center justify-center gap-1 hover:from-yellow-500 hover:to-orange-500 transition"
                  >
                    <span>🎁</span>
                    <span>Send as Gift</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* GIFT MODAL */}
      {showGiftModal && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 border-4 border-yellow-300">
            <div className="text-center mb-6">
              <div className="text-6xl mb-3">🎁</div>
              <h2 className="text-2xl font-bold text-emerald-800 mb-2">
                Send Coffee as a Gift
              </h2>
              <p className="text-sm text-emerald-600">
                {selectedProduct.name} ({selectedProduct.size})
              </p>
            </div>

            {/* Gift Options */}
            <div className="space-y-4 mb-6">
              <button
                onClick={() => setGiftOption("single")}
                className={`w-full p-4 rounded-lg border-2 transition ${
                  giftOption === "single"
                    ? "border-emerald-500 bg-emerald-50"
                    : "border-gray-200 hover:border-emerald-300"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <div className="font-bold text-emerald-800">Single Gift Purchase</div>
                    <div className="text-sm text-emerald-600">One-time gift delivery</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-emerald-600">
                      ${selectedProduct.price.toFixed(2)}
                    </div>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setGiftOption("monthly")}
                className={`w-full p-4 rounded-lg border-2 transition ${
                  giftOption === "monthly"
                    ? "border-yellow-500 bg-yellow-50"
                    : "border-gray-200 hover:border-yellow-300"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <div className="font-bold text-emerald-800 flex items-center gap-2">
                      Monthly Gift Subscription
                      <span className="text-xs bg-yellow-400 text-yellow-900 px-2 py-0.5 rounded-full font-bold">
                        SAVE 10%
                      </span>
                    </div>
                    <div className="text-sm text-emerald-600">Recurring monthly delivery</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-yellow-600">
                      ${(selectedProduct.price * 0.9).toFixed(2)}
                    </div>
                    <div className="text-xs text-gray-400 line-through">
                      ${selectedProduct.price.toFixed(2)}
                    </div>
                  </div>
                </div>
              </button>
            </div>

            {/* Benefits */}
            {giftOption === "monthly" && (
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-4 mb-6 border-2 border-yellow-200">
                <div className="text-sm text-emerald-800 space-y-1">
                  <div className="flex items-center gap-2">
                    <span>✓</span>
                    <span>10% discount on every delivery</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>✓</span>
                    <span>Free shipping on orders $30+</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>✓</span>
                    <span>Cancel or pause anytime</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>✓</span>
                    <span>Exclusive subscriber perks</span>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowGiftModal(false);
                  setSelectedProduct(null);
                }}
                className="flex-1 py-3 rounded-full bg-gray-200 text-gray-700 font-bold hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const price = giftOption === "monthly" 
                    ? selectedProduct.price * 0.9 
                    : selectedProduct.price;
                  addItem({
                    id: selectedProduct.id,
                    name: `${selectedProduct.name} ${giftOption === "monthly" ? "(Monthly Gift)" : "(Gift)"}`,
                    price: Number(price.toFixed(2)),
                    image: selectedProduct.image,
                  }, 1);
                  setShowGiftModal(false);
                  setSelectedProduct(null);
                }}
                className="flex-1 py-3 rounded-full bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 text-white font-bold shadow-lg hover:shadow-xl transition border-2 border-yellow-300"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
