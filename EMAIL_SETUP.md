# Email Verification Setup Guide

## Overview
This guide will help you configure EmailJS to send verification codes to users when they sign up.

## Why EmailJS?
EmailJS is perfect for static sites hosted on GitHub Pages because:
- Works entirely client-side (no backend needed)
- Free tier includes 200 emails/month
- Easy to set up (takes 5 minutes)
- Supports Gmail, Outlook, Yahoo, and other email providers

## Step-by-Step Setup

### 1. Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" (top right)
3. Create account with your email
4. Verify your email address

### 2. Connect Your Email Service
1. Once logged in, go to **Email Services** in the left sidebar
2. Click **Add New Service**
3. Choose your email provider:
   - **Gmail** (strongly recommended - easiest to set up and most reliable)
   - Outlook (not recommended - has restrictions on reply-to addresses)
   - Yahoo
   - Or use your custom SMTP
4. Follow the connection wizard:
   - For Gmail: Click "Connect Account" and authorize with Google
   - Name your service (e.g., "Imbari Coffee Notifications")
5. Click **Create Service**
6. **Copy the Service ID** (looks like `service_xxxxxxx`)

### 3. Create Email Template
1. Go to **Email Templates** in the left sidebar
2. Click **Create New Template**
3. Fill in the template:
   ```
   **Template Name:** Verification Code
   
   **Subject:** Verify your Imbari Coffee account
   
   **Content (Body):**
   Hi {{to_name}},
   
   Thank you for signing up with Imbari Coffee! ☕
   
   Your verification code is: {{verification_code}}
   
   This code will expire in 15 minutes.
   
   If you didn't request this code, please ignore this email.
   
   Best regards,
   The Imbari Coffee Team
   ```
4. The important template variables are:
   - `{{to_name}}` - User's first name
   - `{{verification_code}}` - The 6-digit code
   - `{{to_email}}` - User's email (auto-populated)
5. Click **Save**
6. **Copy the Template ID** (looks like `template_xxxxxxx`)

### 4. Get Your Public Key
1. Go to **Account** in the left sidebar
2. Look for **API Keys** section
3. **Copy your Public Key** (looks like `xxxxxxxxxxxxxxxxxxxx`)

### 5. Add Environment Variables
1. Create a file named `.env.local` in the root directory (if it doesn't exist)
2. Add these variables with your actual values:
   ```env
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxxxxx
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxxxxxx
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxxxxxx
   ```
3. Replace the `xxxxxxx` placeholders with your actual IDs from steps 2, 3, and 4

### 6. Test the Setup
1. Restart your development server:
   ```bash
   npm run dev
   ```
2. Go to [http://localhost:3000/signup](http://localhost:3000/signup)
3. Create a test account with **your real email address**
4. Check your email inbox (and spam folder!)
5. You should receive the verification code within seconds

### 7. Deploy to GitHub Pages
1. Add the environment variables to your GitHub repository:
   - Go to your repo on GitHub
   - Click **Settings** → **Secrets and variables** → **Actions**
   - Click **New repository secret** for each variable:
     - Name: `NEXT_PUBLIC_EMAILJS_SERVICE_ID`, Value: your service ID
     - Name: `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`, Value: your template ID  
     - Name: `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`, Value: your public key

2. Update `.github/workflows/nextjs.yml` to include env vars in build:
   ```yaml
   - name: Build with Next.js
     run: npm run build
     env:
       NEXT_PUBLIC_BASE_PATH: /ImbariWeb
       NEXT_PUBLIC_EMAILJS_SERVICE_ID: ${{ secrets.NEXT_PUBLIC_EMAILJS_SERVICE_ID }}
       NEXT_PUBLIC_EMAILJS_TEMPLATE_ID: ${{ secrets.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID }}
       NEXT_PUBLIC_EMAILJS_PUBLIC_KEY: ${{ secrets.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY }}
   ```

3. Push your changes to GitHub:
   ```bash
   git add .
   git commit -m "Add email verification with EmailJS"
   git push origin main
   ```

## Test Account (Backdoor)
For testing and inspection, you can log in with:
- **Email:** imbaricoffee@gmail.com
- **Password:** Coffee2025!

⚠️ **Security Note:** This is a backdoor account for demo/testing purposes only. Remove it before going to production!

## Troubleshooting

### Email not received?
1. Check spam/junk folder
2. Verify EmailJS Service is connected correctly
3. Check EmailJS Dashboard → Email Logs for errors
4. Make sure template variables are correct: `{{to_name}}`, `{{verification_code}}`
5. Check browser console for error messages

### "Module not found: @emailjs/browser"?
Run: `npm install @emailjs/browser`

### Environment variables not working?
1. Make sure `.env.local` is in the root directory (same level as `package.json`)
2. Variables must start with `NEXT_PUBLIC_` to work in the browser
3. Restart the dev server after adding env vars: `npm run dev`
4. Never commit `.env.local` to Git (it's in `.gitignore`)

### Rate limits exceeded?
EmailJS free tier allows 200 emails/month. If you hit the limit:
- Upgrade to paid plan ($6/month for 1000 emails)
- Or switch to a backend email service (requires backend deployment)

## Email Quotas
- **Free Tier:** 200 emails/month
- **Personal Plan:** $6/month for 1,000 emails
- **Professional Plan:** $20/month for 10,000 emails

For a production site, 200 emails/month should be enough for initial launch. If you expect more signups, consider upgrading.

## Next Steps
Once email verification works:
1. ✅ Users receive verification codes via email
2. ✅ Codes are validated against stored values
3. ✅ Account created after successful verification
4. 🎯 Add subscriber discount (10% off) on shop page
5. 🎯 Build order history page
6. 🎯 Build settings page (change password, update profile)
7. 🎯 Connect to real backend API (Vercel deployment)

## Support
- EmailJS Documentation: [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
- EmailJS Support: [https://www.emailjs.com/support/](https://www.emailjs.com/support/)
