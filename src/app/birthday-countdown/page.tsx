import { Metadata } from 'next';
import Link from 'next/link';
import BirthdayCountdownCalculator from './BirthdayCountdownCalculator';

export const metadata: Metadata = {
  title: "Birthday Countdown — How Many Days Until My Birthday? | LifeStats",
  description: "FREE birthday countdown timer — See exactly how many days, hours, minutes, and seconds until your next birthday. Real-time countdown with zodiac and generation info.",
  keywords: [
    "how many days until my birthday",
    "birthday countdown",
    "days until birthday",
    "birthday countdown timer",
    "how long until my birthday",
    "how many hours until my birthday",
    "next birthday countdown",
    "birthday timer",
  ],
  alternates: {
    canonical: "/birthday-countdown",
  },
};

export default function BirthdayCountdownPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How many days until my birthday?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Enter your birthdate above to see a real-time countdown showing exactly how many days, hours, minutes, and seconds remain until your next birthday."
        }
      },
      {
        "@type": "Question",
        "name": "What if my birthday is today?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "If today is your birthday, the countdown will show 0 days remaining and display a special birthday greeting. Happy birthday!"
        }
      },
      {
        "@type": "Question",
        "name": "How is the birthday countdown calculated?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The countdown calculates the exact date of your next birthday (in the current or next year) and subtracts the current timestamp to show days, hours, minutes, and seconds remaining."
        }
      },
      {
        "@type": "Question",
        "name": "What generation am I based on my birth year?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Generations are defined by birth year ranges: Gen Z (1997–2012), Millennials (1981–1996), Gen X (1965–1980), Baby Boomers (1946–1964), and Silent Generation (1928–1945)."
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
        "name": "Birthday Countdown",
        "item": "https://getlifestats.com/birthday-countdown"
      }
    ]
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Birthday Countdown Calculator",
    "url": "https://www.getlifestats.com/birthday-countdown",
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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-8">
        <div className="max-w-3xl mx-auto">
          <Link href="/age-calculator" className="text-purple-300 hover:text-purple-200 mb-6 inline-block">
            ← Back to Age Calculator
          </Link>

          <h1 className="text-5xl font-bold mb-4">
            🎂 Birthday Countdown
          </h1>
          <p className="text-xl text-purple-200 mb-8 leading-relaxed">
            How many days until your next birthday? Enter your birthdate for a real-time countdown — down to the second.
          </p>

          <BirthdayCountdownCalculator />

          {/* SEO Content */}
          <div className="mt-12 bg-white/10 backdrop-blur-sm rounded-2xl p-8 space-y-4">
            <h2 className="text-2xl font-semibold">Why Track Your Birthday Countdown?</h2>
            <p className="text-purple-200 leading-relaxed">
              Your birthday is more than a date — it&apos;s a personal new year. Knowing exactly how many days
              remain helps you plan celebrations, surprise parties, or simply build anticipation for the big day.
            </p>
            <p className="text-purple-200 leading-relaxed">
              Our real-time countdown updates every second so you always know precisely how much time is left.
              Whether it&apos;s 364 days or just 3 hours, we&apos;ve got the exact count.
            </p>
          </div>

          {/* FAQ */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">❓ Frequently Asked Questions</h2>
            <div className="space-y-4">
              <details className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                <summary className="font-semibold text-purple-200 cursor-pointer">
                  How many days until my birthday?
                </summary>
                <p className="mt-3 text-purple-300 text-sm">
                  Enter your birthdate above to get an exact real-time countdown showing days, hours, minutes, and seconds.
                </p>
              </details>

              <details className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                <summary className="font-semibold text-purple-200 cursor-pointer">
                  What if my birthday is today?
                </summary>
                <p className="mt-3 text-purple-300 text-sm">
                  If today is your birthday, you&apos;ll see 0 days remaining and a special birthday greeting! 🎉
                </p>
              </details>

              <details className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                <summary className="font-semibold text-purple-200 cursor-pointer">
                  How is the countdown calculated?
                </summary>
                <p className="mt-3 text-purple-300 text-sm">
                  We find your next birthday date (this year or next year if it&apos;s already passed), then
                  calculate the exact milliseconds between now and then — converted to days, hours, minutes, and seconds.
                </p>
              </details>

              <details className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                <summary className="font-semibold text-purple-200 cursor-pointer">
                  Can I share my birthday countdown?
                </summary>
                <p className="mt-3 text-purple-300 text-sm">
                  Yes! Use the share button to copy the countdown link or share directly to your favorite platform.
                </p>
              </details>
            </div>
          </div>

          {/* Related */}
          <div className="mt-8 bg-purple-500/20 border border-purple-400/30 rounded-2xl p-6">
            <h2 className="text-2xl font-semibold mb-3">🔗 Related Calculators</h2>
            <div className="grid md:grid-cols-2 gap-3">
              <Link href="/age-calculator" className="text-purple-300 hover:underline">
                → Full Age Calculator
              </Link>
              <Link href="/what-zodiac-sign-am-i" className="text-purple-300 hover:underline">
                → What Zodiac Sign Am I?
              </Link>
              <Link href="/what-generation-am-i" className="text-purple-300 hover:underline">
                → What Generation Am I?
              </Link>
              <Link href="/how-many-days-old" className="text-purple-300 hover:underline">
                → How Many Days Old Am I?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
