'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface ChineseAnimal {
  name: string;
  emoji: string;
  years: string;
  traits: string;
  strengths: string;
  weaknesses: string;
  luckyNumbers: number[];
  luckyColors: string[];
  compatible: string[];
  challenging: string[];
  yinYang: 'Yang' | 'Yin';
}

interface ElementInfo {
  name: string;
  emoji: string;
  description: string;
}

interface ZodiacResult {
  animal: ChineseAnimal;
  element: ElementInfo;
  year: number;
  polarity: 'Yang' | 'Yin';
}

const ANIMALS: ChineseAnimal[] = [
  {
    name: 'Rat', emoji: '🐀', years: '1924, 1936, 1948, 1960, 1972, 1984, 1996, 2008, 2020',
    traits: 'Quick-witted, resourceful, adaptable, and charming. Rats are sharp observers who rarely miss an opportunity.',
    strengths: 'Intelligent, imaginative, sociable, quick-thinking',
    weaknesses: 'Stubborn, opportunistic, picky, prone to overthinking',
    luckyNumbers: [2, 3], luckyColors: ['Blue', 'Gold', 'Green'],
    compatible: ['Dragon', 'Monkey', 'Ox'], challenging: ['Horse', 'Rooster'],
    yinYang: 'Yang'
  },
  {
    name: 'Ox', emoji: '🐂', years: '1925, 1937, 1949, 1961, 1973, 1985, 1997, 2009, 2021',
    traits: 'Diligent, dependable, determined, and honest. The Ox values hard work over shortcuts and rarely gives up.',
    strengths: 'Reliable, patient, kind, methodical, trustworthy',
    weaknesses: 'Stubborn, slow to change, poor communicator',
    luckyNumbers: [1, 4], luckyColors: ['White', 'Yellow', 'Green'],
    compatible: ['Snake', 'Rooster', 'Rat'], challenging: ['Tiger', 'Dragon', 'Horse', 'Goat'],
    yinYang: 'Yin'
  },
  {
    name: 'Tiger', emoji: '🐅', years: '1926, 1938, 1950, 1962, 1974, 1986, 1998, 2010, 2022',
    traits: 'Brave, competitive, confident, and unpredictable. Tigers are natural leaders who take risks and live boldly.',
    strengths: 'Courageous, ambitious, enthusiastic, generous',
    weaknesses: 'Impulsive, short-tempered, arrogant, reckless',
    luckyNumbers: [1, 3, 4], luckyColors: ['Blue', 'Grey', 'Orange'],
    compatible: ['Horse', 'Dog', 'Pig'], challenging: ['Ox', 'Tiger', 'Snake', 'Monkey'],
    yinYang: 'Yang'
  },
  {
    name: 'Rabbit', emoji: '🐇', years: '1927, 1939, 1951, 1963, 1975, 1987, 1999, 2011, 2023',
    traits: 'Gentle, kind, graceful, and sensitive. Rabbits are diplomatic peacemakers who create harmony around them.',
    strengths: 'Elegant, generous, kind, artistic, compassionate',
    weaknesses: 'Overly cautious, indecisive, timid, self-indulgent',
    luckyNumbers: [3, 4, 6], luckyColors: ['Red', 'Pink', 'Purple', 'Blue'],
    compatible: ['Goat', 'Pig', 'Dog'], challenging: ['Rat', 'Ox', 'Dragon', 'Rooster'],
    yinYang: 'Yin'
  },
  {
    name: 'Dragon', emoji: '🐉', years: '1928, 1940, 1952, 1964, 1976, 1988, 2000, 2012, 2024',
    traits: 'Energetic, charismatic, lucky, and innovative. The Dragon is the most auspicious sign — magnetic and fearless.',
    strengths: 'Intelligent, ambitious, enthusiastic, passionate',
    weaknesses: 'Arrogant, impatient, intolerant, inflexible',
    luckyNumbers: [1, 6, 7], luckyColors: ['Gold', 'Silver', 'Grayish White'],
    compatible: ['Rat', 'Tiger', 'Snake', 'Monkey', 'Rooster'], challenging: ['Ox', 'Goat', 'Dog'],
    yinYang: 'Yang'
  },
  {
    name: 'Snake', emoji: '🐍', years: '1929, 1941, 1953, 1965, 1977, 1989, 2001, 2013, 2025',
    traits: 'Wise, thoughtful, intuitive, and elegant. Snakes are deep thinkers who trust their instincts above all.',
    strengths: 'Philosophical, intelligent, gracious, wise, organized',
    weaknesses: 'Jealous, suspicious, pessimistic, reluctant to share',
    luckyNumbers: [2, 8, 9], luckyColors: ['Red', 'Light Yellow', 'Black'],
    compatible: ['Dragon', 'Rooster', 'Ox'], challenging: ['Tiger', 'Rabbit', 'Pig'],
    yinYang: 'Yin'
  },
  {
    name: 'Horse', emoji: '🐴', years: '1930, 1942, 1954, 1966, 1978, 1990, 2002, 2014, 2026',
    traits: 'Animated, active, energetic, and free-spirited. Horses crave adventure and thrive in social settings.',
    strengths: 'Cheerful, perceptive, energetic, independent',
    weaknesses: 'Hot-headed, impatient, careless, financially reckless',
    luckyNumbers: [2, 3, 7], luckyColors: ['Yellow', 'Green'],
    compatible: ['Tiger', 'Goat', 'Dog'], challenging: ['Rat', 'Ox', 'Rabbit'],
    yinYang: 'Yang'
  },
  {
    name: 'Goat', emoji: '🐐', years: '1931, 1943, 1955, 1967, 1979, 1991, 2003, 2015, 2027',
    traits: 'Creative, gentle, compassionate, and artistic. Goats are empathetic dreamers who value harmony and beauty.',
    strengths: 'Gentle, creative, generous, kind, empathetic',
    weaknesses: 'Indecisive, overly dependent, pessimistic, worrisome',
    luckyNumbers: [2, 7], luckyColors: ['Brown', 'Red', 'Purple'],
    compatible: ['Rabbit', 'Horse', 'Pig'], challenging: ['Ox', 'Dog', 'Dragon', 'Tiger'],
    yinYang: 'Yin'
  },
  {
    name: 'Monkey', emoji: '🐒', years: '1932, 1944, 1956, 1968, 1980, 1992, 2004, 2016, 2028',
    traits: 'Playful, clever, versatile, and quick. Monkeys solve problems effortlessly with their sharp wit and creativity.',
    strengths: 'Clever, curious, innovative, sociable, optimistic',
    weaknesses: 'Reckless, arrogant, opportunistic, lack of focus',
    luckyNumbers: [1, 7, 8], luckyColors: ['White', 'Blue', 'Gold'],
    compatible: ['Rat', 'Dragon', 'Snake'], challenging: ['Tiger', 'Pig'],
    yinYang: 'Yang'
  },
  {
    name: 'Rooster', emoji: '🐓', years: '1933, 1945, 1957, 1969, 1981, 1993, 2005, 2017, 2029',
    traits: 'Observant, hardworking, courageous, and talented. Roosters are perfectionists who never miss a detail.',
    strengths: 'Honest, energetic, intelligent, ambitious, capable',
    weaknesses: 'Arrogant, boastful, impatient, overly critical',
    luckyNumbers: [5, 7, 8], luckyColors: ['Gold', 'Brown', 'Yellow'],
    compatible: ['Ox', 'Snake', 'Dragon'], challenging: ['Rat', 'Rabbit', 'Dog'],
    yinYang: 'Yin'
  },
  {
    name: 'Dog', emoji: '🐕', years: '1934, 1946, 1958, 1970, 1982, 1994, 2006, 2018, 2030',
    traits: 'Loyal, honest, diligent, and kind. Dogs are devoted companions who put others first without hesitation.',
    strengths: 'Loyal, reliable, helpful, courageous, responsive',
    weaknesses: 'Anxious, stubborn, defensive, pessimistic',
    luckyNumbers: [3, 4, 9], luckyColors: ['Green', 'Red', 'Purple'],
    compatible: ['Tiger', 'Rabbit', 'Horse'], challenging: ['Dragon', 'Goat', 'Rooster'],
    yinYang: 'Yang'
  },
  {
    name: 'Pig', emoji: '🐷', years: '1935, 1947, 1959, 1971, 1983, 1995, 2007, 2019, 2031',
    traits: 'Generous, sincere, compassionate, and diligent. Pigs have a great capacity for love and always see the best in people.',
    strengths: 'Compassionate, generous, diligent, sincere, gentle',
    weaknesses: 'Naïve, over-reliant on others, gullible, self-indulgent',
    luckyNumbers: [2, 5, 8], luckyColors: ['Yellow', 'Grey', 'Brown', 'Gold'],
    compatible: ['Tiger', 'Rabbit', 'Goat'], challenging: ['Snake', 'Monkey'],
    yinYang: 'Yin'
  },
];

const ELEMENTS: ElementInfo[] = [
  { name: 'Metal', emoji: '⚙️', description: 'Strong-willed, determined, ambitious. Metal people are principled and decisive, sometimes rigid.' },
  { name: 'Water', emoji: '🌊', description: 'Wise, intuitive, flexible. Water people read situations well and excel at communication.' },
  { name: 'Wood', emoji: '🌳', description: 'Creative, compassionate, generous. Wood people are growth-oriented and deeply empathetic.' },
  { name: 'Fire', emoji: '🔥', description: 'Passionate, energetic, charismatic. Fire people are dynamic leaders who inspire everyone around them.' },
  { name: 'Earth', emoji: '🪨', description: 'Stable, reliable, practical. Earth people are grounded and excellent planners who build lasting things.' },
];

// Year 1900 = Rat (index 0), cycle of 12
// Year 1900 = Metal (index 0 of 5-element pairs: Metal, Water, Wood, Fire, Earth)
// Each element repeats for 2 years, so: 1900-01=Metal, 1902-03=Water, 1904-05=Wood, 1906-07=Fire, 1908-09=Earth, 1910-11=Metal...
function getAnimal(year: number): ChineseAnimal {
  const idx = ((year - 1900) % 12 + 12) % 12;
  return ANIMALS[idx];
}

function getElement(year: number): ElementInfo {
  // Stems cycle of 10 (5 elements x 2 for yin/yang), start from 1900 = Metal (index 0)
  const stemIdx = ((year - 1900) % 10 + 10) % 10;
  const elementIdx = Math.floor(stemIdx / 2);
  return ELEMENTS[elementIdx];
}

function calcZodiac(birthdate: string): ZodiacResult | null {
  const birth = new Date(birthdate + 'T00:00:00');
  if (isNaN(birth.getTime())) return null;
  const now = new Date();
  if (birth > now) return null;

  const year = birth.getFullYear();
  const animal = getAnimal(year);
  const element = getElement(year);

  return { animal, element, year, polarity: animal.yinYang };
}

const ELEMENT_COLORS: Record<string, string> = {
  Metal: 'from-gray-400/20 to-slate-500/20 border-gray-400/30',
  Water: 'from-blue-600/20 to-cyan-700/20 border-blue-400/30',
  Wood: 'from-green-600/20 to-emerald-700/20 border-green-400/30',
  Fire: 'from-red-600/20 to-orange-700/20 border-red-400/30',
  Earth: 'from-yellow-600/20 to-amber-700/20 border-yellow-400/30',
};

export default function ChineseZodiacCalculator() {
  const [birthday, setBirthday] = useState<string>('');
  const [result, setResult] = useState<ZodiacResult | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    try {
      const stored = localStorage.getItem('lifestats_birthdate') || localStorage.getItem('lifestats_birthday');
      if (stored) {
        setBirthday(stored);
        const r = calcZodiac(stored);
        if (r) setResult(r);
      }
    } catch { /* ignore */ }
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const r = calcZodiac(birthday);
    if (!r) {
      setError('Please enter a valid past birthdate.');
      setResult(null);
    } else {
      setError('');
      setResult(r);
      try {
        localStorage.setItem('lifestats_birthdate', birthday);
        localStorage.setItem('lifestats_birthday', birthday);
      } catch { /* ignore */ }
    }
  }

  return (
    <div className="space-y-8">
      {/* Input */}
      <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
        <h2 className="text-2xl font-semibold mb-4 text-white">Enter Your Birthdate</h2>
        <div className="flex gap-4 items-end flex-wrap">
          <div className="flex-1 min-w-[200px]">
            <label htmlFor="birthday" className="block text-red-200 mb-2 text-sm font-medium">
              Date of Birth
            </label>
            <input
              id="birthday"
              type="date"
              value={birthday}
              max={new Date().toISOString().split('T')[0]}
              onChange={(e) => setBirthday(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white text-lg placeholder-white/40 focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-400/30 transition-all [color-scheme:dark]"
            />
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-8 py-3 rounded-xl text-lg font-semibold hover:from-red-600 hover:to-orange-600 transition-all shadow-lg"
          >
            Find My Sign
          </button>
        </div>
        {error && <p className="mt-3 text-red-400 text-sm">{error}</p>}
      </form>

      {/* Results */}
      {result && (
        <div className="space-y-6">
          {/* Main Animal Card */}
          <div className={`bg-gradient-to-br ${ELEMENT_COLORS[result.element.name]} backdrop-blur-sm rounded-2xl p-8 border text-center`}>
            <p className="text-red-300 text-sm font-medium uppercase tracking-wider mb-3">Your Chinese Zodiac</p>
            <p className="text-9xl mb-3">{result.animal.emoji}</p>
            <p className="text-5xl font-bold text-white mb-2">Year of the {result.animal.name}</p>
            <p className="text-2xl text-red-200 mb-1">
              {result.element.emoji} {result.element.name} {result.animal.name}
            </p>
            <p className="text-red-300">
              Born {result.year} · {result.polarity === 'Yang' ? '☀️ Yang' : '🌙 Yin'}
            </p>
          </div>

          {/* Details Grid */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-3">✨ Personality</h3>
              <p className="text-red-200 leading-relaxed text-sm">{result.animal.traits}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-3">{result.element.emoji} Element: {result.element.name}</h3>
              <p className="text-red-200 text-sm leading-relaxed">{result.element.description}</p>
            </div>
          </div>

          {/* Strengths & Weaknesses */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-green-500/10 border border-green-400/30 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-green-300 mb-3">💪 Strengths</h3>
              <p className="text-green-200 text-sm">{result.animal.strengths}</p>
            </div>
            <div className="bg-red-500/10 border border-red-400/30 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-red-300 mb-3">⚠️ Challenges</h3>
              <p className="text-red-200 text-sm">{result.animal.weaknesses}</p>
            </div>
          </div>

          {/* Lucky Numbers & Colors */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">🍀 Lucky Numbers & Colors</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-red-300 text-xs uppercase tracking-wider mb-2">Lucky Numbers</p>
                <div className="flex gap-2">
                  {result.animal.luckyNumbers.map(n => (
                    <span key={n} className="bg-red-500/30 border border-red-400/40 rounded-full w-10 h-10 flex items-center justify-center text-white font-bold text-lg">
                      {n}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-red-300 text-xs uppercase tracking-wider mb-2">Lucky Colors</p>
                <div className="flex gap-2 flex-wrap">
                  {result.animal.luckyColors.map(c => (
                    <span key={c} className="bg-white/10 border border-white/20 rounded-lg px-3 py-1 text-white text-sm">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Compatibility */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">💕 Compatibility</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-green-300 text-xs uppercase tracking-wider mb-2">✅ Most Compatible</p>
                <div className="flex gap-2 flex-wrap">
                  {result.animal.compatible.map(a => {
                    const animal = ANIMALS.find(x => x.name === a);
                    return (
                      <span key={a} className="bg-green-500/20 border border-green-400/30 rounded-lg px-3 py-1 text-white text-sm">
                        {animal?.emoji} {a}
                      </span>
                    );
                  })}
                </div>
              </div>
              <div>
                <p className="text-red-300 text-xs uppercase tracking-wider mb-2">⚡ Challenging</p>
                <div className="flex gap-2 flex-wrap">
                  {result.animal.challenging.map(a => {
                    const animal = ANIMALS.find(x => x.name === a);
                    return (
                      <span key={a} className="bg-red-500/20 border border-red-400/30 rounded-lg px-3 py-1 text-white text-sm">
                        {animal?.emoji} {a}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* All 12 Animals */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">🐾 All 12 Chinese Zodiac Animals</h3>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
              {ANIMALS.map((animal) => (
                <div
                  key={animal.name}
                  className={`rounded-xl p-3 text-center text-sm ${animal.name === result.animal.name ? 'bg-red-500/40 border border-red-400/60' : 'bg-white/5'}`}
                >
                  <div className="text-2xl mb-1">{animal.emoji}</div>
                  <div className={animal.name === result.animal.name ? 'text-white font-semibold' : 'text-red-300'}>
                    {animal.name}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <Link
              href="/#calculator"
              className="inline-block bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-red-600 hover:to-orange-600 transition-all shadow-lg"
            >
              See Your Full Life Stats at LifeStats →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
