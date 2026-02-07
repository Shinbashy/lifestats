import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "How Old Am I in Seconds? | Age Calculator in Seconds, Minutes, Hours",
  description: "Convert your age to seconds, minutes, hours, and days. Enter your birthday to see exactly how many seconds you've been alive. Free instant age calculator.",
  keywords: ["how old am I in seconds", "age in seconds calculator", "seconds alive", "convert age to seconds", "how many seconds old am I"],
  alternates: {
    canonical: "/how-old-am-i-in-seconds",
  },
};

export default function HowOldInSeconds() {
  return (
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
        
        <Link 
          href="/#calculator" 
          className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-4 rounded-xl text-xl font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all shadow-lg inline-block"
        >
          Calculate My Age in Seconds →
        </Link>
      </div>
    </div>
  );
}
