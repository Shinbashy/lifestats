import { Metadata } from 'next';
import Link from 'next/link';
import MinutesOldCalculator from './MinutesOldCalculator';

export const metadata: Metadata = {
  title: "How Many Minutes Old Am I? | Live Minute & Second Age Calculator 2026",
  description: "FREE live calculator — How many minutes old are you? Watch your age tick in real-time: minutes, seconds, milliseconds. Plus heartbeats, breaths, and more. No signup required.",
  keywords: [
    "how many minutes old am I",
    "how many seconds old am I",
    "how old am I in minutes",
    "age in minutes calculator",
    "live age counter",
    "how many milliseconds old am I",
    "real time age calculator",
  ],
  alternates: {
    canonical: "/how-many-minutes-old",
  },
};

export default function HowManyMinutesOld() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do I calculate how many minutes old I am?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "To calculate your age in minutes: multiply your age in days by 1,440 (minutes per day). For precision, calculate the exact number of days since birth and multiply by 1,440. Our free live calculator does this instantly and updates every 0.1 seconds."
        }
      },
      {
        "@type": "Question",
        "name": "How many minutes old is a 30-year-old?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A 30-year-old is approximately 15,778,800 minutes old (about 15.8 million minutes). That's roughly 946 million seconds. The exact number varies by a few thousand minutes depending on leap years."
        }
      },
      {
        "@type": "Question",
        "name": "How many seconds are there in a year?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "There are 31,536,000 seconds in a standard 365-day year. In a leap year, there are 31,622,400 seconds. Over time, the average is 31,557,600 seconds per year (accounting for leap years every 4 years)."
        }
      },
      {
        "@type": "Question",
        "name": "How many heartbeats have I had in my lifetime?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The average heart beats about 72 times per minute. So your total heartbeats = (minutes alive) × 72. A 30-year-old has had approximately 1.14 billion heartbeats. Our calculator shows this count updating in real-time."
        }
      },
      {
        "@type": "Question",
        "name": "Does birth time matter for calculating age in minutes?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes — if you know your exact birth time, you can calculate your age to the nearest minute. Without a birth time, we calculate from midnight, which may be off by up to 1,440 minutes (one day). Enter your birth time for maximum precision."
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
        "name": "How Many Minutes Old Am I?",
        "item": "https://getlifestats.com/how-many-minutes-old"
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
            How Many Minutes Old Am I?
          </h1>
          <p className="text-xl text-emerald-200 mb-8 leading-relaxed">
            Watch your age count up in real time — minutes, seconds, milliseconds, heartbeats, and more. 
            Enter your birthday and watch the numbers fly.
          </p>

          {/* Interactive Live Calculator */}
          <MinutesOldCalculator />

          {/* SEO Content */}
          <div className="mt-12 bg-white/10 backdrop-blur-sm rounded-2xl p-8 space-y-4">
            <h2 className="text-2xl font-semibold">Time Is Always Running</h2>
            <p className="text-emerald-200 leading-relaxed">
              Right now, while you read this sentence, your age ticks forward. Every minute that passes is 
              60 seconds. Every second is 1,000 milliseconds. Seeing these numbers live — actually watching 
              them increment — makes the passage of time feel real in a way that &quot;I&apos;m 32 years old&quot; 
              never quite does.
            </p>
            <p className="text-emerald-200 leading-relaxed">
              A 30-year-old has lived through over 15 million minutes. Their heart has beaten over a billion times. 
              These aren&apos;t just numbers — they&apos;re a portrait of a life, measured in the smallest units.
            </p>
            <div className="bg-emerald-500/20 border border-emerald-400/30 rounded-xl p-5">
              <h3 className="text-lg font-semibold mb-3">Quick Reference: Age in Minutes</h3>
              <ul className="space-y-1 text-emerald-200 text-sm">
                <li>⏱️ <strong>Age 1</strong> = ~525,960 minutes</li>
                <li>⏱️ <strong>Age 10</strong> = ~5,259,600 minutes</li>
                <li>⏱️ <strong>Age 20</strong> = ~10,519,200 minutes</li>
                <li>⏱️ <strong>Age 30</strong> = ~15,778,800 minutes</li>
                <li>⏱️ <strong>Age 50</strong> = ~26,298,000 minutes</li>
                <li>⏱️ <strong>Age 79</strong> = ~41,551,560 minutes (avg life expectancy)</li>
              </ul>
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">❓ Frequently Asked Questions</h2>
            <div className="space-y-4">
              <details className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                <summary className="font-semibold text-emerald-200 cursor-pointer">
                  How do I calculate how many minutes old I am?
                </summary>
                <p className="mt-3 text-emerald-300 text-sm">
                  Multiply your age in days by 1,440 (minutes per day). For precision, calculate 
                  exact elapsed days since birth × 1,440. Our calculator does this and updates live every 0.1 seconds.
                </p>
              </details>

              <details className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                <summary className="font-semibold text-emerald-200 cursor-pointer">
                  How many minutes old is a 30-year-old?
                </summary>
                <p className="mt-3 text-emerald-300 text-sm">
                  Approximately 15,778,800 minutes old (~15.8 million). That&apos;s about 946 million seconds 
                  or nearly a billion heartbeats.
                </p>
              </details>

              <details className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                <summary className="font-semibold text-emerald-200 cursor-pointer">
                  How many seconds are there in a year?
                </summary>
                <p className="mt-3 text-emerald-300 text-sm">
                  31,536,000 seconds in a standard year. 31,622,400 in a leap year. 
                  Average: 31,557,600 per year accounting for leap years.
                </p>
              </details>

              <details className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                <summary className="font-semibold text-emerald-200 cursor-pointer">
                  How many heartbeats have I had in my lifetime?
                </summary>
                <p className="mt-3 text-emerald-300 text-sm">
                  Your total heartbeats = (minutes alive) × 72 (average bpm). 
                  A 30-year-old has had ~1.14 billion heartbeats. Our calculator shows this updating in real-time.
                </p>
              </details>

              <details className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                <summary className="font-semibold text-emerald-200 cursor-pointer">
                  Does birth time matter for calculating age in minutes?
                </summary>
                <p className="mt-3 text-emerald-300 text-sm">
                  Yes — knowing your exact birth time gets you to the nearest minute. Without a birth time, 
                  we calculate from midnight (up to 1,440 minutes off). Enter your birth time above for maximum precision.
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
              <Link href="/what-generation-am-i" className="text-emerald-300 hover:underline">
                → What Generation Am I?
              </Link>
              <Link href="/how-old-am-i-in-seconds" className="text-emerald-300 hover:underline">
                → How Old Am I in Seconds?
              </Link>
              <Link href="/how-many-heartbeats" className="text-emerald-300 hover:underline">
                → How Many Heartbeats Have I Had?
              </Link>
              <Link href="/how-many-breaths" className="text-emerald-300 hover:underline">
                → How Many Breaths Have I Taken?
              </Link>
              <Link href="/life-expectancy-calculator" className="text-emerald-300 hover:underline">
                → Life Expectancy Calculator
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
