import { Metadata } from 'next';
import Link from 'next/link';
import LifePathCalculator from './LifePathCalculator';

export const metadata: Metadata = {
  title: "Life Path Number Calculator — Numerology by Birthdate | LifeStats",
  description: "FREE life path number calculator — Discover your numerology life path number (1–9 or master numbers 11, 22, 33) from your birthdate. Includes personality traits and descriptions for every number.",
  keywords: [
    "life path number calculator",
    "what is my life path number",
    "numerology life path",
    "numerology calculator birthday",
    "life path number meaning",
    "numerology number by birthdate",
    "master number 11 22 33",
    "life path number 1",
    "life path number 7",
    "numerology",
  ],
  alternates: {
    canonical: "/life-path-number",
  },
};

export default function LifePathNumberPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is a life path number?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A life path number is a core numerology concept calculated from your full birthdate (month + day + year). The digits are summed and reduced to a single digit (1–9) or a master number (11, 22, or 33). It is said to reveal your core purpose, personality, and life journey."
        }
      },
      {
        "@type": "Question",
        "name": "How is a life path number calculated?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Add up all the digits in your birthdate. For example, March 15, 1990 = 0+3+1+5+1+9+9+0 = 28, then 2+8 = 10, then 1+0 = 1. Master numbers (11, 22, 33) are NOT reduced further. Keep reducing until you hit a single digit or a master number."
        }
      },
      {
        "@type": "Question",
        "name": "What are the master numbers in numerology?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Master numbers are 11, 22, and 33. They carry amplified energy compared to their single-digit counterparts (2, 4, and 6). People with master numbers are said to have a higher spiritual calling and face more intense life lessons."
        }
      },
      {
        "@type": "Question",
        "name": "Which life path number is the most powerful?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Master number 33 is considered the rarest and most spiritually powerful, known as the Master Teacher. Master numbers 11 and 22 are also highly potent. Among single digits, 1 and 8 are considered especially powerful for leadership and material success."
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
        "name": "Life Path Number Calculator",
        "item": "https://getlifestats.com/life-path-number"
      }
    ]
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Life Path Number Calculator",
    "url": "https://www.getlifestats.com/life-path-number",
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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-violet-900 to-slate-900 text-white p-8">
        <div className="max-w-3xl mx-auto">
          <Link href="/age-calculator" className="text-violet-300 hover:text-violet-200 mb-6 inline-block">
            ← Back to Age Calculator
          </Link>

          <h1 className="text-5xl font-bold mb-4">
            🔢 Life Path Number
          </h1>
          <p className="text-xl text-violet-200 mb-8 leading-relaxed">
            Discover your numerology life path number from your birthdate — and what it reveals about your personality, purpose, and life journey.
          </p>

          <LifePathCalculator />

          {/* SEO Content */}
          <div className="mt-12 bg-white/10 backdrop-blur-sm rounded-2xl p-8 space-y-4">
            <h2 className="text-2xl font-semibold">What Is Numerology?</h2>
            <p className="text-violet-200 leading-relaxed">
              Numerology is the study of numbers and their significance in human life. Rooted in ancient traditions
              from Pythagoras to Kabbalah, numerology holds that numbers carry vibrational energy that influences
              personality, relationships, and life events.
            </p>
            <p className="text-violet-200 leading-relaxed">
              Your life path number is the most important number in numerology — the equivalent of a sun sign in
              Western astrology. It is derived from your full birth date and reveals your core character and the
              overarching theme of your life&apos;s journey.
            </p>
            <div className="bg-violet-500/20 border border-violet-400/30 rounded-xl p-5">
              <h3 className="text-lg font-semibold mb-3">How to Calculate Your Life Path Number</h3>
              <ol className="space-y-2 text-violet-200 text-sm list-decimal list-inside">
                <li>Write out your full birthdate as digits (MM/DD/YYYY)</li>
                <li>Add all the digits together</li>
                <li>If the sum is 11, 22, or 33 — stop. That&apos;s a master number</li>
                <li>Otherwise, keep adding the digits until you reach a single number (1–9)</li>
              </ol>
              <p className="text-violet-300 text-sm mt-3">
                Example: April 23, 1985 → 0+4+2+3+1+9+8+5 = 32 → 3+2 = <strong className="text-white">5</strong>
              </p>
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">❓ Frequently Asked Questions</h2>
            <div className="space-y-4">
              <details className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                <summary className="font-semibold text-violet-200 cursor-pointer">
                  What is a life path number?
                </summary>
                <p className="mt-3 text-violet-300 text-sm">
                  Your life path number is a single digit (or master number) calculated from your birthdate.
                  It&apos;s considered the most important number in numerology — revealing your core personality and life purpose.
                </p>
              </details>

              <details className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                <summary className="font-semibold text-violet-200 cursor-pointer">
                  What are master numbers?
                </summary>
                <p className="mt-3 text-violet-300 text-sm">
                  Master numbers — 11, 22, and 33 — are not reduced further. They carry amplified spiritual energy.
                  11 is the Intuitive, 22 is the Master Builder, and 33 is the Master Teacher.
                </p>
              </details>

              <details className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                <summary className="font-semibold text-violet-200 cursor-pointer">
                  Which life path numbers are compatible?
                </summary>
                <p className="mt-3 text-violet-300 text-sm">
                  Generally: 1 pairs well with 3, 5; 2 with 4, 8; 3 with 1, 5; 4 with 2, 8;
                  5 with 1, 3, 7; 6 with 2, 9; 7 with 5, 9; 8 with 2, 4; 9 with 6, 3.
                </p>
              </details>

              <details className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                <summary className="font-semibold text-violet-200 cursor-pointer">
                  Can your life path number change?
                </summary>
                <p className="mt-3 text-violet-300 text-sm">
                  No — your life path number is fixed by your birthdate and never changes.
                  It&apos;s considered a permanent blueprint of your core nature.
                </p>
              </details>
            </div>
          </div>

          {/* Related */}
          <div className="mt-8 bg-violet-500/20 border border-violet-400/30 rounded-2xl p-6">
            <h2 className="text-2xl font-semibold mb-3">🔗 Related Calculators</h2>
            <div className="grid md:grid-cols-2 gap-3">
              <Link href="/age-calculator" className="text-violet-300 hover:underline">
                → Full Age Calculator
              </Link>
              <Link href="/what-zodiac-sign-am-i" className="text-violet-300 hover:underline">
                → What Zodiac Sign Am I?
              </Link>
              <Link href="/chinese-zodiac-calculator" className="text-violet-300 hover:underline">
                → Chinese Zodiac Calculator
              </Link>
              <Link href="/what-generation-am-i" className="text-violet-300 hover:underline">
                → What Generation Am I?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
