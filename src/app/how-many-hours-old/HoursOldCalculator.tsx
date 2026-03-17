'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface HoursResult {
  totalDays: number;
  totalHours: number;
  totalMinutes: number;
  totalWeeks: number;
  totalYears: number;
  lifePct: number;
}

function calcHours(birthdate: string): HoursResult | null {
  const birth = new Date(birthdate + 'T00:00:00');
  if (isNaN(birth.getTime())) return null;
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  if (birth > now) return null;

  const msPerDay = 86400000;
  const totalDays = Math.floor((now.getTime() - birth.getTime()) / msPerDay);
  const totalHours = totalDays * 24;
  const totalMinutes = totalHours * 60;
  const totalWeeks = Math.floor(totalDays / 7);

  const totalYears = now.getFullYear() - birth.getFullYear() -
    (now < new Date(now.getFullYear(), birth.getMonth(), birth.getDate()) ? 1 : 0);

  const lifePct = Math.min(100, parseFloat(((totalDays / (79 * 365.25)) * 100).toFixed(1)));

  return {
    totalDays,
    totalHours,
    totalMinutes,
    totalWeeks,
    totalYears,
    lifePct,
  };
}

export default function HoursOldCalculator() {
  const [birthdate, setBirthdate] = useState<string>('');
  const [result, setResult] = useState<HoursResult | null>(null);
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
    const r = calcHours(date);
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
            <p className="text-6xl font-bold text-white mb-2">{result.totalHours.toLocaleString()}</p>
            <p className="text-3xl text-emerald-200 font-semibold">hours old</p>
            <p className="text-emerald-300 mt-3">
              That&apos;s {result.totalYears} years and counting — roughly {result.totalDays.toLocaleString()} days
            </p>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 text-center">
              <p className="text-3xl font-bold text-white">{result.totalDays.toLocaleString()}</p>
              <p className="text-emerald-300 text-sm mt-1">total days</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 text-center">
              <p className="text-3xl font-bold text-white">{result.totalWeeks.toLocaleString()}</p>
              <p className="text-emerald-300 text-sm mt-1">total weeks</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 text-center col-span-2 md:col-span-1">
              <p className="text-2xl font-bold text-white">{result.totalMinutes.toLocaleString()}</p>
              <p className="text-emerald-300 text-sm mt-1">total minutes</p>
            </div>
          </div>

          {/* Life percentage */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold text-white">Life Progress</h3>
              <span className="text-emerald-300 font-bold">{result.lifePct}%</span>
            </div>
            <p className="text-emerald-300 text-sm mb-3">
              Based on 79-year average life expectancy (~692,514 hours)
            </p>
            <div className="w-full bg-white/20 rounded-full h-4">
              <div
                className="bg-gradient-to-r from-emerald-400 to-teal-400 h-4 rounded-full transition-all duration-700"
                style={{ width: `${result.lifePct}%` }}
              />
            </div>
            <p className="text-emerald-400 text-sm mt-2 text-center">{result.lifePct}% of a 79-year life</p>
          </div>

          {/* Fun comparisons */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">🎉 Fun Comparisons</h3>
            <ul className="space-y-3 text-emerald-200">
              <li>🎬 At 2 hrs per movie, you&apos;ve had time for <strong className="text-white">{Math.floor(result.totalHours / 2).toLocaleString()}</strong> full movies</li>
              <li>🛌 Sleeping ~8 hrs/night, you&apos;ve slept roughly <strong className="text-white">{Math.floor(result.totalHours / 3).toLocaleString()}</strong> hours</li>
              <li>🏃 At 1 hr/day of activity, that&apos;s <strong className="text-white">{result.totalDays.toLocaleString()}</strong> potential workout hours</li>
              <li>✈️ A round-trip flight to Tokyo is ~24 hrs — you&apos;ve lived <strong className="text-white">{result.totalDays.toLocaleString()}</strong> of those</li>
              <li>⚡ Each hour has 3,600 seconds — you&apos;ve lived <strong className="text-white">{(result.totalHours * 3600).toLocaleString()}</strong> seconds total</li>
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
