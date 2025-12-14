# 🚀 MAKE YOUR FIRST SALE TODAY - Quick Start

## ⚡ 3-Minute Setup

### Step 1: Get Stripe Keys (2 min)
1. Go to: https://dashboard.stripe.com/test/apikeys
2. Copy **Publishable key** (pk_test_...)
3. Copy **Secret key** (sk_test_...)

### Step 2: Configure Frontend (30 sec)
```bash
cd c:\Users\User\Documents\imbari-coffee-site
```

Edit `.env.local` - Replace this line:
```bash
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_REPLACE_WITH_YOUR_STRIPE_PUBLISHABLE_KEY
```
With:
```bash
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_YOUR_ACTUAL_KEY_HERE
```

### Step 3: Configure Backend (30 sec)
```bash
cd c:\Users\User\Documents\imbari-coffee-backend
```

Edit `.env` - Replace this line:
```bash
STRIPE_SECRET_KEY=sk_test_REPLACE_WITH_YOUR_STRIPE_SECRET_KEY
```
With:
```bash
STRIPE_SECRET_KEY=sk_test_YOUR_ACTUAL_KEY_HERE
```

### Step 4: Deploy Backend to Vercel (3-5 min)
```bash
cd c:\Users\User\Documents\imbari-coffee-backend
npm install -g vercel
vercel
```

**Follow prompts:**
- Project name: `imbari-coffee-backend`
- Framework: Other
- Build command: (leave empty)
- Output directory: `.`

**In Vercel Dashboard:** (https://vercel.com/dashboard)
- Go to Project Settings → Environment Variables
- Add:
  - `STRIPE_SECRET_KEY` = `sk_test_YOUR_KEY`
  - `FRONTEND_URL` = `https://junoway.github.io/ImbariWeb`
  - `ALLOWED_ORIGIN` = `https://junoway.github.io`

**Copy your deployment URL** (e.g., `https://imbari-coffee-backend-xyz.vercel.app`)

### Step 5: Update Frontend with Backend URL (10 sec)
Edit `imbari-coffee-site/.env.local`:
```bash
NEXT_PUBLIC_API_URL=https://your-backend-url.vercel.app
```

### Step 6: Deploy Frontend
```bash
cd c:\Users\User\Documents\imbari-coffee-site
git add .
git commit -m "chore: Add Stripe API keys"
git push origin main
```

Wait for GitHub Pages to deploy (~2 minutes)

### Step 7: TEST! 🎉
1. Visit: https://junoway.github.io/ImbariWeb/shop
2. Add products to cart
3. Click Checkout
4. Click "Place Order & Pay"
5. Use test card: **4242 4242 4242 4242**
   - Expiry: 12/34
   - CVC: 123
   - ZIP: 12345
6. See success page! ✅

---

## 🎯 Test Cards

**Success:**
- 4242 4242 4242 4242 (Visa)
- 5555 5555 5555 4444 (Mastercard)

**Fail (to test errors):**
- 4000 0000 0000 0002 (Card declined)

---

## ✅ You're Live!

Your payment system is now:
- ✅ Secure (PCI compliant via Stripe)
- ✅ Professional (Stripe hosted checkout)
- ✅ Fast (Serverless backend)
- ✅ Complete (Success/Cancel pages)

---

## 📊 Monitor Payments

**Stripe Dashboard:**
https://dashboard.stripe.com/test/payments

**View:**
- All payments
- Customer details
- Transaction logs
- Revenue analytics

---

## 🚀 Go Live (When Ready)

1. Get live Stripe keys: https://dashboard.stripe.com/apikeys
2. Replace test keys with live keys in:
   - Frontend `.env.local`: `pk_live_...`
   - Backend Vercel env vars: `sk_live_...`
3. Test with real card (small amount)
4. Start selling! 💰

---

## 🆘 Troubleshooting

**Issue:** "Payment system not configured"
- **Fix:** Check Stripe secret key in Vercel env vars

**Issue:** CORS error
- **Fix:** Verify ALLOWED_ORIGIN matches frontend URL

**Issue:** Checkout doesn't load
- **Fix:** Check NEXT_PUBLIC_API_URL points to deployed backend

---

## 📞 Quick Links

- Setup Guide: `STRIPE_SETUP_GUIDE.md`
- Stripe Docs: https://stripe.com/docs
- Test Cards: https://stripe.com/docs/testing#cards
- Support: imbaricoffee@gmail.com

---

**Status:** ✅ READY FOR FIRST SALE
**Time to First Payment:** ~10 minutes
**Security:** 🔒 Enterprise-grade (Stripe)
