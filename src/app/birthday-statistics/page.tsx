import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Birthday Statistics Calculator | Your Life in Numbers from Birth Date",
  description: "Enter your birthday to calculate 50+ personalized statistics: heartbeats, breaths, full moons witnessed, miles through space, and more. Free instant results.",
  keywords: ["birthday statistics", "birthday calculator", "life stats from birthday", "birth date statistics", "personalized birthday facts"],
  alternates: {
    canonical: "/birthday-statistics",
  },
};

export default function BirthdayStatistics() {
  return (
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
        
        <Link 
          href="/#calculator" 
          className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-4 rounded-xl text-xl font-semibold hover:from-pink-600 hover:to-rose-600 transition-all shadow-lg inline-block"
        >
          Calculate My Birthday Statistics →
        </Link>
      </div>
    </div>
  );
}
