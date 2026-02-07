import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "How Many Heartbeats Have I Had? | LifeStats Calculator",
  description: "Calculate exactly how many times your heart has beaten since birth. Enter your birthday and get instant results — heartbeats per second, per day, per year, and total lifetime heartbeats.",
  keywords: ["how many heartbeats have I had", "heartbeat calculator", "total heartbeats since birth", "how many times has my heart beaten"],
  alternates: {
    canonical: "/how-many-heartbeats",
  },
};

export default function HowManyHeartbeats() {
  return (
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
        
        <Link 
          href="/#calculator" 
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-xl text-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg inline-block"
        >
          Calculate My Heartbeats →
        </Link>
      </div>
    </div>
  );
}
