'use client';

import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { LifeStats, formatNumber, generateShareText } from '@/lib/calculations';

interface ShareCardProps {
  stats: LifeStats;
  birthday: Date;
}

type CardTemplate = 'minimal' | 'bold' | 'cosmic' | 'retro';

const TEMPLATES: { id: CardTemplate; name: string; icon: string }[] = [
  { id: 'minimal', name: 'Minimal', icon: '◻️' },
  { id: 'bold', name: 'Bold', icon: '🔥' },
  { id: 'cosmic', name: 'Cosmic', icon: '🌌' },
  { id: 'retro', name: 'Retro', icon: '📺' },
];

// Shareable stat options
const STAT_OPTIONS = [
  { id: 'heartbeats', label: 'Heartbeats', icon: '💓' },
  { id: 'breaths', label: 'Breaths', icon: '🌬️' },
  { id: 'seconds', label: 'Seconds Alive', icon: '⏱️' },
  { id: 'moons', label: 'Full Moons', icon: '🌙' },
  { id: 'space', label: 'Miles in Space', icon: '🚀' },
  { id: 'sleep', label: 'Years Slept', icon: '😴' },
  { id: 'overview', label: 'Full Overview', icon: '📊' },
];

export default function ShareCard({ stats, birthday }: ShareCardProps) {
  const [copied, setCopied] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [template, setTemplate] = useState<CardTemplate>('cosmic');
  const [selectedStat, setSelectedStat] = useState('overview');
  const [isDownloading, setIsDownloading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleCopyText = async () => {
    const text = generateShareText(stats, birthday);
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = async () => {
    if (!cardRef.current) return;
    
    setIsDownloading(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: null,
        scale: 2, // Higher resolution
        logging: false,
        useCORS: true,
      });
      
      const link = document.createElement('a');
      link.download = `lifestats-${selectedStat}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error('Failed to generate image:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleTwitterShare = () => {
    const age = Math.floor(stats.earthOrbits);
    const statText = getStatText();
    const text = `${statText}\n\nCalculate your life stats 👇`;
    
    const url = encodeURIComponent('https://lifestats-eight.vercel.app');
    const encodedText = encodeURIComponent(text);
    window.open(`https://twitter.com/intent/tweet?text=${encodedText}&url=${url}`, '_blank');
  };

  const getStatText = () => {
    const age = Math.floor(stats.earthOrbits);
    switch (selectedStat) {
      case 'heartbeats':
        return `💓 My heart has beaten ${formatNumber(stats.heartbeats)} times in ${age} years.`;
      case 'breaths':
        return `🌬️ I've taken ${formatNumber(stats.breaths)} breaths in my lifetime.`;
      case 'seconds':
        return `⏱️ I've been alive for ${formatNumber(stats.secondsAlive)} seconds.`;
      case 'moons':
        return `🌙 I've witnessed ${stats.fullMoons} full moons in my life.`;
      case 'space':
        return `🚀 I've traveled ${formatNumber(stats.milesThroughSpace)} miles through space just by existing on Earth.`;
      case 'sleep':
        return `😴 I've spent ${(stats.sleepHours / 24 / 365.25).toFixed(1)} years of my life sleeping.`;
      default:
        return `🌍 I'm ${age} years old. That's ${formatNumber(stats.heartbeats)} heartbeats, ${stats.fullMoons} full moons, and ${formatNumber(stats.milesThroughSpace)} miles through space.`;
    }
  };

  const getStatValue = () => {
    switch (selectedStat) {
      case 'heartbeats': return { value: formatNumber(stats.heartbeats), label: 'heartbeats', icon: '💓' };
      case 'breaths': return { value: formatNumber(stats.breaths), label: 'breaths taken', icon: '🌬️' };
      case 'seconds': return { value: formatNumber(stats.secondsAlive), label: 'seconds alive', icon: '⏱️' };
      case 'moons': return { value: stats.fullMoons.toLocaleString(), label: 'full moons witnessed', icon: '🌙' };
      case 'space': return { value: formatNumber(stats.milesThroughSpace), label: 'miles through space', icon: '🚀' };
      case 'sleep': return { value: (stats.sleepHours / 24 / 365.25).toFixed(1), label: 'years spent sleeping', icon: '😴' };
      default: return null;
    }
  };

  const age = Math.floor(stats.earthOrbits);
  const mercuryAge = Math.floor(stats.planetaryAges.find(p => p.name === 'Mercury')?.age || 0);
  const singleStat = getStatValue();

  // Template styles
  const templateStyles: Record<CardTemplate, { bg: string; text: string; accent: string }> = {
    minimal: {
      bg: 'bg-gray-950 border border-gray-800',
      text: 'text-white',
      accent: 'text-gray-400',
    },
    bold: {
      bg: 'bg-gradient-to-br from-rose-600 via-orange-500 to-yellow-500',
      text: 'text-white',
      accent: 'text-white/80',
    },
    cosmic: {
      bg: 'bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-950 border border-indigo-500/30',
      text: 'text-white',
      accent: 'text-indigo-300',
    },
    retro: {
      bg: 'bg-gradient-to-br from-teal-900 via-emerald-900 to-cyan-900 border-2 border-emerald-400/50',
      text: 'text-emerald-100',
      accent: 'text-emerald-400',
    },
  };

  const style = templateStyles[template];

  return (
    <div className="stat-card rounded-2xl p-6">
      <h2 className="text-lg font-semibold text-gray-300 mb-4 flex items-center gap-2">
        <span>📤</span> Share Your Stats
      </h2>

      {/* Quick share buttons */}
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
          className="px-5 py-2.5 rounded-xl font-semibold text-white bg-black hover:bg-gray-900 transition-colors flex items-center gap-2 text-sm border border-gray-700"
        >
          <span>𝕏</span> Post to X
        </button>
        
        <button
          onClick={() => setShowCard(!showCard)}
          className="px-5 py-2.5 rounded-xl font-semibold text-white border border-gray-700 hover:border-indigo-500 transition-colors flex items-center gap-2 text-sm"
        >
          <span>🎴</span> {showCard ? 'Hide' : 'Create'} Image
        </button>
      </div>

      {showCard && (
        <div className="mt-4 space-y-4">
          {/* Stat selector */}
          <div>
            <label className="text-xs text-gray-400 mb-2 block">Choose a stat to feature:</label>
            <div className="flex flex-wrap gap-2">
              {STAT_OPTIONS.map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setSelectedStat(opt.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    selectedStat === opt.id
                      ? 'bg-indigo-500 text-white'
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  }`}
                >
                  {opt.icon} {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Template selector */}
          <div>
            <label className="text-xs text-gray-400 mb-2 block">Style:</label>
            <div className="flex gap-2">
              {TEMPLATES.map(t => (
                <button
                  key={t.id}
                  onClick={() => setTemplate(t.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    template === t.id
                      ? 'bg-indigo-500 text-white'
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  }`}
                >
                  {t.icon} {t.name}
                </button>
              ))}
            </div>
          </div>

          {/* Card Preview */}
          <div 
            ref={cardRef}
            className={`share-card rounded-2xl p-8 max-w-md mx-auto ${style.bg}`}
            style={{ width: '400px', minHeight: '400px' }}
          >
            {/* Single stat card */}
            {singleStat ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-8">
                <div className="text-6xl mb-4">{singleStat.icon}</div>
                <div className={`text-5xl font-black mb-2 ${style.text}`}>
                  {singleStat.value}
                </div>
                <div className={`text-lg ${style.accent}`}>
                  {singleStat.label}
                </div>
                <div className={`text-sm mt-4 ${style.accent}`}>
                  in {age} years on Earth
                </div>
                <div className={`mt-8 text-xs ${style.accent} opacity-70`}>
                  lifestats-eight.vercel.app
                </div>
              </div>
            ) : (
              /* Overview card */
              <>
                <div className="text-center mb-6">
                  <h3 className={`text-2xl font-bold mb-2 ${style.text}`}>My Life in Numbers</h3>
                  <p className={`text-sm ${style.accent}`}>
                    {age} Earth years • {mercuryAge} Mercury years
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="bg-white/10 rounded-xl p-3">
                    <div className="text-xl mb-1">💓</div>
                    <div className={`text-lg font-bold ${style.text}`}>{formatNumber(stats.heartbeats)}</div>
                    <div className={`text-[10px] ${style.accent}`}>heartbeats</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-3">
                    <div className="text-xl mb-1">🌬️</div>
                    <div className={`text-lg font-bold ${style.text}`}>{formatNumber(stats.breaths)}</div>
                    <div className={`text-[10px] ${style.accent}`}>breaths</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-3">
                    <div className="text-xl mb-1">🌙</div>
                    <div className={`text-lg font-bold ${style.text}`}>{stats.fullMoons}</div>
                    <div className={`text-[10px] ${style.accent}`}>full moons</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-3">
                    <div className="text-xl mb-1">🚀</div>
                    <div className={`text-lg font-bold ${style.text}`}>{formatNumber(stats.milesThroughSpace)}</div>
                    <div className={`text-[10px] ${style.accent}`}>miles in space</div>
                  </div>
                </div>

                {/* Planetary ages mini */}
                <div className="mt-4 bg-white/10 rounded-xl p-3">
                  <div className={`text-xs ${style.accent} mb-2 text-center`}>Age on Other Planets</div>
                  <div className="flex justify-center gap-4 text-center">
                    {stats.planetaryAges.slice(0, 4).map(planet => (
                      <div key={planet.name} className="text-center">
                        <div className="text-sm">{planet.emoji}</div>
                        <div className={`text-xs font-bold ${style.text}`}>{Math.floor(planet.age)}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <div className="inline-block bg-white/20 px-4 py-1.5 rounded-full text-xs font-semibold">
                    {stats.lifespanPercentage.toFixed(1)}% of journey complete
                  </div>
                </div>

                <div className={`mt-4 text-center text-[10px] ${style.accent} opacity-70`}>
                  lifestats-eight.vercel.app
                </div>
              </>
            )}
          </div>

          {/* Download button */}
          <div className="flex justify-center gap-3">
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="btn-primary px-6 py-3 rounded-xl font-semibold text-white flex items-center gap-2 disabled:opacity-50"
            >
              {isDownloading ? (
                <>
                  <span className="animate-spin">⏳</span> Generating...
                </>
              ) : (
                <>
                  <span>⬇️</span> Download PNG
                </>
              )}
            </button>
            <button
              onClick={handleTwitterShare}
              className="px-6 py-3 rounded-xl font-semibold text-white bg-black hover:bg-gray-900 transition-colors flex items-center gap-2 border border-gray-700"
            >
              <span>𝕏</span> Share with text
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
