import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Days Until My Birthday Calculator | Countdown to Next Birthday 2026",
  description: "FREE birthday countdown calculator — How many days until your next birthday? Enter your birth date and get instant countdown in days, hours, minutes, and seconds. No signup required.",
  keywords: [
    "days until my birthday",
    "birthday countdown",
    "how many days until my birthday",
    "next birthday calculator",
    "birthday countdown timer",
    "days till my birthday",
    "birthday calculator",
  ],
  alternates: {
    canonical: "/days-until-birthday",
  },
  openGraph: {
    title: "Days Until My Birthday Calculator | Free Countdown 2026",
    description: "Count down to your next birthday! Enter your birth date and see exactly how many days, hours, and minutes are left. Free, instant, shareable.",
    type: "website",
    url: "https://getlifestats.com/days-until-birthday",
  },
};

export default function DaysUntilBirthday() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do I calculate days until my birthday?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Simply enter your birth month and day in our calculator. It automatically calculates the number of days from today until your next birthday, accounting for leap years and whether your birthday has already passed this year."
        }
      },
      {
        "@type": "Question",
        "name": "What if my birthday was yesterday or recently passed?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "If your birthday already happened this year, the calculator shows days until your NEXT birthday (next year). For example, if your birthday was last week, it will show approximately 358 days until your next one."
        }
      },
      {
        "@type": "Question",
        "name": "Does this work for leap year birthdays (February 29)?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! If you were born on February 29, the calculator handles leap years correctly. In non-leap years, some people celebrate on February 28 or March 1. Our calculator counts to the next occurrence of Feb 29."
        }
      },
      {
        "@type": "Question",
        "name": "Can I share my birthday countdown?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! After calculating, you can share your countdown via social media. LifeStats also generates shareable birthday stat cards with fun facts about your life so far."
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
        "name": "Days Until Birthday",
        "item": "https://getlifestats.com/days-until-birthday"
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
            Days Until My Birthday 🎂
          </h1>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8">
            <p className="text-xl text-purple-100 leading-relaxed mb-4">
              How many days until your next birthday? Whether you're counting down to a milestone birthday or just 
              excited for cake, our <strong>birthday countdown calculator</strong> tells you exactly how much time is left 
              — down to the second!
            </p>
            
            <p className="text-lg text-purple-200 leading-relaxed mb-6">
              Enter your birthday below to see:
            </p>
            
            <ul className="space-y-2 text-purple-100 mb-6">
              <li>🎉 Exact days until your next birthday</li>
              <li>⏰ Countdown in hours, minutes, and seconds</li>
              <li>📆 Your next birthday's day of the week</li>
              <li>🎂 How many birthdays you've celebrated so far</li>
              <li>🌟 Fun facts about your life journey</li>
            </ul>

            <div className="bg-purple-500/20 border border-purple-400/30 rounded-xl p-6 my-6">
              <h2 className="text-2xl font-semibold mb-3">🎂 Birthday Milestones to Look Forward To</h2>
              <div className="space-y-2 text-purple-100">
                <div><strong>🎈 Golden Birthday:</strong> When you turn the age of your birth date (e.g., turning 24 on the 24th)</div>
                <div><strong>🏆 18th Birthday:</strong> Legal adult in most countries</div>
                <div><strong>🎓 21st Birthday:</strong> Legal drinking age in the US</div>
                <div><strong>💎 30th, 40th, 50th:</strong> The "big" decade milestones</div>
                <div><strong>🎊 100th Birthday:</strong> Centenarian status (join the 100-year club!)</div>
              </div>
            </div>

            <h2 className="text-2xl font-semibold mb-4 mt-8">🧮 How the Birthday Countdown Works</h2>
            <p className="text-purple-200 mb-4">
              Our calculator uses today's date and your birth month/day to determine:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-purple-200 mb-6">
              <li><strong>Has your birthday passed this year?</strong> If yes, it counts to next year's date. If no, it counts to this year's date.</li>
              <li><strong>Leap year adjustment:</strong> Accounts for February 29 birthdays in leap years.</li>
              <li><strong>Live countdown:</strong> Updates every second for real-time accuracy.</li>
              <li><strong>Age calculation:</strong> Shows how many birthdays you've celebrated (your current age).</li>
            </ol>

            <div className="bg-gray-800/50 rounded-xl p-6 my-6">
              <h3 className="text-xl font-semibold mb-3 text-blue-300">🔢 Example Calculation</h3>
              <p className="text-purple-200 mb-2">
                <strong>Today's Date:</strong> February 7, 2026<br/>
                <strong>Your Birthday:</strong> March 15, 1995
              </p>
              <p className="text-purple-100 text-sm">
                <strong>Calculation:</strong><br/>
                • Your next birthday: March 15, 2026<br/>
                • Days until: 36 days<br/>
                • Hours: 863 hours<br/>
                • Minutes: 51,840 minutes<br/>
                • You've celebrated: 30 birthdays (turning 31 on March 15, 2026)
              </p>
            </div>

            <h2 className="text-2xl font-semibold mb-4 mt-8">🎉 Fun Birthday Facts</h2>
            <ul className="space-y-3 text-purple-200">
              <li>
                <strong>Most Common Birthday:</strong> September 9 (approximately 9 months after New Year's Eve!)
              </li>
              <li>
                <strong>Least Common Birthday:</strong> February 29 (leap day) — only 1 in 1,461 people are "leaplings"
              </li>
              <li>
                <strong>Birthday Paradox:</strong> In a room of just 23 people, there's a 50% chance two share a birthday. 
                With 70 people, it's 99.9%!
              </li>
              <li>
                <strong>Shared Birthdays:</strong> Approximately 21 million people worldwide share YOUR birthday (out of 8 billion)
              </li>
              <li>
                <strong>Birthday Odds:</strong> The odds of being born on any specific date are 1 in 365 (or 1 in 366 in leap years)
              </li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4 mt-8">🎂 Birthday Traditions Around the World</h2>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-800/50 rounded-lg p-4">
                <h3 className="font-semibold text-yellow-400 mb-2">🇺🇸 United States</h3>
                <p className="text-sm text-purple-200">Birthday cake, candles, "Happy Birthday" song, and making a wish</p>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-4">
                <h3 className="font-semibold text-yellow-400 mb-2">🇲🇽 Mexico</h3>
                <p className="text-sm text-purple-200">Piñatas, mariachi, and "Las Mañanitas" song</p>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-4">
                <h3 className="font-semibold text-yellow-400 mb-2">🇨🇳 China</h3>
                <p className="text-sm text-purple-200">Long noodles for longevity, red eggs, and peach-shaped buns</p>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-4">
                <h3 className="font-semibold text-yellow-400 mb-2">🇯🇵 Japan</h3>
                <p className="text-sm text-purple-200">Special milestone birthdays: 20 (Coming of Age), 60 (Kanreki), 77, 88</p>
              </div>
            </div>

            <h2 className="text-2xl font-semibold mb-4 mt-8">💡 Why Use a Birthday Countdown?</h2>
            <ul className="space-y-2 text-purple-200">
              <li>
                <strong>Party Planning:</strong> Know exactly how much time you have to prepare for your celebration
              </li>
              <li>
                <strong>Goal Setting:</strong> "Before I turn 30, I want to..." — Use your birthday as a deadline
              </li>
              <li>
                <strong>Excitement:</strong> Build anticipation, especially for milestone birthdays
              </li>
              <li>
                <strong>Social Sharing:</strong> Post your countdown on social media to remind friends
              </li>
              <li>
                <strong>Reflection:</strong> Appreciate the time you've lived and the time ahead
              </li>
            </ul>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">❓ Frequently Asked Questions</h2>
            <div className="space-y-4">
              <details className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                <summary className="font-semibold text-purple-200 cursor-pointer">
                  How do I calculate days until my birthday?
                </summary>
                <p className="mt-3 text-purple-300 text-sm">
                  Simply enter your birth month and day in our calculator. It automatically calculates the number of days 
                  from today until your next birthday, accounting for leap years and whether your birthday has already 
                  passed this year.
                </p>
              </details>
              
              <details className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                <summary className="font-semibold text-purple-200 cursor-pointer">
                  What if my birthday was yesterday or recently passed?
                </summary>
                <p className="mt-3 text-purple-300 text-sm">
                  If your birthday already happened this year, the calculator shows days until your NEXT birthday (next year). 
                  For example, if your birthday was last week, it will show approximately 358 days until your next one.
                </p>
              </details>
              
              <details className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                <summary className="font-semibold text-purple-200 cursor-pointer">
                  Does this work for leap year birthdays (February 29)?
                </summary>
                <p className="mt-3 text-purple-300 text-sm">
                  Yes! If you were born on February 29, the calculator handles leap years correctly. In non-leap years, 
                  some people celebrate on February 28 or March 1. Our calculator counts to the next occurrence of Feb 29.
                </p>
              </details>
              
              <details className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                <summary className="font-semibold text-purple-200 cursor-pointer">
                  Can I share my birthday countdown?
                </summary>
                <p className="mt-3 text-purple-300 text-sm">
                  Yes! After calculating, you can share your countdown via social media. LifeStats also generates shareable 
                  birthday stat cards with fun facts about your life so far.
                </p>
              </details>
            </div>
          </div>

          <div className="bg-indigo-500/20 border border-indigo-400/30 rounded-2xl p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-3">🔗 Related Calculators</h2>
            <div className="grid md:grid-cols-2 gap-3">
              <Link href="/how-old-am-i-in-seconds" className="text-indigo-300 hover:text-indigo-200 hover:underline">
                → How Old Am I in Seconds?
              </Link>
              <Link href="/birthday-statistics" className="text-indigo-300 hover:text-indigo-200 hover:underline">
                → Birthday Statistics Calculator
              </Link>
              <Link href="/life-expectancy-calculator" className="text-indigo-300 hover:text-indigo-200 hover:underline">
                → Life Expectancy Calculator
              </Link>
              <Link href="/life-in-numbers" className="text-indigo-300 hover:text-indigo-200 hover:underline">
                → Your Life in Numbers
              </Link>
            </div>
          </div>
          
          <Link 
            href="/#calculator" 
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-xl text-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg inline-block w-full text-center"
          >
            Start My Birthday Countdown →
          </Link>

          <p className="text-sm text-gray-400 mt-6 text-center">
            💡 Bonus: Calculate 50+ other life stats — heartbeats, breaths, miles through space, and more!
          </p>
        </div>
      </div>
    </>
  );
}
