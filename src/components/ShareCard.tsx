'use client';

import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { LifeStats, formatNumber, generateShareText } from '@/lib/calculations';

const SITE_URL = 'https://getlifestats.com';

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
    
    const url = encodeURIComponent('https://getlifestats.com');
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

  // Template styles - using inline styles for html2canvas compatibility (avoids CSS lab() colors)
  const templateStyles: Record<CardTemplate, { bgStyle: React.CSSProperties; textColor: string; accentColor: string; boxBg: string }> = {
    minimal: {
      bgStyle: { backgroundColor: '#030712', border: '1px solid #1f2937' },
      textColor: '#ffffff',
      accentColor: '#9ca3af',
      boxBg: 'rgba(255,255,255,0.1)',
    },
    bold: {
      bgStyle: { background: 'linear-gradient(to bottom right, #e11d48, #f97316, #eab308)' },
      textColor: '#ffffff',
      accentColor: 'rgba(255,255,255,0.8)',
      boxBg: 'rgba(255,255,255,0.15)',
    },
    cosmic: {
      bgStyle: { background: 'linear-gradient(to bottom right, #111827, #1e1b4b, #3b0764)', border: '1px solid rgba(99,102,241,0.3)' },
      textColor: '#ffffff',
      accentColor: '#a5b4fc',
      boxBg: 'rgba(255,255,255,0.1)',
    },
    retro: {
      bgStyle: { background: 'linear-gradient(to bottom right, #134e4a, #064e3b, #164e63)', border: '2px solid rgba(52,211,153,0.5)' },
      textColor: '#d1fae5',
      accentColor: '#34d399',
      boxBg: 'rgba(255,255,255,0.1)',
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

        {/* Copy & PDF — gated for future accounts */}
        <div className="relative group">
          <button
            disabled
            className="px-5 py-2.5 rounded-xl font-semibold text-gray-500 flex items-center gap-2 text-sm border border-gray-700/50 bg-gray-800/50 cursor-not-allowed"
          >
            <span>📋</span> Copy Stats
            <span className="text-[10px] bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded-full">Account</span>
          </button>
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 rounded-lg bg-gray-800 border border-gray-700 text-xs text-gray-300 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Create a free account to copy stats
          </div>
        </div>

        <div className="relative group">
          <button
            disabled
            className="px-5 py-2.5 rounded-xl font-semibold text-gray-500 flex items-center gap-2 text-sm border border-gray-700/50 bg-gray-800/50 cursor-not-allowed"
          >
            <span>📄</span> Print PDF
            <span className="text-[10px] bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded-full">Account</span>
          </button>
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 rounded-lg bg-gray-800 border border-gray-700 text-xs text-gray-300 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Create a free account to export PDF
          </div>
        </div>

      </div>

      {/* Basic image creator — free with limited stats */}
      {showCard && (
        <div className="mt-4 space-y-4">
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

          {/* Card Preview — basic overview only (full detail requires account) */}
          <div
            ref={cardRef}
            className="rounded-2xl p-8 max-w-md mx-auto"
            style={{ width: '400px', minHeight: '400px', ...style.bgStyle }}
          >
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2" style={{ color: style.textColor }}>My Life in Numbers</h3>
              <p className="text-sm" style={{ color: style.accentColor }}>
                {age} years on Earth
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="rounded-xl p-3" style={{ backgroundColor: style.boxBg }}>
                <div className="text-xl mb-1">💓</div>
                <div className="text-lg font-bold" style={{ color: style.textColor }}>{formatNumber(stats.heartbeats)}</div>
                <div className="text-[10px]" style={{ color: style.accentColor }}>heartbeats</div>
              </div>
              <div className="rounded-xl p-3" style={{ backgroundColor: style.boxBg }}>
                <div className="text-xl mb-1">🌬️</div>
                <div className="text-lg font-bold" style={{ color: style.textColor }}>{formatNumber(stats.breaths)}</div>
                <div className="text-[10px]" style={{ color: style.accentColor }}>breaths</div>
              </div>
              <div className="rounded-xl p-3" style={{ backgroundColor: style.boxBg }}>
                <div className="text-xl mb-1">🌙</div>
                <div className="text-lg font-bold" style={{ color: style.textColor }}>{stats.fullMoons}</div>
                <div className="text-[10px]" style={{ color: style.accentColor }}>full moons</div>
              </div>
              <div className="rounded-xl p-3" style={{ backgroundColor: style.boxBg }}>
                <div className="text-xl mb-1">🚀</div>
                <div className="text-lg font-bold" style={{ color: style.textColor }}>{formatNumber(stats.milesThroughSpace)}</div>
                <div className="text-[10px]" style={{ color: style.accentColor }}>miles in space</div>
              </div>
            </div>

            <div className="mt-4 text-center">
              <div className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold" style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: style.textColor }}>
                {stats.lifespanPercentage.toFixed(1)}% of journey complete
              </div>
            </div>

            <div className="mt-4 text-center text-[10px]" style={{ color: style.accentColor, opacity: 0.7 }}>
              getlifestats.com
            </div>
          </div>

          {/* Upsell for full image */}
          <div className="text-center text-xs text-gray-500">
            <span className="text-blue-400">🔓 Create a free account</span> to include all 50+ stats, body data, and cosmic journey in your image
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
          </div>
        </div>
      )}
    </div>
  );
}
