import { Metadata } from 'next';
import Link from 'next/link';
import DaysOldCalculator from './DaysOldCalculator';

export const metadata: Metadata = {
  title: "How Many Days Old Am I? | Days Old Calculator 2026",
  description: "FREE 2026 days old calculator — How many days old are you? Enter your birthday for exact days, weeks, months, milestones, and life percentage. No signup required.",
  keywords: [
    "how many days old am I",
    "how old am I in days",
    "days old calculator",
    "age in days",
    "how many days have I been alive",
    "10000 days old",
    "age calculator days",
  ],
  alternates: {
    canonical: "/how-many-days-old",
  },
};

export default function HowManyDaysOld() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do I calculate how many days old I am?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "To calculate how many days old you are: find the difference between today's date and your birthdate in days. Multiply your age in years by 365 and add the remaining days from your last birthday. Our free calculator does this instantly with exact results."
        }
      },
      {
        "@type": "Question",
        "name": "When am I 10,000 days old?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You turn 10,000 days old at approximately 27 years, 4 months, and 26 days of age. This is a popular milestone — many people celebrate their '10K day birthday.' Enter your birthdate in our calculator to find your exact 10,000 day milestone date."
        }
      },
      {
        "@type": "Question",
        "name": "How many days old is a 30-year-old?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A 30-year-old is approximately 10,957 days old (accounting for leap years). The exact number depends on how many leap years occurred since their birth date."
        }
      },
      {
        "@type": "Question",
        "name": "What percentage of my life have I lived?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Based on the average US life expectancy of 79 years (28,835 days), a 30-year-old has lived approximately 38% of their expected lifespan. Our calculator shows your personal life percentage based on your exact age."
        }
      },
      {
        "@type": "Question",
        "name": "How many days old is 1 year?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "One year equals either 365 days (standard year) or 366 days (leap year). Over a long period, the average is 365.25 days per year when accounting for leap years."
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
        "name": "How Many Days Old Am I?",
        "item": "https://getlifestats.com/how-many-days-old"
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
            How Many Days Old Am I?
          </h1>
          <p className="text-xl text-emerald-200 mb-8 leading-relaxed">
            Your age in years is just the beginning. Discover exactly how many days, weeks, and months you&apos;ve been alive — plus your next milestone and how much of life you&apos;ve lived.
          </p>

          {/* Interactive Calculator */}
          <DaysOldCalculator />

          {/* SEO Content */}
          <div className="mt-12 bg-white/10 backdrop-blur-sm rounded-2xl p-8 space-y-4">
            <h2 className="text-2xl font-semibold">Why Count Your Days?</h2>
            <p className="text-emerald-200 leading-relaxed">
              Humans naturally measure life in years — but days are more visceral. You&apos;ve been alive for 
              tens of thousands of individual days, each one a complete rotation of the Earth. Seeing that 
              number tends to reframe things.
            </p>
            <p className="text-emerald-200 leading-relaxed">
              Milestones like 10,000 days (age ~27) and 20,000 days (age ~54) are worth celebrating. 
              Many people find these more meaningful than the usual decade birthdays — because they&apos;re rare 
              and personal, not just round numbers in a calendar system we invented.
            </p>
            <div className="bg-emerald-500/20 border border-emerald-400/30 rounded-xl p-5">
              <h3 className="text-lg font-semibold mb-3">Quick Reference: Day Milestones</h3>
              <ul className="space-y-1 text-emerald-200 text-sm">
                <li>📅 <strong>1,000 days</strong> = ~2 years, 9 months</li>
                <li>📅 <strong>5,000 days</strong> = ~13 years, 8 months</li>
                <li>📅 <strong>10,000 days</strong> = ~27 years, 4 months</li>
                <li>📅 <strong>15,000 days</strong> = ~41 years, 1 month</li>
                <li>📅 <strong>20,000 days</strong> = ~54 years, 9 months</li>
                <li>📅 <strong>25,000 days</strong> = ~68 years, 5 months</li>
              </ul>
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">❓ Frequently Asked Questions</h2>
            <div className="space-y-4">
              <details className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                <summary className="font-semibold text-emerald-200 cursor-pointer">
                  How do I calculate how many days old I am?
                </summary>
                <p className="mt-3 text-emerald-300 text-sm">
                  Find the difference between today&apos;s date and your birthdate in days. 
                  Multiply your age in years by 365, add the remaining days from your last birthday, 
                  and account for leap years. Our free calculator handles this instantly.
                </p>
              </details>

              <details className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                <summary className="font-semibold text-emerald-200 cursor-pointer">
                  When am I 10,000 days old?
                </summary>
                <p className="mt-3 text-emerald-300 text-sm">
                  You turn 10,000 days old at approximately 27 years, 4 months, and 26 days of age. 
                  Enter your birthdate above to find your exact 10K day milestone date.
                </p>
              </details>

              <details className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                <summary className="font-semibold text-emerald-200 cursor-pointer">
                  How many days old is a 30-year-old?
                </summary>
                <p className="mt-3 text-emerald-300 text-sm">
                  Approximately 10,957 days old, accounting for leap years. The exact number 
                  varies based on how many February 29ths have occurred since birth.
                </p>
              </details>

              <details className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                <summary className="font-semibold text-emerald-200 cursor-pointer">
                  What percentage of my life have I lived?
                </summary>
                <p className="mt-3 text-emerald-300 text-sm">
                  Based on the average US life expectancy of 79 years (28,835 days), a 30-year-old 
                  has lived ~38% of their expected lifespan. Enter your birthdate above to see your 
                  personal life percentage.
                </p>
              </details>

              <details className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                <summary className="font-semibold text-emerald-200 cursor-pointer">
                  How many days old is 1 year?
                </summary>
                <p className="mt-3 text-emerald-300 text-sm">
                  One year is either 365 days (standard year) or 366 days (leap year). 
                  Over a long period, the average is 365.25 days/year.
                </p>
              </details>
            </div>
          </div>

          {/* Related */}
          <div className="mt-8 bg-emerald-500/20 border border-emerald-400/30 rounded-2xl p-6">
            <h2 className="text-2xl font-semibold mb-3">🔗 Related Calculators</h2>
            <div className="grid md:grid-cols-2 gap-3">
              <Link href="/how-many-minutes-old" className="text-emerald-300 hover:underline">
                → How Many Minutes Old Am I?
              </Link>
              <Link href="/what-generation-am-i" className="text-emerald-300 hover:underline">
                → What Generation Am I?
              </Link>
              <Link href="/how-old-am-i-in-seconds" className="text-emerald-300 hover:underline">
                → How Old Am I in Seconds?
              </Link>
              <Link href="/life-expectancy-calculator" className="text-emerald-300 hover:underline">
                → Life Expectancy Calculator
              </Link>
              <Link href="/how-many-heartbeats" className="text-emerald-300 hover:underline">
                → How Many Heartbeats Have I Had?
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
