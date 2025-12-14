# 🎯 Stripe Payment Integration - Complete Setup Guide

## 🚀 Quick Start (Ready for First Purchase TODAY!)

### Prerequisites
- Stripe account (create free at https://stripe.com)
- Access to both frontend and backend repositories
- Vercel account for backend deployment

---

## 📋 Step-by-Step Setup

### 1️⃣ Get Your Stripe API Keys

1. **Go to Stripe Dashboard**
   - Test Mode: https://dashboard.stripe.com/test/apikeys
   - Live Mode: https://dashboard.stripe.com/apikeys

2. **Copy These Keys:**
   - **Publishable Key** (starts with `pk_test_...` or `pk_live_...`)
   - **Secret Key** (starts with `sk_test_...` or `sk_live_...`)

> ⚠️ **IMPORTANT**: Use TEST keys for development, LIVE keys for production

---

### 2️⃣ Configure Frontend (imbari-coffee-site)

**File: `.env.local`**

```bash
# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_YOUR_ACTUAL_PUBLISHABLE_KEY_HERE

# Backend API URL
# Development:
NEXT_PUBLIC_API_URL=http://localhost:3000

# Production (update after deploying backend):
# NEXT_PUBLIC_API_URL=https://your-backend.vercel.app
```

**Replace `pk_test_YOUR_ACTUAL_PUBLISHABLE_KEY_HERE` with your actual Stripe publishable key!**

---

### 3️⃣ Configure Backend (imbari-coffee-backend)

**File: `.env`**

```bash
# Stripe Secret Key (NEVER commit this to Git!)
STRIPE_SECRET_KEY=sk_test_YOUR_ACTUAL_SECRET_KEY_HERE

# Frontend URL (update based on environment)
# Development:
FRONTEND_URL=http://localhost:3001

# Production:
# FRONTEND_URL=https://junoway.github.io/ImbariWeb

# CORS
ALLOWED_ORIGIN=https://junoway.github.io
```

**Replace `sk_test_YOUR_ACTUAL_SECRET_KEY_HERE` with your actual Stripe secret key!**

> 🔒 **SECURITY**: Never commit `.env` files to Git! Add to `.gitignore`

---

### 4️⃣ Deploy Backend to Vercel

1. **Navigate to backend folder:**
   ```bash
   cd c:\Users\User\Documents\imbari-coffee-backend
   ```

2. **Install Vercel CLI (if not installed):**
   ```bash
   npm install -g vercel
   ```

3. **Deploy:**
   ```bash
   vercel
   ```

4. **Follow prompts:**
   - Link to existing project or create new
   - Select project name: `imbari-coffee-backend`
   - Set framework: `Other`
   - Set build command: (leave empty)
   - Set output directory: `.`

5. **Add Environment Variables in Vercel Dashboard:**
   - Go to: https://vercel.com/your-username/imbari-coffee-backend/settings/environment-variables
   - Add:
     - `STRIPE_SECRET_KEY` = your Stripe secret key
     - `FRONTEND_URL` = https://junoway.github.io/ImbariWeb
     - `ALLOWED_ORIGIN` = https://junoway.github.io

6. **Copy Deployment URL** (e.g., `https://imbari-coffee-backend.vercel.app`)

---

### 5️⃣ Update Frontend with Backend URL

**File: `imbari-coffee-site/.env.local`**

```bash
# Update this line with your deployed backend URL:
NEXT_PUBLIC_API_URL=https://imbari-coffee-backend.vercel.app
```

---

### 6️⃣ Test the Payment Flow

#### Testing in Development:

1. **Start backend (optional if deployed):**
   ```bash
   cd c:\Users\User\Documents\imbari-coffee-backend
   npm run dev
   ```

2. **Start frontend:**
   ```bash
   cd c:\Users\User\Documents\imbari-coffee-site
   npm run dev
   ```

3. **Test checkout:**
   - Visit: http://localhost:3001/shop
   - Add products to cart
   - Click "Checkout"
   - Click "Place Order & Pay"
   - Use Stripe test card: `4242 4242 4242 4242`
     - Expiry: Any future date
     - CVC: Any 3 digits
     - ZIP: Any 5 digits

#### Testing in Production:

1. **Visit:** https://junoway.github.io/ImbariWeb/shop
2. Add items to cart
3. Proceed to checkout
4. Complete payment with test card (if using test keys)

---

## 🎨 Payment Flow

```
┌──────────────┐
│   Shop Page  │
│ Add to Cart  │
└──────┬───────┘
       │
       ▼
┌──────────────────┐
│  Checkout Page   │
│ Review & Submit  │
└──────┬───────────┘
       │
       ▼
┌──────────────────────┐
│ Backend API Creates  │
│ Stripe Checkout      │
│ Session              │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│ Stripe Hosted        │
│ Checkout Page        │
│ (Secure Payment)     │
└──────┬───────────────┘
       │
       ├─── Success ───►┌───────────────┐
       │                │ Success Page  │
       │                │ Clear Cart    │
       │                └───────────────┘
       │
       └─── Cancel ────►┌───────────────┐
                        │ Canceled Page │
                        │ Keep Cart     │
                        └───────────────┘
```

---

## 🧪 Stripe Test Cards

### Successful Payments:
| Card Number         | Type       | Description            |
|---------------------|------------|------------------------|
| 4242 4242 4242 4242 | Visa       | Successful payment     |
| 5555 5555 5555 4444 | Mastercard | Successful payment     |
| 3782 822463 10005   | Amex       | Successful payment     |

### Failed Payments (for testing errors):
| Card Number         | Result                        |
|---------------------|-------------------------------|
| 4000 0000 0000 0002 | Card declined                 |
| 4000 0000 0000 9995 | Insufficient funds            |
| 4000 0000 0000 0069 | Expired card                  |

Full list: https://stripe.com/docs/testing#cards

---

## 🔧 Architecture

### Files Modified/Created:

#### Frontend (`imbari-coffee-site`):
- ✅ `app/checkout/page.tsx` - Checkout page with Stripe integration
- ✅ `app/checkout/success/page.tsx` - Payment success page
- ✅ `app/checkout/canceled/page.tsx` - Payment canceled page
- ✅ `.env.local` - Environment variables

#### Backend (`imbari-coffee-backend`):
- ✅ `api/create-checkout-session.js` - Stripe session creation endpoint
- ✅ `.env` - Environment variables (DO NOT COMMIT!)

---

## 🚨 Common Issues & Solutions

### Issue 1: "Payment system not configured"
**Solution:** Ensure `STRIPE_SECRET_KEY` is set in backend Vercel environment variables and doesn't contain "REPLACE"

### Issue 2: CORS errors
**Solution:** 
- Verify `ALLOWED_ORIGIN` matches your frontend URL exactly
- Ensure backend is deployed and accessible

### Issue 3: Checkout session not created
**Solution:**
- Check browser console for errors
- Verify `NEXT_PUBLIC_API_URL` points to deployed backend
- Check backend logs in Vercel dashboard

### Issue 4: Success page doesn't load
**Solution:**
- Verify `FRONTEND_URL` in backend .env matches your deployed frontend
- Check Stripe success_url configuration

---

## 📊 Monitoring & Analytics

### Stripe Dashboard
- **Payments:** https://dashboard.stripe.com/test/payments
- **Customers:** https://dashboard.stripe.com/test/customers
- **Logs:** https://dashboard.stripe.com/test/logs

### Vercel Dashboard
- **Deployments:** https://vercel.com/dashboard
- **Functions:** Check serverless function logs
- **Analytics:** Monitor API calls

---

## 🔐 Security Best Practices

1. ✅ **Never commit API keys** to Git
2. ✅ **Use environment variables** for all secrets
3. ✅ **Validate all inputs** on backend
4. ✅ **Enable Stripe webhooks** for order confirmation (optional)
5. ✅ **Use HTTPS** in production
6. ✅ **Implement rate limiting** (built into Vercel)
7. ✅ **Log all transactions** for audit trail

---

## 🎯 Going Live Checklist

- [ ] Switch from test keys to live keys
- [ ] Update `STRIPE_SECRET_KEY` in Vercel with `sk_live_...`
- [ ] Update `NEXT_PUBLIC_STRIPE_PUBLIC_KEY` in frontend with `pk_live_...`
- [ ] Test with real card (small amount)
- [ ] Verify success/cancel pages work
- [ ] Set up Stripe webhooks (optional but recommended)
- [ ] Enable Stripe email receipts
- [ ] Configure payout schedule in Stripe
- [ ] Add business details to Stripe account
- [ ] Enable 3D Secure authentication (default enabled)

---

## 🎉 You're Ready to Accept Payments!

### Quick Test (5 minutes):

1. ✅ Add Stripe keys to `.env.local` and backend `.env`
2. ✅ Deploy backend to Vercel
3. ✅ Update frontend with backend URL
4. ✅ Deploy frontend (or test locally)
5. ✅ Add product to cart
6. ✅ Checkout with test card `4242 4242 4242 4242`
7. ✅ See success page! 🎊

---

## 📞 Support

- **Stripe Docs:** https://stripe.com/docs
- **Stripe Support:** https://support.stripe.com
- **Vercel Docs:** https://vercel.com/docs
- **Project Issues:** Contact imbaricoffee@gmail.com

---

## 🔄 Next Steps (Optional Enhancements)

1. **Stripe Webhooks:** Handle payment confirmations server-side
2. **Order Management:** Store orders in database (Firebase/MongoDB)
3. **Email Notifications:** Send order confirmations via EmailJS
4. **Subscription Support:** Add recurring payments for subscriptions
5. **Multi-currency:** Support USD, UGX, EUR, etc.
6. **Analytics:** Track conversion rates and revenue

---

**Last Updated:** December 13, 2025  
**Status:** ✅ Ready for Production  
**Estimated Setup Time:** 15-20 minutes
