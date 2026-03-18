'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface MonthsResult {
  totalMonths: number;
  years: number;
  remainingMonths: number;
  totalDays: number;
  nextRoundMonth: { month: number; daysUntil: number } | null;
}

const ROUND_MONTHS = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];

function calcMonths(birthdate: string): MonthsResult | null {
  const birth = new Date(birthdate + 'T00:00:00');
  if (isNaN(birth.getTime())) return null;
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  if (birth > now) return null;

  let months = (now.getFullYear() - birth.getFullYear()) * 12 + (now.getMonth() - birth.getMonth());
  if (now.getDate() < birth.getDate()) months--;

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  const msPerDay = 86400000;
  const totalDays = Math.floor((now.getTime() - birth.getTime()) / msPerDay);

  // Next round month milestone
  let nextRoundMonth: MonthsResult['nextRoundMonth'] = null;
  for (const m of ROUND_MONTHS) {
    if (m > months) {
      // Find date when we hit that milestone
      const milestoneDate = new Date(birth);
      milestoneDate.setMonth(milestoneDate.getMonth() + m);
      const daysUntil = Math.ceil((milestoneDate.getTime() - now.getTime()) / msPerDay);
      nextRoundMonth = { month: m, daysUntil };
      break;
    }
  }

  return { totalMonths: months, years, remainingMonths, totalDays, nextRoundMonth };
}

function getBabyContext(months: number): string {
  if (months < 12) return `You're a literal baby — ${months} months old!`;
  if (months < 24) return `Still in toddler territory by month count!`;
  if (months < 60) return `Preschool age if we tracked adults like babies.`;
  if (months < 120) return `Elementary school age by the month counter.`;
  if (months < 200) return `You're basically a ${months}-month-old toddler... a very tall one.`;
  if (months < 300) return `${months} months! That's a lot of monthly check-ups you've missed.`;
  if (months < 400) return `You're a ${months}-month-old — pediatricians would need a bigger chart.`;
  if (months < 500) return `${months} months old and counting. The growth charts don't go this far.`;
  if (months < 600) return `${months} months! You've been around for ${Math.floor(months / 12)} annual birthday cakes.`;
  return `${months} months old — a vintage baby at this point.`;
}

export default function MonthsOldCalculator() {
  const [birthday, setBirthday] = useState<string>('');
  const [result, setResult] = useState<MonthsResult | null>(null);
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
      const r = calcMonths(birthday);
      if (r) {
        setError('');
        setResult(r);
        try { localStorage.setItem('lifestats_birthday', birthday); } catch { /* ignore */ }
      }
    }
  }, [birthday]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const r = calcMonths(birthday);
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
            <label htmlFor="birthday" className="block text-violet-200 mb-2 text-sm font-medium">
              Date of Birth
            </label>
            <input
              id="birthday"
              type="date"
              value={birthday}
              max={new Date().toISOString().split('T')[0]}
              onChange={(e) => setBirthday(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white text-lg placeholder-white/40 focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-400/30 transition-all [color-scheme:dark]"
            />
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-violet-500 to-purple-500 text-white px-8 py-3 rounded-xl text-lg font-semibold hover:from-violet-600 hover:to-purple-600 transition-all shadow-lg"
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
          <div className="bg-gradient-to-br from-violet-600/30 to-purple-700/30 backdrop-blur-sm rounded-2xl p-8 border border-violet-400/30 text-center">
            <p className="text-violet-300 text-sm font-medium uppercase tracking-wider mb-2">You Are</p>
            <p className="text-7xl font-bold text-white mb-2">{result.totalMonths.toLocaleString()}</p>
            <p className="text-3xl text-violet-200 font-semibold">months old</p>
            <p className="text-violet-300 mt-3">
              That&apos;s {result.years} years and {result.remainingMonths} months exactly
            </p>
          </div>

          {/* Baby context */}
          <div className="bg-pink-500/20 border border-pink-400/30 rounded-2xl p-6 text-center">
            <p className="text-2xl">🍼</p>
            <p className="text-xl font-semibold text-white mt-2">
              {getBabyContext(result.totalMonths)}
            </p>
            <p className="text-pink-300 text-sm mt-2">
              Babies are tracked in months. You just never stopped counting.
            </p>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 text-center">
              <p className="text-4xl font-bold text-white">{result.years}</p>
              <p className="text-violet-300 text-sm mt-1">years old</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 text-center">
              <p className="text-4xl font-bold text-white">{result.remainingMonths}</p>
              <p className="text-violet-300 text-sm mt-1">extra months</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 text-center">
              <p className="text-4xl font-bold text-white">{result.totalDays.toLocaleString()}</p>
              <p className="text-violet-300 text-sm mt-1">days alive</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 text-center">
              <p className="text-4xl font-bold text-white">{Math.floor(result.totalDays / 7).toLocaleString()}</p>
              <p className="text-violet-300 text-sm mt-1">weeks alive</p>
            </div>
          </div>

          {/* Next milestone */}
          {result.nextRoundMonth && (
            <div className="bg-gradient-to-br from-amber-600/20 to-orange-700/20 border border-amber-400/30 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-2">🎂 Next Round Month Milestone</h3>
              <p className="text-3xl font-bold text-amber-300 mb-1">
                {result.nextRoundMonth.month} months old
              </p>
              <p className="text-amber-200">
                in <strong>{result.nextRoundMonth.daysUntil.toLocaleString()} days</strong> — worth celebrating!
              </p>
            </div>
          )}

          {/* Fun facts */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">📊 What This Means</h3>
            <ul className="space-y-3 text-violet-200">
              <li>🌙 You&apos;ve experienced roughly <strong className="text-white">{result.totalMonths}</strong> full moon cycles</li>
              <li>📅 You&apos;ve had <strong className="text-white">{result.totalMonths}</strong> month-birthdays (most uncelebrated)</li>
              <li>❄️ You&apos;ve lived through about <strong className="text-white">{Math.floor(result.totalMonths / 12)}</strong> winters and summers</li>
              <li>💊 A 2-year-old child today has had <strong className="text-white">{24}</strong> monthly check-ups. You should have had <strong className="text-white">{result.totalMonths}</strong>.</li>
            </ul>
          </div>

          <div className="pt-2">
            <Link
              href="/#calculator"
              className="inline-block bg-gradient-to-r from-violet-500 to-purple-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-violet-600 hover:to-purple-600 transition-all shadow-lg"
            >
              See Your Full Life Stats at LifeStats →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
