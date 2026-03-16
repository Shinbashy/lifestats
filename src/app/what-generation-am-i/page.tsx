import { Metadata } from 'next';
import Link from 'next/link';
import GenerationCalculator from './GenerationCalculator';

export const metadata: Metadata = {
  title: "What Generation Am I? | Generation Calculator 2026",
  description: "FREE 2026 generation calculator — What generation are you? Enter your birth year to find out if you're a Boomer, Gen X, Millennial, Gen Z, or Gen Alpha. Includes traits, cultural touchstones, and fun facts. No signup required.",
  keywords: [
    "what generation am I",
    "which generation am I",
    "what generation am I born in",
    "generation calculator",
    "am I a millennial or gen z",
    "boomer gen x millennial gen z",
    "generation by birth year",
  ],
  alternates: {
    canonical: "/what-generation-am-i",
  },
};

export default function WhatGenerationAmI() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What are the birth years for each generation?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The commonly accepted birth year ranges are: Greatest Generation (1901–1927), Silent Generation (1928–1945), Baby Boomers (1946–1964), Generation X (1965–1980), Millennials (1981–1996), Generation Z (1997–2012), and Generation Alpha (2013–2025)."
        }
      },
      {
        "@type": "Question",
        "name": "Am I a Millennial or Gen Z?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The most widely used boundary between Millennials and Gen Z is 1996/1997. If you were born between 1981 and 1996, you're a Millennial. If you were born between 1997 and 2012, you're Gen Z (also called 'Zoomers')."
        }
      },
      {
        "@type": "Question",
        "name": "What is the difference between Gen X and Millennials?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Gen X (born 1965–1980) grew up pre-internet, experienced the fall of the Berlin Wall, and are known for independence and skepticism. Millennials (born 1981–1996) grew up during the rise of the internet, experienced 9/11 as teenagers or young adults, and are known for collaboration and purpose-driven work."
        }
      },
      {
        "@type": "Question",
        "name": "What is Generation Alpha?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Generation Alpha refers to those born from 2013 to approximately 2025. They are the first generation to be born entirely in the 2010s and 2020s. They are AI-native, have grown up with iPads and smart speakers from infancy, and will be the most technologically immersed generation in history."
        }
      },
      {
        "@type": "Question",
        "name": "Why is it called the 'Silent Generation'?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The Silent Generation (1928–1945) was named for their tendency to conform and not make waves in an era of McCarthyism and Cold War conformity. Despite the name, this generation produced icons like Martin Luther King Jr., Elvis Presley, and Bob Dylan who were anything but silent."
        }
      },
      {
        "@type": "Question",
        "name": "What is a 'Zillennial'?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A 'Zillennial' is an informal term for people born on the cusp between Millennials and Gen Z — roughly 1993 to 2000. They remember life before smartphones but adopted them as teenagers, giving them traits of both generations."
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
        "name": "What Generation Am I?",
        "item": "https://getlifestats.com/what-generation-am-i"
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
            What Generation Am I?
          </h1>
          <p className="text-xl text-emerald-200 mb-8 leading-relaxed">
            Enter your birth year to instantly discover your generation — complete with traits, cultural touchstones, and how you fit into the bigger picture.
          </p>

          {/* Interactive Calculator */}
          <GenerationCalculator />

          {/* SEO content */}
          <div className="mt-12 bg-white/10 backdrop-blur-sm rounded-2xl p-8 space-y-6">
            <h2 className="text-2xl font-semibold">The 7 Generations — Explained</h2>
            <p className="text-emerald-200 leading-relaxed">
              Generational theory divides people born in different eras into cohorts shaped by shared historical events, 
              economic conditions, and cultural forces. While the exact cutoff years are debated by researchers, 
              the definitions below are the most widely used.
            </p>
            <p className="text-emerald-200 leading-relaxed">
              Your generation doesn&apos;t define you — but it does reveal the world you grew up in and the forces 
              that shaped your values, habits, and worldview.
            </p>
          </div>

          {/* FAQ */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">❓ Frequently Asked Questions</h2>
            <div className="space-y-4">
              <details className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                <summary className="font-semibold text-emerald-200 cursor-pointer">
                  What are the birth years for each generation?
                </summary>
                <p className="mt-3 text-emerald-300 text-sm">
                  The commonly accepted ranges: Greatest Generation (1901–1927), Silent Generation (1928–1945), 
                  Baby Boomers (1946–1964), Generation X (1965–1980), Millennials (1981–1996), 
                  Generation Z (1997–2012), Generation Alpha (2013–2025).
                </p>
              </details>

              <details className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                <summary className="font-semibold text-emerald-200 cursor-pointer">
                  Am I a Millennial or Gen Z?
                </summary>
                <p className="mt-3 text-emerald-300 text-sm">
                  The most widely used boundary is 1996/1997. Born 1981–1996? You&apos;re a Millennial. 
                  Born 1997–2012? You&apos;re Gen Z. Born 1993–2000 and feel like both? You might be a &quot;Zillennial.&quot;
                </p>
              </details>

              <details className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                <summary className="font-semibold text-emerald-200 cursor-pointer">
                  What is the difference between Gen X and Millennials?
                </summary>
                <p className="mt-3 text-emerald-300 text-sm">
                  Gen X (1965–1980) grew up pre-internet and are known for self-reliance and skepticism. 
                  Millennials (1981–1996) came of age with the internet and are known for collaboration 
                  and purpose-driven careers. The key divide: whether you remember life before the web.
                </p>
              </details>

              <details className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                <summary className="font-semibold text-emerald-200 cursor-pointer">
                  What is Generation Alpha?
                </summary>
                <p className="mt-3 text-emerald-300 text-sm">
                  Generation Alpha (2013–2025) are the first generation born entirely in the 2010s and 2020s. 
                  AI-native, iPad-raised, and expected to be the most technologically immersed generation in history — 
                  and the largest, projected to reach 2 billion worldwide.
                </p>
              </details>

              <details className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                <summary className="font-semibold text-emerald-200 cursor-pointer">
                  Why is it called the &apos;Silent Generation&apos;?
                </summary>
                <p className="mt-3 text-emerald-300 text-sm">
                  Named for their tendency to conform during an era of McCarthyism and Cold War conformity. 
                  Despite the name, this generation produced Martin Luther King Jr., Elvis Presley, and Bob Dylan — 
                  hardly silent.
                </p>
              </details>

              <details className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                <summary className="font-semibold text-emerald-200 cursor-pointer">
                  What is a &apos;Zillennial&apos;?
                </summary>
                <p className="mt-3 text-emerald-300 text-sm">
                  An informal term for the micro-generation born roughly 1993–2000 — on the cusp between 
                  Millennials and Gen Z. They remember dial-up internet and flip phones but grew up with 
                  smartphones as teenagers, blending both generational identities.
                </p>
              </details>
            </div>
          </div>

          {/* Related calculators */}
          <div className="mt-8 bg-emerald-500/20 border border-emerald-400/30 rounded-2xl p-6">
            <h2 className="text-2xl font-semibold mb-3">🔗 Related Calculators</h2>
            <div className="grid md:grid-cols-2 gap-3">
              <Link href="/how-many-days-old" className="text-emerald-300 hover:underline">
                → How Many Days Old Am I?
              </Link>
              <Link href="/how-many-minutes-old" className="text-emerald-300 hover:underline">
                → How Many Minutes Old Am I?
              </Link>
              <Link href="/how-old-am-i-in-seconds" className="text-emerald-300 hover:underline">
                → How Old Am I in Seconds?
              </Link>
              <Link href="/life-expectancy-calculator" className="text-emerald-300 hover:underline">
                → Life Expectancy Calculator
              </Link>
              <Link href="/birthday-statistics" className="text-emerald-300 hover:underline">
                → Birthday Statistics
              </Link>
              <Link href="/life-in-numbers" className="text-emerald-300 hover:underline">
                → Your Life in Numbers
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
