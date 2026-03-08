import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "How Many Breaths Have I Taken? | LifeStats Calculator",
  description: "FREE 2026 breath counter — Calculate the total breaths you've taken since birth. Enter your birthday for instant results. No signup required.",
  keywords: ["how many breaths have I taken", "breath calculator", "total breaths since birth", "breathing statistics"],
  alternates: {
    canonical: "/how-many-breaths",
  },
};

export default function HowManyBreaths() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How many breaths does a person take in a lifetime?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The average person takes about 500 to 700 million breaths over a typical 80-year lifetime. At 15 breaths per minute, that's roughly 20,000 breaths per day, 7.3 million per year, and around 600 million total."
        }
      },
      {
        "@type": "Question",
        "name": "What is a normal breathing rate for adults?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A normal breathing rate for healthy adults at rest is 12 to 20 breaths per minute. Newborns breathe 30-60 times per minute. Athletes may breathe more slowly at rest due to greater lung efficiency, around 10-12 breaths per minute."
        }
      },
      {
        "@type": "Question",
        "name": "How does the breath calculator determine my total?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "LifeStats uses your exact birthdate and calculates total seconds alive, then multiplies by the average breathing rate (15 breaths per minute). This gives you personalized counts of total breaths, breaths per day, per year, and your projected lifetime total."
        }
      },
      {
        "@type": "Question",
        "name": "Is the breath count calculator free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, completely free in 2026. No account, no email, no signup required. Enter your birthday and see instant results."
        }
      },
      {
        "@type": "Question",
        "name": "How much air do I breathe in a day?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The average adult moves about 11,000 liters (about 2,900 gallons) of air through their lungs per day. Each breath cycles roughly 500ml (0.5 liters). At 20,000 breaths per day, that's 10,000 liters — enough to fill about 10 large hot tubs."
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
        "name": "How Many Breaths Have I Taken?",
        "item": "https://getlifestats.com/how-many-breaths"
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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white p-8">
        <div className="max-w-3xl mx-auto">
          <Link href="/" className="text-blue-300 hover:text-blue-200 mb-6 inline-block">
            ← Back to LifeStats
          </Link>
          
          <h1 className="text-5xl font-bold mb-6">
            How Many Breaths Have I Taken?
          </h1>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8">
            <p className="text-xl text-blue-100 leading-relaxed mb-4">
              Breathing is so automatic we rarely think about it. But every breath you take is a small miracle — 
              delivering life-sustaining oxygen to every cell in your body.
            </p>
            
            <p className="text-lg text-blue-200 leading-relaxed mb-4">
              The average person takes about <strong>20,000 breaths per day</strong>. Over a lifetime, that adds up to 
              hundreds of millions of breaths.
            </p>
            
            <div className="bg-blue-500/20 border border-blue-400/30 rounded-xl p-6 my-6">
              <h2 className="text-2xl font-semibold mb-3">Breathing by the Numbers:</h2>
              <ul className="space-y-2 text-blue-100">
                <li>💨 Average adult: <strong>12-20 breaths per minute</strong></li>
                <li>💨 About <strong>20,000 breaths per day</strong></li>
                <li>💨 That's <strong>7.3 million breaths per year</strong></li>
                <li>💨 Each breath cycles <strong>~500ml of air</strong></li>
                <li>💨 Newborns breathe 30-60 times per minute</li>
              </ul>
            </div>
            
            <p className="text-lg text-blue-200 leading-relaxed">
              Want to know your exact breath count? Use the <strong>LifeStats calculator</strong> below to discover 
              how many breaths you've taken — plus 50+ other mind-blowing statistics about your existence.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">❓ Frequently Asked Questions</h2>
            <div className="space-y-4">
              <details className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                <summary className="font-semibold text-blue-200 cursor-pointer">
                  How many breaths does a person take in a lifetime?
                </summary>
                <p className="mt-3 text-blue-300 text-sm">
                  The average person takes about 500 to 700 million breaths over a typical 80-year lifetime. 
                  At 15 breaths per minute, that's roughly 20,000 breaths per day, 7.3 million per year, and 
                  around 600 million total.
                </p>
              </details>
              
              <details className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                <summary className="font-semibold text-blue-200 cursor-pointer">
                  What is a normal breathing rate for adults?
                </summary>
                <p className="mt-3 text-blue-300 text-sm">
                  A normal breathing rate for healthy adults at rest is 12 to 20 breaths per minute. Newborns 
                  breathe 30-60 times per minute. Athletes may breathe more slowly at rest due to greater lung 
                  efficiency, around 10-12 breaths per minute.
                </p>
              </details>
              
              <details className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                <summary className="font-semibold text-blue-200 cursor-pointer">
                  How does the breath calculator determine my total?
                </summary>
                <p className="mt-3 text-blue-300 text-sm">
                  LifeStats uses your exact birthdate and calculates total seconds alive, then multiplies by the 
                  average breathing rate (15 breaths per minute). This gives you personalized counts of total breaths, 
                  breaths per day, per year, and your projected lifetime total.
                </p>
              </details>
              
              <details className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                <summary className="font-semibold text-blue-200 cursor-pointer">
                  Is the breath count calculator free?
                </summary>
                <p className="mt-3 text-blue-300 text-sm">
                  Yes, completely free in 2026. No account, no email, no signup required. Enter your birthday 
                  and see instant results.
                </p>
              </details>

              <details className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                <summary className="font-semibold text-blue-200 cursor-pointer">
                  How much air do I breathe in a day?
                </summary>
                <p className="mt-3 text-blue-300 text-sm">
                  The average adult moves about 11,000 liters (about 2,900 gallons) of air through their lungs per day. 
                  Each breath cycles roughly 500ml (0.5 liters). At 20,000 breaths per day, that's 10,000 liters — 
                  enough to fill about 10 large hot tubs.
                </p>
              </details>
            </div>
          </div>

          <div className="bg-blue-500/20 border border-blue-400/30 rounded-2xl p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-3">🔗 Related Calculators</h2>
            <div className="grid md:grid-cols-2 gap-3">
              <Link href="/how-many-heartbeats" className="text-blue-300 hover:underline">
                → How Many Heartbeats Have I Had?
              </Link>
              <Link href="/how-old-am-i-in-seconds" className="text-blue-300 hover:underline">
                → How Old Am I in Seconds?
              </Link>
              <Link href="/birthday-statistics" className="text-blue-300 hover:underline">
                → Birthday Statistics Calculator
              </Link>
              <Link href="/life-in-numbers" className="text-blue-300 hover:underline">
                → Your Life in Numbers
              </Link>
              <Link href="/life-expectancy-calculator" className="text-blue-300 hover:underline">
                → Life Expectancy Calculator
              </Link>
              <Link href="/days-until-birthday" className="text-blue-300 hover:underline">
                → Days Until My Birthday
              </Link>
            </div>
          </div>
          
          <Link 
            href="/#calculator" 
            className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-xl text-xl font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg inline-block"
          >
            Calculate My Breaths →
          </Link>
        </div>
      </div>
    </>
  );
}
