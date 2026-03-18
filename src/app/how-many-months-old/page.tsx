import { Metadata } from 'next';
import Link from 'next/link';
import MonthsOldCalculator from './MonthsOldCalculator';

export const metadata: Metadata = {
  title: "How Many Months Old Am I? | Months Old Calculator 2026",
  description: "FREE months old calculator — How many months old are you? Enter your birthday for your exact age in months, years + months breakdown, and fun baby-tracker perspective. No signup.",
  keywords: [
    "how many months old am I",
    "how old am I in months",
    "months old calculator",
    "age in months",
    "how many months have I been alive",
    "age calculator months",
    "months old",
  ],
  alternates: {
    canonical: "/how-many-months-old",
  },
};

export default function HowManyMonthsOld() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do I calculate how many months old I am?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "To calculate your age in months: multiply the number of full years by 12, then add the remaining months since your last birthday. For example, if you are 32 years and 3 months old, you are 32 × 12 + 3 = 387 months old. Our free calculator does this instantly."
        }
      },
      {
        "@type": "Question",
        "name": "How many months old is a 30-year-old?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A 30-year-old is 360 months old (30 × 12 = 360). Depending on where they are in their birth month, they could be anywhere from 360 to 371 months old."
        }
      },
      {
        "@type": "Question",
        "name": "Why do babies track age in months?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Babies develop so rapidly in their first two years that monthly milestones matter — rolling over, sitting, walking. Pediatricians track 'corrected age' in months to monitor development. By about age 2-3, most parents switch to years."
        }
      },
      {
        "@type": "Question",
        "name": "What is 500 months old in years?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "500 months is 41 years and 8 months (500 ÷ 12 = 41 remainder 8). You hit 500 months old at exactly 41 years and 8 months after your birthday."
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
        "name": "How Many Months Old Am I?",
        "item": "https://getlifestats.com/how-many-months-old"
      }
    ]
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "How Many Months Old Am I? Calculator",
    "url": "https://www.getlifestats.com/how-many-months-old",
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
          <Link href="/" className="text-violet-300 hover:text-violet-200 mb-6 inline-block">
            ← Back to LifeStats
          </Link>

          <h1 className="text-5xl font-bold mb-4">
            How Many Months Old Am I?
          </h1>
          <p className="text-xl text-violet-200 mb-8 leading-relaxed">
            Babies are tracked in months. Adults forget. Enter your birthday and rediscover your age the way your pediatrician once counted it — one month at a time.
          </p>

          {/* Interactive Calculator */}
          <MonthsOldCalculator />

          {/* SEO Content */}
          <div className="mt-12 bg-white/10 backdrop-blur-sm rounded-2xl p-8 space-y-4">
            <h2 className="text-2xl font-semibold">The Month Counter We Abandoned Too Soon</h2>
            <p className="text-violet-200 leading-relaxed">
              In your first two years of life, everyone counted your age in months. &quot;She&apos;s 14 months old.&quot; 
              &quot;He&apos;s 22 months.&quot; Pediatricians, parents, grandparents — all tracking monthly milestones 
              with intensity. Then somewhere around month 24, we switched to years and forgot.
            </p>
            <p className="text-violet-200 leading-relaxed">
              But here&apos;s the thing: the months kept ticking. You&apos;re still a certain number of months old — 
              just a very large one. Seeing that number tends to be weirdly clarifying.
            </p>
            <div className="bg-violet-500/20 border border-violet-400/30 rounded-xl p-5">
              <h3 className="text-lg font-semibold mb-3">Month Milestones by Age</h3>
              <ul className="space-y-1 text-violet-200 text-sm">
                <li>🍼 <strong>100 months</strong> = 8 years, 4 months</li>
                <li>🧒 <strong>200 months</strong> = 16 years, 8 months</li>
                <li>🎓 <strong>300 months</strong> = 25 years</li>
                <li>💼 <strong>400 months</strong> = 33 years, 4 months</li>
                <li>🏠 <strong>500 months</strong> = 41 years, 8 months</li>
                <li>🌟 <strong>600 months</strong> = 50 years exactly</li>
                <li>🎩 <strong>700 months</strong> = 58 years, 4 months</li>
                <li>🏆 <strong>800 months</strong> = 66 years, 8 months</li>
              </ul>
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">❓ Frequently Asked Questions</h2>
            <div className="space-y-4">
              <details className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                <summary className="font-semibold text-violet-200 cursor-pointer">
                  How do I calculate how many months old I am?
                </summary>
                <p className="mt-3 text-violet-300 text-sm">
                  Multiply full years by 12, then add remaining months since your last birthday.
                  A 32-year-old who is 3 months past their birthday is 387 months old.
                </p>
              </details>

              <details className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                <summary className="font-semibold text-violet-200 cursor-pointer">
                  How many months old is a 30-year-old?
                </summary>
                <p className="mt-3 text-violet-300 text-sm">
                  At minimum 360 months (30 × 12). Could be up to 371 months depending on 
                  where they are in their birth month.
                </p>
              </details>

              <details className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                <summary className="font-semibold text-violet-200 cursor-pointer">
                  Why do babies track age in months?
                </summary>
                <p className="mt-3 text-violet-300 text-sm">
                  Development happens so fast in the first 2 years that monthly milestones matter — 
                  rolling over, sitting up, first words. Pediatricians use months to monitor 
                  developmental stages precisely.
                </p>
              </details>

              <details className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                <summary className="font-semibold text-violet-200 cursor-pointer">
                  What is 500 months old in years?
                </summary>
                <p className="mt-3 text-violet-300 text-sm">
                  500 months = 41 years and 8 months (500 ÷ 12 = 41 remainder 8).
                </p>
              </details>
            </div>
          </div>

          {/* Related */}
          <div className="mt-8 bg-violet-500/20 border border-violet-400/30 rounded-2xl p-6">
            <h2 className="text-2xl font-semibold mb-3">🔗 Related Calculators</h2>
            <div className="grid md:grid-cols-2 gap-3">
              <Link href="/how-many-days-old" className="text-violet-300 hover:underline">
                → How Many Days Old Am I?
              </Link>
              <Link href="/how-many-weeks-old" className="text-violet-300 hover:underline">
                → How Many Weeks Old Am I?
              </Link>
              <Link href="/how-many-hours-old" className="text-violet-300 hover:underline">
                → How Many Hours Old Am I?
              </Link>
              <Link href="/how-many-minutes-old" className="text-violet-300 hover:underline">
                → How Many Minutes Old Am I?
              </Link>
              <Link href="/age-calculator" className="text-violet-300 hover:underline">
                → Full Age Calculator
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
