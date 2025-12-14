# 🚀 PRODUCTION DEPLOYMENT GUIDE

## 🔐 Step 1: Add Stripe Secret Key to Vercel (SECURE)

**IMPORTANT:** You need to add your Stripe secret key to Vercel's encrypted vault before deployment.

### Option A: Via Vercel Dashboard (Recommended - Most Secure)

1. **Go to Vercel Dashboard:**
   ```
   https://vercel.com/dashboard
   ```

2. **Select your backend project** (or create new one)

3. **Go to Settings → Environment Variables:**
   ```
   https://vercel.com/[your-username]/imbari-coffee-backend/settings/environment-variables
   ```

4. **Add these environment variables:**

   **Variable 1:**
   - Name: `STRIPE_SECRET_KEY`
   - Value: `[Your Stripe Secret Key - starts with sk_live_]`
   - Environments: ✅ Production, ✅ Preview, ✅ Development

   **Variable 2:**
   - Name: `FRONTEND_URL`
   - Value: `https://www.imbaricoffee.com`
   - Environments: ✅ Production, ✅ Preview, ✅ Development

   **Variable 3:**
   - Name: `ALLOWED_ORIGIN`
   - Value: `https://www.imbaricoffee.com`
   - Environments: ✅ Production, ✅ Preview, ✅ Development

5. **Click "Save"**

### Option B: Via Vercel CLI (Alternative)

```bash
cd c:\Users\User\Documents\imbari-coffee-backend

vercel env add STRIPE_SECRET_KEY production
# When prompted, paste your Stripe secret key (sk_live_...)

vercel env add FRONTEND_URL production
# When prompted, paste: https://www.imbaricoffee.com

vercel env add ALLOWED_ORIGIN production
# When prompted, paste: https://www.imbaricoffee.com
```

---

## 🚀 Step 2: Deploy Backend to Production

After adding environment variables:

```bash
cd c:\Users\User\Documents\imbari-coffee-backend
vercel --prod
```

**Expected output:**
```
✅ Production: https://imbari-coffee-backend-xyz.vercel.app [deployed]
```

**Copy the deployment URL!**

---

## 🎯 Step 3: Update Frontend with Backend URL

Edit: `c:\Users\User\Documents\imbari-coffee-site\.env.local`

```bash
# Replace with your actual Vercel backend URL:
NEXT_PUBLIC_API_URL=https://imbari-coffee-backend-xyz.vercel.app
```

---

## 🚢 Step 4: Deploy Frontend to Production

```bash
cd c:\Users\User\Documents\imbari-coffee-site

# Build for production
npm run build

# Deploy to GitHub Pages
git add .
git commit -m "chore: Update API URL for production"
git push origin main
```

Wait 2-3 minutes for GitHub Pages to deploy.

---

## ✅ Step 5: Test Your Live Store!

### Test with Small Purchase:

1. **Visit your live store:**
   ```
   https://www.imbaricoffee.com/shop
   ```

2. **Add a product to cart** (try the $2.49 Sample Sachet first)

3. **Go to checkout:**
   ```
   https://www.imbaricoffee.com/checkout
   ```

4. **Click "Place Order & Pay"**

5. **You'll be redirected to Stripe Checkout**

6. **Use a REAL card or Stripe test card:**
   - Test: `4242 4242 4242 4242`
   - Expiry: `12/34`
   - CVC: `123`

7. **Complete payment**

8. **You should see the success page!** 🎉

9. **Verify in Stripe Dashboard:**
   ```
   https://dashboard.stripe.com/payments
   ```

---

## 🔐 Security Verification Checklist

Before going live, verify:

- [ ] ✅ Stripe secret key is in Vercel env vars (NOT in code)
- [ ] ✅ `.env` and `.env.local` in `.gitignore`
- [ ] ✅ No keys visible in Git history
- [ ] ✅ CORS configured to your domain only
- [ ] ✅ HTTPS enforced on both frontend and backend
- [ ] ✅ 2FA enabled on Stripe account
- [ ] ✅ 2FA enabled on Vercel account
- [ ] ✅ 2FA enabled on GitHub account

---

## 📊 Monitor Your First Sales

### Stripe Dashboard
**Payments:** https://dashboard.stripe.com/payments
- View all transactions
- Customer details
- Revenue analytics

### Vercel Dashboard
**Functions:** https://vercel.com/dashboard
- API request logs
- Error monitoring
- Performance metrics

---

## 🎉 You're LIVE!

Once deployed, your store will:
- ✅ Accept real payments securely
- ✅ Process orders through Stripe
- ✅ Show success/cancel pages
- ✅ Clear cart after successful payment
- ✅ Be monitored for errors

---

## 🆘 Troubleshooting

### "Environment Variable references Secret which does not exist"
**Solution:** Add environment variables in Vercel dashboard first (see Step 1)

### "CORS error" in browser console
**Solution:** Verify `ALLOWED_ORIGIN` matches your frontend URL exactly

### "Payment system not configured"
**Solution:** Check `STRIPE_SECRET_KEY` is set in Vercel and doesn't contain "REPLACE"

### Checkout button doesn't work
**Solution:** Verify `NEXT_PUBLIC_API_URL` points to deployed Vercel backend

---

## 📞 Quick Commands Reference

```bash
# Deploy backend
cd c:\Users\User\Documents\imbari-coffee-backend
vercel --prod

# Deploy frontend
cd c:\Users\User\Documents\imbari-coffee-site
npm run build
git push origin main

# Check backend logs
vercel logs

# Check environment variables
vercel env ls
```

---

## 🔄 Post-Deployment

### Enable Production Features:

1. **Stripe Email Receipts:**
   - https://dashboard.stripe.com/settings/emails
   - Enable customer receipts

2. **Set Payout Schedule:**
   - https://dashboard.stripe.com/settings/payouts
   - Configure bank account

3. **Enable Radar (Fraud Prevention):**
   - https://dashboard.stripe.com/radar
   - Already active, review settings

4. **Add Business Details:**
   - https://dashboard.stripe.com/settings/public
   - Add logo, support email, etc.

---

**Status:** 🚀 Ready to Deploy  
**Estimated Time:** 10-15 minutes  
**Security Level:** 🔒 Enterprise-Grade

**Next Step:** Add environment variables to Vercel dashboard, then run deployment!
