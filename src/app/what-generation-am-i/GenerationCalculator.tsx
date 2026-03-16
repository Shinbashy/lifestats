'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Generation {
  name: string;
  shortName: string;
  startYear: number;
  endYear: number;
  emoji: string;
  traits: string[];
  touchstones: string[];
  funFact: string;
  usPopulationM: number; // millions
  worldSharePct: string;
  color: string;
}

const GENERATIONS: Generation[] = [
  {
    name: 'The Greatest Generation',
    shortName: 'Greatest Generation',
    startYear: 1901,
    endYear: 1927,
    emoji: '🏅',
    traits: ['Sacrifice', 'Resilience', 'Duty', 'Civic pride'],
    touchstones: ['World War I', 'Spanish Flu', 'Great Depression', 'World War II', 'The New Deal'],
    funFact: 'Named by Tom Brokaw\'s 1998 book. They came of age during the hardest times America ever faced — and built the postwar boom anyway.',
    usPopulationM: 0.5,
    worldSharePct: '< 0.1%',
    color: 'from-amber-600/40 to-yellow-700/40',
  },
  {
    name: 'The Silent Generation',
    shortName: 'Silent Generation',
    startYear: 1928,
    endYear: 1945,
    emoji: '📻',
    traits: ['Conformist', 'Civic-minded', 'Risk-averse', 'Loyal', 'Hardworking'],
    touchstones: ['WWII childhood', 'Big Band era', 'Korean War', 'McCarthyism', 'Rise of suburbia'],
    funFact: 'Called "Silent" because they were expected to keep quiet and work within the system — yet this generation produced Martin Luther King Jr., Elvis Presley, and Bob Dylan.',
    usPopulationM: 20,
    worldSharePct: '~0.5%',
    color: 'from-slate-600/40 to-gray-700/40',
  },
  {
    name: 'Baby Boomers',
    shortName: 'Baby Boomers',
    startYear: 1946,
    endYear: 1964,
    emoji: '🌸',
    traits: ['Optimistic', 'Workaholic', 'Competitive', 'Team-oriented', 'Value-driven'],
    touchstones: ['Woodstock', 'Moon landing', 'Civil Rights Movement', 'Vietnam War', 'Beatlemania', 'First color TV'],
    funFact: 'Born during an unprecedented baby boom after WWII — 76 million babies in the US alone. They rewrote culture, politics, and the economy at every life stage.',
    usPopulationM: 69,
    worldSharePct: '~10%',
    color: 'from-orange-600/40 to-red-700/40',
  },
  {
    name: 'Generation X',
    shortName: 'Gen X',
    startYear: 1965,
    endYear: 1980,
    emoji: '🎸',
    traits: ['Independent', 'Skeptical', 'Adaptable', 'Self-reliant', 'Work-life balance focused'],
    touchstones: ['MTV', 'The Berlin Wall falling', 'AIDS crisis', 'Atari & Nintendo', 'Grunge', 'The internet beginning', 'Latchkey kids'],
    funFact: 'The "latchkey generation" grew up largely unsupervised as dual-income households became the norm. Often overlooked between Boomers and Millennials — but they built most of the early internet.',
    usPopulationM: 65,
    worldSharePct: '~9%',
    color: 'from-purple-600/40 to-violet-700/40',
  },
  {
    name: 'Millennials',
    shortName: 'Millennials',
    startYear: 1981,
    endYear: 1996,
    emoji: '💻',
    traits: ['Collaborative', 'Tech-native', 'Purpose-driven', 'Optimistic', 'Debt-burdened'],
    touchstones: ['9/11', 'Harry Potter', 'The Great Recession', 'Facebook/social media', 'Smartphones', 'Climate awareness', 'Student debt crisis'],
    funFact: 'The first digital natives — they remember both life before the internet and after. Now the largest living adult generation in the US, reshaping everything from the workplace to housing markets.',
    usPopulationM: 72,
    worldSharePct: '~23%',
    color: 'from-emerald-600/40 to-teal-700/40',
  },
  {
    name: 'Generation Z',
    shortName: 'Gen Z',
    startYear: 1997,
    endYear: 2012,
    emoji: '📱',
    traits: ['Pragmatic', 'Diverse', 'Socially conscious', 'Digital-first', 'Entrepreneurial'],
    touchstones: ['TikTok & YouTube', 'COVID-19 pandemic', 'School shootings & lockdown drills', 'BLM movement', 'Climate strikes', 'Cancel culture', 'Streaming wars'],
    funFact: 'True digital natives — the oldest Zoomers were 10 when the iPhone launched. They\'ve never known a world without the internet. Most racially and ethnically diverse generation in US history.',
    usPopulationM: 68,
    worldSharePct: '~20%',
    color: 'from-cyan-600/40 to-blue-700/40',
  },
  {
    name: 'Generation Alpha',
    shortName: 'Gen Alpha',
    startYear: 2013,
    endYear: 2025,
    emoji: '🤖',
    traits: ['AI-native', 'Tech-embedded', 'Diverse', 'Globally connected', 'Still emerging'],
    touchstones: ['iPad as a toy', 'Roblox & Minecraft', 'AI assistants from birth', 'COVID as early memory', 'Climate as lived reality', 'TikTok & YouTube Kids'],
    funFact: 'The first generation born entirely in the 2000s. They\'re growing up alongside AI — for them, talking to machines is as natural as talking to people. The largest generation in history, expected to top 2 billion worldwide.',
    usPopulationM: 48,
    worldSharePct: '~16%',
    color: 'from-pink-600/40 to-rose-700/40',
  },
];

function getGeneration(birthYear: number): Generation | null {
  return GENERATIONS.find(g => birthYear >= g.startYear && birthYear <= g.endYear) ?? null;
}

function getPercentThroughGeneration(birthYear: number, gen: Generation): number {
  const span = gen.endYear - gen.startYear;
  const position = birthYear - gen.startYear;
  return Math.round((position / span) * 100);
}

export default function GenerationCalculator() {
  const [birthYear, setBirthYear] = useState<string>('');
  const [result, setResult] = useState<Generation | null>(null);
  const [percentThrough, setPercentThrough] = useState<number>(0);
  const [error, setError] = useState<string>('');

  // Try to pre-fill from localStorage (main app data)
  useEffect(() => {
    try {
      const partial = localStorage.getItem('lifestats_partial_data');
      if (partial) {
        const data = JSON.parse(partial) as Record<string, unknown>;
        if (typeof data.birthYear === 'string' && data.birthYear) {
          setBirthYear(data.birthYear);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  // Auto-calculate when birthYear changes and is valid
  useEffect(() => {
    if (birthYear.length === 4) {
      calculate(birthYear);
    }
  }, [birthYear]);

  function calculate(year: string) {
    const num = parseInt(year, 10);
    if (isNaN(num) || num < 1901 || num > new Date().getFullYear()) {
      setError('Please enter a valid birth year between 1901 and today.');
      setResult(null);
      return;
    }
    if (num > 2025) {
      setError('Generation Alpha is the most recent defined generation (2013–2025). Check back soon!');
      setResult(null);
      return;
    }
    setError('');
    const gen = getGeneration(num);
    if (!gen) {
      setError('No generation data found for that year.');
      setResult(null);
      return;
    }
    setResult(gen);
    setPercentThrough(getPercentThroughGeneration(num, gen));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    calculate(birthYear);
  }

  return (
    <div className="space-y-8">
      {/* Input */}
      <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
        <h2 className="text-2xl font-semibold mb-4 text-white">Enter Your Birth Year</h2>
        <div className="flex gap-4 items-end flex-wrap">
          <div className="flex-1 min-w-[160px]">
            <label htmlFor="birthYear" className="block text-emerald-200 mb-2 text-sm font-medium">
              Birth Year
            </label>
            <input
              id="birthYear"
              type="number"
              min={1901}
              max={new Date().getFullYear()}
              value={birthYear}
              onChange={(e) => setBirthYear(e.target.value)}
              placeholder="e.g. 1990"
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white text-xl placeholder-white/40 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/30 transition-all"
            />
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-3 rounded-xl text-lg font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all shadow-lg"
          >
            Find My Generation
          </button>
        </div>
        {error && <p className="mt-3 text-red-400 text-sm">{error}</p>}
      </form>

      {/* Result */}
      {result && (
        <div className={`bg-gradient-to-br ${result.color} backdrop-blur-sm rounded-2xl p-8 border border-white/20 space-y-6`}>
          <div className="flex items-center gap-4">
            <span className="text-6xl">{result.emoji}</span>
            <div>
              <p className="text-emerald-300 text-sm font-medium uppercase tracking-wider mb-1">You Are</p>
              <h2 className="text-4xl font-bold text-white">{result.name}</h2>
              <p className="text-emerald-200 text-lg mt-1">{result.startYear}–{result.endYear}</p>
            </div>
          </div>

          {/* Percent through generation */}
          <div className="bg-white/10 rounded-xl p-5">
            <div className="flex justify-between items-center mb-2">
              <span className="text-emerald-200 text-sm">{result.startYear}</span>
              <span className="text-white font-semibold">
                You&apos;re {percentThrough}% through the {result.shortName} span
              </span>
              <span className="text-emerald-200 text-sm">{result.endYear}</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-emerald-400 to-teal-400 h-3 rounded-full transition-all duration-700"
                style={{ width: `${percentThrough}%` }}
              />
            </div>
            <p className="text-center text-emerald-300 text-sm mt-2">
              Born {percentThrough === 0 ? 'at the very start' : percentThrough === 100 ? 'at the very end' : `${percentThrough}% of the way`} through {result.shortName}
            </p>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-3xl font-bold text-white">{result.endYear - result.startYear + 1}</p>
              <p className="text-emerald-300 text-xs mt-1">Year Span</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-3xl font-bold text-white">~{result.usPopulationM}M</p>
              <p className="text-emerald-300 text-xs mt-1">US Members</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-white">{result.worldSharePct}</p>
              <p className="text-emerald-300 text-xs mt-1">World Population</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-3xl font-bold text-white">{result.traits.length}</p>
              <p className="text-emerald-300 text-xs mt-1">Core Traits</p>
            </div>
          </div>

          {/* Traits */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-3">🧠 Generation Traits</h3>
            <div className="flex flex-wrap gap-2">
              {result.traits.map((trait) => (
                <span
                  key={trait}
                  className="bg-white/15 border border-white/25 rounded-full px-4 py-1 text-emerald-100 text-sm font-medium"
                >
                  {trait}
                </span>
              ))}
            </div>
          </div>

          {/* Cultural touchstones */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-3">🎯 Cultural Touchstones</h3>
            <div className="flex flex-wrap gap-2">
              {result.touchstones.map((t) => (
                <span
                  key={t}
                  className="bg-white/10 border border-white/20 rounded-full px-3 py-1 text-emerald-200 text-sm"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Fun fact */}
          <div className="bg-white/10 border border-white/20 rounded-xl p-5">
            <h3 className="text-lg font-semibold text-white mb-2">💡 Fun Fact</h3>
            <p className="text-emerald-200 leading-relaxed">{result.funFact}</p>
          </div>

          <div className="pt-2">
            <Link
              href="/#calculator"
              className="inline-block bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all shadow-lg"
            >
              See Your Full Life Stats at LifeStats →
            </Link>
          </div>
        </div>
      )}

      {/* Generation timeline (always visible) */}
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-white mb-4">📅 All Generations at a Glance</h2>
        <div className="space-y-2">
          {GENERATIONS.map((g) => (
            <div
              key={g.name}
              className={`flex items-center gap-3 rounded-xl p-3 cursor-pointer transition-all ${
                result?.name === g.name
                  ? 'bg-emerald-500/30 border border-emerald-400/50'
                  : 'bg-white/5 hover:bg-white/10'
              }`}
              onClick={() => {
                const midYear = Math.floor((g.startYear + g.endYear) / 2).toString();
                setBirthYear(midYear);
              }}
            >
              <span className="text-2xl">{g.emoji}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-white font-medium text-sm">{g.shortName}</span>
                  <span className="text-emerald-300 text-xs">{g.startYear}–{g.endYear}</span>
                </div>
              </div>
              <span className="text-emerald-400 text-xs shrink-0">{g.worldSharePct} of world</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
