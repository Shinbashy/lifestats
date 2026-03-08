import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "My Life in Numbers | Personalized Life Statistics Calculator",
  description: "FREE 2026 life statistics calculator — See your life in 50+ numbers: heartbeats, breaths, cosmic journey, milestones, and more. No signup required.",
  keywords: ["life in numbers", "my life statistics", "life calculator", "quantified life", "life metrics dashboard", "personal life stats"],
  alternates: {
    canonical: "/life-in-numbers",
  },
};

export default function LifeInNumbers() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What does 'life in numbers' mean?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Life in numbers means quantifying your existence through measurable statistics: heartbeats, breaths, seconds alive, miles traveled through space, full moons witnessed, and more. LifeStats calculates 50+ personalized metrics from just your birthday."
        }
      },
      {
        "@type": "Question",
        "name": "How many statistics does LifeStats calculate?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "LifeStats calculates over 50 personalized statistics including: time metrics (seconds, minutes, hours, days alive), body stats (heartbeats, breaths, blinks), cosmic journey (miles through space, orbits, full moons), and milestone achievements (Billion Seconds Club, 10,000 Days Club, and more)."
        }
      },
      {
        "@type": "Question",
        "name": "How many times have I blinked in my life?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The average person blinks about 15-20 times per minute, or roughly 10 million times per year. A 30-year-old has blinked approximately 300 million times. LifeStats calculates your exact blink count based on your birthdate."
        }
      },
      {
        "@type": "Question",
        "name": "Is the life in numbers calculator free to use?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, 100% FREE in 2026. No signup, no email, no subscription. Just enter your birthday and get a complete dashboard of your life in numbers — instantly."
        }
      },
      {
        "@type": "Question",
        "name": "Can I share my life stats with friends?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! LifeStats lets you share your personalized stat card on social media. Show your friends how many heartbeats you've had, how far you've traveled through space, and what exclusive clubs you've joined (like the Billion Seconds Club)."
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
        "name": "My Life in Numbers",
        "item": "https://getlifestats.com/life-in-numbers"
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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 text-white p-8">
        <div className="max-w-3xl mx-auto">
          <Link href="/" className="text-indigo-300 hover:text-indigo-200 mb-6 inline-block">
            ← Back to LifeStats
          </Link>
          
          <h1 className="text-5xl font-bold mb-6">
            My Life in Numbers
          </h1>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8">
            <p className="text-xl text-indigo-100 leading-relaxed mb-4">
              Every life is a story — and every story can be told in numbers.
            </p>
            
            <p className="text-lg text-indigo-200 leading-relaxed mb-4">
              From the moment you were born, countless invisible processes have been working tirelessly: 
              your heart beating, your lungs breathing, your body growing, Earth carrying you through space 
              at 67,000 miles per hour.
            </p>
            
            <p className="text-lg text-indigo-200 leading-relaxed mb-4">
              What if you could see it all laid out? What if you could quantify the miracle of existence?
            </p>
            
            <div className="bg-indigo-500/20 border border-indigo-400/30 rounded-xl p-6 my-6">
              <h2 className="text-2xl font-semibold mb-3">Your Life, Measured:</h2>
              <div className="grid md:grid-cols-2 gap-4 text-indigo-100">
                <div>
                  <h3 className="font-semibold text-lg mb-2">⏱️ Time</h3>
                  <ul className="space-y-1 text-sm">
                    <li>Seconds alive</li>
                    <li>Days on Earth</li>
                    <li>Weeks experienced</li>
                    <li>Percentage of average lifespan</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">💓 Body</h3>
                  <ul className="space-y-1 text-sm">
                    <li>Total heartbeats</li>
                    <li>Breaths taken</li>
                    <li>Blinks (billions!)</li>
                    <li>Blood cells replaced</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">🌍 Cosmic</h3>
                  <ul className="space-y-1 text-sm">
                    <li>Miles through space</li>
                    <li>Orbits around the sun</li>
                    <li>Full moons witnessed</li>
                    <li>Sunrises seen</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">🎯 Milestones</h3>
                  <ul className="space-y-1 text-sm">
                    <li>Billion Seconds Club</li>
                    <li>10,000 Days Club</li>
                    <li>Future birthdays</li>
                    <li>Achievement badges</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <p className="text-lg text-indigo-200 leading-relaxed">
              The <strong>LifeStats calculator</strong> turns your birthday into a dashboard of wonder. 
              See your life in numbers. Share your stats. Celebrate the cosmic miracle of being alive.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">❓ Frequently Asked Questions</h2>
            <div className="space-y-4">
              <details className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                <summary className="font-semibold text-indigo-200 cursor-pointer">
                  What does &quot;life in numbers&quot; mean?
                </summary>
                <p className="mt-3 text-indigo-300 text-sm">
                  Life in numbers means quantifying your existence through measurable statistics: heartbeats, breaths, 
                  seconds alive, miles traveled through space, full moons witnessed, and more. LifeStats calculates 
                  50+ personalized metrics from just your birthday.
                </p>
              </details>
              
              <details className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                <summary className="font-semibold text-indigo-200 cursor-pointer">
                  How many statistics does LifeStats calculate?
                </summary>
                <p className="mt-3 text-indigo-300 text-sm">
                  LifeStats calculates over 50 personalized statistics including: time metrics (seconds, minutes, hours, 
                  days alive), body stats (heartbeats, breaths, blinks), cosmic journey (miles through space, orbits, 
                  full moons), and milestone achievements (Billion Seconds Club, 10,000 Days Club, and more).
                </p>
              </details>
              
              <details className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                <summary className="font-semibold text-indigo-200 cursor-pointer">
                  How many times have I blinked in my life?
                </summary>
                <p className="mt-3 text-indigo-300 text-sm">
                  The average person blinks about 15-20 times per minute, or roughly 10 million times per year. 
                  A 30-year-old has blinked approximately 300 million times. LifeStats calculates your exact blink 
                  count based on your birthdate.
                </p>
              </details>
              
              <details className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                <summary className="font-semibold text-indigo-200 cursor-pointer">
                  Is the life in numbers calculator free to use?
                </summary>
                <p className="mt-3 text-indigo-300 text-sm">
                  Yes, 100% FREE in 2026. No signup, no email, no subscription. Just enter your birthday and get a 
                  complete dashboard of your life in numbers — instantly.
                </p>
              </details>

              <details className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                <summary className="font-semibold text-indigo-200 cursor-pointer">
                  Can I share my life stats with friends?
                </summary>
                <p className="mt-3 text-indigo-300 text-sm">
                  Yes! LifeStats lets you share your personalized stat card on social media. Show your friends how 
                  many heartbeats you&apos;ve had, how far you&apos;ve traveled through space, and what exclusive clubs 
                  you&apos;ve joined (like the Billion Seconds Club).
                </p>
              </details>
            </div>
          </div>

          <div className="bg-indigo-500/20 border border-indigo-400/30 rounded-2xl p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-3">🔗 Related Calculators</h2>
            <div className="grid md:grid-cols-2 gap-3">
              <Link href="/how-many-heartbeats" className="text-indigo-300 hover:underline">
                → How Many Heartbeats Have I Had?
              </Link>
              <Link href="/how-many-breaths" className="text-indigo-300 hover:underline">
                → How Many Breaths Have I Taken?
              </Link>
              <Link href="/how-old-am-i-in-seconds" className="text-indigo-300 hover:underline">
                → How Old Am I in Seconds?
              </Link>
              <Link href="/birthday-statistics" className="text-indigo-300 hover:underline">
                → Birthday Statistics Calculator
              </Link>
              <Link href="/life-expectancy-calculator" className="text-indigo-300 hover:underline">
                → Life Expectancy Calculator
              </Link>
              <Link href="/days-until-birthday" className="text-indigo-300 hover:underline">
                → Days Until My Birthday
              </Link>
            </div>
          </div>
          
          <Link 
            href="/#calculator" 
            className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-8 py-4 rounded-xl text-xl font-semibold hover:from-indigo-600 hover:to-purple-600 transition-all shadow-lg inline-block"
          >
            Calculate My Life in Numbers →
          </Link>
        </div>
      </div>
    </>
  );
}
