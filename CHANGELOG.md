# LifeStats Changelog

All notable changes to LifeStats are documented here.
Format: `[version/date] - description`

---

## [2026-03-21] - Change Management
- Added staging branch for pre-deploy testing
- Added `scripts/pre-deploy.sh` checklist

## [2026-03] - SEO Calculator Expansion
- Added `/birthday-countdown`, `/chinese-zodiac-calculator`, `/life-path-number`
- Added `/how-many-months-old`, `/what-zodiac-sign-am-i`, `/age-calculator`
- Added `/how-many-weeks-old`, `/how-many-hours-old`, `/what-day-was-i-born`
- Added `/what-generation-am-i`, `/how-many-days-old`, `/how-many-minutes-old`
- Internal links, FAQ schema, org schema, breadcrumbs, meta descriptions across all pages

## [2026-03] - Premium / Monetization
- Paywall UI — PremiumGate component, UpgradeModal, sticky upgrade banner
- PDF export feature (premium-ready)

## [2026-02] - Core Features & Polish
- Dynamic OG image, favicon, Apple touch icon
- Supabase submission logging (track all calculator uses)
- SEO: sitemap, robots.txt, 5 landing pages for long-tail keywords
- Fixed Gen X boundary to include 1981 (1965–1981)
- Share cards with templates + PNG download
- Country selector — "What if I lived in [country]?" framing
- Drag-to-reorder cards
- Freemium gating for premium sections
- Number inputs for DOB, auto-advance flow
- Vercel Analytics integrated
- Security headers + RLS migration

## [2026-02] - QA
- Playwright tests, security headers, perf, SEO audit suite
- Comprehensive README added
