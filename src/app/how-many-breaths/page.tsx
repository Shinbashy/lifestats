import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "How Many Breaths Have I Taken? | LifeStats Calculator",
  description: "Calculate the total number of breaths you've taken since birth. Enter your birthday for instant results — breaths per day, per year, and lifetime total. Free breath calculator.",
  keywords: ["how many breaths have I taken", "breath calculator", "total breaths since birth", "breathing statistics"],
  alternates: {
    canonical: "/how-many-breaths",
  },
};

export default function HowManyBreaths() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white p-8">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-blue-300 hover:text-blue-200 mb-6 inline-block">
          ← Back to LifeStats
        </Link>
        
        <h1 className="text-5xl font-bold mb-6">
          How Many Breaths Have I Taken?
        </h1>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8">
          <p className="text-xl text-blue-100 leading-relaxed mb-4">
            Breathing is so automatic we rarely think about it. But every breath you take is a small miracle — 
            delivering life-sustaining oxygen to every cell in your body.
          </p>
          
          <p className="text-lg text-blue-200 leading-relaxed mb-4">
            The average person takes about <strong>20,000 breaths per day</strong>. Over a lifetime, that adds up to 
            hundreds of millions of breaths.
          </p>
          
          <div className="bg-blue-500/20 border border-blue-400/30 rounded-xl p-6 my-6">
            <h2 className="text-2xl font-semibold mb-3">Breathing by the Numbers:</h2>
            <ul className="space-y-2 text-blue-100">
              <li>💨 Average adult: <strong>12-20 breaths per minute</strong></li>
              <li>💨 About <strong>20,000 breaths per day</strong></li>
              <li>💨 That's <strong>7.3 million breaths per year</strong></li>
              <li>💨 Each breath cycles <strong>~500ml of air</strong></li>
              <li>💨 Newborns breathe 30-60 times per minute</li>
            </ul>
          </div>
          
          <p className="text-lg text-blue-200 leading-relaxed">
            Want to know your exact breath count? Use the <strong>LifeStats calculator</strong> below to discover 
            how many breaths you've taken — plus 50+ other mind-blowing statistics about your existence.
          </p>
        </div>
        
        <Link 
          href="/#calculator" 
          className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-xl text-xl font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg inline-block"
        >
          Calculate My Breaths →
        </Link>
      </div>
    </div>
  );
}
