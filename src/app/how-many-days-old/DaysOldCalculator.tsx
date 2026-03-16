'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface DaysResult {
  totalDays: number;
  totalWeeks: number;
  totalMonths: number;
  totalYears: number;
  leapYears: number;
  lifePct: number;
  nextMilestone: { days: number; label: string; daysUntil: number } | null;
}

const MILESTONES = [
  1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000,
  10000, 11000, 12000, 13000, 14000, 15000, 16000, 17000, 18000, 19000, 20000,
  21000, 22000, 23000, 24000, 25000, 26000, 27000, 28000, 29000, 30000,
  31000, 32000, 33000,
];

function countLeapYears(from: Date, to: Date): number {
  let count = 0;
  for (let y = from.getFullYear(); y <= to.getFullYear(); y++) {
    if ((y % 4 === 0 && y % 100 !== 0) || y % 400 === 0) count++;
  }
  return count;
}

function calcDays(birthdate: string): DaysResult | null {
  const birth = new Date(birthdate + 'T00:00:00');
  if (isNaN(birth.getTime())) return null;
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  if (birth > now) return null;

  const msPerDay = 86400000;
  const totalDays = Math.floor((now.getTime() - birth.getTime()) / msPerDay);
  const totalWeeks = Math.floor(totalDays / 7);
  const totalYears = now.getFullYear() - birth.getFullYear() -
    (now < new Date(now.getFullYear(), birth.getMonth(), birth.getDate()) ? 1 : 0);

  // Months: count whole calendar months
  let months = (now.getFullYear() - birth.getFullYear()) * 12 + (now.getMonth() - birth.getMonth());
  if (now.getDate() < birth.getDate()) months--;

  const lifePct = Math.min(100, parseFloat(((totalDays / (79 * 365.25)) * 100).toFixed(1)));
  const leapYears = countLeapYears(birth, now);

  // Next milestone
  let nextMilestone: DaysResult['nextMilestone'] = null;
  for (const m of MILESTONES) {
    if (m > totalDays) {
      const daysUntil = m - totalDays;
      nextMilestone = { days: m, label: `${m.toLocaleString()}-day`, daysUntil };
      break;
    }
  }

  return {
    totalDays,
    totalWeeks,
    totalMonths: months,
    totalYears,
    leapYears,
    lifePct,
    nextMilestone,
  };
}

function formatLarge(n: number): string {
  return n.toLocaleString();
}

export default function DaysOldCalculator() {
  const [birthdate, setBirthdate] = useState<string>('');
  const [result, setResult] = useState<DaysResult | null>(null);
  const [error, setError] = useState<string>('');

  // Try localStorage pre-fill
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
    const r = calcDays(date);
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
            Calculate
          </button>
        </div>
        {error && <p className="mt-3 text-red-400 text-sm">{error}</p>}
      </form>

      {/* Results */}
      {result && (
        <div className="space-y-6">
          {/* Main stat */}
          <div className="bg-gradient-to-br from-emerald-600/30 to-teal-700/30 backdrop-blur-sm rounded-2xl p-8 border border-emerald-400/30 text-center">
            <p className="text-emerald-300 text-sm font-medium uppercase tracking-wider mb-2">You Are</p>
            <p className="text-7xl font-bold text-white mb-2">{formatLarge(result.totalDays)}</p>
            <p className="text-3xl text-emerald-200 font-semibold">days old</p>
            <p className="text-emerald-300 mt-3">
              That&apos;s {result.totalYears} years, {result.totalMonths % 12} months and counting
            </p>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 text-center">
              <p className="text-4xl font-bold text-white">{formatLarge(result.totalWeeks)}</p>
              <p className="text-emerald-300 text-sm mt-1">weeks old</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 text-center">
              <p className="text-4xl font-bold text-white">{formatLarge(result.totalMonths)}</p>
              <p className="text-emerald-300 text-sm mt-1">months old</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 text-center col-span-2 md:col-span-1">
              <p className="text-4xl font-bold text-white">{result.leapYears}</p>
              <p className="text-emerald-300 text-sm mt-1">leap years lived through</p>
            </div>
          </div>

          {/* Life percentage */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold text-white">Life Progress</h3>
              <span className="text-emerald-300 font-bold">{result.lifePct}%</span>
            </div>
            <p className="text-emerald-300 text-sm mb-3">Based on 79-year average life expectancy</p>
            <div className="w-full bg-white/20 rounded-full h-4">
              <div
                className="bg-gradient-to-r from-emerald-400 to-teal-400 h-4 rounded-full transition-all duration-700"
                style={{ width: `${result.lifePct}%` }}
              />
            </div>
            <p className="text-emerald-400 text-sm mt-2 text-center">{result.lifePct}% of a 79-year life</p>
          </div>

          {/* Milestone countdown */}
          {result.nextMilestone && (
            <div className="bg-gradient-to-br from-amber-600/20 to-orange-700/20 border border-amber-400/30 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-2">🏆 Next Milestone</h3>
              <p className="text-3xl font-bold text-amber-300 mb-1">
                {result.nextMilestone.daysUntil.toLocaleString()} days to go
              </p>
              <p className="text-amber-200">
                Until your <strong>{result.nextMilestone.label} birthday</strong> — mark your calendar!
              </p>
            </div>
          )}

          {/* Fun comparisons */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">🎉 Fun Comparisons</h3>
            <ul className="space-y-3 text-emerald-200">
              <li>⏳ You&apos;ve experienced <strong className="text-white">{result.leapYears}</strong> extra days that only happen every 4 years</li>
              <li>🌍 You&apos;ve orbited the Sun <strong className="text-white">{result.totalYears}</strong> complete times</li>
              <li>📅 You&apos;ve lived through approximately <strong className="text-white">{formatLarge(Math.floor(result.totalDays / 7))}</strong> weekends</li>
              <li>🌙 You&apos;ve seen roughly <strong className="text-white">{Math.floor(result.totalDays / 29.5).toLocaleString()}</strong> full moons</li>
              <li>💤 You&apos;ve slept approximately <strong className="text-white">{formatLarge(Math.floor(result.totalDays * 8))}</strong> hours (assuming 8hrs/night)</li>
            </ul>
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
