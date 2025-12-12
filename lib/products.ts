// Centralized product data
import { withBasePath } from "@/lib/utils";

export type ProductType = "Beans" | "Ground" | "Instant" | "Green" | "Pods" | "Concentrate" | "Gift";

export type Product = {
  id: number;
  slug: string; // URL-friendly identifier
  name: string;
  type: ProductType;
  size: string;
  price: number;
  image: string;
  description: string;
  longDescription?: string;
};

export const PRODUCTS: Product[] = [
  // ROASTED BEANS
  {
    id: 1,
    slug: "medium-roast-whole-beans-12oz",
    name: "Medium Roast – Whole Beans",
    type: "Beans",
    size: "12oz (340g)",
    price: 17.99,
    image: withBasePath("/images/imb7.jpg"),
    description: "Single-origin Mt. Elgon Arabica beans, freshly roasted for home grinding.",
    longDescription: "Experience the rich flavors of Uganda's Mt. Elgon region with our Medium Roast Whole Beans. Grown at altitudes of 1,800-2,300 meters on nutrient-rich volcanic soils, these 100% Arabica beans deliver a perfectly balanced cup with notes of chocolate, caramel, and citrus. Ideal for home grinding and brewing methods like pour-over, French press, or drip coffee."
  },
  {
    id: 2,
    slug: "medium-roast-whole-beans-2lb",
    name: "Medium Roast – Whole Beans",
    type: "Beans",
    size: "2lb (907g)",
    price: 44.99,
    image: withBasePath("/images/imb1.jpg"),
    description: "Family-size whole beans pack with excellent balance.",
    longDescription: "Our family-size 2lb pack ensures you never run out of premium Imbari Coffee. Perfect for households and offices, this medium roast offers consistent quality and flavor in every batch."
  },
  {
    id: 4,
    slug: "dark-roast-whole-beans-12oz",
    name: "Dark Roast – Whole Beans",
    type: "Beans",
    size: "12oz (340g)",
    price: 17.99,
    image: withBasePath("/images/imb8.jpg"),
    description: "Dark roast for bold flavor and rich crema.",
    longDescription: "For coffee lovers who prefer a bolder, more intense cup, our Dark Roast delivers deep chocolate and toasted nut flavors with a smooth, full-bodied finish. Perfect for espresso or strong morning brews."
  },
  {
    id: 5,
    slug: "espresso-roast-whole-beans-12oz",
    name: "Espresso Roast – Whole Beans",
    type: "Beans",
    size: "12oz (340g)",
    price: 17.99,
    image: withBasePath("/images/imb3.jpg"),
    description: "Crafted for espresso machines with thick crema.",
    longDescription: "Specifically roasted for espresso preparation, these beans produce a thick, golden crema and intense flavor profile. Perfect for lattes, cappuccinos, and straight espresso shots."
  },

  // GROUND COFFEE
  {
    id: 6,
    slug: "medium-roast-ground-coffee-12oz",
    name: "Medium Roast – Ground Coffee",
    type: "Ground",
    size: "12oz (340g)",
    price: 17.99,
    image: withBasePath("/images/imb5.jpg"),
    description: "Smooth grind for pour-over and French press.",
    longDescription: "Pre-ground to perfection for optimal extraction in pour-over, drip machines, and French press. This medium roast ground coffee delivers convenience without compromising on flavor."
  },
  {
    id: 7,
    slug: "medium-roast-ground-coffee-2lb",
    name: "Medium Roast – Ground Coffee",
    type: "Ground",
    size: "2lb (907g)",
    price: 44.99,
    image: withBasePath("/images/shop2.jpg"),
    description: "Ideal for homes and offices.",
    longDescription: "Bulk ground coffee for offices, cafés, and coffee-loving households. Consistent quality in every batch ensures your morning routine is always exceptional."
  },
  {
    id: 8,
    slug: "dark-roast-ground-coffee-12oz",
    name: "Dark Roast – Ground Coffee",
    type: "Ground",
    size: "12oz (340g)",
    price: 17.99,
    image: withBasePath("/images/shop2.jpg"),
    description: "Full-bodied cup for strong coffee lovers.",
    longDescription: "Bold, intense, and full-bodied. Our dark roast ground coffee is perfect for those who want a strong, robust cup to kickstart their day."
  },
  {
    id: 9,
    slug: "espresso-grind-ground-coffee-12oz",
    name: "Espresso Grind – Ground Coffee",
    type: "Ground",
    size: "12oz (340g)",
    price: 17.99,
    image: withBasePath("/images/imb4.jpg"),
    description: "Fine grind ideal for espresso machines.",
    longDescription: "Finely ground for optimal espresso extraction. This grind size is specifically calibrated for espresso machines to produce rich, flavorful shots with perfect crema."
  },

  // SINGLE SERVE PACKS & SACHETS
  {
    id: 11,
    slug: "sample-light-roast-sachet",
    name: "Sample Light Roast Sachet",
    type: "Instant",
    size: "0.5oz (14.2g)",
    price: 2.49,
    image: withBasePath("/images/imb6.jpg"),
    description: "Try our light roast in convenient single-serve sachet.",
    longDescription: "Perfect for travelers, campers, or anyone who wants instant premium coffee on the go. Just add hot water and enjoy authentic Imbari flavor anywhere."
  },
  {
    id: 13,
    slug: "12-pack-sachets-box",
    name: "12-Pack Sachets Box",
    type: "Instant",
    size: "Box of 12",
    price: 24.99,
    image: withBasePath("/images/imb9.jpg"),
    description: "12 single-serve sachets for travel and convenience.",
    longDescription: "A full box of 12 instant coffee sachets, perfect for office drawers, travel bags, or emergency coffee situations. Premium instant coffee that actually tastes like real coffee."
  },

  // K-CUP PODS
  {
    id: 18,
    slug: "dark-roast-keurig-k-cups",
    name: "Dark Roast Keurig K-Cups",
    type: "Pods",
    size: "Box of 24",
    price: 20.99,
    image: withBasePath("/images/imb2.jpg"),
    description: "24 Dark Roast Keurig-compatible K-Cup pods for bold single-serve brewing.",
    longDescription: "Compatible with all Keurig machines. Our Dark Roast K-Cups deliver a bold, full-bodied cup in seconds. Perfect for busy mornings or offices with Keurig brewers."
  },

  // ULTRA CONCENTRATE
  {
    id: 19,
    slug: "ultra-coffee-concentrate",
    name: "Ultra Coffee Concentrate",
    type: "Concentrate",
    size: "250ml",
    price: 21.99,
    image: withBasePath("/images/conc.jpg"),
    description: "Concentrated coffee extract for instant iced or hot coffee.",
    longDescription: "Our Ultra Coffee Concentrate is a game-changer. Mix with water, milk, or ice for instant iced coffee, lattes, or hot coffee. One bottle makes 20+ servings. Perfect for summer or when you need coffee fast."
  },

  // GREEN BEANS
  {
    id: 16,
    slug: "green-bean-robusta-1kg",
    name: "Green Bean Robusta",
    type: "Green",
    size: "1kg (2.2lb)",
    price: 6.99,
    image: withBasePath("/images/shop4.jpg"),
    description: "Unroasted Robusta beans for home or commercial roasting.",
    longDescription: "Raw, unroasted Robusta beans perfect for home roasters or commercial operations. Source directly from Uganda's finest farms and roast to your preferred profile."
  },
  {
    id: 17,
    slug: "green-bean-arabica-1kg",
    name: "Green Bean Arabica",
    type: "Green",
    size: "1kg (2.2lb)",
    price: 15.99,
    image: withBasePath("/images/arabica.jpg"),
    description: "Premium unroasted Arabica beans from Mt. Elgon.",
    longDescription: "100% Arabica green beans from Mt. Elgon's volcanic soils. Roast these premium beans at home to experience the freshest possible coffee. Ideal for specialty roasters and coffee enthusiasts."
  },

  // ADDITIONAL ROAST VARIETIES
  {
    id: 22,
    slug: "light-roast-whole-beans-12oz",
    name: "Light Roast – Whole Beans",
    type: "Beans",
    size: "12oz (340g)",
    price: 17.99,
    image: withBasePath("/images/arabica.jpg"),
    description: "Bright and fruity light roast for delicate flavor profiles.",
    longDescription: "Our Light Roast preserves the unique terroir of Mt. Elgon's high-altitude Arabica. Expect bright acidity, floral notes, and fruity undertones. Perfect for pour-over and filter brewing."
  },
  {
    id: 23,
    slug: "light-roast-ground-coffee-12oz",
    name: "Light Roast – Ground Coffee",
    type: "Ground",
    size: "12oz (340g)",
    price: 17.99,
    image: withBasePath("/images/shop.jpg"),
    description: "Light roast ground coffee for bright morning cups.",
    longDescription: "Pre-ground light roast for those who appreciate nuanced, complex flavors. Perfect for morning brewing routines with drip machines or pour-over setups."
  },
  {
    id: 24,
    slug: "espresso-roast-whole-beans-2lb",
    name: "Espresso Roast – Whole Beans",
    type: "Beans",
    size: "2lb (907g)",
    price: 44.99,
    image: withBasePath("/images/robusta.jpg"),
    description: "Large pack of espresso beans for coffee enthusiasts.",
    longDescription: "Family-size espresso roast for serious espresso lovers. Perfect for home baristas who go through multiple shots per day."
  },
  {
    id: 25,
    slug: "imbari-logo-golf-cap",
    name: "Imbari Logo Golf Cap",
    type: "Gift",
    size: "Adjustable",
    price: 44.99,
    image: withBasePath("/images/imb10.jpg"),
    description: "Premium golf cap with embroidered Imbari logo.",
    longDescription: "Show your love for Imbari Coffee with our premium embroidered golf cap. Adjustable fit, breathable fabric, and stylish design. Perfect for the golf course or casual wear."
  },
  {
    id: 26,
    slug: "dark-roast-whole-beans-2lb",
    name: "Dark Roast – Whole Beans",
    type: "Beans",
    size: "2lb (907g)",
    price: 44.99,
    image: withBasePath("/images/shop4.jpg"),
    description: "Bold dark roast in family-size 2lb pack.",
    longDescription: "Bulk dark roast for those who love bold, intense coffee. Perfect for households and offices that go through coffee quickly."
  },
  {
    id: 27,
    slug: "dark-roast-ground-coffee-2lb",
    name: "Dark Roast – Ground Coffee",
    type: "Ground",
    size: "2lb (907g)",
    price: 44.99,
    image: withBasePath("/images/shop3.jpg"),
    description: "Rich dark roast ground coffee for strong, bold brews.",
    longDescription: "Pre-ground dark roast in a generous 2lb package. Perfect for drip machines, French press, or cold brew preparation."
  },
  {
    id: 28,
    slug: "espresso-grind-ground-coffee-2lb",
    name: "Espresso Grind – Ground Coffee",
    type: "Ground",
    size: "2lb (907g)",
    price: 44.99,
    image: withBasePath("/images/shop4.jpg"),
    description: "Large pack of fine espresso grind for machines.",
    longDescription: "Bulk espresso grind for cafés, offices, or serious home baristas. Consistent grind size ensures perfect extraction every time."
  },
  {
    id: 29,
    slug: "light-roast-whole-beans-2lb",
    name: "Light Roast – Whole Beans",
    type: "Beans",
    size: "2lb (907g)",
    price: 44.99,
    image: withBasePath("/images/arabica.jpg"),
    description: "Light roast beans in bulk for daily brewing.",
    longDescription: "Family-size light roast for those who appreciate bright, complex flavors in their daily coffee routine."
  },
  {
    id: 30,
    slug: "light-roast-ground-coffee-2lb",
    name: "Light Roast – Ground Coffee",
    type: "Ground",
    size: "2lb (907g)",
    price: 44.99,
    image: withBasePath("/images/shop.jpg"),
    description: "Family-size light roast ground coffee.",
    longDescription: "Bulk ground light roast for offices and households. Bright, clean flavors perfect for morning brewing."
  },

  // GIFT ITEMS
  {
    id: 20,
    slug: "imbari-unity-mug",
    name: "Imbari The Unity Mug",
    type: "Gift",
    size: "12oz ceramic",
    price: 15.00,
    image: withBasePath("/images/shop.jpg"),
    description: "Premium ceramic mug with Imbari Unity design.",
    longDescription: "Start your day with our beautifully designed Unity Mug. Dishwasher and microwave safe, 12oz capacity. Perfect for coffee, tea, or hot chocolate."
  },
  {
    id: 21,
    slug: "imbari-safari-tote-bag",
    name: "Imbari Safari Tote Bag",
    type: "Gift",
    size: "Canvas",
    price: 25.00,
    image: withBasePath("/images/tote.jpg"),
    description: "Stylish canvas tote bag with safari-inspired Imbari design.",
    longDescription: "Eco-friendly canvas tote bag featuring our safari-inspired Imbari design. Perfect for grocery shopping, beach trips, or everyday use. Durable and washable."
  }
];

// Helper function to get product by slug
export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find(p => p.slug === slug);
}

// Helper function to get product by ID
export function getProductById(id: number): Product | undefined {
  return PRODUCTS.find(p => p.id === id);
}

// Generate all product slugs for static generation
export function getAllProductSlugs(): string[] {
  return PRODUCTS.map(p => p.slug);
}
