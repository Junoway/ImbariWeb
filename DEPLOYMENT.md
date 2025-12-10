# Imbari Coffee Deployment Guide
**Cost-Optimized Setup: GitHub Pages (Free) + Namecheap DNS & Email**

## Overview
- **Hosting**: GitHub Pages (FREE) - https://junoway.github.io/ImbariWeb
- **Domain**: imbaricoffee.com (Namecheap - $144.80 for 10 years)
- **DNS**: PremiumDNS (Namecheap - $2.98/year)
- **Email**: Private Email 3 mailboxes (Namecheap - Free trial, then paid)
- **SSL**: GitHub Pages automatic SSL (FREE)

## DNS Configuration (Namecheap PremiumDNS)

### Step 1: Enable PremiumDNS Nameservers
In Namecheap domain settings, use these nameservers:
```
pdns1.registrar-servers.com
pdns2.registrar-servers.com
```

### Step 2: Add DNS Records in PremiumDNS Zone Manager

#### A Records (for apex domain)
Point to GitHub Pages IPs:
```
Type: A Record
Host: @
Value: 185.199.108.153
TTL: Automatic

Type: A Record
Host: @
Value: 185.199.109.153
TTL: Automatic

Type: A Record
Host: @
Value: 185.199.110.153
TTL: Automatic

Type: A Record
Host: @
Value: 185.199.111.153
TTL: Automatic
```

#### CNAME Record (for www)
```
Type: CNAME
Host: www
Value: junoway.github.io.
TTL: Automatic
```

#### MX Records (for Private Email)
```
Type: MX
Host: @
Value: mx1.privateemail.com
Priority: 10
TTL: Automatic

Type: MX
Host: @
Value: mx2.privateemail.com
Priority: 10
TTL: Automatic
```

#### TXT Records (Email Authentication)

**SPF Record:**
```
Type: TXT
Host: @
Value: v=spf1 include:spf.privateemail.com ~all
TTL: Automatic
```

**DMARC Record:**
```
Type: TXT
Host: _dmarc
Value: v=DMARC1; p=none; rua=mailto:postmaster@imbaricoffee.com
TTL: Automatic
```

**DKIM Record:**
(Will be provided by Namecheap Private Email - add when available)

#### Email Autodiscover (for Outlook/Mail clients)
```
Type: CNAME
Host: autoconfig
Value: autoconfig.privateemail.com.
TTL: Automatic

Type: CNAME
Host: autodiscover
Value: autodiscover.privateemail.com.
TTL: Automatic
```

#### Email Webmail Access
```
Type: CNAME
Host: mail
Value: privateemail.com.
TTL: Automatic
```

## GitHub Pages Configuration

### Step 1: Update Repository Settings
1. Go to: https://github.com/Junoway/ImbariWeb/settings/pages
2. Under "Custom domain", enter: `imbaricoffee.com`
3. Check "Enforce HTTPS" (will activate after DNS propagation)

### Step 2: Add CNAME File
Already done - `public/CNAME` contains: `imbaricoffee.com`

### Step 3: Update Next.js Config
Keep `basePath: "/ImbariWeb"` for backward compatibility during transition.
After DNS propagates, remove basePath in next.config.ts

## Private Email Setup

### Mailboxes to Create:
1. **hello@imbaricoffee.com** - General inquiries
2. **info@imbaricoffee.com** - Business info (receives contact form)
3. **orders@imbaricoffee.com** - E-commerce orders

### Email Access:
- **Webmail**: https://mail.imbaricoffee.com (or https://privateemail.com)
- **IMAP Settings**:
  - Server: mail.privateemail.com
  - Port: 993 (SSL/TLS)
  - Username: your-email@imbaricoffee.com
  
- **SMTP Settings** (for sending):
  - Server: mail.privateemail.com
  - Port: 465 (SSL) or 587 (TLS)
  - Username: your-email@imbaricoffee.com

## Deployment Steps

### Phase 1: DNS Setup (Day 1)
1. Log in to Namecheap account
2. Navigate to Domain List → imbaricoffee.com → Manage
3. Change nameservers to PremiumDNS (already done)
4. Go to Advanced DNS tab
5. Add all DNS records listed above
6. Wait 24-48 hours for propagation

### Phase 2: GitHub Pages Custom Domain (Day 2-3)
1. Verify DNS propagation: `nslookup imbaricoffee.com`
2. Add custom domain in GitHub repo settings
3. Wait for SSL certificate (automatic, ~1 hour)
4. Test: https://imbaricoffee.com

### Phase 3: Email Setup (Day 1)
1. Log in to Namecheap → Products → Private Email
2. Create 3 mailboxes
3. Verify DKIM record in Namecheap panel
4. Add DKIM TXT record to DNS
5. Test email sending/receiving

### Phase 4: Update EmailJS (After Email Active)
Update contact form to send to:
- imbaricoffee@gmail.com (current)
- info@imbaricoffee.com (new)

## Testing Checklist

### DNS Verification
```bash
# Check A records
nslookup imbaricoffee.com

# Check MX records
nslookup -type=MX imbaricoffee.com

# Check SPF
nslookup -type=TXT imbaricoffee.com
```

### Website Access
- [ ] https://imbaricoffee.com loads correctly
- [ ] https://www.imbaricoffee.com redirects to imbaricoffee.com
- [ ] SSL certificate is valid (green padlock)
- [ ] All images load properly
- [ ] Contact form works
- [ ] Shop functions correctly
- [ ] Cart and checkout work

### Email Testing
- [ ] Send email from hello@imbaricoffee.com
- [ ] Receive email at info@imbaricoffee.com
- [ ] Test contact form submission
- [ ] Verify SPF/DKIM pass (use mail-tester.com)
- [ ] Test email client auto-configuration

## Cost Breakdown (10 Year Total)

| Service | Cost | Period |
|---------|------|--------|
| Domain Registration | $144.80 | 10 years |
| ICANN Fee | $0.20 | One-time |
| PremiumDNS | $2.98 | Year 1 |
| Private Email (3 mailboxes) | $0.00 | 2-month trial |
| GitHub Pages Hosting | $0.00 | FREE Forever |
| GitHub Pages SSL | $0.00 | FREE Forever |
| **Year 1 Total** | **$147.98** | - |

### Ongoing Costs (After Trial)
- PremiumDNS: ~$2.98/year
- Private Email: ~$12/year (estimate for 3 mailboxes)
- **Annual Cost: ~$15/year** (after domain paid for 10 years)

## Services NOT Using (Cancelled to Save Money)
- ❌ Stellar Hosting ($4.88) - Using GitHub Pages instead
- ❌ PositiveSSL ($5.99) - GitHub provides free SSL
- ❌ SiteLock Security - Not needed for static site
- ❌ Relate SEO - Manual SEO optimization
- ❌ Relate Social/Reviews - Using free alternatives

**Savings: ~$20/year + $4.88 hosting**

## Maintenance Plan

### Monthly
- [ ] Check email deliverability
- [ ] Monitor website uptime
- [ ] Review analytics (if enabled)
- [ ] Test contact form

### Quarterly
- [ ] Check DNS records still correct
- [ ] Verify SSL certificate valid
- [ ] Update website content as needed

### Annually
- [ ] Renew PremiumDNS ($2.98)
- [ ] Renew Private Email (~$12)
- [ ] Review and update product images
- [ ] Audit email accounts

### Every 10 Years
- [ ] Renew domain registration

## Troubleshooting

### If website doesn't load:
1. Check DNS propagation: https://dnschecker.org
2. Verify GitHub Pages is enabled
3. Check CNAME file exists in public/
4. Ensure custom domain set in GitHub settings

### If email doesn't work:
1. Verify MX records correct
2. Check SPF/DKIM records
3. Wait for DNS propagation (up to 48h)
4. Test with mail-tester.com

### If SSL certificate fails:
1. Wait 24 hours after DNS propagation
2. Remove and re-add custom domain in GitHub
3. Ensure "Enforce HTTPS" is checked

## Support Contacts
- **Namecheap Support**: 24/7 live chat
- **GitHub Pages**: https://docs.github.com/pages
- **EmailJS**: Dashboard support

## Next Steps (Priority Order)
1. ✅ Complete DNS configuration in Namecheap
2. ⏳ Wait for DNS propagation (24-48 hours)
3. ⏳ Add custom domain to GitHub Pages
4. ⏳ Set up 3 email mailboxes
5. ⏳ Add DKIM record to DNS
6. ⏳ Test website at imbaricoffee.com
7. ⏳ Test email sending/receiving
8. ⏳ Update contact form to use info@imbaricoffee.com
9. ⏳ Cancel unused Namecheap services (Stellar, SiteLock, etc.)
10. ⏳ Enable auto-renewal for DNS and Email

---

**Last Updated**: December 10, 2025
**Deployment Status**: DNS Configuration Pending
