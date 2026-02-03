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

  const age = Math.floor(stats.earthOrbits);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleCopyText}
          className="btn-primary px-6 py-3 rounded-xl font-semibold text-white flex items-center justify-center gap-2"
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
          onClick={() => setShowCard(!showCard)}
          className="px-6 py-3 rounded-xl font-semibold text-white border border-gray-700 hover:border-indigo-500 transition-colors flex items-center justify-center gap-2"
        >
          <span>🎴</span> {showCard ? 'Hide' : 'Show'} Card
        </button>
      </div>

      {showCard && (
        <div className="mt-6">
          <div 
            ref={cardRef}
            className="share-card rounded-2xl p-8 max-w-md mx-auto"
          >
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold gradient-text mb-2">My Life Stats</h3>
              <p className="text-gray-400 text-sm">{age} years on Earth</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-white/5 rounded-xl p-4">
                <div className="text-2xl mb-1">⏱️</div>
                <div className="text-xl font-bold text-white">{formatNumber(stats.secondsAlive)}</div>
                <div className="text-xs text-gray-400">seconds</div>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <div className="text-2xl mb-1">💓</div>
                <div className="text-xl font-bold text-white">{formatNumber(stats.heartbeats)}</div>
                <div className="text-xs text-gray-400">heartbeats</div>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <div className="text-2xl mb-1">🌬️</div>
                <div className="text-xl font-bold text-white">{formatNumber(stats.breaths)}</div>
                <div className="text-xs text-gray-400">breaths</div>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <div className="text-2xl mb-1">🌙</div>
                <div className="text-xl font-bold text-white">{stats.fullMoons}</div>
                <div className="text-xs text-gray-400">full moons</div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <div className="inline-block bg-gradient-to-r from-indigo-500 to-purple-500 px-4 py-2 rounded-full text-sm font-semibold">
                {stats.lifespanPercentage.toFixed(1)}% of journey complete
              </div>
            </div>

            <div className="mt-4 text-center text-xs text-gray-500">
              lifestats.app ✨
            </div>
          </div>
          <p className="text-center text-sm text-gray-500 mt-4">
            Screenshot this card to share! 📸
          </p>
        </div>
      )}
    </div>
  );
}
