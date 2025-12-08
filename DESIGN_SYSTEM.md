# Imbari Coffee - Complete Design System & Architecture Documentation

**Version:** 1.0.0  
**Last Updated:** December 7, 2025  
**Repository:** https://github.com/Junoway/ImbariWeb  
**Live Site:** https://junoway.github.io/ImbariWeb

---

## Table of Contents

1. [Design Language](#design-language)
2. [Color Palette](#color-palette)
3. [Typography](#typography)
4. [Component Library](#component-library)
5. [Page Structure](#page-structure)
6. [State Management](#state-management)
7. [E-Commerce Flow](#e-commerce-flow)
8. [API Integration](#api-integration)
9. [Deployment Architecture](#deployment-architecture)
10. [File Structure](#file-structure)

---

## Design Language

### Core Principles

**1. Premium Minimalism**
- Pure white (#FFFFFF) backgrounds as primary canvas
- Vibrant emerald green (#10b981) as primary accent
- Clean, spacious layouts with generous whitespace
- Premium glassmorphism effects for depth

**2. Coffee Heritage**
- Kahawa-inspired palette (secondary)
- Brown tones (#4e342e) for heritage elements
- Gold accents (#ffd700) for premium touches
- Deep blacks for contrast and sophistication

**3. African Authenticity**
- Mt. Elgon imagery as hero backgrounds
- Ethiopian/Ugandan cultural motifs (subtle)
- Warm, inviting color transitions
- Natural, organic shapes and patterns

**4. Responsive Excellence**
- Mobile-first approach
- Fluid typography (clamp values)
- Touch-friendly interactions (min 44px targets)
- Optimized images with Next.js Image

---

## Color Palette

### Primary Colors (Main Design)

\`\`\`css
--primary-white: #FFFFFF;
--primary-green: #10b981;      /* emerald-500 */
--primary-green-hover: #22c55e; /* emerald-400 */
--primary-green-dark: #064E3B;  /* emerald-900 */
--primary-black: #000000;
--neutral-gray: #9ca3af;        /* gray-400 */
\`\`\`

### Kahawa Heritage Palette (Secondary)

\`\`\`css
--kahawa-brown: #4e342e;
--kahawa-gold: #ffd700;
--kahawa-black: #181818;
--kahawa-red: #b71c1c;
--kahawa-cream: #f5f3e7;
--kahawa-green: #388e3c;
--kahawa-accent: #ffd700;
\`\`\`

### Semantic Colors

\`\`\`css
--success: #10b981;    /* emerald-500 */
--error: #ef4444;      /* red-500 */
--warning: #f59e0b;    /* amber-500 */
--info: #3b82f6;       /* blue-500 */
\`\`\`

### Color Usage Guidelines

| Element | Color | Usage |
|---------|-------|-------|
| Background (Main) | White (#FFFFFF) | All page backgrounds except shop |
| Background (Shop) | Yellow (#ffd700) | Shop page only |
| Primary CTA | Emerald Green (#10b981) | Buttons, links, accents |
| Navbar/Footer | Deep Black (#050403) | Navigation elements |
| Text (Primary) | Black (#000000) | Body text, headings |
| Text (Secondary) | Gray (#9ca3af) | Captions, metadata |
| Borders | Emerald/20 | Subtle divisions |
| Shadows | Black/10-30 | Depth and elevation |

---

## Typography

### Font Families

\`\`\`css
--font-primary: var(--font-inter), system-ui, -apple-system, sans-serif;
--font-headings: var(--font-playfair), "Times New Roman", serif;
\`\`\`

### Font Scales

#### Desktop (1440px+)
\`\`\`
H1: 72px / 5rem (font-extrabold)
H2: 60px / 3.75rem (font-extrabold)
H3: 48px / 3rem (font-bold)
H4: 36px / 2.25rem (font-semibold)
Body: 18px / 1.125rem (font-normal)
Small: 14px / 0.875rem (font-normal)
Caption: 12px / 0.75rem (font-normal)
\`\`\`

#### Tablet (768px - 1439px)
\`\`\`
H1: 56px / 3.5rem
H2: 48px / 3rem
H3: 36px / 2.25rem
H4: 28px / 1.75rem
Body: 16px / 1rem
Small: 14px / 0.875rem
Caption: 11px / 0.6875rem
\`\`\`

#### Mobile (< 768px)
\`\`\`
H1: 48px / 3rem
H2: 36px / 2.25rem
H3: 28px / 1.75rem
H4: 24px / 1.5rem
Body: 15px / 0.9375rem
Small: 13px / 0.8125rem
Caption: 11px / 0.6875rem
\`\`\`

### Typography Guidelines

- **Headings**: Use Playfair Display for elegance
- **Body**: Use Inter for readability
- **Line Height**: 1.5 for body, 1.2 for headings
- **Letter Spacing**: -0.02em for large headings
- **Font Weight**: Bold (700) for CTAs, semibold (600) for subheadings

---

## Component Library

### 1. Navigation (Navbar)

**File**: `components/Navbar.tsx`

**Structure**:
\`\`\`
┌─────────────────────────────────────────────┐
│ Logo | Nav Links (center) | Cart + Menu     │
└─────────────────────────────────────────────┘
\`\`\`

**Features**:
- Fixed position with backdrop blur
- Logo: 56×56px rounded image
- Desktop nav: Horizontal centered links
- Mobile: "MORE" button with dropdown
- Cart icon with live item count badge
- Responsive breakpoint: 768px

**Colors**:
- Background: `#050403/95` with blur
- Links: `#f3f4f6` (hover: `#6ee7b7`)
- "MORE" button: Gold gradient
- Cart icon: Emerald border

---

### 2. Footer

**File**: `components/Footer.tsx`

**Structure**:
\`\`\`
┌─────────────────────────────────────────────┐
│ Logo + Description │ Explore │ Products │  │
│                    │  Links  │  Links   │  │
├─────────────────────────────────────────────┤
│ Get in Touch: Email, Phone, Social          │
├─────────────────────────────────────────────┤
│ Copyright © 2025                            │
└─────────────────────────────────────────────┘
\`\`\`

**Features**:
- 4-column grid (responsive to 1-column mobile)
- UCDA certification badge
- Social media links
- Email/phone contact info
- Newsletter signup placeholder

**Colors**:
- Background: Gradient black to emerald
- Text: `#f3f4f6`
- Links: Emerald hover

---

### 3. Hero Section

**File**: `app/page.tsx` (Home Hero)

**Structure**:
\`\`\`
┌─────────────────────────────────────────────┐
│                                             │
│           [Mt. Elgon Background]            │
│                                             │
│     Uganda Specialty Coffee Exporter       │
│       "Africa's Premium Coffee"            │
│                                             │
│           [Buy Coffee Button]               │
│                                             │
└─────────────────────────────────────────────┘
\`\`\`

**Features**:
- Full viewport height (100vh)
- Background: Mt. Elgon image with 0.4 opacity slider
- Slider: 3 images rotating every 5s
- Text: White with shadow for readability
- CTA: Yellow gradient button with green accents

**Animations**:
- Fade-in text on load
- Image crossfade transition
- Button hover glow effect

---

### 4. Cart Context

**File**: `components/CartContext.tsx`

**API**:
\`\`\`typescript
type CartItem = {
  id: string | number;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  addItem: (item, quantity?) => void;
  updateQuantity: (id, quantity) => void;
  removeItem: (id) => void;
  clearCart: () => void;
  totalQuantity: number;
  subtotal: number;
};
\`\`\`

**Usage**:
\`\`\`typescript
const { items, addItem, totalQuantity } = useCart();
\`\`\`

---

### 5. Product Card

**Location**: `app/shop/page.tsx`

**Structure**:
\`\`\`
┌──────────────────┐
│                  │
│  Product Image   │
│                  │
├──────────────────┤
│ Product Name     │
│ Size | $Price    │
│ Description...   │
│ [Add to Cart]    │
└──────────────────┘
\`\`\`

**Features**:
- Hover: Scale 1.05 + shadow increase
- Image: Next.js Image with fill
- Price: Bold, large font
- Add button: Emerald green with white text

---

### 6. Checkout Summary

**File**: `app/checkout/page.tsx`

**Structure**:
\`\`\`
┌─────────────────────────────────────┐
│ Cart Items                          │
│  - Item 1 | Qty | Price | [Remove] │
│  - Item 2 | Qty | Price | [Remove] │
├─────────────────────────────────────┤
│ Discount Code: [Input] [Apply]     │
├─────────────────────────────────────┤
│ Add Tip: [Input]                    │
├─────────────────────────────────────┤
│ Subtotal:      $XX.XX               │
│ Discount:     -$XX.XX               │
│ Tip:           $XX.XX               │
│ Shipping:      $10.00               │
│ ─────────────────────               │
│ Total:         $XX.XX               │
├─────────────────────────────────────┤
│ [Proceed to Payment] (Stripe)       │
└─────────────────────────────────────┘
\`\`\`

**Features**:
- Live calculation of totals
- Discount code: UBUNTU88 (25% off)
- Tip input (optional)
- Shipping: $10 flat rate
- Remove confirmation modal
- Stripe Checkout integration

---

## Page Structure

### Page Hierarchy

\`\`\`
/
├── / (Home)
├── /about
├── /our-impact
├── /imbari-story
├── /products
├── /shop
├── /certifications
├── /careers
├── /value-chain
├── /legal
├── /contact
├── /distribution
└── /checkout
\`\`\`

### Page Templates

#### Standard Page Template
\`\`\`
┌─────────────────────────────────────┐
│ Navbar                              │
├─────────────────────────────────────┤
│ Hero/Header Section                 │
│  - Title                            │
│  - Subtitle                         │
│  - CTA Buttons (optional)           │
├─────────────────────────────────────┤
│ Content Sections                    │
│  - Text blocks                      │
│  - Image galleries                  │
│  - Call-to-actions                  │
├─────────────────────────────────────┤
│ Footer                              │
└─────────────────────────────────────┘
\`\`\`

#### E-Commerce Page Template (/shop, /checkout)
\`\`\`
┌─────────────────────────────────────┐
│ Navbar                              │
├─────────────────────────────────────┤
│ Page Title + Filter/Controls        │
├─────────────────────────────────────┤
│ Product Grid / Cart Summary         │
│  - Cards in responsive grid         │
│  - Interactive elements             │
├─────────────────────────────────────┤
│ Footer                              │
└─────────────────────────────────────┘
\`\`\`

---

## State Management

### Global State (React Context)

**CartContext** (`components/CartContext.tsx`)
- Manages shopping cart across all pages
- Persisted in component state (not localStorage)
- Provides:
  - Items array
  - Add/update/remove functions
  - Total quantity
  - Subtotal calculation

### Local State (Component-level)

- Form inputs
- Modal visibility
- Filter/sort selections
- Loading states
- Toast notifications

### URL State

- Page navigation (Next.js routing)
- Query parameters for success/cancel (Stripe redirects)

---

## E-Commerce Flow

### User Journey Wireframe

\`\`\`
[Home Page]
    ↓ Click "Shop"
[Shop Page]
    ↓ Filter products
    ↓ Click "Add to Cart"
    ↓ Toast: "Added to cart"
[Navbar Cart Badge] updates
    ↓ Click Cart Icon
[Checkout Page]
    ↓ Review items
    ↓ Enter discount code (optional)
    ↓ Enter tip (optional)
    ↓ Click "Proceed to Payment"
[Stripe Checkout] (external)
    ↓ Enter card details
    ↓ Complete payment
[Checkout Page] (?success=true)
    ↓ Show success message
[Order Confirmation]
\`\`\`

### Checkout Data Flow

\`\`\`
[Frontend - Checkout Page]
  ↓
  Prepare checkout data:
    {
      items: [...],
      discountCode: "UBUNTU88",
      tipAmount: "5.00"
    }
  ↓
[POST] /api/create-checkout-session
  ↓
[Backend - Vercel Serverless]
  ↓
  Calculate totals
  Apply discount (25% if UBUNTU88)
  Create line items
  ↓
[Stripe API]
  ↓
  Create Checkout Session
  ↓
[Backend Response]
  {
    url: "https://checkout.stripe.com/...",
    sessionId: "cs_..."
  }
  ↓
[Frontend]
  window.location.assign(url)
  ↓
[Stripe Checkout Page]
  ↓
  User completes payment
  ↓
[Redirect] success_url or cancel_url
\`\`\`

---

## API Integration

### Frontend Environment Variables

\`\`\`.env
NEXT_PUBLIC_API_URL=https://your-backend.vercel.app
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_...
\`\`\`

### Backend Environment Variables

\`\`\`.env
STRIPE_SECRET_KEY=sk_test_...
FRONTEND_URL=https://junoway.github.io/ImbariWeb
ALLOWED_ORIGIN=https://junoway.github.io
\`\`\`

### API Endpoint

**POST** `/api/create-checkout-session`

**Request Body**:
\`\`\`json
{
  "items": [
    {
      "id": "1",
      "name": "Arabica Coffee Beans",
      "description": "Premium Mt. Elgon Arabica",
      "price": 25.00,
      "quantity": 2,
      "image": "https://..."
    }
  ],
  "discountCode": "UBUNTU88",
  "tipAmount": "5.00"
}
\`\`\`

**Response**:
\`\`\`json
{
  "url": "https://checkout.stripe.com/c/pay/...",
  "sessionId": "cs_test_..."
}
\`\`\`

**Error Response**:
\`\`\`json
{
  "error": "Server error creating checkout session",
  "details": "Error message..."
}
\`\`\`

---

## Deployment Architecture

### Architecture Diagram

\`\`\`
┌──────────────────────────────────────────────────┐
│                                                  │
│  User's Browser                                  │
│                                                  │
└────────────────┬─────────────────────────────────┘
                 │
                 ↓
┌──────────────────────────────────────────────────┐
│  GitHub Pages (Static Frontend)                  │
│  https://junoway.github.io/ImbariWeb            │
│                                                  │
│  - HTML/CSS/JS (Next.js static export)          │
│  - Images, fonts, assets                        │
│  - No server-side code                          │
└────────────────┬─────────────────────────────────┘
                 │
                 │ API calls (HTTPS)
                 ↓
┌──────────────────────────────────────────────────┐
│  Vercel (Serverless Backend)                     │
│  https://imbari-coffee-backend.vercel.app        │
│                                                  │
│  - /api/create-checkout-session                  │
│  - Environment variables (secrets)               │
│  - CORS configuration                            │
└────────────────┬─────────────────────────────────┘
                 │
                 │ Stripe API calls
                 ↓
┌──────────────────────────────────────────────────┐
│  Stripe Checkout                                 │
│  https://checkout.stripe.com                     │
│                                                  │
│  - Payment processing                            │
│  - Card validation                               │
│  - 3D Secure                                     │
└──────────────────────────────────────────────────┘
\`\`\`

### Deployment Steps

1. **Backend Deployment (Vercel)**:
   - Deploy from `imbari-coffee-backend` folder
   - Set environment variables
   - Get deployment URL

2. **Frontend Configuration**:
   - Update `.env.local` with backend URL
   - Rebuild static site: `npm run build`

3. **GitHub Pages Deployment**:
   - Push to `ImbariWeb` repository
   - GitHub Pages auto-deploys from `main` branch

---

## File Structure

\`\`\`
imbari-coffee-site/
│
├── app/                           # Next.js App Router pages
│   ├── layout.tsx                 # Root layout with CartProvider
│   ├── page.tsx                   # Home page
│   ├── globals.css                # Global styles
│   ├── about/page.tsx
│   ├── careers/page.tsx
│   ├── certifications/page.tsx
│   ├── checkout/page.tsx          # Shopping cart & checkout
│   ├── contact/page.tsx
│   ├── distribution/page.tsx
│   ├── imbari-story/page.tsx
│   ├── legal/page.tsx
│   ├── our-impact/page.tsx
│   ├── products/page.tsx
│   ├── shop/page.tsx              # E-commerce product listing
│   └── value-chain/page.tsx
│
├── components/                    # Reusable React components
│   ├── CartContext.tsx            # Global cart state
│   ├── Footer.tsx                 # Site footer
│   ├── Hero.tsx                   # Hero section (legacy)
│   ├── ImpactChatBot.tsx          # Chat widget placeholder
│   ├── KahawaAssets.tsx           # Design motifs
│   ├── Navbar.tsx                 # Site navigation
│   └── ParallaxSection.tsx        # Parallax effect (legacy)
│
├── lib/
│   └── utils.ts                   # Utility functions (withBasePath)
│
├── public/
│   └── images/                    # All static images
│       ├── logo-main.jpg
│       ├── logo-foot.jpg
│       ├── mt-elgon.jpg
│       ├── arabica.jpg
│       ├── robusta.jpg
│       └── ...
│
├── .env.local.example             # Environment variable template
├── next.config.ts                 # Next.js configuration
├── package.json                   # Dependencies
├── tailwind.config.ts             # Tailwind CSS config
└── tsconfig.json                  # TypeScript config

imbari-coffee-backend/
│
├── api/
│   └── create-checkout-session.js # Serverless Stripe endpoint
│
├── .env.example                   # Environment variable template
├── .gitignore
├── package.json
├── README.md
└── vercel.json                    # Vercel deployment config
\`\`\`

---

## Responsive Breakpoints

\`\`\`css
/* Mobile First */
default: < 640px    (Mobile portrait)

/* Tailwind breakpoints */
sm: 640px           (Mobile landscape)
md: 768px           (Tablet portrait)
lg: 1024px          (Tablet landscape / Small desktop)
xl: 1280px          (Desktop)
2xl: 1536px         (Large desktop)
\`\`\`

### Layout Adjustments by Breakpoint

| Element | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| Navbar Links | Hidden (Menu) | Hidden (Menu) | Visible inline |
| Hero Text | 3rem (48px) | 3.5rem (56px) | 5rem (72px) |
| Product Grid | 1 column | 2 columns | 3-4 columns |
| Footer | 1 column | 2 columns | 4 columns |
| Container Max-Width | 100% | 720px | 1280px |

---

## Design Tokens

### Spacing Scale (Tailwind)

\`\`\`
0: 0px
1: 0.25rem (4px)
2: 0.5rem (8px)
3: 0.75rem (12px)
4: 1rem (16px)
6: 1.5rem (24px)
8: 2rem (32px)
12: 3rem (48px)
16: 4rem (64px)
20: 5rem (80px)
24: 6rem (96px)
\`\`\`

### Border Radius

\`\`\`
rounded-none: 0
rounded-sm: 0.125rem (2px)
rounded: 0.25rem (4px)
rounded-md: 0.375rem (6px)
rounded-lg: 0.5rem (8px)
rounded-xl: 0.75rem (12px)
rounded-2xl: 1rem (16px)
rounded-3xl: 1.5rem (24px)
rounded-full: 9999px
\`\`\`

### Shadow Scale

\`\`\`
shadow-sm: 0 1px 2px rgba(0,0,0,0.05)
shadow: 0 1px 3px rgba(0,0,0,0.1)
shadow-md: 0 4px 6px rgba(0,0,0,0.1)
shadow-lg: 0 10px 15px rgba(0,0,0,0.1)
shadow-xl: 0 20px 25px rgba(0,0,0,0.1)
shadow-2xl: 0 25px 50px rgba(0,0,0,0.25)
\`\`\`

---

## Animation Guidelines

### CSS Animations

\`\`\`css
/* Fade In */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Slide Down */
@keyframes slideDown {
  from { transform: translateY(-10px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

/* Pulse */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}
\`\`\`

### Usage

\`\`\`tsx
className="animate-fade-in"
className="animate-slide-down"
className="animate-pulse"
\`\`\`

### Transition Standards

- **Hover states**: 200ms ease
- **Modal open/close**: 300ms ease-in-out
- **Page transitions**: 400ms ease
- **Micro-interactions**: 150ms ease

---

## Accessibility Standards

### WCAG 2.1 Level AA Compliance

- **Color Contrast**: Minimum 4.5:1 for body text
- **Focus Indicators**: Visible on all interactive elements
- **Alt Text**: All images have descriptive alt attributes
- **Keyboard Navigation**: Full site navigable via keyboard
- **ARIA Labels**: Buttons and links have clear labels
- **Semantic HTML**: Proper heading hierarchy (h1 → h6)

### Recommended Testing

\`\`\`bash
# Lighthouse audit
npm run build
npx serve out
# Open Chrome DevTools → Lighthouse → Run audit

# Accessibility audit
npx @axe-core/cli https://junoway.github.io/ImbariWeb
\`\`\`

---

## Performance Optimization

### Image Optimization

- Use Next.js `<Image>` component
- Lazy load below-the-fold images
- Serve WebP with JPEG fallback
- Responsive srcset for different screen sizes

### Code Splitting

- Next.js automatic code splitting per page
- Dynamic imports for heavy components
- Lazy load cart context only when needed

### Caching Strategy

- Static assets: Cache-Control: public, max-age=31536000
- HTML pages: Cache-Control: public, max-age=0, must-revalidate
- API responses: No caching (always fresh)

---

## Browser Support

| Browser | Minimum Version |
|---------|----------------|
| Chrome | 90+ |
| Firefox | 88+ |
| Safari | 14+ |
| Edge | 90+ |
| Mobile Safari (iOS) | 14+ |
| Chrome Mobile (Android) | 90+ |

### Polyfills

- None required (modern browsers only)
- Babel transpilation for ES6+

---

## Security Best Practices

### Frontend

- No sensitive data in client code
- Environment variables prefixed with `NEXT_PUBLIC_`
- HTTPS only (enforced by GitHub Pages)
- CSP headers (configured in Vercel)

### Backend

- Stripe secret keys in Vercel environment variables
- CORS restricted to frontend domain
- Input validation on all API endpoints
- Rate limiting (Vercel default)

### Stripe Integration

- Use Stripe Checkout (PCI compliant)
- Never handle raw card data
- Use test keys in development
- Verify webhook signatures (if implemented)

---

## Testing Strategy

### Manual Testing Checklist

- [ ] All pages load without errors
- [ ] Navigation works (desktop & mobile)
- [ ] Cart add/remove/update functions
- [ ] Discount code applies correctly (UBUNTU88)
- [ ] Tip calculation is accurate
- [ ] Stripe redirect works
- [ ] Success/cancel redirects work
- [ ] Images load properly
- [ ] Responsive design on 3+ screen sizes
- [ ] Links open in correct tabs (external = new tab)

### Automated Testing (Recommended)

\`\`\`bash
# Unit tests (Jest + React Testing Library)
npm install --save-dev jest @testing-library/react

# E2E tests (Playwright)
npm install --save-dev @playwright/test
\`\`\`

---

## Contributing Guidelines

### Branch Naming

\`\`\`
feature/cart-persistence
bugfix/navbar-mobile-menu
hotfix/stripe-api-error
docs/update-readme
\`\`\`

### Commit Messages

\`\`\`
feat: Add discount code functionality
fix: Resolve cart removal bug
docs: Update design system documentation
style: Improve button hover effects
refactor: Simplify checkout calculation logic
test: Add unit tests for CartContext
\`\`\`

### Pull Request Template

\`\`\`markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Design/style update

## Testing
- [ ] Manual testing completed
- [ ] Screenshots attached (if UI changes)
- [ ] Browser compatibility verified

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
\`\`\`

---

## Future Enhancements

### Planned Features

1. **User Accounts**
   - Registration/login
   - Order history
   - Saved addresses

2. **Backend Order Management**
   - Webhook handling for order confirmation
   - Admin dashboard for orders
   - Email notifications

3. **Advanced E-Commerce**
   - Product variants (size, roast level)
   - Inventory management
   - Subscription boxes

4. **Content Management**
   - Blog/news section
   - Customer testimonials
   - Coffee brewing guides

5. **Internationalization**
   - Multi-language support
   - Currency conversion
   - Regional pricing

---

## Maintenance Schedule

### Weekly
- Check Vercel deployment logs
- Monitor Stripe dashboard for errors
- Review analytics (if implemented)

### Monthly
- Update dependencies: `npm outdated`
- Review security advisories
- Audit performance metrics

### Quarterly
- Full accessibility audit
- Browser compatibility testing
- Design system review

---

## Support & Contact

**Technical Lead**: [Your Name]  
**Email**: info@imbaricoffee.com  
**Repository**: https://github.com/Junoway/ImbariWeb  
**Vercel Dashboard**: https://vercel.com/dashboard  
**Stripe Dashboard**: https://dashboard.stripe.com

---

**Document Version**: 1.0.0  
**Last Updated**: December 7, 2025  
**Next Review**: March 7, 2026
