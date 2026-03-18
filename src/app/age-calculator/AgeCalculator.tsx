'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface AgeResult {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  totalWeeks: number;
  totalMonths: number;
  totalHours: number;
  totalMinutes: number;
  nextBirthdayDays: number;
  nextBirthdayDate: string;
  generation: string;
  generationEmoji: string;
  lifePct: number;
}

function getGeneration(birthYear: number): { name: string; emoji: string } {
  if (birthYear <= 1945) return { name: 'Silent Generation', emoji: '🎖️' };
  if (birthYear <= 1964) return { name: 'Baby Boomer', emoji: '🌸' };
  if (birthYear <= 1980) return { name: 'Gen X', emoji: '📼' };
  if (birthYear <= 1996) return { name: 'Millennial', emoji: '💻' };
  if (birthYear <= 2012) return { name: 'Gen Z', emoji: '📱' };
  return { name: 'Gen Alpha', emoji: '🤖' };
}

function calcAge(birthdate: string): AgeResult | null {
  const birth = new Date(birthdate + 'T00:00:00');
  if (isNaN(birth.getTime())) return null;
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  if (birth > now) return null;

  const msPerDay = 86400000;
  const totalDays = Math.floor((now.getTime() - birth.getTime()) / msPerDay);
  const totalWeeks = Math.floor(totalDays / 7);
  const totalHours = totalDays * 24;
  const totalMinutes = totalHours * 60;

  // Exact years
  let years = now.getFullYear() - birth.getFullYear();
  const birthdayThisYear = new Date(now.getFullYear(), birth.getMonth(), birth.getDate());
  if (now < birthdayThisYear) years--;

  // Exact months
  let totalMonths = (now.getFullYear() - birth.getFullYear()) * 12 + (now.getMonth() - birth.getMonth());
  if (now.getDate() < birth.getDate()) totalMonths--;
  const remainingMonths = totalMonths % 12;

  // Remaining days
  const lastBirthday = new Date(now.getFullYear(), birth.getMonth(), birth.getDate());
  if (lastBirthday > now) lastBirthday.setFullYear(lastBirthday.getFullYear() - 1);
  const daysSinceLastBirthday = Math.floor((now.getTime() - lastBirthday.getTime()) / msPerDay);
  const lastMonthDay = new Date(now.getFullYear(), now.getMonth(), 1);
  lastMonthDay.setMonth(lastMonthDay.getMonth() - (now.getDate() < birth.getDate() ? 0 : 0));
  const remainingDays = Math.floor((now.getTime() - new Date(now.getFullYear(), birth.getMonth() + totalMonths - years * 12, birth.getDate()).getTime()) / msPerDay);

  // Days since last birthday (simpler approach)
  const lastBday = new Date(now.getFullYear(), birth.getMonth(), birth.getDate());
  if (lastBday > now) lastBday.setFullYear(lastBday.getFullYear() - 1);
  const daysSinceBday = Math.floor((now.getTime() - lastBday.getTime()) / msPerDay);

  // Next birthday
  const nextBday = new Date(now.getFullYear(), birth.getMonth(), birth.getDate());
  if (nextBday <= now) nextBday.setFullYear(nextBday.getFullYear() + 1);
  const nextBirthdayDays = Math.ceil((nextBday.getTime() - now.getTime()) / msPerDay);
  const nextBirthdayDate = nextBday.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  const lifePct = Math.min(100, parseFloat(((totalDays / (79 * 365.25)) * 100).toFixed(1)));

  const gen = getGeneration(birth.getFullYear());

  return {
    years,
    months: remainingMonths,
    days: daysSinceBday - (new Date(now.getFullYear(), birth.getMonth() + remainingMonths, birth.getDate()) <= now ? 0 : 0),
    totalDays,
    totalWeeks,
    totalMonths,
    totalHours,
    totalMinutes,
    nextBirthdayDays,
    nextBirthdayDate,
    generation: gen.name,
    generationEmoji: gen.emoji,
    lifePct,
  };
}

export default function AgeCalculator() {
  const [birthday, setBirthday] = useState<string>('');
  const [result, setResult] = useState<AgeResult | null>(null);
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
      const r = calcAge(birthday);
      if (r) {
        setError('');
        setResult(r);
        try { localStorage.setItem('lifestats_birthday', birthday); } catch { /* ignore */ }
      }
    }
  }, [birthday]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const r = calcAge(birthday);
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
            <label htmlFor="birthday" className="block text-emerald-200 mb-2 text-sm font-medium">
              Date of Birth
            </label>
            <input
              id="birthday"
              type="date"
              value={birthday}
              max={new Date().toISOString().split('T')[0]}
              onChange={(e) => setBirthday(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white text-lg placeholder-white/40 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/30 transition-all [color-scheme:dark]"
            />
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-3 rounded-xl text-lg font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all shadow-lg"
          >
            Calculate Age
          </button>
        </div>
        {error && <p className="mt-3 text-red-400 text-sm">{error}</p>}
      </form>

      {/* Results */}
      {result && (
        <div className="space-y-6">
          {/* Main age display */}
          <div className="bg-gradient-to-br from-emerald-600/30 to-teal-700/30 backdrop-blur-sm rounded-2xl p-8 border border-emerald-400/30 text-center">
            <p className="text-emerald-300 text-sm font-medium uppercase tracking-wider mb-2">You Are</p>
            <p className="text-8xl font-bold text-white mb-2">{result.years}</p>
            <p className="text-3xl text-emerald-200 font-semibold">years old</p>
            <p className="text-emerald-300 mt-3">
              {result.years} years, {result.months} months, and {result.totalDays - result.years * 365 - result.months * 30} days
            </p>
          </div>

          {/* All units grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 text-center">
              <p className="text-3xl font-bold text-white">{result.totalDays.toLocaleString()}</p>
              <p className="text-emerald-300 text-sm mt-1">📅 total days</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 text-center">
              <p className="text-3xl font-bold text-white">{result.totalWeeks.toLocaleString()}</p>
              <p className="text-emerald-300 text-sm mt-1">📆 total weeks</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 text-center">
              <p className="text-3xl font-bold text-white">{result.totalMonths.toLocaleString()}</p>
              <p className="text-emerald-300 text-sm mt-1">🗓️ total months</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 text-center">
              <p className="text-3xl font-bold text-white">{result.totalHours.toLocaleString()}</p>
              <p className="text-emerald-300 text-sm mt-1">⏰ total hours</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 text-center col-span-2 md:col-span-2">
              <p className="text-3xl font-bold text-white">{result.totalMinutes.toLocaleString()}</p>
              <p className="text-emerald-300 text-sm mt-1">⏱️ total minutes</p>
            </div>
          </div>

          {/* Next birthday */}
          <div className="bg-gradient-to-br from-amber-600/20 to-orange-700/20 border border-amber-400/30 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-2">🎂 Next Birthday Countdown</h3>
            <p className="text-4xl font-bold text-amber-300 mb-1">
              {result.nextBirthdayDays} days to go
            </p>
            <p className="text-amber-200">
              Your next birthday is <strong>{result.nextBirthdayDate}</strong>
            </p>
          </div>

          {/* Generation */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-2">👨‍👩‍👧 Your Generation</h3>
            <p className="text-3xl font-bold text-emerald-300">
              {result.generationEmoji} {result.generation}
            </p>
          </div>

          {/* Life progress */}
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
          </div>

          {/* Links to specific calculators */}
          <div className="bg-emerald-500/20 border border-emerald-400/30 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-3">🔢 Explore Each Unit</h3>
            <div className="grid md:grid-cols-2 gap-2">
              <Link href="/how-many-days-old" className="text-emerald-300 hover:underline text-sm">→ Days Old Calculator (milestones)</Link>
              <Link href="/how-many-weeks-old" className="text-emerald-300 hover:underline text-sm">→ Weeks Old Calculator</Link>
              <Link href="/how-many-months-old" className="text-emerald-300 hover:underline text-sm">→ Months Old Calculator</Link>
              <Link href="/how-many-hours-old" className="text-emerald-300 hover:underline text-sm">→ Hours Old Calculator</Link>
              <Link href="/how-many-minutes-old" className="text-emerald-300 hover:underline text-sm">→ Minutes Old Calculator</Link>
              <Link href="/what-zodiac-sign-am-i" className="text-emerald-300 hover:underline text-sm">→ Zodiac Sign Calculator</Link>
              <Link href="/what-generation-am-i" className="text-emerald-300 hover:underline text-sm">→ Generation Calculator</Link>
              <Link href="/what-day-was-i-born" className="text-emerald-300 hover:underline text-sm">→ Day of Week Born</Link>
            </div>
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
