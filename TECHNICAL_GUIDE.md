# Imbari Coffee - Technical Implementation Guide

**For Engineers Working on the Codebase**

---

## Quick Start for New Developers

### Clone & Setup (5 minutes)

\`\`\`bash
# Clone repository
git clone https://github.com/Junoway/ImbariWeb.git
cd ImbariWeb

# Install dependencies
npm install

# Create environment file
cp .env.local.example .env.local

# Edit .env.local with your keys:
# NEXT_PUBLIC_API_URL=http://localhost:3000 (for local dev)
# NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_...

# Run development server
npm run dev

# Open browser
open http://localhost:3000
\`\`\`

### Backend Setup (5 minutes)

\`\`\`bash
# In a new terminal, navigate to backend
cd ../imbari-coffee-backend

# Install dependencies
npm install

# Start Vercel dev server
vercel dev

# Backend will run on http://localhost:3000/api
\`\`\`

---

## Code Architecture

### Technology Stack

| Layer | Technology | Version | Purpose |
|-------|------------|---------|---------|
| Framework | Next.js | 16.0.6 | React framework with SSG |
| Language | TypeScript | 5.x | Type-safe JavaScript |
| Styling | Tailwind CSS | 3.x | Utility-first CSS |
| State | React Context | 18.x | Global cart state |
| Payments | Stripe | Latest | Checkout & payments |
| Deployment (FE) | GitHub Pages | - | Static hosting |
| Deployment (BE) | Vercel | - | Serverless functions |

### Project Structure Explained

\`\`\`
imbari-coffee-site/
│
├── app/                      # Next.js App Router (pages)
│   ├── layout.tsx            # Root layout (wraps all pages)
│   ├── page.tsx              # Home page (/)
│   ├── globals.css           # Global styles & CSS variables
│   │
│   ├── shop/                 # Shop page (/shop)
│   │   └── page.tsx          # Product listing + filters
│   │
│   ├── checkout/             # Checkout page (/checkout)
│   │   └── page.tsx          # Cart summary + Stripe integration
│   │
│   └── [other-pages]/        # All other routes
│
├── components/               # Reusable React components
│   ├── CartContext.tsx       # Global cart state (Provider)
│   ├── Navbar.tsx            # Site navigation
│   ├── Footer.tsx            # Site footer
│   └── [other-components]/
│
├── lib/
│   └── utils.ts              # Utility functions (withBasePath)
│
├── public/
│   └── images/               # Static assets
│
├── .env.local.example        # Environment variables template
├── next.config.ts            # Next.js configuration
├── tailwind.config.ts        # Tailwind CSS configuration
└── tsconfig.json             # TypeScript configuration
\`\`\`

---

## Key Files Deep Dive

### 1. `app/layout.tsx` - Root Layout

**Purpose**: Wraps all pages with shared layout (Navbar, Footer, CartProvider)

\`\`\`typescript
import { CartProvider } from "@/components/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>  {/* ← Global cart state */}
          <Navbar />    {/* ← Always visible */}
          {children}    {/* ← Page content */}
          <Footer />    {/* ← Always visible */}
        </CartProvider>
      </body>
    </html>
  );
}
\`\`\`

**Key Points**:
- CartProvider must wrap Navbar and pages for cart state access
- Metadata (title, description) set here for SEO
- Global fonts loaded here

---

### 2. `components/CartContext.tsx` - State Management

**Purpose**: Global shopping cart state using React Context

\`\`\`typescript
// Create context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider component
export function CartProvider({ children }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (item, quantity = 1) => {
    // Add or update item in cart
  };

  const updateQuantity = (id, quantity) => {
    // Update item quantity
  };

  const removeItem = (id) => {
    // Remove item from cart
  };

  const clearCart = () => {
    // Empty cart
  };

  // Computed values
  const totalQuantity = useMemo(() => 
    items.reduce((sum, item) => sum + item.quantity, 0), 
    [items]
  );

  const subtotal = useMemo(() => 
    items.reduce((sum, item) => sum + item.price * item.quantity, 0), 
    [items]
  );

  return (
    <CartContext.Provider value={{
      items,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      totalQuantity,
      subtotal
    }}>
      {children}
    </CartContext.Provider>
  );
}

// Hook for consuming context
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
\`\`\`

**Usage in Components**:

\`\`\`typescript
import { useCart } from "@/components/CartContext";

function ProductCard({ product }) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    }, 1);
  };

  return (
    <button onClick={handleAddToCart}>
      Add to Cart
    </button>
  );
}
\`\`\`

---

### 3. `app/shop/page.tsx` - Product Listing

**Purpose**: Display products with filtering and add-to-cart

**Key Features**:
- Product type filter (Beans, Ground, Instant, Green)
- Add to cart with toast notification
- Redirect to checkout

\`\`\`typescript
const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Medium Roast – Whole Beans",
    type: "Beans",
    size: "250g",
    price: 9,
    image: "/images/arabica.jpg",
    description: "Single-origin Mt. Elgon..."
  },
  // ... more products
];

export default function ShopPage() {
  const [filter, setFilter] = useState<ProductType | "All">("All");
  const { addItem } = useCart();
  const router = useRouter();

  const filtered = filter === "All" 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.type === filter);

  const handleAdd = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    }, 1);
    
    // Show toast notification
    setToast({ message: "Added to cart!", type: "success" });
    
    // Optional: redirect to checkout after delay
    setTimeout(() => router.push("/checkout"), 1500);
  };

  return (
    <main className="bg-yellow-400">
      {/* Filter buttons */}
      <div>
        {["All", "Beans", "Ground", "Instant", "Green"].map(type => (
          <button 
            key={type}
            onClick={() => setFilter(type)}
            className={filter === type ? "active" : ""}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Product grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {filtered.map(product => (
          <ProductCard 
            key={product.id} 
            product={product}
            onAdd={() => handleAdd(product)}
          />
        ))}
      </div>
    </main>
  );
}
\`\`\`

---

### 4. `app/checkout/page.tsx` - Cart & Checkout

**Purpose**: Display cart, calculate totals, integrate Stripe

**Key Features**:
- Cart item list with quantity update/remove
- Discount code (UBUNTU88 = 25% off)
- Tip input
- Subtotal, discount, tip, shipping, total calculation
- Stripe Checkout redirect

\`\`\`typescript
export default function CheckoutPage() {
  const { items, updateQuantity, removeItem, subtotal } = useCart();
  
  const [discountCode, setDiscountCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [discountApplied, setDiscountApplied] = useState(false);
  const [tip, setTip] = useState(0);
  
  const shipping = 10.0;

  // Apply discount
  const handleApplyDiscount = () => {
    if (discountCode.toUpperCase() === "UBUNTU88") {
      setDiscount(subtotal * 0.25); // 25% off
      setDiscountApplied(true);
    } else {
      setToast({ message: "Invalid code", type: "error" });
    }
  };

  // Calculate final total
  const total = subtotal - discount + tip + shipping;

  // Stripe checkout
  const handleStripeCheckout = async () => {
    setPlacingOrder(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      
      const res = await fetch(`${apiUrl}/api/create-checkout-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map(item => ({
            id: item.id,
            name: item.name,
            description: '',
            price: item.price,
            quantity: item.quantity,
            image: item.image
          })),
          discountCode: discountApplied ? discountCode : undefined,
          tipAmount: tip.toString()
        })
      });

      const data = await res.json();
      if (data.url) {
        window.location.assign(data.url); // Redirect to Stripe
      }
    } catch (error) {
      setToast({ message: "Checkout failed", type: "error" });
      setPlacingOrder(false);
    }
  };

  return (
    <main>
      {/* Discount code input */}
      <input 
        value={discountCode}
        onChange={(e) => setDiscountCode(e.target.value)}
        placeholder="Enter code (UBUNTU88)"
      />
      <button onClick={handleApplyDiscount}>Apply</button>

      {/* Tip input */}
      <input 
        type="number"
        value={tip}
        onChange={(e) => setTip(parseFloat(e.target.value) || 0)}
        placeholder="Add tip (optional)"
      />

      {/* Cart items */}
      {items.map(item => (
        <div key={item.id}>
          <img src={item.image} alt={item.name} />
          <h3>{item.name}</h3>
          <select 
            value={item.quantity}
            onChange={(e) => updateQuantity(String(item.id), parseInt(e.target.value))}
          >
            {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
          <p>${item.price * item.quantity}</p>
          <button onClick={() => removeItem(String(item.id))}>Remove</button>
        </div>
      ))}

      {/* Summary */}
      <div>
        <p>Subtotal: ${subtotal.toFixed(2)}</p>
        <p>Discount: -${discount.toFixed(2)}</p>
        <p>Tip: ${tip.toFixed(2)}</p>
        <p>Shipping: ${shipping.toFixed(2)}</p>
        <p><strong>Total: ${total.toFixed(2)}</strong></p>
      </div>

      {/* Checkout button */}
      <button onClick={handleStripeCheckout} disabled={placingOrder}>
        {placingOrder ? "Processing..." : "Proceed to Payment"}
      </button>
    </main>
  );
}
\`\`\`

---

### 5. Backend: `api/create-checkout-session.js`

**Purpose**: Serverless function to create Stripe Checkout session

\`\`\`javascript
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGIN);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { items, discountCode, tipAmount } = req.body;

    // Calculate subtotal
    let subtotal = 0;
    const lineItems = items.map(item => {
      subtotal += item.price * item.quantity;
      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            description: item.description || '',
            images: item.image ? [item.image] : []
          },
          unit_amount: Math.round(item.price * 100) // cents
        },
        quantity: item.quantity
      };
    });

    // Apply discount
    let discount = 0;
    if (discountCode && discountCode.toUpperCase() === 'UBUNTU88') {
      discount = subtotal * 0.25; // 25% off
    }

    // Add tip
    const tip = parseFloat(tipAmount) || 0;
    if (tip > 0) {
      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: { name: 'Tip' },
          unit_amount: Math.round(tip * 100)
        },
        quantity: 1
      });
    }

    // Add shipping
    lineItems.push({
      price_data: {
        currency: 'usd',
        product_data: { name: 'Shipping' },
        unit_amount: 1000 // $10.00
      },
      quantity: 1
    });

    // Create Stripe session
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: lineItems,
      payment_method_types: ['card'],
      success_url: `${process.env.FRONTEND_URL}/checkout?success=true`,
      cancel_url: `${process.env.FRONTEND_URL}/checkout?canceled=true`,
      metadata: {
        discountCode: discountCode || 'none',
        discountAmount: discount.toFixed(2),
        tipAmount: tip.toFixed(2)
      }
    });

    return res.status(200).json({ 
      url: session.url,
      sessionId: session.id 
    });
  } catch (err) {
    console.error('Stripe error:', err);
    return res.status(500).json({ 
      error: 'Server error creating checkout session' 
    });
  }
}
\`\`\`

---

## Common Development Tasks

### Adding a New Product

**File**: `app/shop/page.tsx`

\`\`\`typescript
const PRODUCTS: Product[] = [
  // ... existing products
  {
    id: 99,                          // Unique ID
    name: "New Coffee Product",      // Display name
    type: "Beans",                   // Filter category
    size: "500g",                    // Size label
    price: 20,                       // Price in USD
    image: "/images/new-product.jpg", // Image path
    description: "Description..."    // Short description
  }
];
\`\`\`

### Adding a New Page

1. **Create page file**: `app/new-page/page.tsx`
2. **Add route to Navbar**: `components/Navbar.tsx`
3. **Add route to Footer**: `components/Footer.tsx`

\`\`\`typescript
// app/new-page/page.tsx
export default function NewPage() {
  return (
    <main className="bg-white min-h-screen">
      <h1>New Page Title</h1>
      <p>Content goes here...</p>
    </main>
  );
}
\`\`\`

\`\`\`typescript
// components/Navbar.tsx
<nav>
  <Link href="/new-page">New Page</Link>
</nav>
\`\`\`

### Updating Styles

**Global styles**: `app/globals.css`  
**Component styles**: Use Tailwind classes in JSX  
**Custom colors**: `tailwind.config.ts`

\`\`\`typescript
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      'brand-green': '#10b981',  // Add custom color
      'brand-gold': '#ffd700'
    }
  }
}
\`\`\`

\`\`\`typescript
// Usage in component
<button className="bg-brand-green hover:bg-brand-gold">
  Click me
</button>
\`\`\`

### Environment Variables

**Frontend** (`.env.local`):
\`\`\`bash
NEXT_PUBLIC_API_URL=https://your-backend.vercel.app
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_...
\`\`\`

**Backend** (Vercel dashboard):
\`\`\`bash
STRIPE_SECRET_KEY=sk_test_...
FRONTEND_URL=https://junoway.github.io/ImbariWeb
ALLOWED_ORIGIN=https://junoway.github.io
\`\`\`

**Important**: 
- Frontend vars must start with `NEXT_PUBLIC_`
- Never commit `.env.local` to git (in `.gitignore`)
- Backend secrets stored in Vercel, not in code

---

## Testing Guide

### Manual Testing Checklist

\`\`\`bash
# 1. Start dev server
npm run dev

# 2. Test all pages load
- http://localhost:3000/
- http://localhost:3000/about
- http://localhost:3000/shop
- http://localhost:3000/checkout
- ... (all routes)

# 3. Test cart functionality
- Add items to cart from shop page
- See cart badge update in navbar
- Go to checkout
- Update quantities
- Remove items
- Clear cart

# 4. Test discount code
- Add items to cart
- Go to checkout
- Enter "UBUNTU88"
- Verify 25% discount applies

# 5. Test Stripe checkout (with backend running)
- Complete checkout flow
- Use test card: 4242 4242 4242 4242
- Verify redirect to success page

# 6. Test responsive design
- Resize browser to mobile (375px)
- Verify mobile menu works
- Test all pages on mobile
\`\`\`

### Browser Testing

Test on:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Mobile Safari (iOS)
- Chrome Mobile (Android)

### Common Issues & Fixes

| Issue | Cause | Fix |
|-------|-------|-----|
| Cart not updating | CartContext not wrapping component | Check layout.tsx |
| Images not loading | Wrong path | Use `/images/` prefix |
| Stripe checkout fails | Missing env vars | Check `.env.local` |
| CORS error | Backend ALLOWED_ORIGIN wrong | Update Vercel env vars |
| Build fails | TypeScript errors | Run `npm run build` locally |

---

## Deployment Workflow

### Frontend (GitHub Pages)

\`\`\`bash
# 1. Update environment variables
# Edit .env.local with production backend URL

# 2. Build static site
npm run build

# 3. Test build locally
npx serve out

# 4. Push to GitHub
git add .
git commit -m "Update frontend"
git push origin main

# 5. GitHub Pages auto-deploys
# Wait 2-3 minutes, then visit:
# https://junoway.github.io/ImbariWeb
\`\`\`

### Backend (Vercel)

\`\`\`bash
# 1. Navigate to backend folder
cd imbari-coffee-backend

# 2. Deploy
vercel --prod

# 3. Set environment variables in Vercel dashboard
# (only needed once)

# 4. Get deployment URL
# https://imbari-coffee-backend.vercel.app
\`\`\`

---

## Performance Optimization

### Image Optimization

\`\`\`typescript
// Always use Next.js Image component
import Image from "next/image";

// Good ✓
<Image 
  src="/images/product.jpg"
  alt="Product"
  width={320}
  height={320}
  loading="lazy"
/>

// Bad ✗
<img src="/images/product.jpg" alt="Product" />
\`\`\`

### Code Splitting

\`\`\`typescript
// Lazy load heavy components
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Loading...</p>,
  ssr: false
});
\`\`\`

### Bundle Analysis

\`\`\`bash
# Analyze bundle size
npm install --save-dev @next/bundle-analyzer

# Add to next.config.ts:
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});

module.exports = withBundleAnalyzer(nextConfig);

# Run analysis
ANALYZE=true npm run build
\`\`\`

---

## Debugging Tips

### Enable Debug Logging

\`\`\`typescript
// Add to component
console.log('Cart items:', items);
console.log('Total:', total);

// Use React DevTools
// Install: https://chrome.google.com/webstore/detail/react-developer-tools
\`\`\`

### Inspect Network Requests

\`\`\`
1. Open Chrome DevTools (F12)
2. Go to Network tab
3. Filter by "Fetch/XHR"
4. Click request to see details
\`\`\`

### Check Vercel Logs

\`\`\`bash
# View backend logs
vercel logs --follow

# Or visit Vercel dashboard:
# https://vercel.com/dashboard
\`\`\`

---

## Code Style Guide

### TypeScript

\`\`\`typescript
// Use interfaces for objects
interface Product {
  id: number;
  name: string;
  price: number;
}

// Use type for unions
type Status = 'pending' | 'success' | 'error';

// Use arrow functions
const handleClick = () => {
  console.log('clicked');
};

// Use optional chaining
const name = user?.profile?.name;
\`\`\`

### React

\`\`\`typescript
// Use functional components
function MyComponent({ prop }: Props) {
  return <div>{prop}</div>;
}

// Use hooks
const [state, setState] = useState<string>('');
const value = useMemo(() => compute(), [dep]);
useEffect(() => {
  // side effect
}, [dep]);

// Extract complex JSX into components
function ProductCard({ product }: { product: Product }) {
  return (
    <div className="card">
      {/* ... */}
    </div>
  );
}
\`\`\`

### CSS (Tailwind)

\`\`\`typescript
// Prefer Tailwind classes
<div className="bg-white rounded-lg shadow-md p-4">

// Use custom classes for repeated patterns
// In globals.css:
.card {
  @apply bg-white rounded-lg shadow-md p-4;
}

// Use in component:
<div className="card">
\`\`\`

---

## Git Workflow

### Branch Naming

\`\`\`
feature/add-subscription-feature
bugfix/fix-cart-removal-bug
hotfix/stripe-api-urgent-fix
docs/update-readme
\`\`\`

### Commit Messages

\`\`\`
feat: Add product filtering to shop page
fix: Resolve cart quantity update bug
docs: Update API documentation
style: Improve button hover effects
refactor: Simplify checkout calculation logic
test: Add unit tests for CartContext
\`\`\`

### Pull Request Process

1. Create feature branch
2. Make changes
3. Test locally
4. Commit with clear message
5. Push to GitHub
6. Create pull request
7. Request review
8. Merge after approval

---

## Helpful Commands

\`\`\`bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Start production server

# Testing
npm run lint             # Run ESLint
npm run type-check       # Run TypeScript check

# Dependencies
npm install              # Install all dependencies
npm install <package>    # Install new package
npm update               # Update dependencies
npm outdated             # Check for outdated packages

# Git
git status               # Check file changes
git add .                # Stage all changes
git commit -m "message"  # Commit with message
git push origin main     # Push to remote
git pull origin main     # Pull latest changes

# Vercel
vercel                   # Deploy preview
vercel --prod            # Deploy to production
vercel logs              # View logs
vercel env add           # Add environment variable
\`\`\`

---

## Resources

### Official Documentation

- **Next.js**: https://nextjs.org/docs
- **React**: https://react.dev
- **TypeScript**: https://www.typescriptlang.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Stripe**: https://stripe.com/docs
- **Vercel**: https://vercel.com/docs

### Tutorials

- Next.js App Router: https://nextjs.org/docs/app
- React Context: https://react.dev/reference/react/createContext
- Stripe Checkout: https://stripe.com/docs/checkout/quickstart

### Community

- Next.js Discord: https://nextjs.org/discord
- GitHub Issues: https://github.com/Junoway/ImbariWeb/issues
- Stack Overflow: Tag `nextjs`, `typescript`, `stripe`

---

**Document Version**: 1.0.0  
**Last Updated**: December 7, 2025  
**Maintained By**: Technical Team
