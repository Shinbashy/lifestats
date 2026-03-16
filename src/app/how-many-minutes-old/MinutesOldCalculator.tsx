'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface LiveStats {
  minutes: number;
  seconds: number;
  milliseconds: number;
  heartbeats: number;
  breaths: number;
  hoursSlept: number;
  blinks: number;
}

function calcStats(birthMs: number, nowMs: number): LiveStats {
  const totalMs = nowMs - birthMs;
  const totalSeconds = totalMs / 1000;
  const totalMinutes = totalMs / 60000;

  return {
    minutes: Math.floor(totalMinutes),
    seconds: Math.floor(totalSeconds),
    milliseconds: Math.floor(totalMs),
    heartbeats: Math.floor(totalSeconds * 1.2),        // ~72 bpm = 1.2 bps
    breaths: Math.floor(totalSeconds * 0.267),          // ~16 breaths/min = 0.267/s
    hoursSlept: Math.floor(totalMinutes / 60 * 0.33),  // ~8hrs/day = 33% of time
    blinks: Math.floor(totalSeconds * 0.267),           // ~16 blinks/min = 0.267/s
  };
}

function formatBig(n: number): string {
  return n.toLocaleString();
}

export default function MinutesOldCalculator() {
  const [birthdate, setBirthdate] = useState('');
  const [birthTime, setBirthTime] = useState('');
  const [live, setLive] = useState<LiveStats | null>(null);
  const [birthMs, setBirthMs] = useState<number | null>(null);
  const [error, setError] = useState('');
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Pre-fill from localStorage
  useEffect(() => {
    try {
      const partial = localStorage.getItem('lifestats_partial_data');
      if (partial) {
        const data = JSON.parse(partial) as Record<string, unknown>;
        if (
          typeof data.birthYear === 'string' &&
          typeof data.birthMonth === 'string' &&
          typeof data.birthDay === 'string'
        ) {
          const month = data.birthMonth.toString().padStart(2, '0');
          const day = data.birthDay.toString().padStart(2, '0');
          setBirthdate(`${data.birthYear}-${month}-${day}`);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  // Ticker
  useEffect(() => {
    if (birthMs === null) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    setLive(calcStats(birthMs, Date.now()));
    intervalRef.current = setInterval(() => {
      setLive(calcStats(birthMs, Date.now()));
    }, 100);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [birthMs]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!birthdate) {
      setError('Please enter your birthdate.');
      return;
    }
    const timeStr = birthTime || '00:00';
    const dt = new Date(`${birthdate}T${timeStr}:00`);
    if (isNaN(dt.getTime()) || dt > new Date()) {
      setError('Please enter a valid past birthdate.');
      return;
    }
    setError('');
    setBirthMs(dt.getTime());
  }

  return (
    <div className="space-y-8">
      {/* Input */}
      <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
        <h2 className="text-2xl font-semibold mb-4 text-white">Enter Your Birthday</h2>
        <div className="flex gap-4 flex-wrap items-end">
          <div className="flex-1 min-w-[180px]">
            <label htmlFor="birthdate" className="block text-emerald-200 mb-2 text-sm font-medium">
              Date of Birth <span className="text-white">*</span>
            </label>
            <input
              id="birthdate"
              type="date"
              value={birthdate}
              max={new Date().toISOString().split('T')[0]}
              onChange={(e) => setBirthdate(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white text-lg focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/30 transition-all [color-scheme:dark]"
            />
          </div>
          <div className="min-w-[140px]">
            <label htmlFor="birthTime" className="block text-emerald-200 mb-2 text-sm font-medium">
              Birth Time <span className="text-emerald-400">(optional)</span>
            </label>
            <input
              id="birthTime"
              type="time"
              value={birthTime}
              onChange={(e) => setBirthTime(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white text-lg focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/30 transition-all [color-scheme:dark]"
            />
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-3 rounded-xl text-lg font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all shadow-lg"
          >
            Start Counting
          </button>
        </div>
        {error && <p className="mt-3 text-red-400 text-sm">{error}</p>}
        {!birthTime && (
          <p className="mt-2 text-emerald-400/70 text-xs">
            No birth time? We&apos;ll count from midnight. Add your birth time for extra precision.
          </p>
        )}
      </form>

      {/* Live ticker */}
      {live && (
        <div className="space-y-6">
          {/* Big number: minutes */}
          <div className="bg-gradient-to-br from-emerald-600/30 to-teal-700/30 backdrop-blur-sm rounded-2xl p-8 border border-emerald-400/30 text-center">
            <p className="text-emerald-300 text-sm font-medium uppercase tracking-wider mb-2">You Have Been Alive For</p>
            <p className="text-6xl md:text-7xl font-bold text-white tabular-nums leading-none mb-2">
              {formatBig(live.minutes)}
            </p>
            <p className="text-3xl text-emerald-200 font-semibold">minutes</p>
            <div className="flex justify-center gap-1 mt-2 text-emerald-400 text-sm">
              <span className="animate-pulse">●</span>
              <span>Live — updating every 0.1s</span>
            </div>
          </div>

          {/* Seconds and milliseconds */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
              <p className="text-4xl font-bold text-white tabular-nums">{formatBig(live.seconds)}</p>
              <p className="text-emerald-300 text-sm mt-1">seconds old</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
              <p className="text-4xl font-bold text-white tabular-nums">{formatBig(live.milliseconds)}</p>
              <p className="text-emerald-300 text-sm mt-1">milliseconds old</p>
            </div>
          </div>

          {/* Body stats */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">🫀 Your Body Stats (approximate)</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/10 rounded-xl p-4 text-center">
                <p className="text-3xl font-bold text-red-400 tabular-nums">{formatBig(live.heartbeats)}</p>
                <p className="text-emerald-300 text-xs mt-1">heartbeats</p>
                <p className="text-emerald-400/60 text-xs">@ 72 bpm avg</p>
              </div>
              <div className="bg-white/10 rounded-xl p-4 text-center">
                <p className="text-3xl font-bold text-blue-400 tabular-nums">{formatBig(live.breaths)}</p>
                <p className="text-emerald-300 text-xs mt-1">breaths taken</p>
                <p className="text-emerald-400/60 text-xs">@ 16/min avg</p>
              </div>
              <div className="bg-white/10 rounded-xl p-4 text-center">
                <p className="text-3xl font-bold text-purple-400 tabular-nums">{formatBig(live.hoursSlept)}</p>
                <p className="text-emerald-300 text-xs mt-1">hours slept</p>
                <p className="text-emerald-400/60 text-xs">@ 8hrs/night</p>
              </div>
              <div className="bg-white/10 rounded-xl p-4 text-center">
                <p className="text-3xl font-bold text-yellow-400 tabular-nums">{formatBig(live.blinks)}</p>
                <p className="text-emerald-300 text-xs mt-1">times blinked</p>
                <p className="text-emerald-400/60 text-xs">@ 16/min avg</p>
              </div>
            </div>
          </div>

          {/* Fun facts */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">💡 To Put It In Perspective</h3>
            <ul className="space-y-3 text-emerald-200">
              <li>⏱️ There are <strong className="text-white">1,440</strong> minutes in a day — you&apos;ve lived through <strong className="text-white">{formatBig(Math.floor(live.minutes / 1440))}</strong> of them</li>
              <li>🌍 Light travels about <strong className="text-white">11,160 miles</strong> in a single second — you&apos;ve been alive for <strong className="text-white">{formatBig(live.seconds)}</strong> of those</li>
              <li>💓 Your heart has beaten approximately <strong className="text-white">{formatBig(live.heartbeats)}</strong> times — each one keeping you alive</li>
              <li>🧠 Your brain fires roughly <strong className="text-white">{formatBig(live.seconds * 100)}</strong> neurons per second — but who&apos;s counting</li>
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
