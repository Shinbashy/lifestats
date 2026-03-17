'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface DayResult {
  dayName: string;
  dayIndex: number; // 0=Sun, 1=Mon, ...
  totalDays: number;
  totalWeeks: number;
  sameWeekdays: number;
  emoji: string;
  planet: string;
  rhyme: string;
  funFact: string;
  adjective: string;
}

const DAY_DATA = [
  {
    name: 'Sunday',
    emoji: '☀️',
    planet: 'Sun',
    rhyme: "Sunday's child is bonny and blithe and good and gay.",
    funFact: 'Sunday is named after the Sun — the ultimate source of life and energy.',
    adjective: 'vibrant',
  },
  {
    name: 'Monday',
    emoji: '🌙',
    planet: 'Moon',
    rhyme: "Monday's child is fair of face.",
    funFact: 'Monday comes from the Old English "Mōnandæg" — Moon\'s day. Associated with intuition and reflection.',
    adjective: 'intuitive',
  },
  {
    name: 'Tuesday',
    emoji: '🔴',
    planet: 'Mars (via Norse god Tyr)',
    rhyme: "Tuesday's child is full of grace.",
    funFact: 'Tuesday is named after Tyr, the Norse god of war and justice. In Latin-based languages it\'s "Mardi" — Mars day.',
    adjective: 'determined',
  },
  {
    name: 'Wednesday',
    emoji: '💫',
    planet: 'Mercury (via Woden)',
    rhyme: "Wednesday's child is full of woe.",
    funFact: 'Wednesday is Woden\'s day — the Norse all-father who traded an eye for wisdom. In French: "Mercredi" — Mercury day.',
    adjective: 'wise',
  },
  {
    name: 'Thursday',
    emoji: '⚡',
    planet: 'Jupiter (via Thor)',
    rhyme: "Thursday's child has far to go.",
    funFact: "Thursday is Thor's day — the Norse god of thunder. In Latin it's \"Jovis dies\" (Jove/Jupiter's day). Thunder babies have big destinies!",
    adjective: 'adventurous',
  },
  {
    name: 'Friday',
    emoji: '❤️',
    planet: 'Venus (via Frigg)',
    rhyme: "Friday's child is loving and giving.",
    funFact: "Friday is Frigg's day — Norse goddess of love and fertility. In French: \"Vendredi\" — Venus day. No wonder it's everyone's favorite.",
    adjective: 'loving',
  },
  {
    name: 'Saturday',
    emoji: '🪐',
    planet: 'Saturn',
    rhyme: "Saturday's child works hard for a living.",
    funFact: 'Saturday is the only day of the week that kept its Roman name in English — named directly after Saturn, god of time and harvest.',
    adjective: 'hardworking',
  },
];

function calcDayBorn(birthdate: string): DayResult | null {
  const birth = new Date(birthdate + 'T00:00:00');
  if (isNaN(birth.getTime())) return null;
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  if (birth > now) return null;

  const dayIndex = birth.getDay(); // 0=Sun, 1=Mon, ...
  const msPerDay = 86400000;
  const totalDays = Math.floor((now.getTime() - birth.getTime()) / msPerDay);
  const totalWeeks = Math.floor(totalDays / 7);
  // How many times has this weekday occurred since birth (including birth day)
  const sameWeekdays = totalWeeks + 1;

  const data = DAY_DATA[dayIndex];

  return {
    dayName: data.name,
    dayIndex,
    totalDays,
    totalWeeks,
    sameWeekdays,
    emoji: data.emoji,
    planet: data.planet,
    rhyme: data.rhyme,
    funFact: data.funFact,
    adjective: data.adjective,
  };
}

export default function DayBornCalculator() {
  const [birthdate, setBirthdate] = useState<string>('');
  const [result, setResult] = useState<DayResult | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    try {
      const partial = localStorage.getItem('lifestats_partial_data');
      if (partial) {
        const data = JSON.parse(partial) as Record<string, unknown>;
        if (typeof data.birthYear === 'string' && typeof data.birthMonth === 'string' && typeof data.birthDay === 'string') {
          const month = data.birthMonth.toString().padStart(2, '0');
          const day = data.birthDay.toString().padStart(2, '0');
          const dateStr = `${data.birthYear}-${month}-${day}`;
          setBirthdate(dateStr);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    if (birthdate) {
      handleCalc(birthdate);
    }
  }, [birthdate]);

  function handleCalc(date: string) {
    const r = calcDayBorn(date);
    if (!r) {
      setError('Please enter a valid past birthdate.');
      setResult(null);
    } else {
      setError('');
      setResult(r);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    handleCalc(birthdate);
  }

  return (
    <div className="space-y-8">
      {/* Input */}
      <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
        <h2 className="text-2xl font-semibold mb-4 text-white">Enter Your Birthdate</h2>
        <div className="flex gap-4 items-end flex-wrap">
          <div className="flex-1 min-w-[200px]">
            <label htmlFor="birthdate" className="block text-emerald-200 mb-2 text-sm font-medium">
              Date of Birth
            </label>
            <input
              id="birthdate"
              type="date"
              value={birthdate}
              max={new Date().toISOString().split('T')[0]}
              onChange={(e) => setBirthdate(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white text-lg placeholder-white/40 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/30 transition-all [color-scheme:dark]"
            />
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-3 rounded-xl text-lg font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all shadow-lg"
          >
            Reveal My Day
          </button>
        </div>
        {error && <p className="mt-3 text-red-400 text-sm">{error}</p>}
      </form>

      {/* Results */}
      {result && (
        <div className="space-y-6">
          {/* Main reveal */}
          <div className="bg-gradient-to-br from-emerald-600/30 to-teal-700/30 backdrop-blur-sm rounded-2xl p-8 border border-emerald-400/30 text-center">
            <p className="text-emerald-300 text-sm font-medium uppercase tracking-wider mb-3">You Were Born On A</p>
            <p className="text-8xl mb-3">{result.emoji}</p>
            <p className="text-6xl font-bold text-white mb-2">{result.dayName}!</p>
            <p className="text-emerald-200 mt-3 text-lg">
              A {result.adjective} soul — {result.dayName} is named after the {result.planet}
            </p>
          </div>

          {/* Rhyme */}
          <div className="bg-amber-500/20 border border-amber-400/30 rounded-2xl p-6 text-center">
            <h3 className="text-lg font-semibold text-white mb-3">📖 Monday&apos;s Child Says...</h3>
            <p className="text-2xl text-amber-200 italic font-medium">&ldquo;{result.rhyme}&rdquo;</p>
          </div>

          {/* Fun fact */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-3">🌍 The Lore of {result.dayName}</h3>
            <p className="text-emerald-200 leading-relaxed">{result.funFact}</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 text-center">
              <p className="text-4xl font-bold text-white">{result.sameWeekdays.toLocaleString()}</p>
              <p className="text-emerald-300 text-sm mt-1">{result.dayName}s lived through</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 text-center">
              <p className="text-4xl font-bold text-white">{result.totalDays.toLocaleString()}</p>
              <p className="text-emerald-300 text-sm mt-1">total days alive</p>
            </div>
          </div>

          {/* All weekdays count */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">📅 All Your Weekdays</h3>
            <div className="grid grid-cols-7 gap-2 text-center">
              {DAY_DATA.map((day, i) => {
                const count = i === result.dayIndex ? result.sameWeekdays : result.totalWeeks;
                const isMyDay = i === result.dayIndex;
                return (
                  <div
                    key={day.name}
                    className={`rounded-xl p-3 ${isMyDay ? 'bg-emerald-500/40 border border-emerald-400/50' : 'bg-white/10'}`}
                  >
                    <p className="text-lg">{day.emoji}</p>
                    <p className={`text-xs font-medium mt-1 ${isMyDay ? 'text-emerald-200' : 'text-white/60'}`}>
                      {day.name.slice(0, 3)}
                    </p>
                    <p className={`text-sm font-bold ${isMyDay ? 'text-white' : 'text-emerald-300'}`}>
                      {count.toLocaleString()}
                    </p>
                  </div>
                );
              })}
            </div>
            <p className="text-emerald-400 text-xs mt-3 text-center">Approximate count of each weekday since your birth</p>
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
    </div>
  );
}
