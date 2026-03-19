import { Metadata } from 'next';
import Link from 'next/link';
import ChineseZodiacCalculator from './ChineseZodiacCalculator';

export const metadata: Metadata = {
  title: "Chinese Zodiac Calculator — Find Your Animal, Element & Lucky Numbers | LifeStats",
  description: "FREE Chinese zodiac calculator — Enter your birth year to find your animal sign, element (metal/wood/water/fire/earth), yin/yang, lucky numbers, lucky colors, and compatibility. All 12 animals included.",
  keywords: [
    "chinese zodiac calculator",
    "what is my chinese zodiac",
    "chinese zodiac by year",
    "chinese zodiac animal",
    "chinese zodiac element",
    "lucky numbers chinese zodiac",
    "chinese horoscope",
    "year of the dragon",
    "year of the rabbit",
    "chinese zodiac 2024",
    "chinese astrology",
  ],
  alternates: {
    canonical: "/chinese-zodiac-calculator",
  },
};

export default function ChineseZodiacPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What are the 12 Chinese zodiac animals?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The 12 Chinese zodiac animals in order are: Rat, Ox, Tiger, Rabbit, Dragon, Snake, Horse, Goat, Monkey, Rooster, Dog, and Pig. The cycle repeats every 12 years."
        }
      },
      {
        "@type": "Question",
        "name": "What are the 5 Chinese zodiac elements?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The five elements in Chinese astrology are Wood, Fire, Earth, Metal, and Water. Each element rules a 2-year period, creating a 10-year elemental cycle that combines with the 12-year animal cycle for a 60-year Grand Cycle."
        }
      },
      {
        "@type": "Question",
        "name": "How is the Chinese zodiac different from Western astrology?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Western astrology assigns signs by birth month (covering ~30 days each). Chinese astrology assigns animals by birth year. Chinese zodiac also includes elements, yin/yang polarity, and compatibility calculations based on the 12-year cycle."
        }
      },
      {
        "@type": "Question",
        "name": "Which Chinese zodiac signs are compatible?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Compatible signs form triangles: Rat-Dragon-Monkey (intelligence), Ox-Snake-Rooster (determination), Tiger-Horse-Dog (strength), Rabbit-Goat-Pig (kindness). Signs that are 6 apart (e.g., Rat and Horse) may face more challenges."
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
        "name": "Chinese Zodiac Calculator",
        "item": "https://getlifestats.com/chinese-zodiac-calculator"
      }
    ]
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Chinese Zodiac Calculator",
    "url": "https://www.getlifestats.com/chinese-zodiac-calculator",
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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 text-white p-8">
        <div className="max-w-3xl mx-auto">
          <Link href="/age-calculator" className="text-red-300 hover:text-red-200 mb-6 inline-block">
            ← Back to Age Calculator
          </Link>

          <h1 className="text-5xl font-bold mb-4">
            🐉 Chinese Zodiac Calculator
          </h1>
          <p className="text-xl text-red-200 mb-8 leading-relaxed">
            Enter your birthdate to discover your Chinese zodiac animal, element, yin/yang polarity, lucky numbers, lucky colors, and compatible signs.
          </p>

          <ChineseZodiacCalculator />

          {/* SEO Content */}
          <div className="mt-12 bg-white/10 backdrop-blur-sm rounded-2xl p-8 space-y-4">
            <h2 className="text-2xl font-semibold">Understanding the Chinese Zodiac</h2>
            <p className="text-red-200 leading-relaxed">
              The Chinese zodiac is a 12-year cycle rooted in ancient Chinese astronomy and philosophy.
              Each year is ruled by an animal that is said to influence the personality and fate of those born in that year.
              The system dates back over 2,000 years and remains one of the most widely followed astrological traditions globally.
            </p>
            <p className="text-red-200 leading-relaxed">
              Beyond the 12 animals, Chinese astrology incorporates five elements — Wood, Fire, Earth, Metal, and Water —
              creating a 60-year Grand Cycle. Your element adds depth to your animal sign, distinguishing, for example,
              a Water Tiger from a Fire Tiger.
            </p>
            <div className="bg-red-500/20 border border-red-400/30 rounded-xl p-5">
              <h3 className="text-lg font-semibold mb-3">The Five Elements</h3>
              <ul className="space-y-2 text-red-200 text-sm">
                <li>🌊 <strong>Water</strong> — Wisdom, flexibility, intuition</li>
                <li>🌳 <strong>Wood</strong> — Growth, creativity, compassion</li>
                <li>🔥 <strong>Fire</strong> — Passion, energy, leadership</li>
                <li>🪨 <strong>Earth</strong> — Stability, loyalty, practicality</li>
                <li>⚙️ <strong>Metal</strong> — Strength, determination, ambition</li>
              </ul>
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">❓ Frequently Asked Questions</h2>
            <div className="space-y-4">
              <details className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                <summary className="font-semibold text-red-200 cursor-pointer">
                  What are the 12 Chinese zodiac animals?
                </summary>
                <p className="mt-3 text-red-300 text-sm">
                  Rat, Ox, Tiger, Rabbit, Dragon, Snake, Horse, Goat, Monkey, Rooster, Dog, and Pig — in order.
                  The 12-year cycle repeats continuously.
                </p>
              </details>

              <details className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                <summary className="font-semibold text-red-200 cursor-pointer">
                  What are the 5 elements?
                </summary>
                <p className="mt-3 text-red-300 text-sm">
                  Wood, Fire, Earth, Metal, and Water. Each element rules a 2-year period, combining with
                  the 12-year animal cycle to create a 60-year Grand Cycle. Your element refines your animal sign.
                </p>
              </details>

              <details className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                <summary className="font-semibold text-red-200 cursor-pointer">
                  How does yin/yang work in Chinese zodiac?
                </summary>
                <p className="mt-3 text-red-300 text-sm">
                  Odd-numbered animals in the cycle (Rat, Tiger, Dragon, Horse, Monkey, Dog) are Yang.
                  Even-numbered animals (Ox, Rabbit, Snake, Goat, Rooster, Pig) are Yin.
                  Yang is active/masculine; Yin is receptive/feminine.
                </p>
              </details>

              <details className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                <summary className="font-semibold text-red-200 cursor-pointer">
                  Which signs are most compatible?
                </summary>
                <p className="mt-3 text-red-300 text-sm">
                  Best matches form compatibility triangles: Rat-Dragon-Monkey, Ox-Snake-Rooster,
                  Tiger-Horse-Dog, Rabbit-Goat-Pig. Signs 4 apart (e.g., Rat and Dragon) are also friendly.
                </p>
              </details>
            </div>
          </div>

          {/* Related */}
          <div className="mt-8 bg-red-500/20 border border-red-400/30 rounded-2xl p-6">
            <h2 className="text-2xl font-semibold mb-3">🔗 Related Calculators</h2>
            <div className="grid md:grid-cols-2 gap-3">
              <Link href="/what-zodiac-sign-am-i" className="text-red-300 hover:underline">
                → Western Zodiac Sign
              </Link>
              <Link href="/life-path-number" className="text-red-300 hover:underline">
                → Life Path Number
              </Link>
              <Link href="/what-generation-am-i" className="text-red-300 hover:underline">
                → What Generation Am I?
              </Link>
              <Link href="/age-calculator" className="text-red-300 hover:underline">
                → Full Age Calculator
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
