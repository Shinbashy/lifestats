import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Birthday Statistics Calculator | Your Life in Numbers from Birth Date",
  description: "FREE 2026 birthday statistics calculator — Enter your birthday for 50+ stats: heartbeats, breaths, full moons, miles through space. No signup required.",
  keywords: ["birthday statistics", "birthday calculator", "life stats from birthday", "birth date statistics", "personalized birthday facts"],
  alternates: {
    canonical: "/birthday-statistics",
  },
};

export default function BirthdayStatistics() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What birthday statistics can I calculate from my birth date?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "From your birthday, you can calculate: total seconds, minutes, hours, and days alive; heartbeats since birth; breaths taken; full moons witnessed; miles traveled through space on Earth's orbit; achievement badges (Billion Seconds Club, 10,000 Days Club); future milestone dates; and 40+ more personalized statistics."
        }
      },
      {
        "@type": "Question",
        "name": "How many full moons have I seen since I was born?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "There is a full moon roughly every 29.5 days (a lunar month). To estimate full moons witnessed, divide your age in days by 29.5. For example, a 30-year-old has seen about 371 full moons. LifeStats calculates this precisely based on your exact birthdate."
        }
      },
      {
        "@type": "Question",
        "name": "How far have I traveled through space since birth?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Earth travels around the sun at about 67,000 miles per hour (107,000 km/h). In one year, Earth travels about 584 million miles. Multiply your age by this figure to get your total cosmic journey. A 30-year-old has traveled roughly 17.5 billion miles through space!"
        }
      },
      {
        "@type": "Question",
        "name": "Is the birthday statistics calculator free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, completely FREE in 2026. No signup, no email, no account needed. Enter your birthday and instantly get 50+ personalized statistics."
        }
      },
      {
        "@type": "Question",
        "name": "What is the Billion Seconds Club?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The Billion Seconds Club is a milestone you reach when you've been alive for 1,000,000,000 seconds — which happens at approximately 31 years and 8 months old. LifeStats shows your exact Billion Seconds birthday so you can celebrate this rare cosmic achievement!"
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
        "name": "Birthday Statistics Calculator",
        "item": "https://getlifestats.com/birthday-statistics"
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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-pink-900 to-slate-900 text-white p-8">
        <div className="max-w-3xl mx-auto">
          <Link href="/" className="text-pink-300 hover:text-pink-200 mb-6 inline-block">
            ← Back to LifeStats
          </Link>
          
          <h1 className="text-5xl font-bold mb-6">
            Birthday Statistics Calculator
          </h1>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8">
            <p className="text-xl text-pink-100 leading-relaxed mb-4">
              Your birthday isn't just a date — it's the starting point of an incredible journey. Every moment since then 
              has added up to a life full of measurable milestones.
            </p>
            
            <p className="text-lg text-pink-200 leading-relaxed mb-4">
              What if you could see your entire existence quantified? From heartbeats to cosmic miles, from sunrises witnessed 
              to full moons seen — your birthday unlocks a universe of fascinating statistics.
            </p>
            
            <div className="bg-pink-500/20 border border-pink-400/30 rounded-xl p-6 my-6">
              <h2 className="text-2xl font-semibold mb-3">What You'll Discover:</h2>
              <ul className="space-y-2 text-pink-100">
                <li>🎂 Total seconds, minutes, hours, and days you've been alive</li>
                <li>💓 Exact number of heartbeats since birth</li>
                <li>💨 How many breaths you've taken</li>
                <li>🌕 Full moons you've witnessed</li>
                <li>🌍 Miles you've traveled through space (on Earth's orbit)</li>
                <li>🏆 Achievement badges (Billion Seconds Club, 10,000 Days Club, etc.)</li>
                <li>🎯 Future milestones to look forward to</li>
                <li>✨ ...and 40+ more mind-blowing statistics</li>
              </ul>
            </div>
            
            <p className="text-lg text-pink-200 leading-relaxed">
              All you need is your birthday. The <strong>LifeStats calculator</strong> does the rest — instantly calculating 
              personalized statistics unique to your journey through life.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">❓ Frequently Asked Questions</h2>
            <div className="space-y-4">
              <details className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                <summary className="font-semibold text-pink-200 cursor-pointer">
                  What birthday statistics can I calculate from my birth date?
                </summary>
                <p className="mt-3 text-pink-300 text-sm">
                  From your birthday, you can calculate: total seconds, minutes, hours, and days alive; heartbeats 
                  since birth; breaths taken; full moons witnessed; miles traveled through space on Earth&apos;s orbit; 
                  achievement badges (Billion Seconds Club, 10,000 Days Club); future milestone dates; and 40+ more 
                  personalized statistics.
                </p>
              </details>
              
              <details className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                <summary className="font-semibold text-pink-200 cursor-pointer">
                  How many full moons have I seen since I was born?
                </summary>
                <p className="mt-3 text-pink-300 text-sm">
                  There is a full moon roughly every 29.5 days (a lunar month). To estimate full moons witnessed, 
                  divide your age in days by 29.5. For example, a 30-year-old has seen about 371 full moons. 
                  LifeStats calculates this precisely based on your exact birthdate.
                </p>
              </details>
              
              <details className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                <summary className="font-semibold text-pink-200 cursor-pointer">
                  How far have I traveled through space since birth?
                </summary>
                <p className="mt-3 text-pink-300 text-sm">
                  Earth travels around the sun at about 67,000 miles per hour (107,000 km/h). In one year, Earth 
                  travels about 584 million miles. Multiply your age by this figure to get your total cosmic journey. 
                  A 30-year-old has traveled roughly 17.5 billion miles through space!
                </p>
              </details>
              
              <details className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                <summary className="font-semibold text-pink-200 cursor-pointer">
                  Is the birthday statistics calculator free?
                </summary>
                <p className="mt-3 text-pink-300 text-sm">
                  Yes, completely FREE in 2026. No signup, no email, no account needed. Enter your birthday and 
                  instantly get 50+ personalized statistics.
                </p>
              </details>

              <details className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                <summary className="font-semibold text-pink-200 cursor-pointer">
                  What is the Billion Seconds Club?
                </summary>
                <p className="mt-3 text-pink-300 text-sm">
                  The Billion Seconds Club is a milestone you reach when you&apos;ve been alive for 1,000,000,000 seconds — 
                  which happens at approximately 31 years and 8 months old. LifeStats shows your exact Billion Seconds 
                  birthday so you can celebrate this rare cosmic achievement!
                </p>
              </details>
            </div>
          </div>

          <div className="bg-pink-500/20 border border-pink-400/30 rounded-2xl p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-3">🔗 Related Calculators</h2>
            <div className="grid md:grid-cols-2 gap-3">
              <Link href="/how-many-heartbeats" className="text-pink-300 hover:underline">
                → How Many Heartbeats Have I Had?
              </Link>
              <Link href="/how-many-breaths" className="text-pink-300 hover:underline">
                → How Many Breaths Have I Taken?
              </Link>
              <Link href="/how-old-am-i-in-seconds" className="text-pink-300 hover:underline">
                → How Old Am I in Seconds?
              </Link>
              <Link href="/life-in-numbers" className="text-pink-300 hover:underline">
                → Your Life in Numbers
              </Link>
              <Link href="/life-expectancy-calculator" className="text-pink-300 hover:underline">
                → Life Expectancy Calculator
              </Link>
              <Link href="/days-until-birthday" className="text-pink-300 hover:underline">
                → Days Until My Birthday
              </Link>
            </div>
          </div>
          
          <Link 
            href="/#calculator" 
            className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-4 rounded-xl text-xl font-semibold hover:from-pink-600 hover:to-rose-600 transition-all shadow-lg inline-block"
          >
            Calculate My Birthday Statistics →
          </Link>
        </div>
      </div>
    </>
  );
}
