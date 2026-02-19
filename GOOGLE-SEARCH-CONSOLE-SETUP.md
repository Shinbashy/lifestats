# Google Search Console Setup Guide
**For:** LifeStats (getlifestats.com)  
**Time Required:** 15-20 minutes  
**Prerequisites:** Access to Vercel dashboard or DNS provider

---

## What is Google Search Console?

Google Search Console (GSC) is a **free tool** from Google that shows:
- How many people see your site in search results (impressions)
- How many click through (clicks)
- What keywords trigger your pages (queries)
- Technical issues (crawl errors, mobile usability, Core Web Vitals)
- Manual actions/penalties (hopefully none!)

**Why You Need It:**
- Track organic traffic growth
- Discover which pages rank (and which don't)
- Find keyword opportunities (queries with impressions but low clicks)
- Get alerted to technical issues before they hurt rankings

---

## Step-by-Step Setup

### **1. Create/Access Google Account**
- Go to https://search.google.com/search-console
- Sign in with a Google account (use your main email: luminvortexai@gmail.com or personal)

### **2. Add Property**
You have two options:
- **Domain Property** (recommended) — Covers all subdomains and protocols (http, https, www, non-www)
- **URL Prefix** — Only the specific URL you enter

**For LifeStats, use Domain Property:**
- Click **"Add Property"**
- Select **"Domain"**
- Enter: `getlifestats.com` (no https://, no www)
- Click **"Continue"**

### **3. Verify Ownership**
Google will give you a **TXT record** to add to your DNS.

#### **Option A: DNS Verification (Recommended)**
1. Google shows: `google-site-verification=ABC123XYZ`
2. Go to your DNS provider (likely Vercel, Cloudflare, or your domain registrar)
3. Add a **TXT record**:
   - **Name/Host:** `@` (root domain)
   - **Value:** `google-site-verification=ABC123XYZ` (copy from GSC)
   - **TTL:** 3600 (default)
4. Wait 5-10 minutes for DNS propagation
5. Back in GSC, click **"Verify"**

**Vercel DNS (if using Vercel for DNS):**
- Go to https://vercel.com/[your-team]/domains
- Click on `getlifestats.com`
- Scroll to **"DNS Records"**
- Click **"Add Record"**
- Type: `TXT`, Name: `@`, Value: `google-site-verification=...`
- Save

#### **Option B: HTML File Upload (Faster but less permanent)**
1. Download the HTML file Google provides (e.g., `google123abc.html`)
2. Place it in `/Users/neal/lifestats/public/google123abc.html`
3. Push to Vercel: `git add public/google123abc.html && git commit -m "Add GSC verification" && git push`
4. Wait for deployment (~30 seconds)
5. Verify the file is accessible: https://getlifestats.com/google123abc.html
6. Back in GSC, click **"Verify"**

#### **Option C: HTML Tag (Easiest for Next.js)**
1. Copy the meta tag Google provides: `<meta name="google-site-verification" content="ABC123XYZ" />`
2. Edit `/Users/neal/lifestats/src/app/layout.tsx`
3. Add the meta tag inside `<head>`:
   ```tsx
   <head>
     <meta name="google-site-verification" content="ABC123XYZ" />
     <script
       type="application/ld+json"
       dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
     />
   </head>
   ```
4. Deploy to Vercel
5. Back in GSC, click **"Verify"**

**Recommendation:** Use **HTML Tag method** (easiest for Next.js, persists across deployments).

---

### **4. Submit Sitemap**
Once verified:
1. In GSC left sidebar, click **"Sitemaps"**
2. Enter: `https://getlifestats.com/sitemap.xml`
3. Click **"Submit"**
4. Status will show **"Pending"** for a few hours, then **"Success"**

**Verify your sitemap works:**
- Visit https://getlifestats.com/sitemap.xml in a browser
- You should see 8 URLs (home, privacy, terms, 5 landing pages)

---

### **5. Initial Configuration**

#### **Enable Email Notifications**
1. Click the ⚙️ **Settings** icon (bottom left)
2. Go to **"Users and permissions"**
3. Add your email if not already there
4. Check **"Email notifications"** to get alerts for:
   - Manual actions
   - Security issues
   - Sudden traffic drops

#### **Set Target Country (Optional)**
1. Settings → **"Settings"** → **"Geo-targeting"**
2. If your primary audience is US, select **"United States"**
3. If global, leave as **"Not set"**

---

## What to Monitor (First 30 Days)

### **Week 1: Coverage Report**
**Goal:** Ensure all pages are indexed.

1. Go to **"Coverage"** (left sidebar)
2. Check **"Valid"** count — should be 8 (all sitemap URLs)
3. If any show **"Error"** or **"Excluded"**, investigate:
   - **"Discovered - currently not indexed"** → Normal, Google is slow
   - **"Crawled - currently not indexed"** → Content too thin or duplicate
   - **"Noindex tag"** → Check your meta tags (shouldn't have noindex)

**Action:** If pages aren't indexed after 7 days, request indexing:
- Click on the page in Coverage report
- Click **"Request Indexing"**

### **Week 2-4: Performance Report**
**Goal:** Understand what's working.

1. Go to **"Performance"** (left sidebar)
2. Look at:
   - **Total Clicks:** How many people clicked your site from search
   - **Total Impressions:** How many times your site appeared in search
   - **Average CTR:** Clicks ÷ Impressions (aim for 3-5%)
   - **Average Position:** Where you rank on average (lower is better)

3. Filter by **"Queries"** to see:
   - What keywords trigger your pages
   - Which have high impressions but low clicks (opportunity to improve titles/descriptions)

**Example Insights:**
- **High impressions, low CTR** → Your meta description isn't compelling, update it
- **Position 5-10, decent CTR** → Optimize content to push to position 1-3
- **Position 11-20** → Create better content, build backlinks

### **Month 2+: Track Growth**
Set monthly goals:
- **Impressions:** +20% month-over-month
- **Clicks:** +30% month-over-month (CTR should improve with optimization)
- **Average Position:** Improve by 2-5 positions per month

---

## Key Metrics to Track

### **Primary KPIs**
| Metric | Current | 30-Day Goal | 90-Day Goal |
|--------|---------|-------------|-------------|
| **Indexed Pages** | 8 | 15 | 20 |
| **Total Clicks** | 0 | 50 | 500 |
| **Total Impressions** | 0 | 2,000 | 20,000 |
| **Average CTR** | — | 3% | 5% |
| **Average Position** | — | 15 | 8 |

### **Secondary Metrics**
- **Featured Snippets Owned:** 0 → 2-3 (FAQ schema will help)
- **Mobile Usability Issues:** 0 (keep it that way)
- **Core Web Vitals (LCP, FID, CLS):** Should be "Good" (you're using Next.js, should be fine)

---

## Common Issues & Fixes

### **1. "Sitemap could not be read"**
**Cause:** Sitemap URL is wrong or not publicly accessible.  
**Fix:**
- Check https://getlifestats.com/sitemap.xml loads in browser
- Ensure `/robots.txt` has `Sitemap: https://getlifestats.com/sitemap.xml`
- Verify no authentication/paywall blocking Googlebot

### **2. "Page is not mobile-friendly"**
**Cause:** Responsive design issues.  
**Fix:**
- Test with Google's Mobile-Friendly Test: https://search.google.com/test/mobile-friendly
- Your site uses Tailwind CSS with responsive breakpoints, should be fine
- Check if any elements overflow on small screens

### **3. "Duplicate content without user-selected canonical"**
**Cause:** Multiple URLs serve the same content (e.g., `www.` vs non-`www.`).  
**Fix:**
- Ensure Vercel redirects `www.getlifestats.com` → `getlifestats.com`
- All pages already have `canonical` tags set in metadata ✅

### **4. "Slow page load speed"**
**Cause:** Large images, unoptimized code, slow server.  
**Fix:**
- Use Next.js `<Image>` component (auto-optimizes images)
- Enable Vercel's Edge Network (already active)
- Minimize JS bundles (code-split with dynamic imports)

---

## Advanced: Use GSC Data for Content Strategy

### **1. Find Low-Hanging Fruit**
**Query:** Pages ranking 5-15 with decent impressions but low clicks.  
**Action:** Optimize title/description, add more content, build internal links.

**Example:**
- Page: `/how-many-heartbeats`
- Query: "heartbeats in a lifetime calculator"
- Position: 12
- Impressions: 300
- Clicks: 5 (1.7% CTR)

**Fix:**
- Update title to include "calculator" earlier: `Heartbeat Calculator: How Many Beats in a Lifetime?`
- Expand content to 1,200 words
- Add FAQ schema
- Build internal links from `/birthday-statistics` and `/life-in-numbers`

**Expected Result:** Move to position 5-8 → CTR jumps to 5-8% → 15-24 clicks

### **2. Discover New Keyword Opportunities**
**Query:** Queries with impressions but 0 clicks (you're ranking but not on page 1).  
**Action:** Create new landing pages for those queries.

**Example:**
- Query: "life expectancy by birthday" — 50 impressions, 0 clicks, position 35
- **Action:** Create `/life-expectancy-calculator` page targeting this query

### **3. Monitor Competitor Movements**
**Query:** Keywords where you dropped positions.  
**Action:** Check what competitors changed (did they publish new content? build backlinks?).

---

## Sitemap Submission Checklist

Before submitting, verify:
- ✅ Sitemap is accessible: https://getlifestats.com/sitemap.xml
- ✅ All URLs return 200 (not 404 or 500)
- ✅ No URLs with `noindex` meta tag
- ✅ All URLs are canonical (no duplicate content)
- ✅ Sitemap includes `<lastmod>` dates (optional but helpful)
- ✅ Sitemap is under 50MB and 50,000 URLs (yours is 8 URLs, you're fine)
- ✅ `robots.txt` references the sitemap:
  ```
  Sitemap: https://getlifestats.com/sitemap.xml
  ```

**Your Current Sitemap URLs:**
1. https://getlifestats.com
2. https://getlifestats.com/privacy
3. https://getlifestats.com/terms
4. https://getlifestats.com/how-many-heartbeats
5. https://getlifestats.com/how-many-breaths
6. https://getlifestats.com/how-old-am-i-in-seconds
7. https://getlifestats.com/birthday-statistics
8. https://getlifestats.com/life-in-numbers

**After adding new landing pages, update sitemap count.**

---

## Post-Setup: Weekly Review Routine

### **Every Monday (5 minutes):**
1. Check **Performance** → Compare last 7 days vs. previous 7 days
2. Note any spikes or drops (traffic, position changes)
3. Check **Coverage** → Ensure no new errors

### **Every Month (30 minutes):**
1. Export **Performance** data (Queries tab) to CSV
2. Identify top 10 queries by impressions
3. Optimize pages for those queries (better titles, more content, internal links)
4. Create new landing pages for high-impression, low-click queries

### **Every Quarter (2 hours):**
1. Full content audit (update outdated stats, add new calculators)
2. Backlink outreach (email 10-20 relevant blogs/sites)
3. Analyze competitors (what new content did they publish?)
4. Update FAQ schema based on new "People Also Ask" questions in SERPs

---

## Resources & Tools

### **Official Google Resources**
- GSC Help Center: https://support.google.com/webmasters
- SEO Starter Guide: https://developers.google.com/search/docs/beginner/seo-starter-guide
- Search Central Blog: https://developers.google.com/search/blog

### **Free SEO Tools**
- **Ubersuggest** (Neil Patel) — Free keyword research (3 searches/day): https://neilpatel.com/ubersuggest/
- **AnswerThePublic** — Question-based keywords: https://answerthepublic.com/
- **Google Trends** — Search volume trends: https://trends.google.com/
- **Schema Markup Validator** — Test JSON-LD: https://validator.schema.org/

### **Performance Testing**
- **Google PageSpeed Insights:** https://pagespeed.web.dev/
- **Mobile-Friendly Test:** https://search.google.com/test/mobile-friendly
- **Rich Results Test:** https://search.google.com/test/rich-results

---

## Troubleshooting

### **"Property not verified"**
- **Cause:** DNS/HTML verification failed.
- **Fix:** Wait 10-15 minutes for DNS propagation, try again. If using HTML tag, ensure it's in the `<head>` section and deployed to production.

### **"Sitemap contains errors"**
- **Cause:** Invalid XML or URLs return 404.
- **Fix:** Test each URL manually, ensure sitemap follows XML sitemap protocol.

### **"No data yet"**
- **Cause:** GSC takes 2-3 days to start showing data after verification.
- **Fix:** Be patient. Check back in 72 hours.

---

## Checklist

Use this before submitting:

- [ ] Google account created/logged in
- [ ] Domain property added (`getlifestats.com`)
- [ ] Ownership verified (DNS TXT, HTML tag, or HTML file)
- [ ] Sitemap submitted (`https://getlifestats.com/sitemap.xml`)
- [ ] Email notifications enabled
- [ ] Target country set (if applicable)
- [ ] Bookmark GSC dashboard for weekly checks
- [ ] Set calendar reminder for weekly reviews (every Monday)

---

**Setup Complete!**  
You're now tracking organic performance. Check back in 7 days to see initial data.

*Questions? Check GSC Help Center or ask Kai.*
