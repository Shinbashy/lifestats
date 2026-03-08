import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "How Many Heartbeats Have I Had? | LifeStats Calculator",
  description: "FREE 2026 heartbeat calculator — How many times has your heart beaten since birth? Enter your birthday for instant results. No signup required.",
  keywords: ["how many heartbeats have I had", "heartbeat calculator", "total heartbeats since birth", "how many times has my heart beaten"],
  alternates: {
    canonical: "/how-many-heartbeats",
  },
};

export default function HowManyHeartbeats() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How many times does the human heart beat in a lifetime?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The average human heart beats about 2.5 to 3.5 billion times over a typical 80-year lifespan. At a resting rate of ~72 bpm, that's roughly 100,000 beats per day and 36.5 million beats per year."
        }
      },
      {
        "@type": "Question",
        "name": "What is a normal resting heart rate?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A normal resting heart rate for adults ranges from 60 to 100 beats per minute (bpm). Athletes often have lower resting rates (40-60 bpm) because their hearts are more efficient. Newborns have the highest rates at 120-160 bpm."
        }
      },
      {
        "@type": "Question",
        "name": "How does the LifeStats heartbeat calculator work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The LifeStats calculator takes your exact birthdate and multiplies your age in seconds by the average heart rate (72 bpm). It provides real-time counts of total heartbeats, beats per day, per year, and projected lifetime total."
        }
      },
      {
        "@type": "Question",
        "name": "Is the heartbeat calculator free to use?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, completely free. No signup or email required. Just enter your birthday and get instant, personalized results."
        }
      },
      {
        "@type": "Question",
        "name": "Can the heart beat too many times in a lifetime?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Research suggests mammals have roughly 1 billion heartbeats in a lifetime, adjusted for size. Humans, with longer lifespans due to healthcare, far exceed this. The heart is remarkably resilient — top athletes' hearts can beat 3+ billion times."
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
        "name": "How Many Heartbeats Have I Had?",
        "item": "https://getlifestats.com/how-many-heartbeats"
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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-8">
        <div className="max-w-3xl mx-auto">
          <Link href="/" className="text-purple-300 hover:text-purple-200 mb-6 inline-block">
            ← Back to LifeStats
          </Link>
          
          <h1 className="text-5xl font-bold mb-6">
            How Many Heartbeats Have I Had?
          </h1>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8">
            <p className="text-xl text-purple-100 leading-relaxed mb-4">
              Your heart is the most tireless worker in your body — beating approximately <strong>100,000 times per day</strong>, 
              pumping about 2,000 gallons of blood through 60,000 miles of blood vessels.
            </p>
            
            <p className="text-lg text-purple-200 leading-relaxed mb-4">
              Since the moment you were born, your heart has been keeping perfect time. But have you ever wondered exactly 
              how many times it's beaten?
            </p>
            
            <div className="bg-purple-500/20 border border-purple-400/30 rounded-xl p-6 my-6">
              <h2 className="text-2xl font-semibold mb-3">Quick Facts:</h2>
              <ul className="space-y-2 text-purple-100">
                <li>✨ Your heart beats about <strong>100,000 times per day</strong></li>
                <li>✨ That's roughly <strong>3 billion beats in a lifetime</strong></li>
                <li>✨ Each heartbeat pumps about <strong>2 ounces of blood</strong></li>
                <li>✨ Athletes' hearts can be more efficient (50-60 bpm resting)</li>
              </ul>
            </div>
            
            <p className="text-lg text-purple-200 leading-relaxed">
              Use the <strong>LifeStats calculator</strong> below to discover your exact heartbeat count — 
              plus 50+ other fascinating statistics about your life. It's free, instant, and shareable.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">❓ Frequently Asked Questions</h2>
            <div className="space-y-4">
              <details className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                <summary className="font-semibold text-purple-200 cursor-pointer">
                  How many times does the human heart beat in a lifetime?
                </summary>
                <p className="mt-3 text-purple-300 text-sm">
                  The average human heart beats about 2.5 to 3.5 billion times over a typical 80-year lifespan. 
                  At a resting rate of ~72 bpm, that's roughly 100,000 beats per day and 36.5 million beats per year.
                </p>
              </details>
              
              <details className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                <summary className="font-semibold text-purple-200 cursor-pointer">
                  What is a normal resting heart rate?
                </summary>
                <p className="mt-3 text-purple-300 text-sm">
                  A normal resting heart rate for adults ranges from 60 to 100 beats per minute (bpm). Athletes 
                  often have lower resting rates (40-60 bpm) because their hearts are more efficient. Newborns 
                  have the highest rates at 120-160 bpm.
                </p>
              </details>
              
              <details className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                <summary className="font-semibold text-purple-200 cursor-pointer">
                  How does the LifeStats heartbeat calculator work?
                </summary>
                <p className="mt-3 text-purple-300 text-sm">
                  The LifeStats calculator takes your exact birthdate and multiplies your age in seconds by the 
                  average heart rate (72 bpm). It provides real-time counts of total heartbeats, beats per day, 
                  per year, and projected lifetime total.
                </p>
              </details>
              
              <details className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                <summary className="font-semibold text-purple-200 cursor-pointer">
                  Is the heartbeat calculator free to use?
                </summary>
                <p className="mt-3 text-purple-300 text-sm">
                  Yes, completely free. No signup or email required. Just enter your birthday and get instant, 
                  personalized results.
                </p>
              </details>

              <details className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                <summary className="font-semibold text-purple-200 cursor-pointer">
                  Can the heart beat too many times in a lifetime?
                </summary>
                <p className="mt-3 text-purple-300 text-sm">
                  Research suggests mammals have roughly 1 billion heartbeats in a lifetime, adjusted for size. 
                  Humans, with longer lifespans due to healthcare, far exceed this. The heart is remarkably 
                  resilient — top athletes' hearts can beat 3+ billion times.
                </p>
              </details>
            </div>
          </div>

          <div className="bg-purple-500/20 border border-purple-400/30 rounded-2xl p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-3">🔗 Related Calculators</h2>
            <div className="grid md:grid-cols-2 gap-3">
              <Link href="/how-many-breaths" className="text-purple-300 hover:underline">
                → How Many Breaths Have I Taken?
              </Link>
              <Link href="/how-old-am-i-in-seconds" className="text-purple-300 hover:underline">
                → How Old Am I in Seconds?
              </Link>
              <Link href="/birthday-statistics" className="text-purple-300 hover:underline">
                → Birthday Statistics Calculator
              </Link>
              <Link href="/life-in-numbers" className="text-purple-300 hover:underline">
                → Your Life in Numbers
              </Link>
              <Link href="/life-expectancy-calculator" className="text-purple-300 hover:underline">
                → Life Expectancy Calculator
              </Link>
              <Link href="/days-until-birthday" className="text-purple-300 hover:underline">
                → Days Until My Birthday
              </Link>
            </div>
          </div>
          
          <Link 
            href="/#calculator" 
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-xl text-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg inline-block"
          >
            Calculate My Heartbeats →
          </Link>
        </div>
      </div>
    </>
  );
}
