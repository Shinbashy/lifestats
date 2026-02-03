'use client';

import { useRef, useState } from 'react';
import { LifeStats, formatNumber, generateShareText } from '@/lib/calculations';

interface ShareCardProps {
  stats: LifeStats;
  birthday: Date;
}

export default function ShareCard({ stats, birthday }: ShareCardProps) {
  const [copied, setCopied] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleCopyText = async () => {
    const text = generateShareText(stats, birthday);
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNativeShare = async () => {
    const text = generateShareText(stats, birthday);
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Life Stats',
          text: text,
          url: window.location.href,
        });
      } catch (err) {
        // User cancelled or error - fall back to copy
        handleCopyText();
      }
    } else {
      handleCopyText();
    }
  };

  const handleTwitterShare = () => {
    const age = Math.floor(stats.earthOrbits);
    const text = `🌍 I'm ${age} Earth years old, but that's also:
• ${Math.floor(stats.planetaryAges[0]?.age || 0)} Mercury years
• ${formatNumber(stats.heartbeats)} heartbeats
• ${formatNumber(stats.fullMoons)} full moons witnessed
• ${formatNumber(stats.milesThroughSpace)} miles through space

Calculate your life stats 👇`;
    
    const url = encodeURIComponent('https://lifestats-eight.vercel.app');
    const encodedText = encodeURIComponent(text);
    window.open(`https://twitter.com/intent/tweet?text=${encodedText}&url=${url}`, '_blank');
  };

  const age = Math.floor(stats.earthOrbits);
  const mercuryAge = Math.floor(stats.planetaryAges.find(p => p.name === 'Mercury')?.age || 0);

  return (
    <div className="stat-card rounded-2xl p-6">
      <h2 className="text-lg font-semibold text-gray-300 mb-4 flex items-center gap-2">
        <span>📤</span> Share Your Stats
      </h2>

      <div className="flex flex-wrap gap-3 mb-6">
        <button
          onClick={handleCopyText}
          className="btn-primary px-5 py-2.5 rounded-xl font-semibold text-white flex items-center gap-2 text-sm"
        >
          {copied ? (
            <>
              <span>✓</span> Copied!
            </>
          ) : (
            <>
              <span>📋</span> Copy Stats
            </>
          )}
        </button>
        
        <button
          onClick={handleTwitterShare}
          className="px-5 py-2.5 rounded-xl font-semibold text-white bg-[#1DA1F2] hover:bg-[#1a8cd8] transition-colors flex items-center gap-2 text-sm"
        >
          <span>𝕏</span> Share on X
        </button>

        {typeof navigator !== 'undefined' && 'share' in navigator && (
          <button
            onClick={handleNativeShare}
            className="px-5 py-2.5 rounded-xl font-semibold text-white border border-gray-700 hover:border-indigo-500 transition-colors flex items-center gap-2 text-sm"
          >
            <span>📱</span> Share
          </button>
        )}
        
        <button
          onClick={() => setShowCard(!showCard)}
          className="px-5 py-2.5 rounded-xl font-semibold text-white border border-gray-700 hover:border-indigo-500 transition-colors flex items-center gap-2 text-sm"
        >
          <span>🎴</span> {showCard ? 'Hide' : 'Show'} Card
        </button>
      </div>

      {showCard && (
        <div className="mt-4">
          <div 
            ref={cardRef}
            className="share-card rounded-2xl p-6 md:p-8 max-w-md mx-auto bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-950 border border-indigo-500/30"
          >
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold gradient-text mb-2">My Life Stats</h3>
              <p className="text-gray-400 text-sm">
                {age} Earth years • {mercuryAge} Mercury years
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="bg-white/5 rounded-xl p-3">
                <div className="text-xl mb-1">⏱️</div>
                <div className="text-lg font-bold text-white">{formatNumber(stats.secondsAlive)}</div>
                <div className="text-[10px] text-gray-400">seconds alive</div>
              </div>
              <div className="bg-white/5 rounded-xl p-3">
                <div className="text-xl mb-1">💓</div>
                <div className="text-lg font-bold text-white">{formatNumber(stats.heartbeats)}</div>
                <div className="text-[10px] text-gray-400">heartbeats</div>
              </div>
              <div className="bg-white/5 rounded-xl p-3">
                <div className="text-xl mb-1">🌙</div>
                <div className="text-lg font-bold text-white">{stats.fullMoons}</div>
                <div className="text-[10px] text-gray-400">full moons</div>
              </div>
              <div className="bg-white/5 rounded-xl p-3">
                <div className="text-xl mb-1">🚀</div>
                <div className="text-lg font-bold text-white">{formatNumber(stats.milesThroughSpace)}</div>
                <div className="text-[10px] text-gray-400">miles in space</div>
              </div>
            </div>

            {/* Planetary ages mini */}
            <div className="mt-4 bg-white/5 rounded-xl p-3">
              <div className="text-xs text-gray-400 mb-2 text-center">Age on Other Planets</div>
              <div className="flex justify-center gap-3 text-center">
                {stats.planetaryAges.slice(0, 4).map(planet => (
                  <div key={planet.name} className="text-center">
                    <div className="text-sm">{planet.emoji}</div>
                    <div className="text-xs font-bold text-white">{Math.floor(planet.age)}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 text-center">
              <div className="inline-block bg-gradient-to-r from-indigo-500 to-purple-500 px-4 py-1.5 rounded-full text-xs font-semibold">
                {stats.lifespanPercentage.toFixed(1)}% of journey complete
              </div>
            </div>

            {/* Badges */}
            {(stats.isInBillionClub || stats.isIn10kClub) && (
              <div className="flex justify-center gap-2 mt-3">
                {stats.isInBillionClub && (
                  <span className="text-xs bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded-full">
                    🏆 Billion Seconds Club
                  </span>
                )}
                {stats.isIn10kClub && (
                  <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded-full">
                    🎯 10K Days Club
                  </span>
                )}
              </div>
            )}

            <div className="mt-4 text-center text-[10px] text-gray-500">
              lifestats-eight.vercel.app ✨
            </div>
          </div>
          <p className="text-center text-xs text-gray-500 mt-4">
            📸 Screenshot this card to share on socials!
          </p>
        </div>
      )}
    </div>
  );
}
