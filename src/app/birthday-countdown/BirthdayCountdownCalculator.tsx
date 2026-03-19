'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

interface CountdownResult {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalDays: number;
  isBirthday: boolean;
  nextBirthdayDate: Date;
  age: number;
  zodiacSign: string;
  zodiacEmoji: string;
  generation: string;
  generationEmoji: string;
}

function getZodiacSign(month: number, day: number): { name: string; emoji: string } {
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return { name: 'Aries', emoji: '♈' };
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return { name: 'Taurus', emoji: '♉' };
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return { name: 'Gemini', emoji: '♊' };
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return { name: 'Cancer', emoji: '♋' };
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return { name: 'Leo', emoji: '♌' };
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return { name: 'Virgo', emoji: '♍' };
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return { name: 'Libra', emoji: '♎' };
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return { name: 'Scorpio', emoji: '♏' };
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return { name: 'Sagittarius', emoji: '♐' };
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return { name: 'Capricorn', emoji: '♑' };
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return { name: 'Aquarius', emoji: '♒' };
  return { name: 'Pisces', emoji: '♓' };
}

function getGeneration(year: number): { name: string; emoji: string } {
  if (year >= 2013) return { name: 'Gen Alpha', emoji: '🌱' };
  if (year >= 1997) return { name: 'Gen Z', emoji: '📱' };
  if (year >= 1981) return { name: 'Millennial', emoji: '💻' };
  if (year >= 1965) return { name: 'Gen X', emoji: '🎸' };
  if (year >= 1946) return { name: 'Baby Boomer', emoji: '🌺' };
  return { name: 'Silent Generation', emoji: '📻' };
}

function calcCountdown(birthdate: string): CountdownResult | null {
  const birth = new Date(birthdate + 'T00:00:00');
  if (isNaN(birth.getTime())) return null;
  const now = new Date();
  if (birth > now) return null;

  const month = birth.getMonth(); // 0-indexed
  const day = birth.getDate();
  const birthYear = birth.getFullYear();
  const nowYear = now.getFullYear();

  // Next birthday: try this year
  let nextBirthday = new Date(nowYear, month, day, 0, 0, 0, 0);
  const isBirthday =
    now.getMonth() === month &&
    now.getDate() === day;

  // If birthday already passed this year (and it's not today), use next year
  if (!isBirthday && nextBirthday <= now) {
    nextBirthday = new Date(nowYear + 1, month, day, 0, 0, 0, 0);
  }

  const diff = nextBirthday.getTime() - now.getTime();
  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const age = isBirthday ? nowYear - birthYear : nowYear - birthYear - 1;
  const zodiac = getZodiacSign(month + 1, day);
  const gen = getGeneration(birthYear);

  return {
    days,
    hours,
    minutes,
    seconds,
    totalDays: days,
    isBirthday,
    nextBirthdayDate: nextBirthday,
    age,
    zodiacSign: zodiac.name,
    zodiacEmoji: zodiac.emoji,
    generation: gen.name,
    generationEmoji: gen.emoji,
  };
}

function getBirthdayMessage(result: CountdownResult): string {
  if (result.isBirthday) return `🎉 Today is your ${result.age + 1}th birthday! Happy Birthday!`;
  if (result.days === 1) return `🎈 Just 1 day left — tomorrow is your big day!`;
  if (result.days <= 7) return `🥳 Almost there! Your birthday is in ${result.days} days!`;
  if (result.days <= 30) return `🎂 Less than a month to go — the countdown is on!`;
  if (result.days <= 90) return `✨ A few months to go — plenty of time to plan!`;
  return `🗓️ Mark your calendar — ${result.days} days to go!`;
}

export default function BirthdayCountdownCalculator() {
  const [birthday, setBirthday] = useState<string>('');
  const [result, setResult] = useState<CountdownResult | null>(null);
  const [error, setError] = useState<string>('');
  const [copied, setCopied] = useState(false);

  // Real-time countdown
  const tick = useCallback(() => {
    if (birthday) {
      const r = calcCountdown(birthday);
      if (r) setResult(r);
    }
  }, [birthday]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('lifestats_birthdate') || localStorage.getItem('lifestats_birthday');
      if (stored) setBirthday(stored);
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    if (!birthday) return;
    const r = calcCountdown(birthday);
    if (r) {
      setError('');
      setResult(r);
    }
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [birthday, tick]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const r = calcCountdown(birthday);
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

  function handleShare() {
    const url = `${window.location.origin}/birthday-countdown?bd=${birthday}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {
      // fallback
      const el = document.createElement('textarea');
      el.value = url;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="space-y-8">
      {/* Input */}
      <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
        <h2 className="text-2xl font-semibold mb-4 text-white">Enter Your Birthday</h2>
        <div className="flex gap-4 items-end flex-wrap">
          <div className="flex-1 min-w-[200px]">
            <label htmlFor="birthday" className="block text-purple-200 mb-2 text-sm font-medium">
              Date of Birth
            </label>
            <input
              id="birthday"
              type="date"
              value={birthday}
              max={new Date().toISOString().split('T')[0]}
              onChange={(e) => setBirthday(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white text-lg placeholder-white/40 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/30 transition-all [color-scheme:dark]"
            />
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-xl text-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
          >
            Start Countdown
          </button>
        </div>
        {error && <p className="mt-3 text-red-400 text-sm">{error}</p>}
      </form>

      {/* Results */}
      {result && (
        <div className="space-y-6">
          {/* Message */}
          <div className="bg-gradient-to-br from-purple-600/30 to-pink-700/30 backdrop-blur-sm rounded-2xl p-6 border border-purple-400/30 text-center">
            <p className="text-2xl font-semibold text-white">{getBirthdayMessage(result)}</p>
          </div>

          {/* Countdown Timer */}
          {!result.isBirthday && (
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <h3 className="text-center text-purple-200 text-sm font-medium uppercase tracking-wider mb-6">
                Time Until Your Next Birthday
              </h3>
              <div className="grid grid-cols-4 gap-4 text-center">
                {[
                  { value: result.days, label: 'Days' },
                  { value: result.hours, label: 'Hours' },
                  { value: result.minutes, label: 'Minutes' },
                  { value: result.seconds, label: 'Seconds' },
                ].map(({ value, label }) => (
                  <div key={label} className="bg-purple-500/20 border border-purple-400/30 rounded-2xl p-4">
                    <div className="text-4xl md:text-5xl font-bold text-white tabular-nums">
                      {String(value).padStart(2, '0')}
                    </div>
                    <div className="text-purple-300 text-xs mt-2 uppercase tracking-wider">{label}</div>
                  </div>
                ))}
              </div>
              <p className="text-center text-purple-300 text-sm mt-4">
                Next birthday: {result.nextBirthdayDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          )}

          {result.isBirthday && (
            <div className="bg-gradient-to-br from-yellow-500/20 to-orange-600/20 border border-yellow-400/40 rounded-2xl p-8 text-center">
              <p className="text-7xl mb-4">🎂🎉🎈</p>
              <p className="text-3xl font-bold text-white">Happy Birthday!</p>
              <p className="text-yellow-300 text-xl mt-2">Today you turn {result.age + 1}!</p>
            </div>
          )}

          {/* About You */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 text-center">
              <p className="text-purple-300 text-xs uppercase tracking-wider mb-2">Current Age</p>
              <p className="text-4xl font-bold text-white">{result.age}</p>
              <p className="text-purple-300 text-sm mt-1">years old</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 text-center">
              <p className="text-purple-300 text-xs uppercase tracking-wider mb-2">Zodiac Sign</p>
              <p className="text-3xl font-bold text-white">{result.zodiacEmoji} {result.zodiacSign}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 text-center">
              <p className="text-purple-300 text-xs uppercase tracking-wider mb-2">Generation</p>
              <p className="text-3xl font-bold text-white">{result.generationEmoji} {result.generation}</p>
            </div>
          </div>

          {/* Share Button */}
          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={handleShare}
              className="bg-white/10 border border-white/20 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2"
            >
              {copied ? '✅ Link Copied!' : '🔗 Share My Countdown'}
            </button>
            <Link
              href="/#calculator"
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
            >
              See Full Life Stats →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
