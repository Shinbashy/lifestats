import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Life Expectancy Calculator by Birthday | How Long Will I Live?",
  description: "FREE 2026 life expectancy calculator — Enter your birthday, gender, and location to estimate how many years you have left. Based on WHO data. Instant results, no signup.",
  keywords: [
    "life expectancy calculator",
    "how long will I live",
    "lifespan calculator",
    "life expectancy by age",
    "death calculator",
    "how many years do I have left",
    "longevity calculator",
    "expected lifespan",
  ],
  alternates: {
    canonical: "/life-expectancy-calculator",
  },
  openGraph: {
    title: "Life Expectancy Calculator | How Long Will I Live?",
    description: "Calculate your estimated lifespan based on age, gender, and country. Free, instant, science-backed.",
    type: "website",
    url: "https://getlifestats.com/life-expectancy-calculator",
  },
};

export default function LifeExpectancyCalculator() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How accurate is the life expectancy calculator?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our calculator uses official WHO (World Health Organization) data for life expectancy by country and gender. Accuracy depends on factors like lifestyle, genetics, and health conditions. This is an estimate based on population averages, not a prediction for any individual."
        }
      },
      {
        "@type": "Question",
        "name": "What factors affect life expectancy?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Major factors include: gender (women live 5-7 years longer on average), country (access to healthcare), lifestyle (smoking, alcohol, exercise), genetics, occupation, and chronic health conditions. Our calculator adjusts for gender and location."
        }
      },
      {
        "@type": "Question",
        "name": "Can I improve my life expectancy?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! Studies show regular exercise can add 3-7 years, not smoking adds 10+ years, healthy diet adds 5+ years, and maintaining healthy weight adds 3-5 years. Small lifestyle changes compound over time."
        }
      },
      {
        "@type": "Question",
        "name": "Is this calculator free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, completely free. No signup, no email required. Enter your birthday and get instant results."
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
        "name": "Life Expectancy Calculator",
        "item": "https://getlifestats.com/life-expectancy-calculator"
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
            Life Expectancy Calculator
          </h1>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8">
            <p className="text-xl text-purple-100 leading-relaxed mb-4">
              How long will you live? While nobody can predict the exact answer, our <strong>life expectancy calculator</strong> uses 
              scientifically-backed data from the World Health Organization to estimate your expected lifespan based on your age, 
              gender, and country.
            </p>
            
            <p className="text-lg text-purple-200 leading-relaxed mb-6">
              Enter your birthday below and discover:
            </p>
            
            <ul className="space-y-2 text-purple-100 mb-6">
              <li>✨ Your estimated remaining years</li>
              <li>✨ Expected lifespan by gender and location</li>
              <li>✨ Percentage of life already lived</li>
              <li>✨ Countdown to major age milestones</li>
            </ul>

            <div className="bg-purple-500/20 border border-purple-400/30 rounded-xl p-6 my-6">
              <h2 className="text-2xl font-semibold mb-3">📊 Life Expectancy by Country (2024 WHO Data)</h2>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><strong>🇺🇸 United States:</strong> 79.3 years</div>
                <div><strong>🇬🇧 United Kingdom:</strong> 81.4 years</div>
                <div><strong>🇨🇦 Canada:</strong> 82.9 years</div>
                <div><strong>🇦🇺 Australia:</strong> 83.3 years</div>
                <div><strong>🇯🇵 Japan:</strong> 84.8 years (highest)</div>
                <div><strong>🇩🇪 Germany:</strong> 81.7 years</div>
              </div>
              <p className="text-xs text-purple-300 mt-3">
                * Women live 5-7 years longer than men on average across all countries
              </p>
            </div>

            <h2 className="text-2xl font-semibold mb-4 mt-8">🧬 What Affects Your Life Expectancy?</h2>
            <p className="text-purple-200 mb-4">
              Your actual lifespan depends on many factors beyond age and location:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-800/50 rounded-lg p-4">
                <h3 className="font-semibold text-green-400 mb-2">✅ Factors That Increase Lifespan:</h3>
                <ul className="text-sm space-y-1 text-purple-200">
                  <li>• Regular exercise (+3-7 years)</li>
                  <li>• Not smoking (+10+ years)</li>
                  <li>• Healthy diet (+5+ years)</li>
                  <li>• Healthy weight (+3-5 years)</li>
                  <li>• Strong social connections (+3 years)</li>
                  <li>• Good sleep (7-9 hours/night)</li>
                </ul>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-4">
                <h3 className="font-semibold text-red-400 mb-2">⚠️ Factors That Decrease Lifespan:</h3>
                <ul className="text-sm space-y-1 text-purple-200">
                  <li>• Smoking (-10+ years)</li>
                  <li>• Obesity (-5-10 years)</li>
                  <li>• Heavy alcohol use (-5 years)</li>
                  <li>• Chronic stress (-2-5 years)</li>
                  <li>• Sedentary lifestyle (-3 years)</li>
                  <li>• Poor air quality (-2 years)</li>
                </ul>
              </div>
            </div>

            <h2 className="text-2xl font-semibold mb-4 mt-8">🎯 How to Use This Calculator</h2>
            <ol className="list-decimal list-inside space-y-2 text-purple-200 mb-6">
              <li>Enter your birthday (month, day, year)</li>
              <li>Select your biological gender (affects life expectancy averages)</li>
              <li>Choose your country (uses official WHO data)</li>
              <li>Click "Calculate My Stats" to see your estimated lifespan</li>
              <li>Optional: Add lifestyle factors for a personalized estimate</li>
            </ol>

            <div className="bg-yellow-500/20 border border-yellow-400/30 rounded-xl p-6 my-6">
              <h3 className="font-semibold text-yellow-300 mb-2">⚠️ Important Disclaimer</h3>
              <p className="text-sm text-yellow-100">
                This calculator provides statistical estimates based on population averages. It is NOT a medical prediction 
                and should not be used for financial planning, insurance decisions, or health diagnoses. Individual results 
                vary widely based on genetics, lifestyle, and unforeseen circumstances. Always consult healthcare professionals 
                for medical advice.
              </p>
            </div>

            <h2 className="text-2xl font-semibold mb-4 mt-8">💡 Interesting Facts About Life Expectancy</h2>
            <ul className="space-y-3 text-purple-200">
              <li>
                <strong>Gender Gap:</strong> Women live an average of 5-7 years longer than men globally. In the US, 
                female life expectancy is 81.7 years vs. 76.3 for males (2023 CDC data).
              </li>
              <li>
                <strong>Longevity Hotspots:</strong> "Blue Zones" (Okinawa Japan, Sardinia Italy, Nicoya Costa Rica, 
                Ikaria Greece, Loma Linda California) have the highest concentrations of centenarians (people living past 100).
              </li>
              <li>
                <strong>Life Expectancy is Rising:</strong> Global average life expectancy increased from 46 years 
                in 1950 to 73 years in 2024 — a 59% increase in just 74 years!
              </li>
              <li>
                <strong>The 115-Year Barrier:</strong> The oldest verified person ever was Jeanne Calment (France), 
                who lived to 122 years, 164 days. Only a handful of people have reached 115+.
              </li>
            </ul>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">❓ Frequently Asked Questions</h2>
            <div className="space-y-4">
              <details className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                <summary className="font-semibold text-purple-200 cursor-pointer">
                  How accurate is the life expectancy calculator?
                </summary>
                <p className="mt-3 text-purple-300 text-sm">
                  Our calculator uses official WHO (World Health Organization) data for life expectancy by country and gender. 
                  Accuracy depends on factors like lifestyle, genetics, and health conditions. This is an estimate based on 
                  population averages, not a prediction for any individual.
                </p>
              </details>
              
              <details className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                <summary className="font-semibold text-purple-200 cursor-pointer">
                  What factors affect life expectancy?
                </summary>
                <p className="mt-3 text-purple-300 text-sm">
                  Major factors include: gender (women live 5-7 years longer on average), country (access to healthcare), 
                  lifestyle (smoking, alcohol, exercise), genetics, occupation, and chronic health conditions. Our calculator 
                  adjusts for gender and location.
                </p>
              </details>
              
              <details className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                <summary className="font-semibold text-purple-200 cursor-pointer">
                  Can I improve my life expectancy?
                </summary>
                <p className="mt-3 text-purple-300 text-sm">
                  Yes! Studies show regular exercise can add 3-7 years, not smoking adds 10+ years, healthy diet adds 5+ years, 
                  and maintaining healthy weight adds 3-5 years. Small lifestyle changes compound over time.
                </p>
              </details>
              
              <details className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                <summary className="font-semibold text-purple-200 cursor-pointer">
                  Is this calculator free?
                </summary>
                <p className="mt-3 text-purple-300 text-sm">
                  Yes, completely free. No signup, no email required. Enter your birthday and get instant results.
                </p>
              </details>
            </div>
          </div>

          <div className="bg-indigo-500/20 border border-indigo-400/30 rounded-2xl p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-3">🔗 Related Calculators</h2>
            <div className="grid md:grid-cols-2 gap-3">
              <Link href="/how-many-heartbeats" className="text-indigo-300 hover:text-indigo-200 hover:underline">
                → How Many Heartbeats Have I Had?
              </Link>
              <Link href="/how-old-am-i-in-seconds" className="text-indigo-300 hover:text-indigo-200 hover:underline">
                → How Old Am I in Seconds?
              </Link>
              <Link href="/birthday-statistics" className="text-indigo-300 hover:text-indigo-200 hover:underline">
                → Birthday Statistics Calculator
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
            Calculate My Life Expectancy →
          </Link>

          <p className="text-sm text-gray-400 mt-6 text-center">
            💡 Bonus: Get 50+ more life statistics — heartbeats, breaths, miles through space, and more!
          </p>
        </div>
      </div>
    </>
  );
}
