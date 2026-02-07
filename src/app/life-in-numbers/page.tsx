import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "My Life in Numbers | Personalized Life Statistics Calculator",
  description: "See your entire life quantified in numbers. Enter your birthday for 50+ personalized stats: heartbeats, breaths, cosmic journey, milestones, and more. Free instant calculator.",
  keywords: ["life in numbers", "my life statistics", "life calculator", "quantified life", "life metrics dashboard", "personal life stats"],
  alternates: {
    canonical: "/life-in-numbers",
  },
};

export default function LifeInNumbers() {
  return (
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
        
        <Link 
          href="/#calculator" 
          className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-8 py-4 rounded-xl text-xl font-semibold hover:from-indigo-600 hover:to-purple-600 transition-all shadow-lg inline-block"
        >
          Calculate My Life in Numbers →
        </Link>
      </div>
    </div>
  );
}
