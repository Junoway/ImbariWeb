# Namecheap Relate SEO Setup Guide

## Step 1: Access Relate SEO Dashboard

1. Log in to Namecheap account
2. Go to **Dashboard** → **Products**
3. Find **Relate SEO** in your product list
4. Click **Activate** or **Manage**

---

## Step 2: Add Your Website

1. In Relate SEO dashboard, click **Add Website**
2. Enter domain: `www.imbaricoffee.com`
3. Select website category: **E-Commerce** or **Business Services**
4. Choose location: **Uganda** (primary) + **Worldwide** (international)
5. Select language: **English**
6. Click **Continue**

---

## Step 3: Verify Website Ownership

**Option A: HTML File Upload** (Recommended for GitHub Pages)
1. Relate SEO will provide a verification file (e.g., `relate-verify-xxxxxx.html`)
2. Download the file
3. Upload to `c:\Users\User\Documents\imbari-coffee-site\public\relate-verify-xxxxxx.html`
4. Deploy to GitHub Pages
5. Verify at: `https://www.imbaricoffee.com/relate-verify-xxxxxx.html`
6. Click **Verify** in Relate SEO dashboard

**Option B: Meta Tag** (Alternative)
1. Relate SEO will provide a meta tag like:
   ```html
   <meta name="relate-site-verification" content="xxxxxxxxxxxxxx" />
   ```
2. Add to `app/layout.tsx` in the metadata object:
   ```tsx
   verification: {
     google: "GOOGLE_CODE",
     other: {
       "relate-site-verification": "xxxxxxxxxxxxxx"
     }
   }
   ```

---

## Step 4: Configure Initial Settings

### Basic Settings
- **Website Name**: Imbari Coffee
- **Primary Keyword**: imbari coffee
- **Business Type**: Coffee Exporter / E-Commerce
- **Target Audience**: Global (focus on USA, Europe, Middle East)

### Competitor Tracking
Add these competitors to monitor:
1. `kahawacoffee.com`
2. `ugandacoffee.org`
3. `ethiopiancoffee.com`
4. `kenyacoffeelovers.com`
5. `rwandantrading.com`

---

## Step 5: Submit Sitemap

1. In Relate SEO dashboard, go to **Technical SEO** → **Sitemaps**
2. Enter sitemap URL: `https://www.imbaricoffee.com/sitemap.xml`
3. Click **Submit Sitemap**
4. Wait for sitemap to be crawled (24-48 hours)

---

## Step 6: Add Target Keywords

### Primary Keywords (Add to Relate SEO)
1. imbari
2. imbari coffee
3. uganda coffee
4. uganda coffee exporters
5. specialty coffee

### Secondary Keywords
6. east africa coffee
7. kahawa1893
8. uganda robusta
9. kenya coffee
10. rwanda coffee

### Long-tail Keywords
11. ethiopian best arabica
12. mt elgon arabica
13. organic coffee uganda
14. fair trade coffee east africa
15. private label coffee manufacturer

**How to Add:**
1. Go to **Keywords** → **Keyword Tracker**
2. Click **Add Keyword**
3. Enter keyword
4. Select search engine: **Google** (primary) + **Bing**
5. Select location: **United States** (main market) + **Uganda** (local)
6. Click **Save**

---

## Step 7: Run Initial SEO Audit

1. Go to **Site Audit** in Relate SEO dashboard
2. Click **Run New Audit**
3. Review findings:
   - **Critical Issues**: Fix immediately
   - **Warnings**: Fix within 1 week
   - **Notices**: Address over time

### Common Issues to Fix
- Missing alt text on images
- Slow page load speed
- Missing meta descriptions
- Broken links
- Duplicate content

---

## Step 8: Configure Rank Tracking

1. Go to **Rankings** → **Settings**
2. Enable daily rank checks
3. Set up email notifications:
   - Daily summary: OFF (too frequent)
   - Weekly summary: ON
   - Monthly report: ON
   - Rank changes alert: ON (for top 10 keywords)

---

## Step 9: Backlink Monitoring

1. Go to **Backlinks** → **Overview**
2. Review current backlinks (will be 0 initially)
3. Enable new backlink alerts
4. Set up competitor backlink tracking

### Build Initial Backlinks
Submit site to these directories:
- Google Business Profile
- Bing Places
- Coffee Industry Directories
- Uganda Business Directories
- African Business Directories

---

## Step 10: Local SEO Setup (Uganda)

1. Go to **Local SEO** → **Business Listings**
2. Enter business details:
   - **Business Name**: Imbari Coffee
   - **Address**: Kampala, Uganda (full address)
   - **Phone**: +256-XXX-XXXXX
   - **Email**: info@imbaricoffee.com
   - **Hours**: Monday-Friday 8AM-5PM EAT
   - **Category**: Coffee Roaster, Exporter, Manufacturer

3. Submit to local directories:
   - Google Business Profile
   - Bing Places for Business
   - Apple Maps
   - Uganda business directories

---

## Step 11: Content Optimization

### On-Page SEO Checklist (Relate SEO will scan for these)
- [ ] Page titles include target keywords
- [ ] Meta descriptions are compelling and keyword-rich
- [ ] H1 tags on every page with primary keyword
- [ ] H2/H3 tags with secondary keywords
- [ ] Image alt text includes relevant keywords
- [ ] Internal linking between pages
- [ ] Fast page load speed (<3 seconds)
- [ ] Mobile-friendly design
- [ ] HTTPS enabled
- [ ] Schema markup present

---

## Step 12: Weekly Monitoring Tasks

### Every Monday
1. Check keyword rankings report
2. Review any rank changes (up or down)
3. Identify new ranking opportunities
4. Check for new backlinks
5. Review site health score

### Weekly Actions Based on Data
- **If ranks drop**: Check for technical issues, review content quality
- **If ranks improve**: Identify what worked, replicate for other keywords
- **New competitors ranking**: Analyze their content and backlinks

---

## Step 13: Monthly Optimization Tasks

### Content Updates
1. Update product descriptions with keywords
2. Add new blog posts (coffee guides, origin stories)
3. Refresh old content with new information
4. Add customer testimonials

### Link Building
1. Reach out to 5 coffee bloggers for guest posts
2. Submit to 3 new directories
3. Request backlinks from suppliers/partners
4. Share content on social media

### Technical SEO
1. Run full site audit
2. Fix any broken links
3. Update sitemap
4. Check page speed
5. Verify all images have alt text

---

## Step 14: Integrate Relate Social

1. In Namecheap dashboard, activate **Relate Social**
2. Connect social media accounts:
   - Facebook: facebook.com/imbaricoffee
   - Instagram: instagram.com/imbaricoffee
   - Twitter: twitter.com/imbaricoffee
   - LinkedIn: linkedin.com/company/imbari-coffee

3. Schedule posts:
   - Product highlights
   - Coffee education
   - Customer stories
   - Behind-the-scenes content

---

## Step 15: Integrate Relate Reviews

1. Activate **Relate Reviews** in Namecheap
2. Add review widget to website:
   ```tsx
   // Add to product pages and homepage
   <div id="relate-reviews-widget"></div>
   <Script src="https://reviews.relate.com/widget.js" />
   ```

3. Set up review collection:
   - Email customers after purchase
   - Request reviews on social media
   - Incentivize with discount codes

4. Display reviews:
   - Homepage: Overall rating + recent reviews
   - Product pages: Product-specific reviews
   - About page: Customer testimonials

---

## Expected Timeline & Results

### Week 1-2: Setup Phase
- Relate SEO activated and configured
- Sitemap submitted and indexed
- Keywords tracked
- Initial audit completed

### Month 1: Foundation
- All critical SEO issues fixed
- First 10 backlinks acquired
- Google Business Profile verified
- Brand keywords ranking (imbari, imbari coffee)

### Month 3: Growth
- Primary keywords in top 10 (uganda coffee, specialty coffee)
- 50+ backlinks from quality sources
- Site authority score 20+
- 1,000+ organic visitors/month

### Month 6: Establishment
- All primary keywords in top 3
- Secondary keywords in top 10
- 100+ backlinks
- Site authority score 30+
- 5,000+ organic visitors/month

### Year 1: Dominance
- #1 for "imbari" and "imbari coffee"
- Top 5 for "uganda coffee", "east africa coffee"
- Top 10 for "specialty coffee" in target regions
- 50,000+ organic visitors/year
- Site authority score 40+

---

## Emergency: If Rankings Drop

### Immediate Actions
1. Check Relate SEO for algorithm update alerts
2. Run site audit for technical errors
3. Verify sitemap still indexed
4. Check for manual penalties (Google Search Console)
5. Review recent content changes
6. Check competitor movements

### Recovery Steps
1. Fix any technical issues immediately
2. Improve content quality on affected pages
3. Build 5-10 new quality backlinks
4. Update meta tags and titles
5. Add fresh content to stale pages

---

## Support & Resources

### Relate SEO Support
- Email: support@relate.com
- Knowledge Base: help.relate.com
- Live Chat: Available 24/7

### Namecheap Support
- Phone: +1-XXX-XXX-XXXX
- Live Chat: namecheap.com
- Ticket System: Dashboard → Support

### SEO Tools
- Google Search Console: search.google.com/search-console
- Google Analytics: analytics.google.com
- Bing Webmaster Tools: bing.com/webmasters
- PageSpeed Insights: pagespeed.web.dev

---

**Setup Status**: Ready to implement after DNS propagation
**Next Action**: Activate Relate SEO trial and begin setup
**Estimated Time**: 2-3 hours for full configuration
**Priority**: HIGH - Start immediately to begin tracking data
