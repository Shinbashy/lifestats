import { Metadata } from 'next';
import Link from 'next/link';
import WeeksOldCalculator from './WeeksOldCalculator';

export const metadata: Metadata = {
  title: "How Many Weeks Old Am I? | Weeks Old Calculator 2026",
  description: "FREE 2026 weeks old calculator — How many weeks old are you? Enter your birthday for exact weeks, months, years, and days remainder. No signup required.",
  keywords: [
    "how many weeks old am I",
    "how old am I in weeks",
    "weeks old calculator",
    "age in weeks",
    "how many weeks have I been alive",
    "calculate weeks old",
    "age calculator weeks",
  ],
  alternates: {
    canonical: "/how-many-weeks-old",
  },
};

export default function HowManyWeeksOld() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How many weeks old am I?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "To find how many weeks old you are, calculate the total number of days between your birthdate and today, then divide by 7. A 30-year-old is approximately 1,565 weeks old. Use our free calculator above for your exact count."
        }
      },
      {
        "@type": "Question",
        "name": "How do I calculate how many weeks old I am?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Multiply your age in years by 52.18 (accounting for leap years), then add the weeks since your last birthday. For example: 25 years × 52.18 = approximately 1,304 weeks. Our calculator gives you the exact answer instantly."
        }
      },
      {
        "@type": "Question",
        "name": "How many weeks are in a year?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A standard year has 52 weeks and 1 day (365 days ÷ 7). A leap year has 52 weeks and 2 days (366 days ÷ 7). On average, accounting for leap years, a year has approximately 52.18 weeks."
        }
      },
      {
        "@type": "Question",
        "name": "How many weeks old is a 1-year-old?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A 1-year-old baby is approximately 52 weeks old (or 53 weeks if a leap year occurred). Pediatricians often track development in weeks for the first two years of life."
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
        "name": "How Many Weeks Old Am I?",
        "item": "https://getlifestats.com/how-many-weeks-old"
      }
    ]
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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 text-white p-8">
        <div className="max-w-3xl mx-auto">
          <Link href="/" className="text-emerald-300 hover:text-emerald-200 mb-6 inline-block">
            ← Back to LifeStats
          </Link>

          <h1 className="text-5xl font-bold mb-4">
            How Many Weeks Old Am I?
          </h1>
          <p className="text-xl text-emerald-200 mb-8 leading-relaxed">
            Years feel abstract. Weeks are something you can feel — every Monday a new one begins. Find out exactly how many weeks you&apos;ve lived, plus the leftover days that don&apos;t quite make a full week.
          </p>

          {/* Interactive Calculator */}
          <WeeksOldCalculator />

          {/* SEO Content */}
          <div className="mt-12 bg-white/10 backdrop-blur-sm rounded-2xl p-8 space-y-4">
            <h2 className="text-2xl font-semibold">Why Count Your Weeks?</h2>
            <p className="text-emerald-200 leading-relaxed">
              Years are the currency of age, but weeks are how we actually experience time. Each week has its own rhythm — weekdays, weekends, Monday morning, Friday afternoon. Knowing exactly how many of those 168-hour cycles you&apos;ve lived through puts your age in vivid relief.
            </p>
            <p className="text-emerald-200 leading-relaxed">
              A 30-year-old has lived through roughly 1,565 weeks. A 50-year-old: about 2,608. If you&apos;re 25, you&apos;ve had around 1,304 Mondays. That number tends to land differently than &quot;I&apos;m 25.&quot;
            </p>
            <div className="bg-emerald-500/20 border border-emerald-400/30 rounded-xl p-5">
              <h3 className="text-lg font-semibold mb-3">Quick Reference: Weeks by Age</h3>
              <ul className="space-y-1 text-emerald-200 text-sm">
                <li>📅 <strong>Age 1</strong> = ~52 weeks</li>
                <li>📅 <strong>Age 10</strong> = ~522 weeks</li>
                <li>📅 <strong>Age 18</strong> = ~940 weeks</li>
                <li>📅 <strong>Age 25</strong> = ~1,304 weeks</li>
                <li>📅 <strong>Age 30</strong> = ~1,565 weeks</li>
                <li>📅 <strong>Age 40</strong> = ~2,087 weeks</li>
                <li>📅 <strong>Age 50</strong> = ~2,608 weeks</li>
                <li>📅 <strong>Age 65</strong> = ~3,391 weeks</li>
              </ul>
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">❓ Frequently Asked Questions</h2>
            <div className="space-y-4">
              <details className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                <summary className="font-semibold text-emerald-200 cursor-pointer">
                  How many weeks old am I?
                </summary>
                <p className="mt-3 text-emerald-300 text-sm">
                  Calculate the total days between your birthdate and today, then divide by 7. A 30-year-old is approximately 1,565 weeks old. Use the calculator above for your exact number.
                </p>
              </details>

              <details className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                <summary className="font-semibold text-emerald-200 cursor-pointer">
                  How do I calculate weeks old by hand?
                </summary>
                <p className="mt-3 text-emerald-300 text-sm">
                  Multiply your age in years by 52.18, then add any extra weeks since your last birthday. This accounts for leap years. Example: 25 years × 52.18 ≈ 1,304 weeks.
                </p>
              </details>

              <details className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                <summary className="font-semibold text-emerald-200 cursor-pointer">
                  How many weeks are in a year?
                </summary>
                <p className="mt-3 text-emerald-300 text-sm">
                  A standard year has 52 weeks and 1 day (365 ÷ 7 = 52.14). A leap year has 52 weeks and 2 days. The long-run average including leap years is ~52.18 weeks/year.
                </p>
              </details>

              <details className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                <summary className="font-semibold text-emerald-200 cursor-pointer">
                  How many weeks old is a newborn?
                </summary>
                <p className="mt-3 text-emerald-300 text-sm">
                  Newborns start at 0 weeks old and reach 1 week after their first 7 days. Pediatricians track development in weeks for the first 2 years — a baby is typically measured as &quot;X weeks old&quot; until around age 2.
                </p>
              </details>
            </div>
          </div>

          {/* Related */}
          <div className="mt-8 bg-emerald-500/20 border border-emerald-400/30 rounded-2xl p-6">
            <h2 className="text-2xl font-semibold mb-3">🔗 Related Calculators</h2>
            <div className="grid md:grid-cols-2 gap-3">
              <Link href="/how-many-days-old" className="text-emerald-300 hover:underline">
                → How Many Days Old Am I?
              </Link>
              <Link href="/how-many-hours-old" className="text-emerald-300 hover:underline">
                → How Many Hours Old Am I?
              </Link>
              <Link href="/how-many-minutes-old" className="text-emerald-300 hover:underline">
                → How Many Minutes Old Am I?
              </Link>
              <Link href="/what-generation-am-i" className="text-emerald-300 hover:underline">
                → What Generation Am I?
              </Link>
              <Link href="/what-day-was-i-born" className="text-emerald-300 hover:underline">
                → What Day of the Week Was I Born?
              </Link>
              <Link href="/days-until-birthday" className="text-emerald-300 hover:underline">
                → Days Until My Birthday
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
