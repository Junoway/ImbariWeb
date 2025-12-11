'use client';

import { getProductBySlug } from '@/lib/products';
import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import { formatCurrency } from '@/lib/utils';
import { useCart } from '@/components/CartContext';
import { useAuth } from '@/components/AuthContext';
import { useState } from 'react';

// This needs to be exported from a separate metadata file for static generation
// Since this is now a client component, metadata must be handled differently

export default function ProductPage({ params }: { params: { productId: string } }) {
  const product = getProductBySlug(params.productId);
  const { addItem } = useCart();
  const { user } = useAuth();
  const [showGiftModal, setShowGiftModal] = useState(false);
  const [giftOption, setGiftOption] = useState<"single" | "monthly">("single");
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) {
    notFound();
  }

  // 10% discount for subscribers
  const isSubscriber = user?.isSubscribed || false;
  const DISCOUNT_RATE = 0.10;
  
  const getDiscountedPrice = (price: number) => {
    if (isSubscriber) {
      return Number((price * (1 - DISCOUNT_RATE)).toFixed(2));
    }
    return price;
  };

  const finalPrice = getDiscountedPrice(product.price);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: finalPrice,
      image: product.image,
    }, 1);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleSendAsGift = () => {
    const price = giftOption === "monthly" 
      ? product.price * 0.9 
      : product.price;
    addItem({
      id: product.id,
      name: `${product.name} ${giftOption === "monthly" ? "(Monthly Gift)" : "(Gift)"}`,
      price: Number(price.toFixed(2)),
      image: product.image,
    }, 1);
    setShowGiftModal(false);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="text-sm text-gray-500">
          <Link href="/" className="hover:text-orange-600">Home</Link>
          {' > '}
          <Link href="/shop" className="hover:text-orange-600">Shop</Link>
          {' > '}
          <span className="text-gray-900">{product.name}</span>
        </nav>
      </div>

      {/* Product Detail Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="relative">
            <div 
              className="relative aspect-square w-full overflow-hidden rounded-lg bg-white shadow-lg"
              style={{ 
                userSelect: 'none',
                WebkitUserSelect: 'none',
                MozUserSelect: 'none',
                msUserSelect: 'none',
              }}
              onContextMenu={(e) => e.preventDefault()}
            >
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover pointer-events-none"
                priority
                draggable={false}
              />
              {/* Watermark Overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-white text-opacity-10 text-6xl font-bold transform rotate-[-45deg]">
                  IMBARI COFFEE
                </div>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-6">
              <span className="inline-block px-3 py-1 text-sm font-medium text-orange-600 bg-orange-50 rounded-full mb-4">
                {product.type}
              </span>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <p className="text-xl text-gray-600">{product.size}</p>
            </div>

            <div className="mb-8">
              <div className="flex items-baseline mb-4">
                {isSubscriber ? (
                  <div>
                    <span className="text-5xl font-bold text-gray-900">{formatCurrency(finalPrice)}</span>
                    <span className="text-2xl text-gray-400 line-through ml-3">{formatCurrency(product.price)}</span>
                  </div>
                ) : (
                  <span className="text-5xl font-bold text-gray-900">{formatCurrency(product.price)}</span>
                )}
              </div>
              <p className="text-sm text-teal-600 font-medium">
                ✓ Subscribers save 10% on all orders
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">About This Product</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {product.longDescription || product.description}
              </p>
            </div>

            {/* Product Features */}
            <div className="mb-8 p-6 bg-orange-50 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Why Choose Imbari Coffee?</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">✓</span>
                  <span className="text-gray-700">100% Single-Origin Ugandan Coffee from Mt. Elgon</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">✓</span>
                  <span className="text-gray-700">Ethically sourced and sustainably grown</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">✓</span>
                  <span className="text-gray-700">Freshly roasted to order for peak flavor</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">✓</span>
                  <span className="text-gray-700">Supporting Ugandan coffee farmers directly</span>
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button
                onClick={handleAddToCart}
                className="w-full bg-orange-600 text-white py-4 px-8 rounded-lg font-semibold text-lg hover:bg-orange-700 transition-colors shadow-lg"
              >
                {addedToCart ? '✓ Added to Cart!' : `Add to Cart - ${formatCurrency(finalPrice)}`}
              </button>
              
              <button
                onClick={() => setShowGiftModal(true)}
                className="w-full bg-teal-600 text-white py-4 px-8 rounded-lg font-semibold text-lg hover:bg-teal-700 transition-colors"
              >
                🎁 Send as Gift
              </button>

              <Link
                href="/shop"
                className="block w-full text-center border-2 border-gray-300 text-gray-700 py-4 px-8 rounded-lg font-semibold text-lg hover:border-gray-400 transition-colors"
              >
                ← Continue Shopping
              </Link>
            </div>

            {/* Social Sharing */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Share this product:</h3>
              <div className="flex gap-4">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://www.imbaricoffee.com/shop/${product.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                  aria-label="Share on Facebook"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out ${product.name} from Imbari Coffee!`)}&url=${encodeURIComponent(`https://www.imbaricoffee.com/shop/${product.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-12 h-12 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
                  aria-label="Share on Twitter"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a
                  href={`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(`https://www.imbaricoffee.com/shop/${product.slug}`)}&media=${encodeURIComponent(`https://www.imbaricoffee.com${product.image}`)}&description=${encodeURIComponent(product.description)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-12 h-12 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                  aria-label="Share on Pinterest"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z"/>
                  </svg>
                </a>
                <button
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: product.name,
                        text: product.description,
                        url: `https://www.imbaricoffee.com/shop/${product.slug}`,
                      });
                    } else {
                      navigator.clipboard.writeText(`https://www.imbaricoffee.com/shop/${product.slug}`);
                      alert('Product link copied to clipboard!');
                    }
                  }}
                  className="flex items-center justify-center w-12 h-12 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition-colors"
                  aria-label="Copy link"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-gray-200">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">You might also like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Related products will be rendered here - integrate with existing shop logic */}
          <p className="text-gray-500 col-span-full text-center py-8">
            <Link href="/shop" className="text-orange-600 hover:text-orange-700 font-semibold">
              Browse all products →
            </Link>
          </p>
        </div>
      </div>

      {/* GIFT MODAL */}
      {showGiftModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 border-4 border-yellow-300">
            <div className="text-center mb-6">
              <div className="text-6xl mb-3">🎁</div>
              <h2 className="text-2xl font-bold text-emerald-800 mb-2">
                Send Coffee as a Gift
              </h2>
              <p className="text-sm text-emerald-600">
                {product.name} ({product.size})
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
                      {formatCurrency(product.price)}
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
                      {formatCurrency(product.price * 0.9)}
                    </div>
                    <div className="text-xs text-gray-400 line-through">
                      {formatCurrency(product.price)}
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
                }}
                className="flex-1 py-3 rounded-full bg-gray-200 text-gray-700 font-bold hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSendAsGift}
                className="flex-1 py-3 rounded-full bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 text-white font-bold shadow-lg hover:shadow-xl transition border-2 border-yellow-300"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Product Schema JSON-LD for SEO */}
      <Script
        id="product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": product.name,
            "description": product.longDescription || product.description,
            "image": `https://www.imbaricoffee.com${product.image}`,
            "brand": {
              "@type": "Brand",
              "name": "Imbari Coffee"
            },
            "offers": {
              "@type": "Offer",
              "price": product.price.toFixed(2),
              "priceCurrency": "USD",
              "availability": "https://schema.org/InStock",
              "url": `https://www.imbaricoffee.com/shop/${product.slug}`,
              "seller": {
                "@type": "Organization",
                "name": "Imbari Coffee"
              }
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "reviewCount": "127"
            }
          })
        }}
      />
    </div>
  );
}
