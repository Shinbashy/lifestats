# LifeStats — Life Statistics Calculator

Enter your birthday → see 50+ fascinating statistics about your life.

**Live:** https://getlifestats.com  
**Status:** Deployed and SEO-optimized  
**Port:** 3009 (local dev)

## Overview

LifeStats is a viral-ready consumer app that calculates fascinating statistics about your life based on your birthday, gender, and country. From heartbeats to sunsets, from Tuesdays to cups of coffee — see your life in numbers.

**Built:** Feb 2-7, 2026  
**SEO Optimized:** Feb 7, 2026  
**Revenue Model:** Premium gender-specific stats (paywall ready)

## Features

### Core Calculator (Main Page)
- **Body Stats**: Heartbeats, breaths, blinks, steps
- **Cosmic Stats**: Times around the sun, days alive, hours lived
- **Digital Era Stats**: WiFi signals, notifications, screen time
- **Consumption**: Meals, water, coffee, pizzas
- **Time Spent**: Sleep hours, work days, weekends
- **World Events**: Historical context, cultural milestones
- **Country-Adjusted**: Lifestyle stats based on location
- **Gender-Adjusted**: Life expectancy customized by gender

### Specialized Calculators
- **Life Expectancy Calculator** (`/life-expectancy-calculator`)
- **How Old Am I in Seconds** (`/how-old-am-i-in-seconds`)
- **How Many Heartbeats** (`/how-many-heartbeats`)
- **How Many Breaths** (`/how-many-breaths`)
- **Birthday Statistics** (`/birthday-statistics`)
- **Life in Numbers** (`/life-in-numbers`)
- **Days Until Birthday** (`/days-until-birthday`)

### Premium Features (Ready for Paywall)
- Gender-specific health insights
- Extended life expectancy analytics
- Personalized milestones
- Country comparisons

## Tech Stack

**Framework:** Next.js 16 + React 19  
**Styling:** Tailwind CSS 4  
**Analytics:** Google Analytics, Google Search Console  
**SEO:** OpenGraph images, structured data, sitemap  
**Hosting:** Vercel  
**Domain:** getlifestats.com (also yourlifestats.com, welcometolife.app)

## Local Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Open browser
open http://localhost:3009

# Build for production
npm run build

# Start production server
npm start
```

## SEO Implementation

**Completed Feb 7, 2026:**
- ✅ Dynamic OpenGraph images for all pages
- ✅ Structured data (JSON-LD) for calculators
- ✅ Sitemap with all calculator pages
- ✅ Robots.txt configured
- ✅ Meta descriptions optimized
- ✅ Google Search Console verified
- ✅ Google Analytics integrated

**Target Keywords:**
- "life expectancy calculator"
- "how old am I in seconds"
- "birthday statistics"
- "life in numbers"
- "how many heartbeats have I had"

**Docs:**
- SEO audit: `SEO-AUDIT-REPORT.md`
- Implementation checklist: `SEO-IMPLEMENTATION-CHECKLIST.md`
- Deliverables: `SEO-DELIVERABLES-README.md`
- Search Console setup: `GOOGLE-SEARCH-CONSOLE-SETUP.md`

## Revenue Strategy

**Phase 1 (Current):** Free with ads consideration  
**Phase 2:** Premium gender stats paywall  
**Phase 3:** Subscription model for advanced features

**Monetization Triggers:**
- Gender-specific insights
- Extended life expectancy analytics
- Historical context deep-dives
- Personalized milestone tracking

## Project Structure

```
src/
├── app/
│   ├── page.tsx                      # Main calculator
│   ├── life-expectancy-calculator/   # Dedicated calculator
│   ├── how-old-am-i-in-seconds/      # Specialized tool
│   ├── how-many-heartbeats/          # Heartbeat calculator
│   ├── how-many-breaths/             # Breath calculator
│   ├── birthday-statistics/          # Birthday insights
│   ├── life-in-numbers/              # Comprehensive stats
│   ├── days-until-birthday/          # Countdown tool
│   ├── privacy/                      # Privacy policy
│   ├── terms/                        # Terms of service
│   ├── opengraph-image.tsx           # OG image generator
│   ├── icon.tsx                      # Favicon
│   └── apple-icon.tsx                # Apple touch icon
├── components/                       # Shared components
└── lib/                             # Utilities
```

## Key Stats

**Pages:** 10+ calculator pages  
**Data Points:** 50+ life statistics  
**Countries Supported:** 14 (life expectancy data)  
**Unit Conversions:** Multiple formats (years, months, days, hours, etc.)

## Marketing

**Primary Domain:** getlifestats.com  
**Alternative Domains:** yourlifestats.com, welcometolife.app, mytestscores.com  
**Social Sharing:** Optimized OG images for viral potential  
**Target Audience:** Curiosity-driven, data enthusiasts, birthday seekers

## Future Enhancements

- [ ] Premium gender stats paywall implementation
- [ ] User accounts (save & compare over time)
- [ ] Social sharing (compare with friends)
- [ ] More countries (expand life expectancy data)
- [ ] Historical events personalization
- [ ] Milestone notifications
- [ ] Email digest (yearly birthday stats)

## Related Projects

Part of Neal's consumer app portfolio:
- **SakeSpirit** (3005) — Sake bottle scanner with AI characters
- **DeathDay** (3011) — Morbid life countdown calculator
- **HexWit** (3006) — Turn-based strategy game

## Links

**Live Site:** https://getlifestats.com  
**GitHub:** https://github.com/Shinbashy/lifestats  
**Vercel:** Connected  
**Analytics:** Google Analytics + Search Console

---

**Built by:** Neal Scott  
**Assistant:** Kai (OpenClaw)  
**Last Updated:** Feb 14, 2026
