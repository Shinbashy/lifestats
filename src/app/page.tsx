'use client';

import { useState, useEffect, useCallback } from 'react';
import { calculateLifeStats, LifeStats } from '@/lib/calculations';
import StatCard from '@/components/StatCard';
import ProgressBar from '@/components/ProgressBar';
import BirthdayCountdown from '@/components/BirthdayCountdown';
import ShareCard from '@/components/ShareCard';

export default function Home() {
  const [birthday, setBirthday] = useState<string>('');
  const [stats, setStats] = useState<LifeStats | null>(null);
  const [birthdayDate, setBirthdayDate] = useState<Date | null>(null);
  const [liveSeconds, setLiveSeconds] = useState(0);

  const handleSubmit = useCallback((e?: React.FormEvent) => {
    e?.preventDefault();
    if (!birthday) return;
    
    const date = new Date(birthday + 'T00:00:00');
    if (date > new Date()) {
      alert('Please enter a birthday in the past!');
      return;
    }
    
    setBirthdayDate(date);
    const calculatedStats = calculateLifeStats(date);
    setStats(calculatedStats);
    setLiveSeconds(calculatedStats.secondsAlive);
  }, [birthday]);

  // Live seconds counter
  useEffect(() => {
    if (!stats) return;
    
    const interval = setInterval(() => {
      setLiveSeconds(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [stats]);

  // Recalculate stats every minute for accuracy
  useEffect(() => {
    if (!birthdayDate) return;
    
    const interval = setInterval(() => {
      const newStats = calculateLifeStats(birthdayDate);
      setStats(newStats);
    }, 60000);

    return () => clearInterval(interval);
  }, [birthdayDate]);

  return (
    <main className="animated-bg min-h-screen">
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8 md:py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="gradient-text">LifeStats</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-lg mx-auto">
            Discover the incredible numbers behind your existence
          </p>
        </div>

        {/* Birthday Input */}
        {!stats && (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-12">
            <div className="stat-card rounded-2xl p-6 glow">
              <label className="block text-sm text-gray-400 mb-2">
                When did your journey begin?
              </label>
              <input
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white text-lg focus:outline-none focus:border-indigo-500 transition-colors"
                max={new Date().toISOString().split('T')[0]}
                required
              />
              <button
                type="submit"
                className="btn-primary w-full mt-4 py-3 rounded-xl font-semibold text-white text-lg"
              >
                ✨ Calculate My Stats
              </button>
            </div>
          </form>
        )}

        {/* Stats Dashboard */}
        {stats && birthdayDate && (
          <div className="space-y-8 animate-fadeIn">
            {/* Reset Button */}
            <div className="text-center">
              <button
                onClick={() => {
                  setStats(null);
                  setBirthdayDate(null);
                  setBirthday('');
                }}
                className="text-sm text-gray-500 hover:text-indigo-400 transition-colors"
              >
                ← Enter different birthday
              </button>
            </div>

            {/* Hero Stats */}
            <div className="stat-card rounded-2xl p-6 md:p-8 text-center glow">
              <div className="text-5xl md:text-7xl font-bold gradient-text mb-2 live-counter tabular-nums">
                {liveSeconds.toLocaleString()}
              </div>
              <div className="text-gray-400">seconds of your incredible journey</div>
              <div className="text-xs text-indigo-400 mt-2 animate-pulse">● counting live</div>
            </div>

            {/* Main Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <StatCard 
                icon="📅" 
                label="Days Alive" 
                value={stats.daysAlive}
                delay={1}
              />
              <StatCard 
                icon="⏰" 
                label="Hours Alive" 
                value={stats.hoursAlive}
                delay={2}
              />
              <StatCard 
                icon="💓" 
                label="Heartbeats" 
                value={stats.heartbeats}
                delay={3}
              />
              <StatCard 
                icon="🌬️" 
                label="Breaths Taken" 
                value={stats.breaths}
                delay={4}
              />
              <StatCard 
                icon="🌙" 
                label="Full Moons" 
                value={stats.fullMoons}
                delay={5}
                showFull
              />
              <StatCard 
                icon="🌍" 
                label="Earth Orbits" 
                value={stats.earthOrbits}
                delay={6}
                decimals={2}
              />
              <StatCard 
                icon="🍂" 
                label="Seasons" 
                value={stats.seasonsExperienced}
                delay={7}
                showFull
              />
              <StatCard 
                icon="😴" 
                label="Hours Slept" 
                value={stats.sleepHours}
                delay={8}
              />
              <StatCard 
                icon="👁️" 
                label="Blinks" 
                value={stats.blinks}
                delay={9}
              />
            </div>

            {/* Lifespan Progress */}
            <ProgressBar 
              percentage={stats.lifespanPercentage}
              label="Your Life Journey"
            />

            {/* Birthday Countdown */}
            <BirthdayCountdown 
              daysUntilBirthday={stats.daysUntilBirthday}
              nextAge={stats.nextBirthdayAge}
            />

            {/* Fun Facts */}
            <div className="stat-card rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <span>💡</span> Fun Facts
              </h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400">•</span>
                  You&apos;ve walked approximately <span className="text-white font-semibold">{(stats.stepsWalked).toLocaleString()}</span> steps
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">•</span>
                  You&apos;ve eaten around <span className="text-white font-semibold">{stats.mealsEaten.toLocaleString()}</span> meals
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-400">•</span>
                  You&apos;ve spoken roughly <span className="text-white font-semibold">{(stats.wordsSpoken / 1000000).toFixed(1)}M</span> words
                </li>
                {stats.secondsAlive >= 1_000_000_000 && (
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">🏆</span>
                    <span className="text-yellow-300 font-semibold">You&apos;ve been alive for over 1 BILLION seconds!</span>
                  </li>
                )}
              </ul>
            </div>

            {/* Share Section */}
            <div className="stat-card rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <span>📤</span> Share Your Stats
              </h3>
              <ShareCard stats={stats} birthday={birthdayDate} />
            </div>

            {/* Footer */}
            <div className="text-center text-gray-500 text-sm pt-8">
              <p>Made with ❤️ • Every number tells your story</p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
