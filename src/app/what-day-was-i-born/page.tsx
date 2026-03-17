import { Metadata } from 'next';
import Link from 'next/link';
import DayBornCalculator from './DayBornCalculator';

export const metadata: Metadata = {
  title: "What Day of the Week Was I Born? | Day Born Calculator 2026",
  description: "FREE 2026 day born calculator — What day of the week were you born? Enter your birthday to discover your birth day, fun facts about it, and how many of that weekday you've lived through.",
  keywords: [
    "what day was I born",
    "what day of the week was I born",
    "day of week born calculator",
    "what day of week was I born on",
    "find day of week from birthday",
    "born on a monday calculator",
    "birthday day of week",
  ],
  alternates: {
    canonical: "/what-day-was-i-born",
  },
};

export default function WhatDayWasIBorn() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What day of the week was I born?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "To find your birth day of the week, enter your birthdate into our free calculator. The result shows which day you were born on — Monday through Sunday — along with fun facts and how many of that weekday you've lived through."
        }
      },
      {
        "@type": "Question",
        "name": "What day of the week was I born on?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Your birth day of week depends entirely on your birthdate. You can calculate it by finding what day January 1st of your birth year fell on, then counting forward. Our calculator does this instantly — just enter your date of birth."
        }
      },
      {
        "@type": "Question",
        "name": "What is special about being born on each day of the week?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Each day of the week has unique associations: Monday (Moon day, intuitive), Tuesday (Mars day, energetic), Wednesday (Mercury day, communicative), Thursday (Jupiter day, lucky), Friday (Venus day, social), Saturday (Saturn day, disciplined), Sunday (Sun day, vibrant). The old English nursery rhyme 'Monday's child' also assigns personality traits to birth days."
        }
      },
      {
        "@type": "Question",
        "name": "How many Saturdays have I lived through?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "To find how many Saturdays (or any weekday) you've lived through, divide your total days alive by 7. A 30-year-old has lived through approximately 1,565 of each weekday — every Monday, Tuesday, Wednesday, etc. Use our calculator to see your exact count."
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
        "name": "What Day of the Week Was I Born?",
        "item": "https://getlifestats.com/what-day-was-i-born"
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
            What Day of the Week Was I Born?
          </h1>
          <p className="text-xl text-emerald-200 mb-8 leading-relaxed">
            Most people know their birthday but not the day of the week they arrived. Were you born on a Monday, a Friday, a Sunday? It&apos;s a small fact that somehow feels meaningful once you know it.
          </p>

          {/* Interactive Calculator */}
          <DayBornCalculator />

          {/* SEO Content */}
          <div className="mt-12 bg-white/10 backdrop-blur-sm rounded-2xl p-8 space-y-4">
            <h2 className="text-2xl font-semibold">The Lore of Birth Days</h2>
            <p className="text-emerald-200 leading-relaxed">
              The old English nursery rhyme &quot;Monday&apos;s Child&quot; has been around since at least the 1830s, assigning personality traits to each birth day. While not science, it&apos;s a charming piece of folk wisdom that billions of people still recite:
            </p>
            <div className="bg-emerald-500/20 border border-emerald-400/30 rounded-xl p-5">
              <h3 className="text-lg font-semibold mb-3">Monday&apos;s Child (Traditional Rhyme)</h3>
              <ul className="space-y-1 text-emerald-200 text-sm">
                <li>🌙 <strong>Monday&apos;s child</strong> is fair of face</li>
                <li>🔥 <strong>Tuesday&apos;s child</strong> is full of grace</li>
                <li>💫 <strong>Wednesday&apos;s child</strong> is full of woe</li>
                <li>⚡ <strong>Thursday&apos;s child</strong> has far to go</li>
                <li>❤️ <strong>Friday&apos;s child</strong> is loving and giving</li>
                <li>🌟 <strong>Saturday&apos;s child</strong> works hard for a living</li>
                <li>☀️ <strong>Sunday&apos;s child</strong> is bonny and blithe and good</li>
              </ul>
            </div>
            <p className="text-emerald-200 leading-relaxed">
              Beyond folk tradition, each weekday is named after a celestial body or Norse god — Monday (Moon), Tuesday (Tyr), Wednesday (Woden/Mercury), Thursday (Thor/Jupiter), Friday (Frigg/Venus), Saturday (Saturn), Sunday (Sun).
            </p>
          </div>

          {/* FAQ */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">❓ Frequently Asked Questions</h2>
            <div className="space-y-4">
              <details className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                <summary className="font-semibold text-emerald-200 cursor-pointer">
                  What day of the week was I born on?
                </summary>
                <p className="mt-3 text-emerald-300 text-sm">
                  Enter your birthdate in the calculator above to instantly find out! It will show you the exact day of the week, fun facts about it, and how many of that day you&apos;ve lived through.
                </p>
              </details>

              <details className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                <summary className="font-semibold text-emerald-200 cursor-pointer">
                  Is it rare to be born on a specific day of the week?
                </summary>
                <p className="mt-3 text-emerald-300 text-sm">
                  Statistically, births are slightly less common on weekends (many planned inductions and C-sections happen on weekdays). But every day of the week sees plenty of births — none is truly rare.
                </p>
              </details>

              <details className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                <summary className="font-semibold text-emerald-200 cursor-pointer">
                  How many Fridays have I lived through?
                </summary>
                <p className="mt-3 text-emerald-300 text-sm">
                  Divide your total days alive by 7. A 30-year-old has lived approximately 1,565 of each weekday — so about 1,565 Fridays. The calculator shows your exact count for your birth day.
                </p>
              </details>

              <details className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                <summary className="font-semibold text-emerald-200 cursor-pointer">
                  What does it mean to be born on each day?
                </summary>
                <p className="mt-3 text-emerald-300 text-sm">
                  Each day has planetary associations: Monday (Moon — intuition), Tuesday (Mars — energy), Wednesday (Mercury — communication), Thursday (Jupiter — luck/expansion), Friday (Venus — beauty/love), Saturday (Saturn — discipline), Sunday (Sun — vitality). The calculator shows your day&apos;s fun facts!
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
              <Link href="/how-many-hours-old" className="text-emerald-300 hover:underline">
                → How Many Hours Old Am I?
              </Link>
              <Link href="/what-generation-am-i" className="text-emerald-300 hover:underline">
                → What Generation Am I?
              </Link>
              <Link href="/days-until-birthday" className="text-emerald-300 hover:underline">
                → Days Until My Birthday
              </Link>
              <Link href="/how-many-minutes-old" className="text-emerald-300 hover:underline">
                → How Many Minutes Old Am I?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
