import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "How Old Am I in Seconds? | Age Calculator in Seconds, Minutes, Hours",
  description: "FREE 2026 age calculator — How old are you in seconds? Enter your birthday to see exactly how many seconds, minutes, and hours you've been alive. No signup required.",
  keywords: ["how old am I in seconds", "age in seconds calculator", "seconds alive", "convert age to seconds", "how many seconds old am I"],
  alternates: {
    canonical: "/how-old-am-i-in-seconds",
  },
};

export default function HowOldInSeconds() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do I calculate how old I am in seconds?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "To calculate your age in seconds: multiply your age in years by 31,536,000 (seconds per year). For a more precise result, use your exact birthdate and calculate total elapsed seconds to today. Our free calculator does this instantly."
        }
      },
      {
        "@type": "Question",
        "name": "How many seconds are in a year?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "There are 31,536,000 seconds in a standard year (365 days × 24 hours × 60 minutes × 60 seconds). In a leap year, there are 31,622,400 seconds (366 days)."
        }
      },
      {
        "@type": "Question",
        "name": "When do I hit 1 billion seconds old?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You reach 1 billion seconds old at approximately 31.69 years of age. This milestone is called the 'Billion Seconds Club.' You can use LifeStats to find your exact Billion Seconds birthday and celebrate this rare cosmic milestone!"
        }
      },
      {
        "@type": "Question",
        "name": "Is the age in seconds calculator free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes — FREE in 2026, no signup or account needed. Just enter your birthday and instantly see your age in seconds, minutes, hours, days, and more."
        }
      },
      {
        "@type": "Question",
        "name": "How old is a 30-year-old in seconds?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A 30-year-old is approximately 946,728,000 seconds old (about 946 million seconds). They're just short of the Billion Seconds Club milestone, which arrives at about 31 years and 8 months."
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
        "name": "How Old Am I in Seconds?",
        "item": "https://getlifestats.com/how-old-am-i-in-seconds"
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
          
          <h1 className="text-5xl font-bold mb-6">
            How Old Am I in Seconds?
          </h1>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8">
            <p className="text-xl text-emerald-100 leading-relaxed mb-4">
              We usually think of age in years — but what if you measured your life in <strong>seconds</strong>?
            </p>
            
            <p className="text-lg text-emerald-200 leading-relaxed mb-4">
              Every second counts. Literally. Since you were born, billions of seconds have passed. 
              Each one a tiny moment in your cosmic journey through space and time.
            </p>
            
            <div className="bg-emerald-500/20 border border-emerald-400/30 rounded-xl p-6 my-6">
              <h2 className="text-2xl font-semibold mb-3">Time Conversion Quick Reference:</h2>
              <ul className="space-y-2 text-emerald-100">
                <li>⏱️ <strong>1 year</strong> = 31,536,000 seconds</li>
                <li>⏱️ <strong>1 million seconds</strong> = 11.5 days</li>
                <li>⏱️ <strong>1 billion seconds</strong> = 31.7 years (The Billion Seconds Club 🏆)</li>
                <li>⏱️ <strong>30 years old</strong> ≈ 946 million seconds</li>
                <li>⏱️ <strong>80 years old</strong> ≈ 2.5 billion seconds</li>
              </ul>
            </div>
            
            <p className="text-lg text-emerald-200 leading-relaxed">
              Ready to see your age in seconds, minutes, hours, and days? Use the <strong>LifeStats calculator</strong> below 
              for instant results — plus 50+ other fascinating ways to measure your life.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">❓ Frequently Asked Questions</h2>
            <div className="space-y-4">
              <details className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                <summary className="font-semibold text-emerald-200 cursor-pointer">
                  How do I calculate how old I am in seconds?
                </summary>
                <p className="mt-3 text-emerald-300 text-sm">
                  To calculate your age in seconds: multiply your age in years by 31,536,000 (seconds per year). 
                  For a more precise result, use your exact birthdate and calculate total elapsed seconds to today. 
                  Our free calculator does this instantly.
                </p>
              </details>
              
              <details className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                <summary className="font-semibold text-emerald-200 cursor-pointer">
                  How many seconds are in a year?
                </summary>
                <p className="mt-3 text-emerald-300 text-sm">
                  There are 31,536,000 seconds in a standard year (365 days × 24 hours × 60 minutes × 60 seconds). 
                  In a leap year, there are 31,622,400 seconds (366 days).
                </p>
              </details>
              
              <details className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                <summary className="font-semibold text-emerald-200 cursor-pointer">
                  When do I hit 1 billion seconds old?
                </summary>
                <p className="mt-3 text-emerald-300 text-sm">
                  You reach 1 billion seconds old at approximately 31.69 years of age. This milestone is called the 
                  &quot;Billion Seconds Club.&quot; You can use LifeStats to find your exact Billion Seconds birthday 
                  and celebrate this rare cosmic milestone!
                </p>
              </details>
              
              <details className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                <summary className="font-semibold text-emerald-200 cursor-pointer">
                  Is the age in seconds calculator free?
                </summary>
                <p className="mt-3 text-emerald-300 text-sm">
                  Yes — FREE in 2026, no signup or account needed. Just enter your birthday and instantly see your 
                  age in seconds, minutes, hours, days, and more.
                </p>
              </details>

              <details className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                <summary className="font-semibold text-emerald-200 cursor-pointer">
                  How old is a 30-year-old in seconds?
                </summary>
                <p className="mt-3 text-emerald-300 text-sm">
                  A 30-year-old is approximately 946,728,000 seconds old (about 946 million seconds). They&apos;re just 
                  short of the Billion Seconds Club milestone, which arrives at about 31 years and 8 months.
                </p>
              </details>
            </div>
          </div>

          <div className="bg-emerald-500/20 border border-emerald-400/30 rounded-2xl p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-3">🔗 Related Calculators</h2>
            <div className="grid md:grid-cols-2 gap-3">
              <Link href="/how-many-heartbeats" className="text-emerald-300 hover:underline">
                → How Many Heartbeats Have I Had?
              </Link>
              <Link href="/how-many-breaths" className="text-emerald-300 hover:underline">
                → How Many Breaths Have I Taken?
              </Link>
              <Link href="/birthday-statistics" className="text-emerald-300 hover:underline">
                → Birthday Statistics Calculator
              </Link>
              <Link href="/life-in-numbers" className="text-emerald-300 hover:underline">
                → Your Life in Numbers
              </Link>
              <Link href="/life-expectancy-calculator" className="text-emerald-300 hover:underline">
                → Life Expectancy Calculator
              </Link>
              <Link href="/days-until-birthday" className="text-emerald-300 hover:underline">
                → Days Until My Birthday
              </Link>
            </div>
          </div>
          
          <Link 
            href="/#calculator" 
            className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-4 rounded-xl text-xl font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all shadow-lg inline-block"
          >
            Calculate My Age in Seconds →
          </Link>
        </div>
      </div>
    </>
  );
}
