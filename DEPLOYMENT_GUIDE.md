# Imbari Coffee - Namecheap Deployment Guide
**Domain:** imbaricoffee.com  
**Hosting:** Stellar Shared Hosting (USA)  
**Timeline:** 10-year stability plan  
**Date:** December 10, 2025

---

## 📋 DEPLOYMENT CHECKLIST

### ✅ Phase 1: DNS Configuration (PremiumDNS)

#### Step 1.1: Update Nameservers
1. Log in to Namecheap Account Panel
2. Navigate to Domain List → imbaricoffee.com → Manage
3. Verify nameservers are set to:
   ```
   pdns1.registrar-servers.com
   pdns2.registrar-servers.com
   ```
4. Wait 24-48 hours for DNS propagation (or check with `nslookup imbaricoffee.com`)

#### Step 1.2: Configure DNS Records in PremiumDNS Zone Manager

**A Records:**
```
Host: @
Type: A
Value: [YOUR_STELLAR_HOSTING_IP]
TTL: Automatic

Host: www
Type: A  
Value: [YOUR_STELLAR_HOSTING_IP]
TTL: Automatic
```

**CNAME Records:**
```
Host: www
Type: CNAME
Value: imbaricoffee.com
TTL: Automatic
```

**MX Records (Private Email):**
```
Priority: 10
Host: @
Value: mx1.privateemail.com
TTL: Automatic

Priority: 20
Host: @
Value: mx2.privateemail.com
TTL: Automatic
```

**TXT Records (Email Authentication):**

**SPF Record:**
```
Host: @
Type: TXT
Value: v=spf1 include:spf.privateemail.com ~all
TTL: Automatic
```

**DMARC Record:**
```
Host: _dmarc
Type: TXT
Value: v=DMARC1; p=none; rua=mailto:postmaster@imbaricoffee.com
TTL: Automatic
```

**DKIM Record** (Get from Private Email dashboard):
```
Host: default._domainkey
Type: TXT
Value: [DKIM_KEY_FROM_PRIVATEEMAIL]
TTL: Automatic
```

**Email Autodiscover CNAMEs:**
```
Host: autoconfig
Type: CNAME
Value: autoconfig.privateemail.com

Host: autodiscover
Type: CNAME
Value: autodiscover.privateemail.com
```

---

### ✅ Phase 2: Build & Prepare Website Files

#### Step 2.1: Update Next.js Configuration for Custom Domain

**File: `next.config.ts`**
```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // Remove basePath for custom domain
  // basePath: "/ImbariWeb",  // DELETE THIS LINE
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
```

**File: `lib/utils.ts`**
```typescript
export function withBasePath(path: string): string {
  // For custom domain, no basePath needed
  return path;
}
```

#### Step 2.2: Build Static Site
```powershell
cd C:\Users\User\Documents\imbari-coffee-site
npm run build
```

This creates an `out/` folder with all static files.

#### Step 2.3: Prepare Upload Package
The `out/` folder contains:
- `index.html` (homepage)
- `_next/` (JavaScript, CSS, assets)
- All page HTML files
- `/images/` folder with product images

---

### ✅ Phase 3: Upload to Stellar Hosting

#### Step 3.1: Access cPanel
1. Check your Namecheap email for Stellar hosting credentials
2. Log in to cPanel: `https://[server-ip]:2083` or via Namecheap dashboard
3. Username and password provided in welcome email

#### Step 3.2: Upload Files via File Manager
1. In cPanel, open **File Manager**
2. Navigate to `/public_html/`
3. **Delete default files** (index.html, etc.)
4. Upload ALL contents from `out/` folder:
   - Upload `index.html` directly to `/public_html/`
   - Upload `_next/` folder to `/public_html/_next/`
   - Upload all other files and folders

**OR via FTP:**
```
Host: [YOUR_SERVER_IP or ftp.imbaricoffee.com]
Username: [cpanel_username]
Password: [cpanel_password]
Port: 21

Upload all files from out/ to /public_html/
```

#### Step 3.3: Verify File Structure
```
/public_html/
├── index.html
├── _next/
│   ├── static/
│   └── ...
├── about.html
├── shop.html
├── contact.html
├── images/
│   ├── imb1.jpg
│   ├── imb2.jpg
│   └── ...
└── ... (all other pages)
```

---

### ✅ Phase 4: Configure SSL Certificate (PositiveSSL)

#### Step 4.1: Activate SSL in cPanel
1. In cPanel, go to **SSL/TLS Status**
2. Find `imbaricoffee.com` and `www.imbaricoffee.com`
3. Click "Run AutoSSL" (Namecheap should auto-install PositiveSSL)
4. Verify certificate is active (green padlock)

#### Step 4.2: Force HTTPS Redirect
Create/edit `.htaccess` in `/public_html/`:

```apache
# Force HTTPS
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Redirect www to non-www (or vice versa)
RewriteCond %{HTTP_HOST} ^www\.imbaricoffee\.com [NC]
RewriteRule ^(.*)$ https://imbaricoffee.com/$1 [L,R=301]

# Remove .html extension
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^([^\.]+)$ $1.html [NC,L]
```

#### Step 4.3: Test SSL
- Visit: https://imbaricoffee.com
- Visit: https://www.imbaricoffee.com (should redirect)
- Check SSL Labs: https://www.ssllabs.com/ssltest/analyze.html?d=imbaricoffee.com

---

### ✅ Phase 5: Set Up Private Email

#### Step 5.1: Create Mailboxes
1. Log in to Private Email dashboard (link in Namecheap welcome email)
2. Create 3 mailboxes:
   - `hello@imbaricoffee.com` (customer inquiries)
   - `info@imbaricoffee.com` (general info)
   - `orders@imbaricoffee.com` (order confirmations)

#### Step 5.2: Configure Email Clients
**IMAP Settings:**
```
Incoming Server: mail.privateemail.com
Port: 993 (SSL/TLS)
Username: hello@imbaricoffee.com
Password: [mailbox_password]

Outgoing Server: mail.privateemail.com
Port: 587 (STARTTLS)
Username: hello@imbaricoffee.com
Password: [mailbox_password]
```

**Webmail Access:**
- https://privateemail.com

#### Step 5.3: Test Email
- Send test email FROM hello@imbaricoffee.com TO your Gmail
- Reply to that email and verify receipt
- Check spam folder (should not be in spam with SPF/DKIM/DMARC)

---

### ✅ Phase 6: Configure SiteLock Security

#### Step 6.1: Create FTP User in cPanel
1. Go to cPanel → **FTP Accounts**
2. Create new FTP user:
   - Username: `sitelock@imbaricoffee.com`
   - Password: [strong password]
   - Directory: `/public_html/`
   - Quota: Unlimited

#### Step 6.2: Connect SiteLock SMART
1. Log in to SiteLock Dashboard (link in Namecheap email)
2. Navigate to **SMART Setup**
3. Enter FTP credentials:
   ```
   Host: ftp.imbaricoffee.com
   Username: sitelock@imbaricoffee.com
   Password: [password]
   Path: /public_html/
   Port: 21
   ```
4. Click "Test Connection" → "Save"

#### Step 6.3: Enable Security Features
- ✅ Malware Scanning (daily)
- ✅ Automatic Malware Removal
- ✅ XSS Protection
- ✅ SQL Injection Protection
- ✅ DDoS Monitoring

---

### ✅ Phase 7: SEO & Analytics Setup

#### Step 7.1: Configure RelateSEO
1. Log in to Relate dashboard
2. Complete initial SEO audit for imbaricoffee.com
3. Implement recommendations:
   - Meta descriptions for all pages
   - Alt tags on all images
   - Title optimization
   - Sitemap generation

#### Step 7.2: Create Sitemap
**File: `/public_html/sitemap.xml`**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://imbaricoffee.com/</loc>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://imbaricoffee.com/shop</loc>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://imbaricoffee.com/about</loc>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://imbaricoffee.com/contact</loc>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://imbaricoffee.com/subscriptions</loc>
    <priority>0.9</priority>
  </url>
  <!-- Add all other pages -->
</urlset>
```

#### Step 7.3: Google Search Console
1. Verify ownership: https://search.google.com/search-console
2. Submit sitemap: https://imbaricoffee.com/sitemap.xml
3. Monitor indexing status

---

### ✅ Phase 8: Long-Term Stability & Maintenance

#### Step 8.1: Enable Auto-Renewal
In Namecheap Account Panel, enable auto-renewal for:
- ✅ Domain (10 years prepaid, next renewal: 2035)
- ✅ Stellar Hosting (annual)
- ✅ PositiveSSL (annual)
- ✅ PremiumDNS (annual)
- ✅ Private Email (after 2-month trial)

#### Step 8.2: Set Up Automated Backups
In cPanel:
1. Go to **Backup Wizard**
2. Enable automatic backups:
   - Weekly full backups
   - Daily file backups
   - Database backups (if using DB in future)
3. Store backups locally + download monthly to external storage

#### Step 8.3: Security Hardening
- ✅ Enable ModSecurity in cPanel
- ✅ Set file permissions: 755 for directories, 644 for files
- ✅ Disable directory browsing (.htaccess: `Options -Indexes`)
- ✅ Keep cPanel and all software updated
- ✅ Monitor error logs weekly

#### Step 8.4: Performance Optimization
In cPanel, enable:
- ✅ **Gzip Compression** (for faster page loads)
- ✅ **Browser Caching** (.htaccess rules)
- ✅ **Cloudflare** (optional free CDN via Namecheap)

**.htaccess Caching Rules:**
```apache
# Browser Caching
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>
```

---

## 🔧 QUICK REFERENCE

### Server Details (Check Welcome Email)
- **Server IP:** [FROM NAMECHEAP EMAIL]
- **cPanel URL:** https://[server-ip]:2083
- **cPanel Username:** [FROM EMAIL]
- **cPanel Password:** [FROM EMAIL]

### DNS Nameservers
```
pdns1.registrar-servers.com
pdns2.registrar-servers.com
```

### Email Settings
```
IMAP: mail.privateemail.com:993 (SSL)
SMTP: mail.privateemail.com:587 (TLS)
```

### FTP Settings
```
Host: ftp.imbaricoffee.com
Port: 21
Username: [cpanel_username]
Password: [cpanel_password]
```

---

## 🚨 TROUBLESHOOTING

### Site not loading after DNS change
- DNS propagation takes 24-48 hours
- Check propagation: https://dnschecker.org
- Clear browser cache

### SSL certificate not working
- Wait 1-2 hours after activation
- Verify AutoSSL ran successfully in cPanel
- Contact Namecheap support if still failing

### Email not sending/receiving
- Verify MX records are correct
- Check SPF/DKIM/DMARC records
- Test with mail-tester.com
- Whitelist privateemail.com IPs with ISP

### 404 errors on pages
- Check .htaccess rewrite rules
- Verify all files uploaded correctly
- Check file permissions (644 for files)

---

## 📞 SUPPORT CONTACTS

- **Namecheap Support:** https://www.namecheap.com/support/ (24/7)
- **Live Chat:** Available in account panel
- **Email:** support@namecheap.com
- **Phone:** Check account panel for number

---

## 📅 MAINTENANCE SCHEDULE

### Weekly
- Check error logs in cPanel
- Review SiteLock security reports
- Monitor website uptime

### Monthly
- Download full backup
- Review SEO performance (Relate)
- Check SSL certificate expiration dates
- Review email deliverability

### Quarterly
- Audit website performance
- Review and update product images
- Check for software/plugin updates
- Review hosting usage (upgrade if needed)

### Annually
- Renew SSL certificate (auto-renewal)
- Renew hosting plan (auto-renewal)
- Renew PremiumDNS (auto-renewal)
- Review domain security settings
- Conduct full security audit

---

## ✅ FINAL DEPLOYMENT CHECKLIST

Before going live, verify:
- [ ] DNS records configured (A, MX, TXT, CNAME)
- [ ] All website files uploaded to /public_html/
- [ ] SSL certificate active and HTTPS forced
- [ ] www redirects correctly
- [ ] All pages load (/, /shop, /about, /contact, etc.)
- [ ] Images display correctly
- [ ] Contact form sends emails
- [ ] Private email mailboxes working
- [ ] SiteLock scanning active
- [ ] Auto-renewal enabled for all services
- [ ] Backups configured
- [ ] Sitemap submitted to Google
- [ ] Performance optimizations applied

---

**Deployment Date:** _____________  
**Deployed By:** _____________  
**Live URL:** https://imbaricoffee.com  
**Status:** ⏳ Pending Deployment

