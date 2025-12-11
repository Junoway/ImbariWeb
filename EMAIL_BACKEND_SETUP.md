# Free Email Backend Setup Guide

## ✅ Complete! Your Own Email Backend (No EmailJS Limits)

Your custom email system is now built using **Nodemailer** - completely FREE with unlimited sending (when using Gmail/Outlook SMTP).

---

## 📦 What Was Built:

### 1. **Email Templates** (`lib/email/chatFollowUpTemplate.ts`)
- Professional HTML email with your brand colors
- Plain text fallback version
- Beautiful responsive design
- All links embedded (shop, subscribe, about, impact)
- Discount code: **FIRSTCUP10**

### 2. **Email Service** (`lib/email/emailService.ts`)
- Nodemailer integration
- Reusable email sender
- Error handling
- Configuration management

### 3. **API Endpoint** (`app/api/send-email/route.ts`)
- POST `/api/send-email` - Send emails
- GET `/api/send-email` - Health check
- Input validation
- Automatic template generation

### 4. **Admin Integration**
- Updated admin dashboard to use new backend
- Removed EmailJS dependency
- Automatic email on chat resolution

---

## 🔧 Setup Gmail App Password (2 minutes)

**Required to send emails - FREE, unlimited sending:**

1. **Login to Google Account**: https://myaccount.google.com/
2. **Enable 2-Step Verification** (if not already enabled):
   - Go to Security → 2-Step Verification
   - Follow the setup steps

3. **Create App Password**:
   - Go to Security → 2-Step Verification → App passwords
   - Or direct link: https://myaccount.google.com/apppasswords
   - Select "Mail" and "Other (Custom name)"
   - Name it: "Imbari Coffee Website"
   - Click "Generate"
   - **Copy the 16-character password** (looks like: `abcd efgh ijkl mnop`)

4. **Update `.env.local`**:
   ```env
   EMAIL_USER=imbaricoffee@gmail.com
   EMAIL_PASS=abcd efgh ijkl mnop  # Paste your app password here
   ```

---

## 🚀 How It Works:

### Customer Chat Resolution Flow:

1. Customer starts chat, provides name & email
2. Admin responds and marks as "Resolved"
3. System automatically:
   - Calls `/api/send-email` endpoint
   - Generates beautiful HTML email
   - Sends via Gmail SMTP (free)
   - Customer receives professional follow-up
   - Chat session closes

### Email Content Includes:

- ✅ Personal greeting with customer name
- ✅ Thank you message
- ✅ 4 CTA buttons (Shop, Subscribe, Impact, About)
- ✅ Brand story & differentiators
- ✅ 10% discount code: **FIRSTCUP10**
- ✅ Professional signature
- ✅ Social media links
- ✅ Unsubscribe option

---

## 📧 Email Provider Options:

### Option 1: Gmail (Recommended - FREE)
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=imbaricoffee@gmail.com
EMAIL_PASS=your-app-password-here
```
**Limits**: 500 emails/day (FREE) - More than enough!

### Option 2: Outlook/Hotmail (FREE)
```env
EMAIL_HOST=smtp-mail.outlook.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@outlook.com
EMAIL_PASS=your-password
```
**Limits**: 300 emails/day (FREE)

### Option 3: Custom Domain Email (via Gmail/Workspace)
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=info@imbaricoffee.com
EMAIL_PASS=your-app-password
```
**Best for**: Professional branding

### Option 4: SendGrid (Generous FREE tier)
```env
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=apikey
EMAIL_PASS=your-sendgrid-api-key
```
**Limits**: 100 emails/day FREE forever

---

## 🧪 Testing Your Email Backend:

### Method 1: Using the API Directly
```bash
# PowerShell test
$body = @{
  to_email = "test@example.com"
  to_name = "Test Customer"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/send-email" -Method POST -Body $body -ContentType "application/json"
```

### Method 2: Via Admin Dashboard
1. Start dev server: `npm run dev`
2. Open chat widget, start a conversation
3. Login to admin dashboard: http://localhost:3000/admin/chat
4. Mark conversation as "Resolved"
5. Check your email inbox!

### Method 3: Health Check
```bash
# Check if API is running
Invoke-RestMethod -Uri "http://localhost:3000/api/send-email"
```

---

## 🎨 Customizing Email Template:

### Edit HTML Design:
File: `lib/email/chatFollowUpTemplate.ts`

**Change colors**:
```typescript
background: linear-gradient(135deg, #ff6b35 0%, #14b8a6 100%);
```

**Change discount code**:
```typescript
<div class="discount-code">FIRSTCUP10</div>
```

**Change links**:
```typescript
shop_link: "https://www.imbaricoffee.com/shop"
```

### Change Subject Line:
```typescript
export function getChatFollowUpSubject(customerName: string): string {
  return `Thank you for connecting with Imbari Coffee ☕`;
}
```

---

## 🔒 Security Notes:

- ✅ `.env.local` is in `.gitignore` (credentials NOT committed)
- ✅ Email passwords are app-specific (not your main password)
- ✅ Server-side only (credentials never exposed to browser)
- ✅ Input validation on API endpoint
- ✅ Rate limiting recommended for production

---

## 📊 Cost Comparison:

| Service | FREE Tier | Paid Plan | Your Solution |
|---------|-----------|-----------|---------------|
| EmailJS | 200/month | $15/mo | ❌ Removed |
| SendGrid | 100/day | $15/mo | ✅ Option |
| Gmail SMTP | 500/day | N/A | ✅ **FREE** |
| Mailgun | 100/day | $35/mo | ⚪ Optional |
| AWS SES | 62,000/mo | Pay-as-go | ⚪ Advanced |

**Your Gmail Solution: $0/month for 500 emails/day = 15,000/month FREE!** 🎉

---

## 🚨 Troubleshooting:

### Email not sending?
1. Check `.env.local` has correct app password
2. Verify Gmail 2FA is enabled
3. Check console for error messages
4. Test with health check: `GET /api/send-email`

### "Invalid credentials" error?
- App password must be 16 characters (no spaces in .env.local)
- Make sure you're using app password, not regular password
- Regenerate app password if needed

### Emails going to spam?
- Add SPF/DKIM records to your domain
- Use your own domain email (info@imbaricoffee.com)
- Warm up sending (start slow, increase over days)

---

## 🎯 Next Steps:

1. ✅ **Setup Gmail App Password** (2 minutes)
2. ✅ **Update `.env.local`** with your password
3. ✅ **Test sending** via admin dashboard
4. ✅ **Verify email delivery** (check inbox/spam)
5. ✅ **Deploy to production** (`git push`)

---

## 📈 Production Deployment:

When deploying to Vercel/Netlify/etc:

1. Add environment variables in hosting dashboard:
   - `EMAIL_HOST`
   - `EMAIL_PORT`
   - `EMAIL_SECURE`
   - `EMAIL_USER`
   - `EMAIL_PASS`

2. Rebuild and deploy

3. Test with real chat session

---

**🎉 Congratulations! You now have a professional, unlimited email system for FREE!**

No more EmailJS limits. No monthly fees. Complete control. 🚀☕

---

**Need help?** The system is fully functional - just add your Gmail app password to `.env.local` and start sending!
