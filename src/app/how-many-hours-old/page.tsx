import { Metadata } from 'next';
import Link from 'next/link';
import HoursOldCalculator from './HoursOldCalculator';

export const metadata: Metadata = {
  title: "How Many Hours Old Am I? | Hours Old Calculator 2026",
  description: "FREE 2026 hours old calculator — How many hours old are you? Enter your birthday for exact hours lived, equivalent in days and minutes. No signup required.",
  keywords: [
    "how many hours old am I",
    "how old am I in hours",
    "hours old calculator",
    "age in hours",
    "how many hours have I been alive",
    "calculate hours old",
    "age calculator hours",
  ],
  alternates: {
    canonical: "/how-many-hours-old",
  },
};

export default function HowManyHoursOld() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How many hours old am I?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "To find how many hours old you are, multiply the number of days between your birthdate and today by 24. A 30-year-old is approximately 262,980 hours old. Use our free calculator for your exact count."
        }
      },
      {
        "@type": "Question",
        "name": "How do I calculate how many hours old I am?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Calculate the total days between your birthdate and today, then multiply by 24 (hours per day). For example: 10,950 days × 24 = 262,800 hours. Our calculator does this automatically and gives you the result instantly."
        }
      },
      {
        "@type": "Question",
        "name": "How many hours are in a year?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A standard year has 8,760 hours (365 days × 24 hours). A leap year has 8,784 hours (366 × 24). On average across leap years, a year contains about 8,766 hours."
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
        "name": "How Many Hours Old Am I?",
        "item": "https://getlifestats.com/how-many-hours-old"
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
            How Many Hours Old Am I?
          </h1>
          <p className="text-xl text-emerald-200 mb-8 leading-relaxed">
            You&apos;ve been alive for hundreds of thousands of hours. That number is more visceral than your age in years — it puts the sheer volume of time you&apos;ve experienced front and center.
          </p>

          {/* Interactive Calculator */}
          <HoursOldCalculator />

          {/* SEO Content */}
          <div className="mt-12 bg-white/10 backdrop-blur-sm rounded-2xl p-8 space-y-4">
            <h2 className="text-2xl font-semibold">The Scale of a Human Life in Hours</h2>
            <p className="text-emerald-200 leading-relaxed">
              A year is 8,760 hours. A decade is 87,600 hours. By the time you&apos;re 30, you&apos;ve lived through roughly 263,000 hours — enough time to watch every movie ever made several times over, or learn 10 new languages, or circumnavigate the globe hundreds of times.
            </p>
            <p className="text-emerald-200 leading-relaxed">
              Hours make the invisible visible. We rarely think about the raw number of hours we&apos;ve been alive, but seeing a 6-digit number changes something. Each hour was a real slice of your life.
            </p>
            <div className="bg-emerald-500/20 border border-emerald-400/30 rounded-xl p-5">
              <h3 className="text-lg font-semibold mb-3">Quick Reference: Hours by Age</h3>
              <ul className="space-y-1 text-emerald-200 text-sm">
                <li>⏰ <strong>Age 1</strong> = ~8,766 hours</li>
                <li>⏰ <strong>Age 5</strong> = ~43,830 hours</li>
                <li>⏰ <strong>Age 10</strong> = ~87,660 hours</li>
                <li>⏰ <strong>Age 18</strong> = ~157,788 hours</li>
                <li>⏰ <strong>Age 21</strong> = ~184,086 hours</li>
                <li>⏰ <strong>Age 30</strong> = ~262,980 hours</li>
                <li>⏰ <strong>Age 40</strong> = ~350,640 hours</li>
                <li>⏰ <strong>Age 50</strong> = ~438,300 hours</li>
              </ul>
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">❓ Frequently Asked Questions</h2>
            <div className="space-y-4">
              <details className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                <summary className="font-semibold text-emerald-200 cursor-pointer">
                  How many hours old am I?
                </summary>
                <p className="mt-3 text-emerald-300 text-sm">
                  Multiply your total days alive by 24. A 30-year-old is approximately 262,980 hours old. Enter your birthdate above to get your exact count.
                </p>
              </details>

              <details className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                <summary className="font-semibold text-emerald-200 cursor-pointer">
                  How do I calculate hours old manually?
                </summary>
                <p className="mt-3 text-emerald-300 text-sm">
                  Count the total days from your birthdate to today, then multiply by 24. Example: 10,950 days × 24 = 262,800 hours. Add any partial hours if you know your birth time.
                </p>
              </details>

              <details className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                <summary className="font-semibold text-emerald-200 cursor-pointer">
                  How many hours are in a year?
                </summary>
                <p className="mt-3 text-emerald-300 text-sm">
                  A standard year = 8,760 hours. A leap year = 8,784 hours. The long-run average is ~8,766 hours/year accounting for the 4-year leap year cycle.
                </p>
              </details>

              <details className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                <summary className="font-semibold text-emerald-200 cursor-pointer">
                  How many minutes are in my lifetime so far?
                </summary>
                <p className="mt-3 text-emerald-300 text-sm">
                  Multiply your hours old by 60. A 30-year-old is approximately 15,778,800 minutes old. Check our{' '}
                  <a href="/how-many-minutes-old" className="text-emerald-400 hover:underline">minutes old calculator</a> for the exact number.
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
              <Link href="/how-many-weeks-old" className="text-emerald-300 hover:underline">
                → How Many Weeks Old Am I?
              </Link>
              <Link href="/how-many-minutes-old" className="text-emerald-300 hover:underline">
                → How Many Minutes Old Am I?
              </Link>
              <Link href="/how-old-am-i-in-seconds" className="text-emerald-300 hover:underline">
                → How Old Am I in Seconds?
              </Link>
              <Link href="/what-day-was-i-born" className="text-emerald-300 hover:underline">
                → What Day of the Week Was I Born?
              </Link>
              <Link href="/what-generation-am-i" className="text-emerald-300 hover:underline">
                → What Generation Am I?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
