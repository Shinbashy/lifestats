'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface ZodiacSign {
  name: string;
  symbol: string;
  emoji: string;
  element: string;
  elementEmoji: string;
  dateRange: string;
  traits: string;
  ruling: string;
}

interface ChineseZodiac {
  animal: string;
  emoji: string;
  traits: string;
}

interface ZodiacResult {
  western: ZodiacSign;
  chinese: ChineseZodiac;
  birthYear: number;
}

const WESTERN_SIGNS: ZodiacSign[] = [
  { name: 'Aries', symbol: '♈', emoji: '🐏', element: 'Fire', elementEmoji: '🔥', dateRange: 'Mar 21 – Apr 19', traits: 'Bold, ambitious, and energetic. Natural leaders who dive headfirst into challenges.', ruling: 'Mars' },
  { name: 'Taurus', symbol: '♉', emoji: '🐂', element: 'Earth', elementEmoji: '🌍', dateRange: 'Apr 20 – May 20', traits: 'Reliable, patient, and practical. Deeply appreciates beauty, comfort, and stability.', ruling: 'Venus' },
  { name: 'Gemini', symbol: '♊', emoji: '👯', element: 'Air', elementEmoji: '💨', dateRange: 'May 21 – Jun 20', traits: 'Curious, adaptable, and witty. Masters of communication who can talk to anyone about anything.', ruling: 'Mercury' },
  { name: 'Cancer', symbol: '♋', emoji: '🦀', element: 'Water', elementEmoji: '🌊', dateRange: 'Jun 21 – Jul 22', traits: 'Intuitive, protective, and empathetic. Fiercely loyal to those they love, deeply sensitive.', ruling: 'Moon' },
  { name: 'Leo', symbol: '♌', emoji: '🦁', element: 'Fire', elementEmoji: '🔥', dateRange: 'Jul 23 – Aug 22', traits: 'Charismatic, creative, and generous. Natural performers who love being in the spotlight.', ruling: 'Sun' },
  { name: 'Virgo', symbol: '♍', emoji: '🌾', element: 'Earth', elementEmoji: '🌍', dateRange: 'Aug 23 – Sep 22', traits: 'Analytical, meticulous, and helpful. Detail-oriented perfectionists with sharp, practical minds.', ruling: 'Mercury' },
  { name: 'Libra', symbol: '♎', emoji: '⚖️', element: 'Air', elementEmoji: '💨', dateRange: 'Sep 23 – Oct 22', traits: 'Diplomatic, fair-minded, and charming. Seekers of balance who excel at seeing all sides.', ruling: 'Venus' },
  { name: 'Scorpio', symbol: '♏', emoji: '🦂', element: 'Water', elementEmoji: '🌊', dateRange: 'Oct 23 – Nov 21', traits: 'Intense, resourceful, and deeply perceptive. Drawn to mystery and transformation.', ruling: 'Pluto / Mars' },
  { name: 'Sagittarius', symbol: '♐', emoji: '🏹', element: 'Fire', elementEmoji: '🔥', dateRange: 'Nov 22 – Dec 21', traits: 'Adventurous, optimistic, and philosophical. Eternal seekers of knowledge, freedom, and truth.', ruling: 'Jupiter' },
  { name: 'Capricorn', symbol: '♑', emoji: '🐐', element: 'Earth', elementEmoji: '🌍', dateRange: 'Dec 22 – Jan 19', traits: 'Disciplined, responsible, and ambitious. Masters of long-term planning who always reach the summit.', ruling: 'Saturn' },
  { name: 'Aquarius', symbol: '♒', emoji: '🏺', element: 'Air', elementEmoji: '💨', dateRange: 'Jan 20 – Feb 18', traits: 'Independent, innovative, and humanitarian. Visionaries who march to the beat of their own drum.', ruling: 'Uranus / Saturn' },
  { name: 'Pisces', symbol: '♓', emoji: '🐟', element: 'Water', elementEmoji: '🌊', dateRange: 'Feb 19 – Mar 20', traits: 'Compassionate, artistic, and deeply intuitive. Dreamers who feel everything at full intensity.', ruling: 'Neptune / Jupiter' },
];

const CHINESE_ANIMALS: ChineseZodiac[] = [
  { animal: 'Rat', emoji: '🐀', traits: 'Clever, adaptable, quick-witted' },
  { animal: 'Ox', emoji: '🐂', traits: 'Diligent, reliable, determined' },
  { animal: 'Tiger', emoji: '🐅', traits: 'Brave, confident, competitive' },
  { animal: 'Rabbit', emoji: '🐇', traits: 'Gentle, kind, graceful' },
  { animal: 'Dragon', emoji: '🐉', traits: 'Energetic, charismatic, lucky' },
  { animal: 'Snake', emoji: '🐍', traits: 'Wise, mysterious, intuitive' },
  { animal: 'Horse', emoji: '🐴', traits: 'Energetic, free-spirited, social' },
  { animal: 'Goat', emoji: '🐐', traits: 'Creative, gentle, empathetic' },
  { animal: 'Monkey', emoji: '🐒', traits: 'Playful, clever, versatile' },
  { animal: 'Rooster', emoji: '🐓', traits: 'Observant, hardworking, proud' },
  { animal: 'Dog', emoji: '🐕', traits: 'Loyal, honest, diligent' },
  { animal: 'Pig', emoji: '🐷', traits: 'Generous, sincere, energetic' },
];

// Chinese zodiac base year: 1900 = Rat (index 0)
// Cycle: Rat(0) Ox(1) Tiger(2) Rabbit(3) Dragon(4) Snake(5) Horse(6) Goat(7) Monkey(8) Rooster(9) Dog(10) Pig(11)
function getChineseZodiac(year: number): ChineseZodiac {
  const index = ((year - 1900) % 12 + 12) % 12;
  return CHINESE_ANIMALS[index];
}

function getWesternSign(month: number, day: number): ZodiacSign {
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return WESTERN_SIGNS[0]; // Aries
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return WESTERN_SIGNS[1]; // Taurus
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return WESTERN_SIGNS[2]; // Gemini
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return WESTERN_SIGNS[3]; // Cancer
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return WESTERN_SIGNS[4]; // Leo
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return WESTERN_SIGNS[5]; // Virgo
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return WESTERN_SIGNS[6]; // Libra
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return WESTERN_SIGNS[7]; // Scorpio
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return WESTERN_SIGNS[8]; // Sagittarius
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return WESTERN_SIGNS[9]; // Capricorn
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return WESTERN_SIGNS[10]; // Aquarius
  return WESTERN_SIGNS[11]; // Pisces
}

function calcZodiac(birthdate: string): ZodiacResult | null {
  const birth = new Date(birthdate + 'T00:00:00');
  if (isNaN(birth.getTime())) return null;
  const now = new Date();
  if (birth > now) return null;

  const month = birth.getMonth() + 1; // 1-12
  const day = birth.getDate();
  const year = birth.getFullYear();

  return {
    western: getWesternSign(month, day),
    chinese: getChineseZodiac(year),
    birthYear: year,
  };
}

const ELEMENT_COLORS: Record<string, string> = {
  Fire: 'from-red-600/30 to-orange-700/30 border-red-400/30',
  Earth: 'from-green-600/30 to-emerald-700/30 border-green-400/30',
  Air: 'from-blue-600/30 to-sky-700/30 border-blue-400/30',
  Water: 'from-cyan-600/30 to-teal-700/30 border-cyan-400/30',
};

export default function ZodiacCalculator() {
  const [birthday, setBirthday] = useState<string>('');
  const [result, setResult] = useState<ZodiacResult | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    try {
      const stored = localStorage.getItem('lifestats_birthday');
      if (stored) {
        setBirthday(stored);
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    if (birthday) {
      const r = calcZodiac(birthday);
      if (r) {
        setError('');
        setResult(r);
        try { localStorage.setItem('lifestats_birthday', birthday); } catch { /* ignore */ }
      }
    }
  }, [birthday]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const r = calcZodiac(birthday);
    if (!r) {
      setError('Please enter a valid past birthdate.');
      setResult(null);
    } else {
      setError('');
      setResult(r);
      try { localStorage.setItem('lifestats_birthday', birthday); } catch { /* ignore */ }
    }
  }

  return (
    <div className="space-y-8">
      {/* Input */}
      <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
        <h2 className="text-2xl font-semibold mb-4 text-white">Enter Your Birthdate</h2>
        <div className="flex gap-4 items-end flex-wrap">
          <div className="flex-1 min-w-[200px]">
            <label htmlFor="birthday" className="block text-indigo-200 mb-2 text-sm font-medium">
              Date of Birth
            </label>
            <input
              id="birthday"
              type="date"
              value={birthday}
              max={new Date().toISOString().split('T')[0]}
              onChange={(e) => setBirthday(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white text-lg placeholder-white/40 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/30 transition-all [color-scheme:dark]"
            />
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-8 py-3 rounded-xl text-lg font-semibold hover:from-indigo-600 hover:to-purple-600 transition-all shadow-lg"
          >
            Find My Sign
          </button>
        </div>
        {error && <p className="mt-3 text-red-400 text-sm">{error}</p>}
      </form>

      {/* Results */}
      {result && (
        <div className="space-y-6">
          {/* Western Zodiac - Main */}
          <div className={`bg-gradient-to-br ${ELEMENT_COLORS[result.western.element]} backdrop-blur-sm rounded-2xl p-8 border text-center`}>
            <p className="text-indigo-300 text-sm font-medium uppercase tracking-wider mb-2">Your Western Zodiac Sign</p>
            <p className="text-8xl mb-3">{result.western.symbol}</p>
            <p className="text-5xl font-bold text-white mb-1">{result.western.name}</p>
            <p className="text-2xl text-indigo-200 mb-3">{result.western.elementEmoji} {result.western.element} Sign</p>
            <p className="text-indigo-300 text-sm">{result.western.dateRange}</p>
          </div>

          {/* Details */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-3">✨ Personality Traits</h3>
              <p className="text-indigo-200 leading-relaxed">{result.western.traits}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-3">🌟 Sign Details</h3>
              <ul className="space-y-2 text-indigo-200 text-sm">
                <li><strong className="text-white">Symbol:</strong> {result.western.symbol} {result.western.name}</li>
                <li><strong className="text-white">Element:</strong> {result.western.elementEmoji} {result.western.element}</li>
                <li><strong className="text-white">Dates:</strong> {result.western.dateRange}</li>
                <li><strong className="text-white">Ruling Planet:</strong> {result.western.ruling}</li>
              </ul>
            </div>
          </div>

          {/* Chinese Zodiac */}
          <div className="bg-gradient-to-br from-red-800/30 to-yellow-900/30 backdrop-blur-sm rounded-2xl p-8 border border-red-500/30">
            <h3 className="text-lg font-semibold text-indigo-200 uppercase tracking-wider text-sm mb-4">Your Chinese Zodiac ({result.birthYear})</h3>
            <div className="flex items-center gap-6">
              <span className="text-7xl">{result.chinese.emoji}</span>
              <div>
                <p className="text-4xl font-bold text-white">Year of the {result.chinese.animal}</p>
                <p className="text-yellow-300 mt-2">{result.chinese.traits}</p>
                <p className="text-red-300 text-sm mt-1">Born in {result.birthYear} — a {result.chinese.animal} year</p>
              </div>
            </div>
          </div>

          {/* All Signs Reference */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">♈ All 12 Zodiac Signs</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {WESTERN_SIGNS.map((sign) => (
                <div
                  key={sign.name}
                  className={`rounded-lg p-3 text-sm ${sign.name === result.western.name ? 'bg-indigo-500/40 border border-indigo-400/60' : 'bg-white/5'}`}
                >
                  <span className="mr-2">{sign.symbol}</span>
                  <span className={sign.name === result.western.name ? 'text-white font-semibold' : 'text-indigo-300'}>{sign.name}</span>
                  <div className="text-indigo-400 text-xs mt-0.5">{sign.dateRange}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <Link
              href="/#calculator"
              className="inline-block bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-indigo-600 hover:to-purple-600 transition-all shadow-lg"
            >
              See Your Full Life Stats at LifeStats →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
