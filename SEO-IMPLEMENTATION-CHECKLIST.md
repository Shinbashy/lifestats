# LifeStats SEO Implementation Checklist
**Date:** February 7, 2026  
**Est. Time:** 2-3 hours (split across multiple sessions)  
**Priority:** High-impact, quick wins first

---

## ✅ Phase 1: Quick Wins (Do Today — 30 minutes)

### **1.1 Update Sitemap** ✅ DONE
- [x] Add new landing pages to `src/app/sitemap.ts`
  - `/life-expectancy-calculator` (priority 0.9)
  - `/days-until-birthday` (priority 0.8)
- [ ] Verify sitemap works: https://getlifestats.com/sitemap.xml (after deploy)

### **1.2 Deploy New Landing Pages** ✅ READY
**Files created:**
- [x] `src/app/life-expectancy-calculator/page.tsx` (14KB, 300+ lines)
- [x] `src/app/days-until-birthday/page.tsx` (15KB, 300+ lines)

**To deploy:**
```bash
cd /Users/neal/lifestats
git add .
git commit -m "SEO: Add life expectancy and birthday countdown landing pages"
git push
```

**Verify after deploy:**
- [ ] https://getlifestats.com/life-expectancy-calculator loads
- [ ] https://getlifestats.com/days-until-birthday loads
- [ ] No 404 errors
- [ ] FAQ schema validates: https://validator.schema.org/

### **1.3 Add Internal Links to Existing Pages** (15 min)
**File:** All existing landing pages  
**Action:** Add "Related Calculators" section to each page

**Pages to update:**
1. [ ] `src/app/how-many-heartbeats/page.tsx`
2. [ ] `src/app/how-many-breaths/page.tsx`
3. [ ] `src/app/how-old-am-i-in-seconds/page.tsx`
4. [ ] `src/app/birthday-statistics/page.tsx`
5. [ ] `src/app/life-in-numbers/page.tsx`

**Code to add (before final CTA button):**
```tsx
<div className="bg-indigo-500/20 border border-indigo-400/30 rounded-2xl p-6 mb-8">
  <h2 className="text-2xl font-semibold mb-3">🔗 Related Calculators</h2>
  <div className="grid md:grid-cols-2 gap-3">
    <Link href="/life-expectancy-calculator" className="text-indigo-300 hover:text-indigo-200 hover:underline">
      → Life Expectancy Calculator
    </Link>
    <Link href="/days-until-birthday" className="text-indigo-300 hover:text-indigo-200 hover:underline">
      → Days Until Birthday Countdown
    </Link>
    <Link href="/how-many-heartbeats" className="text-indigo-300 hover:text-indigo-200 hover:underline">
      → How Many Heartbeats?
    </Link>
    <Link href="/how-old-am-i-in-seconds" className="text-indigo-300 hover:text-indigo-200 hover:underline">
      → Age in Seconds Calculator
    </Link>
  </div>
</div>
```

**SEO Benefit:** Distributes PageRank, improves crawlability, reduces bounce rate

---

## ✅ Phase 2: Technical SEO Fixes (This Week — 1 hour)

### **2.1 Add Organization Schema to Layout** (10 min)
**File:** `src/app/layout.tsx`  
**Action:** Add Organization schema alongside existing WebApplication schema

**Code to add:**
```tsx
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "LifeStats",
  "url": "https://getlifestats.com",
  "logo": "https://getlifestats.com/icon.png",
  "sameAs": [
    "https://twitter.com/ZeroShotTakes"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "Customer Service",
    "url": "https://getlifestats.com"
  }
};

// In <head> section, add:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
/>
```

**Validation:** https://validator.schema.org/

### **2.2 Optimize Meta Descriptions** (20 min)
**File:** `src/app/layout.tsx` (homepage) + existing landing pages

**Current Homepage Description:**
> "Enter your birthday and discover 50+ mind-blowing statistics about your life..."

**Recommended (155 chars max):**
> "FREE 2026 Life Stats Calculator — 50+ instant stats from your birthday. Heartbeats, breaths, miles through space & more. No signup. Try it now!"

**Why:** Adds "2026" (freshness), "FREE" (removes friction), "No signup" (trust signal)

**Pages to update:**
- [ ] Homepage (`layout.tsx`)
- [ ] `/how-many-heartbeats`
- [ ] `/how-many-breaths`
- [ ] `/how-old-am-i-in-seconds`
- [ ] `/birthday-statistics`
- [ ] `/life-in-numbers`

**Template:**
```
FREE 2026 [Tool Name] — [Key Benefit]. [Unique Feature]. No signup. Try it now!
```

### **2.3 Add Alt Text to Icons/Emojis** (20 min)
**Files:** All pages with emoji icons (🎂, 💓, 🌬️, etc.)

**Problem:** Screen readers can't interpret emojis  
**Fix:** Wrap in `<span>` with `role="img"` and `aria-label`

**Example:**
```tsx
// Before:
<div className="text-2xl">💓</div>

// After:
<div className="text-2xl">
  <span role="img" aria-label="Heart icon">💓</span>
</div>
```

**Priority pages:**
- [ ] Homepage (`page.tsx`) — stat cards
- [ ] All landing pages (emoji headers)

### **2.4 Add Breadcrumb Schema to Existing Pages** (15 min)
**Files:** All landing pages (5 existing + 2 new)

**Why:** Helps Google understand site structure, shows breadcrumbs in SERPs

**Code template (already in new landing pages):**
```tsx
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://getlifestats.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "[Page Title]",
      "item": "https://getlifestats.com/[slug]"
    }
  ]
};
```

**Pages to update:**
- [ ] `/how-many-heartbeats`
- [ ] `/how-many-breaths`
- [ ] `/how-old-am-i-in-seconds`
- [ ] `/birthday-statistics`
- [ ] `/life-in-numbers`

---

## ✅ Phase 3: Google Search Console Setup (Today — 15 min)

### **3.1 Verify Ownership** (5 min)
**Method:** HTML Tag (easiest for Next.js)

1. [ ] Go to https://search.google.com/search-console
2. [ ] Add property (Domain): `getlifestats.com`
3. [ ] Copy meta tag: `<meta name="google-site-verification" content="ABC123XYZ" />`
4. [ ] Add to `src/app/layout.tsx` in `<head>`:
   ```tsx
   <head>
     <meta name="google-site-verification" content="[YOUR_CODE]" />
     {/* ... existing scripts */}
   </head>
   ```
5. [ ] Deploy to Vercel
6. [ ] Click "Verify" in GSC

### **3.2 Submit Sitemap** (2 min)
1. [ ] In GSC, go to **Sitemaps** (left sidebar)
2. [ ] Enter: `https://getlifestats.com/sitemap.xml`
3. [ ] Click **Submit**
4. [ ] Wait 24-48 hours for indexing

### **3.3 Enable Email Notifications** (2 min)
1. [ ] GSC → Settings (⚙️) → Users and permissions
2. [ ] Add email: `luminvortexai@gmail.com` (or personal)
3. [ ] Check "Email notifications"

### **3.4 Request Indexing for New Pages** (5 min)
*Do this 24 hours after deploy*

1. [ ] GSC → URL Inspection
2. [ ] Enter: `https://getlifestats.com/life-expectancy-calculator`
3. [ ] Click "Request Indexing"
4. [ ] Repeat for `/days-until-birthday`

---

## ✅ Phase 4: Content Expansion (Next Week — 2 hours)

### **4.1 Expand Existing Landing Pages** (90 min)
**Goal:** Increase content from ~300 words to 800-1,200 words each

**Pages to expand:**
- [ ] `/how-many-heartbeats` (currently 300 words → target 1,000)
- [ ] `/how-many-breaths` (currently 300 words → target 800)
- [ ] `/how-old-am-i-in-seconds` (currently 300 words → target 900)
- [ ] `/birthday-statistics` (currently 350 words → target 1,000)
- [ ] `/life-in-numbers` (currently 500 words → target 1,200)

**What to add:**
- Science/research citations (link to studies)
- More examples ("If you're 30 years old...")
- Comparison tables (age groups, countries)
- User testimonials (once available)
- Infographic-style stat cards

**SEO Benefit:** Google favors longer, comprehensive content for informational queries

### **4.2 Add FAQ Sections to Existing Pages** (30 min)
**Template (3-5 questions per page):**
- How accurate is this calculator?
- What's the average [stat] for my age?
- Can I share my results?
- Is this free?
- What other stats can I calculate?

**Pages to update:**
- [ ] `/how-many-heartbeats`
- [ ] `/how-many-breaths`
- [ ] `/how-old-am-i-in-seconds`
- [ ] `/birthday-statistics`
- [ ] `/life-in-numbers`

**Code template (already in new pages):**
```tsx
<div className="mb-8">
  <h2 className="text-2xl font-semibold mb-4">❓ Frequently Asked Questions</h2>
  <div className="space-y-4">
    <details className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
      <summary className="font-semibold text-purple-200 cursor-pointer">
        [Question]
      </summary>
      <p className="mt-3 text-purple-300 text-sm">
        [Answer]
      </p>
    </details>
  </div>
</div>

<script type="application/ld+json">
{JSON.stringify(faqSchema)}
</script>
```

---

## ✅ Phase 5: Future Enhancements (Month 2+)

### **5.1 Create Blog/Content Hub** (Future)
**Goal:** Attract organic traffic with evergreen articles

**Article Ideas:**
- "10 Mind-Blowing Facts About Your Heart" (target: "heart facts")
- "What Your Birthday Says About You" (target: "birthday meaning")
- "Life Expectancy Myths Debunked" (target: "life expectancy facts")
- "How to Calculate Your Age in Different Planets" (unique angle)

**Location:** `/blog/[slug]` or `/articles/[slug]`

### **5.2 Build Backlinks** (Future)
**Strategy:** Outreach to health, science, education blogs

**Pitch Template:**
> "Hi [Name], I noticed your article on [topic]. I built a free life stats calculator (getlifestats.com) that your readers might find interesting. It calculates 50+ stats from birthday — heartbeats, life expectancy, cosmic journey, etc. Would you consider linking to it in your [article title]? Happy to write a guest post or collaborate!"

**Target Sites:**
- Health blogs (Healthline, WebMD community)
- Science educators (ASAP Science, Vsauce forums)
- Productivity/self-improvement blogs
- Birthday/party planning sites

### **5.3 Add User Testimonials** (Future)
**Goal:** Social proof + AggregateRating schema

**Where to collect:**
- Social media shares (Twitter/X mentions)
- Email feedback (if you add contact form)
- Reddit/Product Hunt comments

**Schema:**
```json
{
  "@type": "AggregateRating",
  "ratingValue": "4.8",
  "reviewCount": "127"
}
```

---

## 📊 Success Metrics (Track Monthly)

### **Month 1 (Feb 2026):**
- [ ] 10 pages indexed in GSC
- [ ] 100+ impressions
- [ ] 5+ clicks
- [ ] No crawl errors

### **Month 2 (Mar 2026):**
- [ ] 500+ impressions
- [ ] 20+ clicks (4% CTR)
- [ ] Average position: 15-20
- [ ] 1-2 featured snippets owned

### **Month 3 (Apr 2026):**
- [ ] 2,000+ impressions
- [ ] 100+ clicks (5% CTR)
- [ ] Average position: 8-12
- [ ] 3+ featured snippets

### **Month 6 (Jul 2026):**
- [ ] 10,000+ impressions/month
- [ ] 500+ clicks/month
- [ ] Average position: 5-8
- [ ] 5+ featured snippets
- [ ] 15-20 indexed pages (including blog articles)

---

## 🚨 Common Pitfalls to Avoid

### **Don't:**
- ❌ Keyword stuff (unnatural repetition of keywords)
- ❌ Copy content from competitors (Google penalizes duplicate content)
- ❌ Hide text (white text on white background, tiny font)
- ❌ Buy backlinks (Google penalizes paid link schemes)
- ❌ Use blackhat SEO tactics (cloaking, doorway pages)
- ❌ Ignore mobile users (50%+ of traffic is mobile)
- ❌ Forget alt text (accessibility + SEO)

### **Do:**
- ✅ Write for humans first, Google second
- ✅ Update content regularly (shows freshness)
- ✅ Build backlinks naturally (great content attracts links)
- ✅ Monitor GSC weekly (catch issues early)
- ✅ Test on mobile (Google uses mobile-first indexing)
- ✅ Use HTTPS (ranking factor)
- ✅ Keep page speed fast (Core Web Vitals)

---

## 🛠️ Tools & Resources

### **Free SEO Tools:**
- **Google Search Console:** https://search.google.com/search-console
- **Google PageSpeed Insights:** https://pagespeed.web.dev/
- **Schema Markup Validator:** https://validator.schema.org/
- **Mobile-Friendly Test:** https://search.google.com/test/mobile-friendly
- **Ubersuggest (Keyword Research):** https://neilpatel.com/ubersuggest/
- **AnswerThePublic (Question Keywords):** https://answerthepublic.com/

### **Next.js SEO Docs:**
- Metadata API: https://nextjs.org/docs/app/building-your-application/optimizing/metadata
- Sitemap Generation: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap

---

## 🎯 Priority Order

**Today (30 min):**
1. ✅ Deploy new landing pages (life-expectancy, days-until-birthday)
2. ✅ Update sitemap
3. Set up Google Search Console

**This Week (2 hours):**
1. Add internal links to all landing pages
2. Add Organization schema to layout
3. Add FAQ sections to existing pages
4. Add breadcrumb schema to existing pages

**Next Week (2 hours):**
1. Expand existing landing page content (800-1,200 words each)
2. Optimize meta descriptions
3. Add alt text to icons/emojis

**Month 2+:**
1. Create blog articles
2. Build backlinks
3. Add user testimonials
4. Monitor GSC and iterate

---

## ✅ Final Checklist Before Launch

- [ ] All new files committed and pushed to GitHub
- [ ] Vercel deployment successful (check https://vercel.com/dashboard)
- [ ] All landing pages load without errors
- [ ] Sitemap validates: https://getlifestats.com/sitemap.xml
- [ ] Schema validates: https://validator.schema.org/
- [ ] Mobile-friendly: https://search.google.com/test/mobile-friendly
- [ ] Google Search Console verified
- [ ] Sitemap submitted to GSC
- [ ] No broken links (test internal links)
- [ ] Meta descriptions under 160 characters
- [ ] Titles under 60 characters
- [ ] All images have alt text

---

**Good luck! 🚀**  
Track progress in this checklist. Update it as you complete items.

*Questions? Refer to `SEO-AUDIT-REPORT.md` or `GOOGLE-SEARCH-CONSOLE-SETUP.md`*
