import { Metadata } from 'next';
import Link from 'next/link';
import AgeCalculator from './AgeCalculator';

export const metadata: Metadata = {
  title: "Age Calculator — How Old Am I? | Exact Age in Years, Days, Hours 2026",
  description: "FREE age calculator — How old am I? Enter your birthdate to see your exact age in years, months, days, hours, minutes. Plus: next birthday countdown, generation, and more.",
  keywords: [
    "age calculator",
    "how old am I",
    "calculate my age",
    "exact age calculator",
    "age in days calculator",
    "birthday age calculator",
    "how old am I today",
    "age calculator 2026",
  ],
  alternates: {
    canonical: "/age-calculator",
  },
};

export default function AgeCalculatorPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do I calculate my exact age?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Your exact age is calculated by finding the difference between your birth date and today's date. For years: subtract birth year from current year, adjusting if your birthday hasn't occurred yet this year. For total days: subtract birth date from today and divide by milliseconds per day. Our free calculator handles all of this instantly."
        }
      },
      {
        "@type": "Question",
        "name": "How many days old am I?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The number of days you've been alive equals the difference between today and your birth date in days. A 30-year-old is approximately 10,957 days old. Enter your birthday above to see your exact count."
        }
      },
      {
        "@type": "Question",
        "name": "How many hours old am I?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Multiply your total days alive by 24 to get hours. A 30-year-old has lived approximately 262,980 hours. Enter your birthdate to see your exact hours lived."
        }
      },
      {
        "@type": "Question",
        "name": "When is my next birthday?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Your next birthday is the upcoming anniversary of your birth date. Enter your birthday above and we'll calculate exactly how many days remain until your next birthday."
        }
      }
    ]
  };

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
        "name": "Age Calculator",
        "item": "https://getlifestats.com/age-calculator"
      }
    ]
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Age Calculator — How Old Am I?",
    "url": "https://www.getlifestats.com/age-calculator",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Web",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 text-white p-8">
        <div className="max-w-3xl mx-auto">
          <Link href="/" className="text-emerald-300 hover:text-emerald-200 mb-6 inline-block">
            ← Back to LifeStats
          </Link>

          <h1 className="text-5xl font-bold mb-4">
            Age Calculator
          </h1>
          <p className="text-xl text-emerald-200 mb-8 leading-relaxed">
            How old are you — really? Enter your birthdate and see your exact age in every unit that matters: years, months, days, hours, minutes, and more.
          </p>

          {/* Interactive Calculator */}
          <AgeCalculator />

          {/* SEO Content */}
          <div className="mt-12 bg-white/10 backdrop-blur-sm rounded-2xl p-8 space-y-4">
            <h2 className="text-2xl font-semibold">Your Age, Every Way It Can Be Measured</h2>
            <p className="text-emerald-200 leading-relaxed">
              Years are the default unit humans use for age — but they&apos;re surprisingly coarse. 
              You&apos;re 32 for an entire year. Meanwhile, the actual number of days, hours, and minutes 
              you&apos;ve lived keeps ticking upward in a way that feels much more alive.
            </p>
            <p className="text-emerald-200 leading-relaxed">
              This calculator shows your age in every meaningful unit simultaneously. It&apos;s the same 
              information, just viewed through different lenses. Some people find the days number 
              inspiring. Others find the minutes one slightly terrifying. Either reaction is valid.
            </p>
            <div className="bg-emerald-500/20 border border-emerald-400/30 rounded-xl p-5">
              <h3 className="text-lg font-semibold mb-3">Average Age Stats (30-year-old)</h3>
              <ul className="space-y-1 text-emerald-200 text-sm">
                <li>📅 <strong>~10,957 days</strong> alive</li>
                <li>📆 <strong>~1,565 weeks</strong> alive</li>
                <li>⏰ <strong>~262,980 hours</strong> alive</li>
                <li>⏱️ <strong>~15,778,800 minutes</strong> alive</li>
                <li>🌙 <strong>~371 full moons</strong> witnessed</li>
              </ul>
            </div>
          </div>

          {/* All Calculators Hub */}
          <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-2xl p-8">
            <h2 className="text-2xl font-semibold mb-2">🔢 Age Calculators — Every Unit</h2>
            <p className="text-emerald-300 text-sm mb-5">Explore each specific calculator for deeper detail on each unit.</p>
            <div className="grid md:grid-cols-2 gap-3">
              <Link href="/how-many-days-old" className="bg-emerald-600/20 border border-emerald-500/30 rounded-xl p-4 hover:bg-emerald-600/30 transition-all">
                <div className="font-semibold text-white">📅 Days Old</div>
                <div className="text-emerald-300 text-sm">Milestones, leap years, life %</div>
              </Link>
              <Link href="/how-many-weeks-old" className="bg-emerald-600/20 border border-emerald-500/30 rounded-xl p-4 hover:bg-emerald-600/30 transition-all">
                <div className="font-semibold text-white">📆 Weeks Old</div>
                <div className="text-emerald-300 text-sm">Total weeks lived</div>
              </Link>
              <Link href="/how-many-months-old" className="bg-emerald-600/20 border border-emerald-500/30 rounded-xl p-4 hover:bg-emerald-600/30 transition-all">
                <div className="font-semibold text-white">🗓️ Months Old</div>
                <div className="text-emerald-300 text-sm">The baby tracker perspective</div>
              </Link>
              <Link href="/how-many-hours-old" className="bg-emerald-600/20 border border-emerald-500/30 rounded-xl p-4 hover:bg-emerald-600/30 transition-all">
                <div className="font-semibold text-white">⏰ Hours Old</div>
                <div className="text-emerald-300 text-sm">Total hours alive</div>
              </Link>
              <Link href="/how-many-minutes-old" className="bg-emerald-600/20 border border-emerald-500/30 rounded-xl p-4 hover:bg-emerald-600/30 transition-all">
                <div className="font-semibold text-white">⏱️ Minutes Old</div>
                <div className="text-emerald-300 text-sm">The big number</div>
              </Link>
              <Link href="/what-generation-am-i" className="bg-emerald-600/20 border border-emerald-500/30 rounded-xl p-4 hover:bg-emerald-600/30 transition-all">
                <div className="font-semibold text-white">👨‍👩‍👧 Generation</div>
                <div className="text-emerald-300 text-sm">Boomer, Gen X, Millennial?</div>
              </Link>
              <Link href="/what-day-was-i-born" className="bg-emerald-600/20 border border-emerald-500/30 rounded-xl p-4 hover:bg-emerald-600/30 transition-all">
                <div className="font-semibold text-white">📅 Day of Week Born</div>
                <div className="text-emerald-300 text-sm">Monday&apos;s child, Tuesday&apos;s child...</div>
              </Link>
              <Link href="/what-zodiac-sign-am-i" className="bg-emerald-600/20 border border-emerald-500/30 rounded-xl p-4 hover:bg-emerald-600/30 transition-all">
                <div className="font-semibold text-white">♈ Zodiac Sign</div>
                <div className="text-emerald-300 text-sm">Western + Chinese astrology</div>
              </Link>
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">❓ Frequently Asked Questions</h2>
            <div className="space-y-4">
              <details className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                <summary className="font-semibold text-emerald-200 cursor-pointer">
                  How do I calculate my exact age?
                </summary>
                <p className="mt-3 text-emerald-300 text-sm">
                  Subtract your birth date from today. For years: account for whether your birthday 
                  has occurred yet this year. For days: find the raw millisecond difference and divide. 
                  This calculator does it all instantly.
                </p>
              </details>

              <details className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                <summary className="font-semibold text-emerald-200 cursor-pointer">
                  How many days old am I?
                </summary>
                <p className="mt-3 text-emerald-300 text-sm">
                  A 30-year-old is ~10,957 days old. Enter your birthday above for your exact count.
                </p>
              </details>

              <details className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                <summary className="font-semibold text-emerald-200 cursor-pointer">
                  How many hours old am I?
                </summary>
                <p className="mt-3 text-emerald-300 text-sm">
                  Total days × 24. A 30-year-old has lived ~262,980 hours. Enter your birthday to see yours.
                </p>
              </details>

              <details className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                <summary className="font-semibold text-emerald-200 cursor-pointer">
                  When is my next birthday?
                </summary>
                <p className="mt-3 text-emerald-300 text-sm">
                  Enter your birthday above and we&apos;ll calculate the exact days remaining.
                </p>
              </details>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
