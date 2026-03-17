'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface WeeksResult {
  totalDays: number;
  totalWeeks: number;
  remainderDays: number;
  totalMonths: number;
  totalYears: number;
  lifePct: number;
}

function calcWeeks(birthdate: string): WeeksResult | null {
  const birth = new Date(birthdate + 'T00:00:00');
  if (isNaN(birth.getTime())) return null;
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  if (birth > now) return null;

  const msPerDay = 86400000;
  const totalDays = Math.floor((now.getTime() - birth.getTime()) / msPerDay);
  const totalWeeks = Math.floor(totalDays / 7);
  const remainderDays = totalDays % 7;

  const totalYears = now.getFullYear() - birth.getFullYear() -
    (now < new Date(now.getFullYear(), birth.getMonth(), birth.getDate()) ? 1 : 0);

  let months = (now.getFullYear() - birth.getFullYear()) * 12 + (now.getMonth() - birth.getMonth());
  if (now.getDate() < birth.getDate()) months--;

  const lifePct = Math.min(100, parseFloat(((totalDays / (79 * 365.25)) * 100).toFixed(1)));

  return {
    totalDays,
    totalWeeks,
    remainderDays,
    totalMonths: months,
    totalYears,
    lifePct,
  };
}

export default function WeeksOldCalculator() {
  const [birthdate, setBirthdate] = useState<string>('');
  const [result, setResult] = useState<WeeksResult | null>(null);
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
    const r = calcWeeks(date);
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
            <p className="text-7xl font-bold text-white mb-2">{result.totalWeeks.toLocaleString()}</p>
            <p className="text-3xl text-emerald-200 font-semibold">weeks old</p>
            <p className="text-emerald-300 mt-3">
              {result.remainderDays > 0
                ? `Plus ${result.remainderDays} extra day${result.remainderDays !== 1 ? 's' : ''} — your next full week arrives in ${7 - result.remainderDays} day${7 - result.remainderDays !== 1 ? 's' : ''}`
                : '🎉 Today is exactly a full week birthday!'}
            </p>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 text-center">
              <p className="text-4xl font-bold text-white">{result.totalDays.toLocaleString()}</p>
              <p className="text-emerald-300 text-sm mt-1">total days</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 text-center">
              <p className="text-4xl font-bold text-white">{result.totalMonths.toLocaleString()}</p>
              <p className="text-emerald-300 text-sm mt-1">months old</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 text-center col-span-2 md:col-span-1">
              <p className="text-4xl font-bold text-white">{result.totalYears}</p>
              <p className="text-emerald-300 text-sm mt-1">years old</p>
            </div>
          </div>

          {/* Breakdown */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-3">📊 Full Breakdown</h3>
            <p className="text-emerald-200 text-lg">
              <strong className="text-white">{result.totalWeeks.toLocaleString()}</strong> weeks
              {result.remainderDays > 0 && (
                <> and <strong className="text-white">{result.remainderDays}</strong> day{result.remainderDays !== 1 ? 's' : ''}</>
              )}
              {' '}= <strong className="text-white">{result.totalYears}</strong> years,{' '}
              <strong className="text-white">{result.totalMonths % 12}</strong> months,{' '}
              and some days
            </p>
          </div>

          {/* Life percentage */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold text-white">Life Progress</h3>
              <span className="text-emerald-300 font-bold">{result.lifePct}%</span>
            </div>
            <p className="text-emerald-300 text-sm mb-3">Based on 79-year average life expectancy (~4,115 weeks)</p>
            <div className="w-full bg-white/20 rounded-full h-4">
              <div
                className="bg-gradient-to-r from-emerald-400 to-teal-400 h-4 rounded-full transition-all duration-700"
                style={{ width: `${result.lifePct}%` }}
              />
            </div>
            <p className="text-emerald-400 text-sm mt-2 text-center">{result.lifePct}% of a 79-year life</p>
          </div>

          {/* Fun facts */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">🎉 Fun Comparisons</h3>
            <ul className="space-y-3 text-emerald-200">
              <li>📅 You&apos;ve had roughly <strong className="text-white">{result.totalWeeks.toLocaleString()}</strong> Mondays (and just as many Fridays!)</li>
              <li>🌙 Every week is 168 hours — you&apos;ve lived <strong className="text-white">{(result.totalWeeks * 168).toLocaleString()}</strong> of them</li>
              <li>🎬 A week has 10,080 minutes — you&apos;ve lived <strong className="text-white">{(result.totalWeeks * 10080).toLocaleString()}</strong> minutes in full weeks</li>
              <li>🌍 Earth orbits the Sun once per 52.18 weeks — you&apos;ve completed <strong className="text-white">{result.totalYears}</strong> full orbits</li>
              <li>🛌 If you sleep 8 hours a night, you&apos;ve slept away <strong className="text-white">{Math.floor(result.totalDays / 3).toLocaleString()}</strong> days</li>
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
