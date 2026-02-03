'use client';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { calculateLifeStats, calculateGenderStats, LifeStats, GenderStats, Gender, formatDate, formatNumber } from '@/lib/calculations';
import StatCard, { UnitOption } from '@/components/StatCard';
import ProgressBar from '@/components/ProgressBar';
import BirthdayCountdown from '@/components/BirthdayCountdown';
import ShareCard from '@/components/ShareCard';

// Conversion helpers
function createUnits(conversions: { label: string; value: number; suffix?: string; decimals?: number }[]): UnitOption[] {
  return conversions;
}

export default function Home() {
  const [birthday, setBirthday] = useState<string>('');
  const [gender, setGender] = useState<Gender>(null);
  const [stats, setStats] = useState<LifeStats | null>(null);
  const [genderStats, setGenderStats] = useState<GenderStats | null>(null);
  const [birthdayDate, setBirthdayDate] = useState<Date | null>(null);
  const [liveSeconds, setLiveSeconds] = useState(0);
  const submitButtonRef = useRef<HTMLButtonElement>(null);

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
    
    // Calculate gender stats if gender selected
    if (gender) {
      const gStats = calculateGenderStats(date, gender);
      setGenderStats(gStats);
    }
  }, [birthday, gender]);

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

  // Memoize unit conversions
  const unitConversions = useMemo(() => {
    if (!stats) return null;
    
    return {
      // Time conversions
      days: createUnits([
        { label: 'Days Alive', value: stats.daysAlive, suffix: 'days' },
        { label: 'Weeks Alive', value: stats.daysAlive / 7, suffix: 'weeks', decimals: 1 },
        { label: 'Months Alive', value: stats.daysAlive / 30.44, suffix: 'months', decimals: 1 },
      ]),
      hours: createUnits([
        { label: 'Hours Alive', value: stats.hoursAlive, suffix: 'hrs' },
        { label: 'Days Alive', value: stats.hoursAlive / 24, suffix: 'days', decimals: 1 },
      ]),
      minutes: createUnits([
        { label: 'Minutes Alive', value: stats.minutesAlive, suffix: 'min' },
        { label: 'Hours Alive', value: stats.minutesAlive / 60, suffix: 'hrs', decimals: 1 },
      ]),
      
      // Body conversions
      heartbeats: createUnits([
        { label: 'Heartbeats', value: stats.heartbeats },
        { label: 'Heartbeats', value: stats.heartbeats / 1_000_000, suffix: 'million', decimals: 2 },
        { label: 'Heartbeats', value: stats.heartbeats / 1_000_000_000, suffix: 'billion', decimals: 3 },
      ]),
      breaths: createUnits([
        { label: 'Breaths Taken', value: stats.breaths },
        { label: 'Breaths Taken', value: stats.breaths / 1_000_000, suffix: 'million', decimals: 2 },
      ]),
      blood: createUnits([
        { label: 'Blood Pumped', value: stats.bloodPumpedGallons, suffix: 'gal' },
        { label: 'Blood Pumped', value: stats.bloodPumpedGallons * 3.785, suffix: 'liters', decimals: 0 },
        { label: 'Olympic Pools', value: stats.bloodPumpedGallons / 660_000, suffix: 'pools', decimals: 1 },
      ]),
      hair: createUnits([
        { label: 'Hair Grown', value: stats.hairGrownInches, suffix: 'inches', decimals: 1 },
        { label: 'Hair Grown', value: stats.hairGrownInches / 12, suffix: 'feet', decimals: 2 },
        { label: 'Hair Grown', value: stats.hairGrownInches * 2.54, suffix: 'cm', decimals: 1 },
        { label: 'Hair Grown', value: stats.hairGrownInches * 0.0254, suffix: 'meters', decimals: 2 },
      ]),
      skinCells: createUnits([
        { label: 'Skin Cells Shed', value: stats.skinCellsShed },
        { label: 'Skin Cells Shed', value: stats.skinCellsShed / 1_000_000_000_000, suffix: 'trillion', decimals: 1 },
        { label: 'Bodies Worth', value: stats.skinCellsShed / 37_000_000_000_000, suffix: 'bodies', decimals: 2 },
      ]),
      dreams: createUnits([
        { label: 'Dreams Had', value: stats.dreamsHad },
        { label: 'Dreams Per Year', value: stats.dreamsHad / (stats.daysAlive / 365.25), suffix: '/year', decimals: 0 },
      ]),
      sleep: createUnits([
        { label: 'Hours Slept', value: stats.sleepHours, suffix: 'hours' },
        { label: 'Days Slept', value: stats.sleepHours / 24, suffix: 'days', decimals: 1 },
        { label: 'Years Slept', value: stats.sleepHours / 24 / 365.25, suffix: 'years', decimals: 2 },
      ]),
      blinks: createUnits([
        { label: 'Blinks', value: stats.blinks },
        { label: 'Blinks', value: stats.blinks / 1_000_000, suffix: 'million', decimals: 1 },
        { label: 'Blinks Per Day', value: stats.blinks / stats.daysAlive, suffix: '/day', decimals: 0 },
      ]),
      
      // Cosmic conversions
      milesThroughSpace: createUnits([
        { label: 'Miles Through Space', value: stats.milesThroughSpace, suffix: 'mi' },
        { label: 'Kilometers', value: stats.milesThroughSpace * 1.609, suffix: 'km', decimals: 0 },
        { label: 'Astronomical Units', value: stats.milesThroughSpace / 93_000_000, suffix: 'AU', decimals: 2 },
        { label: 'Light Hours', value: stats.milesThroughSpace / 671_000_000, suffix: 'light-hrs', decimals: 2 },
      ]),
      
      // Life stats conversions
      steps: createUnits([
        { label: 'Steps Walked', value: stats.stepsWalked },
        { label: 'Miles Walked', value: stats.stepsWalked / 2000, suffix: 'miles', decimals: 0 },
        { label: 'Kilometers', value: stats.stepsWalked / 2000 * 1.609, suffix: 'km', decimals: 0 },
        { label: 'Marathons', value: stats.stepsWalked / 2000 / 26.2, suffix: 'marathons', decimals: 1 },
      ]),
      meals: createUnits([
        { label: 'Meals Eaten', value: stats.mealsEaten },
        { label: 'Meals Per Year', value: stats.mealsEaten / (stats.daysAlive / 365.25), suffix: '/year', decimals: 0 },
      ]),
      words: createUnits([
        { label: 'Words Spoken', value: stats.wordsSpoken },
        { label: 'Words (Millions)', value: stats.wordsSpoken / 1_000_000, suffix: 'M', decimals: 1 },
        { label: 'Avg Novels Worth', value: stats.wordsSpoken / 80000, suffix: 'novels', decimals: 0 },
      ]),
    };
  }, [stats]);

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
              
              {/* Gender selector - Premium feature */}
              <div className="mt-4">
                <label className="block text-sm text-gray-400 mb-2">
                  Biological sex <span className="text-indigo-400 text-xs">(unlocks more stats ✨)</span>
                </label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setGender(gender === 'male' ? null : 'male')}
                    className={`flex-1 py-2.5 px-4 rounded-xl font-medium transition-all ${
                      gender === 'male'
                        ? 'bg-blue-500/30 border-2 border-blue-500 text-blue-300'
                        : 'bg-gray-800/50 border border-gray-700 text-gray-400 hover:border-gray-600'
                    }`}
                  >
                    ♂️ Male
                  </button>
                  <button
                    type="button"
                    onClick={() => setGender(gender === 'female' ? null : 'female')}
                    className={`flex-1 py-2.5 px-4 rounded-xl font-medium transition-all ${
                      gender === 'female'
                        ? 'bg-pink-500/30 border-2 border-pink-500 text-pink-300'
                        : 'bg-gray-800/50 border border-gray-700 text-gray-400 hover:border-gray-600'
                    }`}
                  >
                    ♀️ Female
                  </button>
                </div>
              </div>
              
              {/* Focus trap - catches Tab after date input and redirects to button */}
              <span
                tabIndex={0}
                onFocus={() => submitButtonRef.current?.focus()}
                className="sr-only"
                aria-hidden="true"
              />
              <button
                ref={submitButtonRef}
                type="submit"
                className="btn-primary w-full mt-4 py-3 rounded-xl font-semibold text-white text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                ✨ Calculate My Stats
              </button>
            </div>
          </form>
        )}

        {/* Stats Dashboard */}
        {stats && birthdayDate && unitConversions && (
          <div className="space-y-8 animate-fadeIn">
            {/* Reset Button */}
            <div className="text-center">
              <button
                onClick={() => {
                  setStats(null);
                  setGenderStats(null);
                  setBirthdayDate(null);
                  setBirthday('');
                  setGender(null);
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

            {/* Tap hint */}
            <div className="text-center text-sm text-gray-500">
              💡 Tap any stat with ↻ to change units
            </div>

            {/* Milestone Badges */}
            {(stats.isInBillionClub || stats.isIn10kClub) && (
              <div className="flex flex-wrap justify-center gap-3">
                {stats.isInBillionClub && (
                  <div className="stat-card rounded-full px-6 py-3 flex items-center gap-2 border-2 border-yellow-500/50">
                    <span className="text-2xl">🏆</span>
                    <span className="text-yellow-300 font-bold">BILLION SECONDS CLUB</span>
                  </div>
                )}
                {stats.isIn10kClub && (
                  <div className="stat-card rounded-full px-6 py-3 flex items-center gap-2 border-2 border-emerald-500/50">
                    <span className="text-2xl">🎯</span>
                    <span className="text-emerald-300 font-bold">10,000 DAYS CLUB</span>
                  </div>
                )}
              </div>
            )}

            {/* Time Stats */}
            <div>
              <h2 className="text-lg font-semibold text-gray-300 mb-4 flex items-center gap-2">
                <span>⏱️</span> Time Alive
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard icon="📅" label="Days" value={stats.daysAlive} delay={1} units={unitConversions.days} />
                <StatCard icon="⏰" label="Hours" value={stats.hoursAlive} delay={2} units={unitConversions.hours} />
                <StatCard icon="⏱️" label="Minutes" value={stats.minutesAlive} delay={3} units={unitConversions.minutes} />
                <StatCard icon="🌅" label="Sunrises" value={stats.sunrisesWitnessed} delay={4} />
              </div>
            </div>

            {/* Body Stats */}
            <div>
              <h2 className="text-lg font-semibold text-gray-300 mb-4 flex items-center gap-2">
                <span>🧬</span> Your Body
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard icon="💓" label="Heartbeats" value={stats.heartbeats} delay={5} units={unitConversions.heartbeats} />
                <StatCard icon="🌬️" label="Breaths" value={stats.breaths} delay={6} units={unitConversions.breaths} />
                <StatCard icon="👁️" label="Blinks" value={stats.blinks} delay={7} units={unitConversions.blinks} />
                <StatCard icon="🩸" label="Blood Pumped" value={stats.bloodPumpedGallons} delay={8} units={unitConversions.blood} />
                <StatCard icon="💇" label="Hair Grown" value={stats.hairGrownInches} delay={9} units={unitConversions.hair} />
                <StatCard icon="✨" label="Skin Cells Shed" value={stats.skinCellsShed} delay={10} units={unitConversions.skinCells} />
                <StatCard icon="💭" label="Dreams Had" value={stats.dreamsHad} delay={11} units={unitConversions.dreams} />
                <StatCard icon="😴" label="Hours Slept" value={stats.sleepHours} delay={12} units={unitConversions.sleep} />
              </div>
            </div>

            {/* Gender-Specific Stats (Premium) */}
            {genderStats && (
              <div className="relative">
                {/* Premium badge */}
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg z-10">
                  ✨ PREMIUM
                </div>
                <div className="stat-card rounded-2xl p-6 border-2 border-amber-500/30">
                  <h2 className="text-lg font-semibold text-gray-300 mb-4 flex items-center gap-2">
                    <span>{gender === 'male' ? '♂️' : '♀️'}</span> 
                    {gender === 'male' ? 'Male' : 'Female'} Stats
                  </h2>
                  
                  {/* Adjusted stats */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-gray-800/50 rounded-xl p-4">
                      <div className="text-sm text-gray-400 mb-1">Life Expectancy</div>
                      <div className="text-2xl font-bold text-white">{genderStats.adjustedLifeExpectancy} years</div>
                      <div className="text-xs text-gray-500">average for {gender === 'male' ? 'men' : 'women'}</div>
                    </div>
                    <div className="bg-gray-800/50 rounded-xl p-4">
                      <div className="text-sm text-gray-400 mb-1">Life Progress</div>
                      <div className="text-2xl font-bold text-white">{genderStats.adjustedLifespanPercentage.toFixed(1)}%</div>
                      <div className="text-xs text-gray-500">of expected lifespan</div>
                    </div>
                    <div className="bg-gray-800/50 rounded-xl p-4">
                      <div className="text-sm text-gray-400 mb-1">Heartbeats (adjusted)</div>
                      <div className="text-2xl font-bold text-white">{formatNumber(genderStats.adjustedHeartbeats)}</div>
                      <div className="text-xs text-gray-500">{gender === 'male' ? '~70' : '~78'} bpm avg</div>
                    </div>
                    <div className="bg-gray-800/50 rounded-xl p-4">
                      <div className="text-sm text-gray-400 mb-1">Calories Burned</div>
                      <div className="text-2xl font-bold text-orange-400">{formatNumber(genderStats.caloriesBurned)}</div>
                      <div className="text-xs text-gray-500">lifetime total</div>
                    </div>
                    <div className="bg-gray-800/50 rounded-xl p-4 col-span-2">
                      <div className="text-sm text-gray-400 mb-1">Red Blood Cells Produced</div>
                      <div className="text-2xl font-bold text-red-400">{formatNumber(genderStats.redBloodCellsProduced)}</div>
                      <div className="text-xs text-gray-500">{gender === 'male' ? '~200B' : '~180B'} per day</div>
                    </div>
                  </div>
                  
                  {/* Female-specific */}
                  {gender === 'female' && genderStats.menstrualCycles !== undefined && (
                    <div>
                      <h3 className="text-md font-semibold text-pink-300 mb-3">Female Biology</h3>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="bg-pink-500/10 rounded-xl p-4 border border-pink-500/20">
                          <div className="text-sm text-gray-400 mb-1">Menstrual Cycles</div>
                          <div className="text-2xl font-bold text-pink-300">{genderStats.menstrualCycles?.toLocaleString()}</div>
                        </div>
                        <div className="bg-pink-500/10 rounded-xl p-4 border border-pink-500/20">
                          <div className="text-sm text-gray-400 mb-1">Periods</div>
                          <div className="text-2xl font-bold text-pink-300">{genderStats.periodsHad?.toLocaleString()}</div>
                        </div>
                        <div className="bg-pink-500/10 rounded-xl p-4 border border-pink-500/20">
                          <div className="text-sm text-gray-400 mb-1">Eggs Released</div>
                          <div className="text-2xl font-bold text-pink-300">{genderStats.eggsReleased?.toLocaleString()}</div>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">* Estimated from age 12 to 51 (average menarche to menopause)</p>
                    </div>
                  )}
                  
                  {/* Male-specific */}
                  {gender === 'male' && genderStats.testosteroneCycles !== undefined && (
                    <div>
                      <h3 className="text-md font-semibold text-blue-300 mb-3">Male Biology</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/20">
                          <div className="text-sm text-gray-400 mb-1">Testosterone Cycles</div>
                          <div className="text-2xl font-bold text-blue-300">{genderStats.testosteroneCycles?.toLocaleString()}</div>
                          <div className="text-xs text-gray-500">daily fluctuations since puberty</div>
                        </div>
                        <div className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/20">
                          <div className="text-sm text-gray-400 mb-1">Facial Hair Grown</div>
                          <div className="text-2xl font-bold text-blue-300">{genderStats.facialHairGrown?.toFixed(1)} in</div>
                          <div className="text-xs text-gray-500">{((genderStats.facialHairGrown || 0) / 12).toFixed(1)} feet total</div>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">* Estimated from age 13 (average puberty onset)</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Cosmic Stats */}
            <div>
              <h2 className="text-lg font-semibold text-gray-300 mb-4 flex items-center gap-2">
                <span>🚀</span> Cosmic Journey
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <StatCard icon="🌍" label="Earth Orbits" value={stats.earthOrbits} delay={13} decimals={2} />
                <StatCard icon="🌙" label="Full Moons" value={stats.fullMoons} delay={14} showFull />
                <StatCard icon="🍂" label="Seasons" value={stats.seasonsExperienced} delay={15} showFull />
                <StatCard icon="🌑" label="Solar Eclipses" value={stats.solarEclipses} delay={16} showFull />
                <div className="col-span-2">
                  <StatCard icon="🚀" label="Miles Through Space" value={stats.milesThroughSpace} delay={17} units={unitConversions.milesThroughSpace} />
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                * Earth travels 1.6 million miles per day around the Sun. You&apos;ve been along for the ride!
              </p>
            </div>

            {/* World Context */}
            <div>
              <h2 className="text-lg font-semibold text-gray-300 mb-4 flex items-center gap-2">
                <span>🌍</span> Your World
              </h2>
              <div className="stat-card rounded-2xl p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="text-sm text-gray-400 mb-1">World Population When You Were Born</div>
                    <div className="text-2xl font-bold text-white">{formatNumber(stats.worldPopulationAtBirth)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-1">World Population Now</div>
                    <div className="text-2xl font-bold text-white">{formatNumber(stats.worldPopulationNow)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-1">People Added During Your Lifetime</div>
                    <div className="text-2xl font-bold text-emerald-400">+{formatNumber(stats.populationGrowth)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-1">% of Recorded Human History</div>
                    <div className="text-2xl font-bold text-purple-400">{stats.percentOfRecordedHistory.toFixed(3)}%</div>
                    <div className="text-xs text-gray-500">of ~5,000 years since writing</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Upcoming Milestones */}
            {(stats.daysUntil10k || stats.daysUntilBillionSeconds) && (
              <div>
                <h2 className="text-lg font-semibold text-gray-300 mb-4 flex items-center gap-2">
                  <span>🎯</span> Upcoming Milestones
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {stats.daysUntilBillionSeconds && stats.billionSecondsDate && (
                    <div className="stat-card rounded-2xl p-6 border-2 border-yellow-500/30">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-3xl">🏆</span>
                        <div>
                          <div className="font-bold text-yellow-300">Billion Seconds Club</div>
                          <div className="text-sm text-gray-400">The exclusive 31.7-year milestone</div>
                        </div>
                      </div>
                      <div className="text-3xl font-bold text-white mb-1">
                        {stats.daysUntilBillionSeconds.toLocaleString()} days
                      </div>
                      <div className="text-sm text-gray-400">
                        📅 {formatDate(stats.billionSecondsDate)}
                      </div>
                    </div>
                  )}
                  {stats.daysUntil10k && stats.tenThousandDaysDate && (
                    <div className="stat-card rounded-2xl p-6 border-2 border-emerald-500/30">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-3xl">🎯</span>
                        <div>
                          <div className="font-bold text-emerald-300">10,000 Days Club</div>
                          <div className="text-sm text-gray-400">The ~27.4-year milestone</div>
                        </div>
                      </div>
                      <div className="text-3xl font-bold text-white mb-1">
                        {stats.daysUntil10k.toLocaleString()} days
                      </div>
                      <div className="text-sm text-gray-400">
                        📅 {formatDate(stats.tenThousandDaysDate)}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

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
                  You&apos;ve walked approximately <span className="text-white font-semibold">{stats.stepsWalked.toLocaleString()}</span> steps
                  ({Math.floor(stats.stepsWalked / 2000).toLocaleString()} miles)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">•</span>
                  You&apos;ve eaten around <span className="text-white font-semibold">{stats.mealsEaten.toLocaleString()}</span> meals
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-400">•</span>
                  You&apos;ve spoken roughly <span className="text-white font-semibold">{(stats.wordsSpoken / 1000000).toFixed(1)}M</span> words — enough for <span className="text-white font-semibold">{Math.floor(stats.wordsSpoken / 80000).toLocaleString()}</span> novels!
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400">•</span>
                  Your hair has grown <span className="text-white font-semibold">{(stats.hairGrownInches / 12).toFixed(1)} feet</span> total
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400">•</span>
                  You&apos;ve slept for <span className="text-white font-semibold">{(stats.sleepHours / 24 / 365.25).toFixed(1)} years</span> of your life
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">•</span>
                  Your heart has pumped enough blood to fill <span className="text-white font-semibold">{Math.floor(stats.bloodPumpedGallons / 660_000).toLocaleString()}</span> Olympic swimming pools!
                </li>
                {stats.isInBillionClub && (
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
