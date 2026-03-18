import { Metadata } from 'next';
import Link from 'next/link';
import ZodiacCalculator from './ZodiacCalculator';

export const metadata: Metadata = {
  title: "What Zodiac Sign Am I? | Western & Chinese Astrology 2026",
  description: "FREE zodiac calculator — Enter your birthday to find your Western zodiac sign, element, personality traits, and Chinese zodiac animal. Instant results, no signup required.",
  keywords: [
    "what zodiac sign am I",
    "what is my zodiac sign",
    "zodiac sign calculator",
    "astrology sign by birthday",
    "Chinese zodiac sign",
    "my star sign",
    "zodiac sign birthday",
    "what's my sign",
  ],
  alternates: {
    canonical: "/what-zodiac-sign-am-i",
  },
};

export default function WhatZodiacSignAmI() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do I find my zodiac sign?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Your Western zodiac sign is determined by your birth date's position in the 12-month solar calendar. Each sign covers roughly 30 days. For example, born March 21–April 19 makes you an Aries. Enter your birthday above to find yours instantly."
        }
      },
      {
        "@type": "Question",
        "name": "What are the 12 zodiac signs?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The 12 Western zodiac signs are: Aries (Mar 21–Apr 19), Taurus (Apr 20–May 20), Gemini (May 21–Jun 20), Cancer (Jun 21–Jul 22), Leo (Jul 23–Aug 22), Virgo (Aug 23–Sep 22), Libra (Sep 23–Oct 22), Scorpio (Oct 23–Nov 21), Sagittarius (Nov 22–Dec 21), Capricorn (Dec 22–Jan 19), Aquarius (Jan 20–Feb 18), Pisces (Feb 19–Mar 20)."
        }
      },
      {
        "@type": "Question",
        "name": "What is the Chinese zodiac and how is it different?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The Chinese zodiac is a 12-year cycle where each year is represented by an animal: Rat, Ox, Tiger, Rabbit, Dragon, Snake, Horse, Goat, Monkey, Rooster, Dog, and Pig. Unlike Western astrology which is based on birth month, Chinese zodiac is based on birth year."
        }
      },
      {
        "@type": "Question",
        "name": "What are the four elements in astrology?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Western astrology groups signs into four elements: Fire (Aries, Leo, Sagittarius) — passionate and dynamic; Earth (Taurus, Virgo, Capricorn) — practical and grounded; Air (Gemini, Libra, Aquarius) — intellectual and social; Water (Cancer, Scorpio, Pisces) — intuitive and emotional."
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
        "name": "What Zodiac Sign Am I?",
        "item": "https://getlifestats.com/what-zodiac-sign-am-i"
      }
    ]
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "What Zodiac Sign Am I? Calculator",
    "url": "https://www.getlifestats.com/what-zodiac-sign-am-i",
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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 text-white p-8">
        <div className="max-w-3xl mx-auto">
          <Link href="/" className="text-indigo-300 hover:text-indigo-200 mb-6 inline-block">
            ← Back to LifeStats
          </Link>

          <h1 className="text-5xl font-bold mb-4">
            What Zodiac Sign Am I?
          </h1>
          <p className="text-xl text-indigo-200 mb-8 leading-relaxed">
            Enter your birthday to discover your Western zodiac sign, element, personality traits — and your Chinese zodiac animal for good measure.
          </p>

          {/* Interactive Calculator */}
          <ZodiacCalculator />

          {/* SEO Content */}
          <div className="mt-12 bg-white/10 backdrop-blur-sm rounded-2xl p-8 space-y-4">
            <h2 className="text-2xl font-semibold">Western vs Chinese Zodiac</h2>
            <p className="text-indigo-200 leading-relaxed">
              Western astrology divides the year into 12 signs based on the Sun&apos;s position at birth. 
              Each sign runs roughly 30 days and is tied to one of four elements: Fire, Earth, Air, or Water.
            </p>
            <p className="text-indigo-200 leading-relaxed">
              Chinese astrology works differently — it&apos;s a 12-year cycle, each year ruled by an animal. 
              Your Chinese zodiac is determined by your birth year, not your birth month. Both systems 
              have been used for thousands of years to describe personality and predict fortune.
            </p>
            <div className="bg-indigo-500/20 border border-indigo-400/30 rounded-xl p-5">
              <h3 className="text-lg font-semibold mb-3">The Four Elements</h3>
              <ul className="space-y-2 text-indigo-200 text-sm">
                <li>🔥 <strong>Fire</strong> — Aries, Leo, Sagittarius: Passionate, dynamic, bold</li>
                <li>🌍 <strong>Earth</strong> — Taurus, Virgo, Capricorn: Practical, grounded, reliable</li>
                <li>💨 <strong>Air</strong> — Gemini, Libra, Aquarius: Intellectual, social, curious</li>
                <li>🌊 <strong>Water</strong> — Cancer, Scorpio, Pisces: Intuitive, emotional, empathetic</li>
              </ul>
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">❓ Frequently Asked Questions</h2>
            <div className="space-y-4">
              <details className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                <summary className="font-semibold text-indigo-200 cursor-pointer">
                  How do I find my zodiac sign?
                </summary>
                <p className="mt-3 text-indigo-300 text-sm">
                  Your sign is based on your birth month and day. Enter your birthday above — 
                  we&apos;ll calculate it instantly.
                </p>
              </details>

              <details className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                <summary className="font-semibold text-indigo-200 cursor-pointer">
                  What are the 12 zodiac signs?
                </summary>
                <p className="mt-3 text-indigo-300 text-sm">
                  Aries, Taurus, Gemini, Cancer, Leo, Virgo, Libra, Scorpio, Sagittarius, 
                  Capricorn, Aquarius, Pisces — each covering roughly 30 days of the year.
                </p>
              </details>

              <details className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                <summary className="font-semibold text-indigo-200 cursor-pointer">
                  What is the Chinese zodiac?
                </summary>
                <p className="mt-3 text-indigo-300 text-sm">
                  A 12-year cycle where each year is an animal. Based on birth year, not month. 
                  The 12 animals: Rat, Ox, Tiger, Rabbit, Dragon, Snake, Horse, Goat, Monkey, 
                  Rooster, Dog, Pig.
                </p>
              </details>

              <details className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                <summary className="font-semibold text-indigo-200 cursor-pointer">
                  What are the four astrological elements?
                </summary>
                <p className="mt-3 text-indigo-300 text-sm">
                  Fire (Aries, Leo, Sagittarius), Earth (Taurus, Virgo, Capricorn), 
                  Air (Gemini, Libra, Aquarius), Water (Cancer, Scorpio, Pisces).
                </p>
              </details>
            </div>
          </div>

          {/* Related */}
          <div className="mt-8 bg-indigo-500/20 border border-indigo-400/30 rounded-2xl p-6">
            <h2 className="text-2xl font-semibold mb-3">🔗 Related Calculators</h2>
            <div className="grid md:grid-cols-2 gap-3">
              <Link href="/what-generation-am-i" className="text-indigo-300 hover:underline">
                → What Generation Am I?
              </Link>
              <Link href="/what-day-was-i-born" className="text-indigo-300 hover:underline">
                → What Day Was I Born?
              </Link>
              <Link href="/age-calculator" className="text-indigo-300 hover:underline">
                → Full Age Calculator
              </Link>
              <Link href="/how-many-days-old" className="text-indigo-300 hover:underline">
                → How Many Days Old Am I?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
