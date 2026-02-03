'use client';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { calculateLifeStats, calculateGenderStats, LifeStats, GenderStats, Gender, Country, COUNTRY_PROFILES, formatDate, formatNumber } from '@/lib/calculations';
import StatCard, { UnitOption } from '@/components/StatCard';
import ProgressBar from '@/components/ProgressBar';
import BirthdayCountdown from '@/components/BirthdayCountdown';
import ShareCard from '@/components/ShareCard';
import LifeInWeeksGrid from '@/components/LifeInWeeksGrid';
import PlanetaryAges from '@/components/PlanetaryAges';
import CollapsibleSection from '@/components/CollapsibleSection';
import PersonalizationModal, { PersonalData } from '@/components/PersonalizationModal';
import PersonalizedComparison from '@/components/PersonalizedComparison';
import { saveProfile, loadProfile, UserProfile } from '@/lib/supabase';

// Helpers to convert between frontend PersonalData and database UserProfile
function personalDataToProfile(data: PersonalData, birthday: string, gender: Gender, country: Country): Omit<UserProfile, 'id' | 'created_at' | 'updated_at'> {
  // Convert height from ft/in to cm
  let heightCm: number | undefined;
  if (data.heightFeet) {
    const totalInches = (data.heightFeet * 12) + (data.heightInches || 0);
    heightCm = Math.round(totalInches * 2.54);
  }
  
  // Convert weight from lbs to kg
  const weightKg = data.weightLbs ? Math.round(data.weightLbs * 0.453592) : undefined;
  
  // Map activity level
  const activityMap: Record<string, UserProfile['activity_level']> = {
    'mostly_sitting': 'sedentary',
    'mixed': 'moderate',
    'on_feet': 'active',
    'physical_job': 'very_active',
  };
  
  return {
    birthday,
    gender: gender || undefined,
    country: country || 'us',
    height_cm: heightCm,
    weight_kg: weightKg,
    activity_level: data.workActivity ? activityMap[data.workActivity] : undefined,
    sleep_hours: data.sleepHours,
    coffee_per_day: data.coffeePerDay,
    alcohol_frequency: data.alcoholFrequency,
    smoker_status: data.smokerStatus,
    work_style: data.workStyle,
    work_hours_per_week: data.workHoursPerWeek,
    commute_minutes: data.commuteMinutes,
    industry: data.industry,
    accepted_terms: data.acceptedTerms,
  };
}

function profileToPersonalData(profile: UserProfile): PersonalData {
  // Convert height from cm to ft/in
  let heightFeet: number | undefined;
  let heightInches: number | undefined;
  if (profile.height_cm) {
    const totalInches = profile.height_cm / 2.54;
    heightFeet = Math.floor(totalInches / 12);
    heightInches = Math.round(totalInches % 12);
  }
  
  // Convert weight from kg to lbs
  const weightLbs = profile.weight_kg ? Math.round(profile.weight_kg / 0.453592) : undefined;
  
  // Map activity level back
  const activityMap: Record<string, PersonalData['workActivity']> = {
    'sedentary': 'mostly_sitting',
    'moderate': 'mixed',
    'active': 'on_feet',
    'very_active': 'physical_job',
  };
  
  return {
    heightFeet,
    heightInches,
    weightLbs,
    workActivity: profile.activity_level ? activityMap[profile.activity_level] : undefined,
    sleepHours: profile.sleep_hours ?? undefined,
    coffeePerDay: profile.coffee_per_day ?? undefined,
    alcoholFrequency: profile.alcohol_frequency ?? undefined,
    smokerStatus: profile.smoker_status ?? undefined,
    workStyle: profile.work_style ?? undefined,
    workHoursPerWeek: profile.work_hours_per_week ?? undefined,
    commuteMinutes: profile.commute_minutes ?? undefined,
    industry: profile.industry ?? undefined,
    acceptedTerms: profile.accepted_terms ?? undefined,
  };
}

// Conversion helpers
function createUnits(conversions: { label: string; value: number; suffix?: string; decimals?: number }[]): UnitOption[] {
  return conversions;
}

export default function Home() {
  const [birthday, setBirthday] = useState<string>('');
  const [gender, setGender] = useState<Gender>(null);
  const [country, setCountry] = useState<Country>('us');
  const [stats, setStats] = useState<LifeStats | null>(null);
  const [genderStats, setGenderStats] = useState<GenderStats | null>(null);
  const [birthdayDate, setBirthdayDate] = useState<Date | null>(null);
  const [liveSeconds, setLiveSeconds] = useState(0);
  const [showPersonalization, setShowPersonalization] = useState(false);
  const [personalData, setPersonalData] = useState<PersonalData | null>(null);
  const [profileId, setProfileId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  // Load saved profile from localStorage on mount
  useEffect(() => {
    const savedProfileId = localStorage.getItem('lifestats_profile_id');
    if (savedProfileId) {
      setProfileId(savedProfileId);
      loadProfile(savedProfileId).then(profile => {
        if (profile) {
          // Restore birthday, gender, country from profile
          setBirthday(profile.birthday);
          if (profile.gender) setGender(profile.gender);
          if (profile.country) setCountry(profile.country as Country);
          
          // Restore personal data
          setPersonalData(profileToPersonalData(profile));
          
          // Auto-submit to show stats
          setTimeout(() => {
            submitButtonRef.current?.click();
          }, 100);
        }
      });
    }
  }, []);

  const handleSubmit = useCallback((e?: React.FormEvent) => {
    e?.preventDefault();
    if (!birthday) return;
    
    const date = new Date(birthday + 'T00:00:00');
    if (date > new Date()) {
      alert('Please enter a birthday in the past!');
      return;
    }
    
    setBirthdayDate(date);
    const calculatedStats = calculateLifeStats(date, new Date(), country);
    setStats(calculatedStats);
    setLiveSeconds(calculatedStats.secondsAlive);
    
    // Calculate gender stats if gender selected
    if (gender) {
      const gStats = calculateGenderStats(date, gender, new Date(), country);
      setGenderStats(gStats);
    }
  }, [birthday, gender, country]);

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
      const newStats = calculateLifeStats(birthdayDate, new Date(), country);
      setStats(newStats);
    }, 60000);

    return () => clearInterval(interval);
  }, [birthdayDate, country]);

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
      
      // New body conversions
      fingernails: createUnits([
        { label: 'Fingernails Grown', value: stats.fingernailsGrownInches, suffix: 'inches', decimals: 1 },
        { label: 'Fingernails Grown', value: stats.fingernailsGrownInches / 12, suffix: 'feet', decimals: 2 },
        { label: 'Fingernails Grown', value: stats.fingernailsGrownInches * 2.54, suffix: 'cm', decimals: 1 },
      ]),
      toilet: createUnits([
        { label: 'Toilet Time', value: stats.toiletHours, suffix: 'hours' },
        { label: 'Toilet Time', value: stats.toiletHours / 24, suffix: 'days', decimals: 1 },
        { label: 'Toilet Time', value: stats.toiletHours / 24 / 365.25, suffix: 'years', decimals: 2 },
      ]),
      
      // Digital conversions
      googleSearches: createUnits([
        { label: 'Google Searches', value: stats.googleSearches },
        { label: 'Google Searches', value: stats.googleSearches / 1000, suffix: 'K', decimals: 1 },
      ]),
      emails: createUnits([
        { label: 'Emails', value: stats.emailsSent },
        { label: 'Emails', value: stats.emailsSent / 1000, suffix: 'K', decimals: 1 },
      ]),
      photos: createUnits([
        { label: 'Photos Taken', value: stats.photosTaken },
        { label: 'Photos Taken', value: stats.photosTaken / 1000, suffix: 'K', decimals: 1 },
      ]),
      videoHours: createUnits([
        { label: 'Video Watched', value: stats.hoursOfVideoWatched, suffix: 'hours' },
        { label: 'Video Watched', value: stats.hoursOfVideoWatched / 24, suffix: 'days', decimals: 1 },
        { label: 'Video Watched', value: stats.hoursOfVideoWatched / 24 / 30, suffix: 'months', decimals: 1 },
      ]),
      
      // Consumption conversions
      water: createUnits([
        { label: 'Water Drunk', value: stats.gallonsOfWaterDrunk, suffix: 'gallons' },
        { label: 'Water Drunk', value: stats.gallonsOfWaterDrunk * 3.785, suffix: 'liters', decimals: 0 },
        { label: 'Bathtubs', value: stats.gallonsOfWaterDrunk / 80, suffix: 'bathtubs', decimals: 1 },
      ]),
      coffee: createUnits([
        { label: 'Cups of Coffee', value: stats.cupsOfCoffee },
        { label: 'Gallons of Coffee', value: stats.cupsOfCoffee / 16, suffix: 'gallons', decimals: 0 },
      ]),
      
      // Time spent conversions
      eating: createUnits([
        { label: 'Time Eating', value: stats.hoursEating, suffix: 'hours' },
        { label: 'Time Eating', value: stats.hoursEating / 24, suffix: 'days', decimals: 1 },
        { label: 'Time Eating', value: stats.hoursEating / 24 / 365.25, suffix: 'years', decimals: 2 },
      ]),
      showering: createUnits([
        { label: 'Time Showering', value: stats.hoursShowering, suffix: 'hours' },
        { label: 'Time Showering', value: stats.hoursShowering / 24, suffix: 'days', decimals: 1 },
      ]),
      redLights: createUnits([
        { label: 'At Red Lights', value: stats.hoursAtRedLights, suffix: 'hours' },
        { label: 'At Red Lights', value: stats.hoursAtRedLights / 24, suffix: 'days', decimals: 1 },
      ]),
      inLine: createUnits([
        { label: 'Standing in Line', value: stats.hoursInLine, suffix: 'hours' },
        { label: 'Standing in Line', value: stats.hoursInLine / 24, suffix: 'days', decimals: 1 },
        { label: 'Standing in Line', value: stats.hoursInLine / 24 / 30, suffix: 'months', decimals: 1 },
      ]),
      transit: createUnits([
        { label: 'On Transit', value: stats.hoursOnTransit, suffix: 'hours' },
        { label: 'On Transit', value: stats.hoursOnTransit / 24, suffix: 'days', decimals: 1 },
        { label: 'On Transit', value: stats.hoursOnTransit / 24 / 365.25, suffix: 'years', decimals: 2 },
      ]),
      driving: createUnits([
        { label: 'Driving', value: stats.hoursDriving, suffix: 'hours' },
        { label: 'Driving', value: stats.hoursDriving / 24, suffix: 'days', decimals: 1 },
        { label: 'Driving', value: stats.hoursDriving / 24 / 365.25, suffix: 'years', decimals: 2 },
      ]),
      traffic: createUnits([
        { label: 'In Traffic', value: stats.hoursInTraffic, suffix: 'hours' },
        { label: 'In Traffic', value: stats.hoursInTraffic / 24, suffix: 'days', decimals: 1 },
      ]),
      screens: createUnits([
        { label: 'On Screens', value: stats.hoursOnScreens, suffix: 'hours' },
        { label: 'On Screens', value: stats.hoursOnScreens / 24, suffix: 'days', decimals: 1 },
        { label: 'On Screens', value: stats.hoursOnScreens / 24 / 365.25, suffix: 'years', decimals: 2 },
      ]),
      bathing: createUnits([
        { label: 'Bathing', value: stats.hoursBathing, suffix: 'hours' },
        { label: 'Bathing', value: stats.hoursBathing / 24, suffix: 'days', decimals: 1 },
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
            Welcome to your life
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
                tabIndex={1}
              />
              
              {/* Focus trap - catches Tab after date input */}
              <span
                tabIndex={2}
                onFocus={() => document.getElementById('gender-male')?.focus()}
                className="sr-only"
                aria-hidden="true"
              />
              
              {/* Gender selector - Premium feature */}
              <div className="mt-4">
                <label className="block text-sm text-gray-400 mb-2">
                  Biological sex <span className="text-indigo-400 text-xs">(unlocks more stats ✨)</span>
                </label>
                <div className="flex gap-3">
                  <button
                    id="gender-male"
                    type="button"
                    tabIndex={3}
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
                    id="gender-female"
                    type="button"
                    tabIndex={4}
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
              
              {/* Country selector */}
              <div className="mt-4">
                <label className="block text-sm text-gray-400 mb-2">
                  Location <span className="text-emerald-400 text-xs">(adjusts lifestyle stats 🌍)</span>
                </label>
                <select
                  value={country || 'us'}
                  onChange={(e) => setCountry(e.target.value as Country)}
                  tabIndex={5}
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white text-lg focus:outline-none focus:border-indigo-500 transition-colors"
                >
                  {Object.entries(COUNTRY_PROFILES).map(([code, profile]) => (
                    <option key={code} value={code}>
                      {profile.flag} {profile.name}
                    </option>
                  ))}
                </select>
              </div>
              <button
                ref={submitButtonRef}
                tabIndex={6}
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
                  setCountry('us');
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

            {/* Tap hint + Country selector */}
            <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
              <span>💡 Tap any stat with ↻ to change units</span>
              <span className="text-gray-700">|</span>
              <div className="flex items-center gap-2">
                <span className="text-gray-500">What if I lived in</span>
                <span>{COUNTRY_PROFILES[country || 'us'].flag}</span>
                <select
                  value={country || 'us'}
                  onChange={(e) => setCountry(e.target.value as Country)}
                  className="bg-transparent border-none text-indigo-400 text-sm cursor-pointer hover:text-indigo-300 focus:outline-none font-medium"
                >
                  {Object.entries(COUNTRY_PROFILES).map(([code, profile]) => (
                    <option key={code} value={code} className="bg-gray-900">
                      {profile.flag} {profile.name}
                    </option>
                  ))}
                </select>
                <span className="text-gray-500">?</span>
              </div>
            </div>

            {/* Personalization Prompt */}
            {!personalData && (
              <div className="stat-card rounded-2xl p-6 border-2 border-indigo-500/30 bg-gradient-to-r from-indigo-500/10 to-purple-500/10">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                      <span>🎯</span> Get Personalized Stats
                    </h3>
                    <p className="text-sm text-gray-400 mt-1">
                      Your stats use averages. Add your info for accurate insights tailored to YOU.
                    </p>
                  </div>
                  <button
                    onClick={() => setShowPersonalization(true)}
                    className="btn-primary px-5 py-2.5 rounded-xl font-semibold text-white whitespace-nowrap"
                  >
                    Personalize →
                  </button>
                </div>
              </div>
            )}

            {/* Personalized Badge */}
            {personalData && (
              <div className="text-center mb-4">
                <p className="text-gray-300 text-lg mb-3">
                  Discover the incredible numbers behind your existence
                </p>
                <div className="flex items-center justify-center gap-2 text-sm">
                  <span className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-3 py-1 rounded-full font-medium">
                    ✨ Personalized Stats Active
                  </span>
                  <button
                    onClick={() => setShowPersonalization(true)}
                    className="text-indigo-400 hover:underline"
                  >
                    Edit
                  </button>
                </div>
              </div>
            )}

            {/* Personalized Comparison */}
            {personalData && (
              <PersonalizedComparison
                personalData={personalData}
                stats={stats}
                country={country}
                yearsAlive={stats.earthOrbits}
              />
            )}

            {/* Time Stats */}
            <CollapsibleSection title="Time Alive" icon="⏱️">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard icon="📅" label="Days" value={stats.daysAlive} delay={1} units={unitConversions.days} />
                <StatCard icon="📆" label="Weeks" value={stats.weeksAlive} delay={2} />
                <StatCard icon="⏰" label="Hours" value={stats.hoursAlive} delay={3} units={unitConversions.hours} />
                <StatCard icon="🌅" label="Sunrises" value={stats.sunrisesWitnessed} delay={4} />
              </div>
            </CollapsibleSection>

            {/* Birth Identity Card */}
            <CollapsibleSection title="Your Cosmic Identity" icon="🔮">
              <div className="stat-card rounded-2xl p-6 border-2 border-purple-500/30">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="bg-gray-800/50 rounded-xl p-4 text-center">
                  <div className="text-3xl mb-1">{stats.birthInfo.westernZodiac.emoji}</div>
                  <div className="text-lg font-bold text-white">{stats.birthInfo.westernZodiac.name}</div>
                  <div className="text-xs text-gray-400">{stats.birthInfo.westernZodiac.symbol} {stats.birthInfo.westernZodiac.element}</div>
                </div>
                <div className="bg-gray-800/50 rounded-xl p-4 text-center">
                  <div className="text-3xl mb-1">{stats.birthInfo.chineseZodiac.emoji}</div>
                  <div className="text-lg font-bold text-white">{stats.birthInfo.chineseZodiac.animal}</div>
                  <div className="text-xs text-gray-400">Chinese Zodiac</div>
                </div>
                <div className="bg-gray-800/50 rounded-xl p-4 text-center">
                  <div className="text-3xl mb-1">{stats.birthInfo.birthstone.emoji}</div>
                  <div className="text-lg font-bold text-white">{stats.birthInfo.birthstone.name}</div>
                  <div className="text-xs text-gray-400">Birthstone</div>
                </div>
                <div className="bg-gray-800/50 rounded-xl p-4 text-center">
                  <div className="text-3xl mb-1">{stats.birthInfo.generation.emoji}</div>
                  <div className="text-lg font-bold text-white">{stats.birthInfo.generation.name}</div>
                  <div className="text-xs text-gray-400">Generation</div>
                </div>
              </div>
              
              {/* Day of Birth Details */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="bg-purple-500/10 rounded-lg p-3 text-center border border-purple-500/20">
                  <div className="text-xl">{stats.birthInfo.dayOfWeekEmoji}</div>
                  <div className="text-sm text-white font-medium">{stats.birthInfo.dayOfWeek}</div>
                  <div className="text-xs text-gray-400">Born on</div>
                </div>
                <div className="bg-purple-500/10 rounded-lg p-3 text-center border border-purple-500/20">
                  <div className="text-xl">{stats.birthInfo.moonEmoji}</div>
                  <div className="text-sm text-white font-medium">{stats.birthInfo.moonPhase}</div>
                  <div className="text-xs text-gray-400">Moon phase</div>
                </div>
                <div className="bg-purple-500/10 rounded-lg p-3 text-center border border-purple-500/20">
                  <div className="text-xl">{stats.birthInfo.seasonEmoji}</div>
                  <div className="text-sm text-white font-medium">{stats.birthInfo.season}</div>
                  <div className="text-xs text-gray-400">Season</div>
                </div>
              </div>

                {/* Traits */}
                <div className="flex flex-wrap gap-2 justify-center">
                  {stats.birthInfo.westernZodiac.traits.map((trait, i) => (
                    <span key={i} className="text-xs bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full">
                      {trait}
                    </span>
                  ))}
                  {stats.birthInfo.generation.traits.slice(0, 2).map((trait, i) => (
                    <span key={`gen-${i}`} className="text-xs bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full">
                      {trait}
                    </span>
                  ))}
                </div>
              </div>
            </CollapsibleSection>

            {/* Famous Birthday Twins */}
            {stats.birthInfo.famousBirthdays.length > 0 && (
              <CollapsibleSection title="Famous Birthday Twins" icon="🎂">
                <div className="stat-card rounded-2xl p-6">
                  <div className="flex flex-wrap gap-3 justify-center">
                    {stats.birthInfo.famousBirthdays.map((celeb, i) => (
                      <div key={i} className="bg-amber-500/10 border border-amber-500/30 rounded-xl px-4 py-2 text-center">
                        <div className="text-white font-medium">{celeb.name}</div>
                        <div className="text-xs text-gray-400">{celeb.desc} • {celeb.year}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </CollapsibleSection>
            )}

            {/* When You Were Born */}
            {stats.birthInfo.birthYearContext.song && (
              <CollapsibleSection title={`The Year You Were Born (${birthdayDate.getFullYear()})`} icon="📅">
                <div className="stat-card rounded-2xl p-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {stats.birthInfo.birthYearContext.song && (
                      <div className="bg-gray-800/50 rounded-xl p-4">
                        <div className="text-2xl mb-1">🎵</div>
                        <div className="text-xs text-gray-400 mb-1">#1 Song</div>
                        <div className="text-sm text-white">{stats.birthInfo.birthYearContext.song}</div>
                      </div>
                    )}
                    {stats.birthInfo.birthYearContext.movie && (
                      <div className="bg-gray-800/50 rounded-xl p-4">
                        <div className="text-2xl mb-1">🎬</div>
                        <div className="text-xs text-gray-400 mb-1">Top Movie</div>
                        <div className="text-sm text-white">{stats.birthInfo.birthYearContext.movie}</div>
                      </div>
                    )}
                    {stats.birthInfo.birthYearContext.event && (
                      <div className="bg-gray-800/50 rounded-xl p-4">
                        <div className="text-2xl mb-1">📰</div>
                        <div className="text-xs text-gray-400 mb-1">Big Event</div>
                        <div className="text-sm text-white">{stats.birthInfo.birthYearContext.event}</div>
                      </div>
                    )}
                    {stats.birthInfo.birthYearContext.price_gas && (
                      <div className="bg-gray-800/50 rounded-xl p-4">
                        <div className="text-2xl mb-1">⛽</div>
                        <div className="text-xs text-gray-400 mb-1">Gas Price</div>
                        <div className="text-sm text-white">${stats.birthInfo.birthYearContext.price_gas?.toFixed(2)}/gal</div>
                      </div>
                    )}
                  </div>
                </div>
              </CollapsibleSection>
            )}

            {/* Tech Timeline */}
            {stats.birthInfo.techTimeline.length > 0 && (
              <CollapsibleSection title="Tech Milestones in Your Lifetime" icon="💻">
                <div className="stat-card rounded-2xl p-6">
                  <div className="relative">
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 to-purple-500"></div>
                    <div className="space-y-3">
                      {stats.birthInfo.techTimeline.slice(0, 8).map((tech, i) => (
                        <div key={i} className="flex items-center gap-4 pl-8 relative">
                          <div className="absolute left-2.5 w-3 h-3 bg-cyan-500 rounded-full border-2 border-gray-900"></div>
                          <div className="text-xl">{tech.emoji}</div>
                          <div className="flex-1">
                            <span className="text-white font-medium">{tech.event}</span>
                            <span className="text-gray-400 text-sm ml-2">
                              ({tech.year} • age {tech.ageAtEvent})
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CollapsibleSection>
            )}

            {/* Achievement Badges */}
            <CollapsibleSection title="Achievements" icon="🏅">
              <div className="stat-card rounded-2xl p-6">
                <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                  {stats.achievements.map((achievement, i) => (
                    <div 
                      key={i} 
                      className={`rounded-xl p-3 text-center transition-all ${
                        achievement.earned 
                          ? 'bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/50' 
                          : 'bg-gray-800/30 border border-gray-700/50 opacity-50'
                      }`}
                    >
                      <div className={`text-2xl mb-1 ${!achievement.earned && 'grayscale'}`}>
                        {achievement.emoji}
                      </div>
                      <div className={`text-xs font-medium ${achievement.earned ? 'text-white' : 'text-gray-500'}`}>
                        {achievement.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CollapsibleSection>

            {/* Future Milestones */}
            {stats.futureMilestones.length > 0 && (
              <CollapsibleSection title="Upcoming Milestones" icon="🎯">
                <div className="stat-card rounded-2xl p-6 border-2 border-cyan-500/30">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {stats.futureMilestones.slice(0, 4).map((milestone, i) => (
                      <div key={i} className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-xl p-4 border border-cyan-500/20">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-2xl">{milestone.emoji}</span>
                          <div>
                            <div className="font-bold text-white">{milestone.name}</div>
                            <div className="text-xs text-gray-400">{milestone.description}</div>
                          </div>
                        </div>
                        <div className="text-2xl font-bold text-cyan-300">
                          {milestone.daysUntil.toLocaleString()} days
                        </div>
                        <div className="text-xs text-gray-400">
                          📅 {formatDate(milestone.date)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CollapsibleSection>
            )}

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

            {/* Body Stats */}
            <CollapsibleSection title="Your Body" icon="🧬">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard icon="💓" label="Heartbeats" value={stats.heartbeats} delay={5} units={unitConversions.heartbeats} />
                <StatCard icon="🌬️" label="Breaths" value={stats.breaths} delay={6} units={unitConversions.breaths} />
                <StatCard icon="👁️" label="Blinks" value={stats.blinks} delay={7} units={unitConversions.blinks} />
                <StatCard icon="🩸" label="Blood Pumped" value={stats.bloodPumpedGallons} delay={8} units={unitConversions.blood} />
                <StatCard icon="💇" label="Hair Grown" value={stats.hairGrownInches} delay={9} units={unitConversions.hair} />
                <StatCard icon="💅" label="Nails Grown" value={stats.fingernailsGrownInches} delay={10} units={unitConversions.fingernails} />
                <StatCard icon="✨" label="Skin Cells Shed" value={stats.skinCellsShed} delay={11} units={unitConversions.skinCells} />
                <StatCard icon="💭" label="Dreams Had" value={stats.dreamsHad} delay={12} units={unitConversions.dreams} />
                <StatCard icon="😴" label="Hours Slept" value={stats.sleepHours} delay={13} units={unitConversions.sleep} />
                <StatCard icon="😂" label="Times Laughed" value={stats.timesLaughed} delay={14} />
                <StatCard icon="🤧" label="Sneezes" value={stats.sneezes} delay={15} />
                <StatCard icon="🚽" label="Toilet Time" value={stats.toiletHours} delay={16} units={unitConversions.toilet} />
                <StatCard icon="🔄" label="Blood Recycles" value={stats.bloodRecycles} delay={17} />
              </div>
            </CollapsibleSection>

            {/* Gender-Specific Stats (Premium) */}
            {genderStats && (
              <CollapsibleSection 
                title={`${gender === 'male' ? 'Male' : 'Female'} Stats`} 
                icon={gender === 'male' ? '♂️' : '♀️'}
                badge="✨ PREMIUM"
                badgeColor="amber"
              >
                <div className="stat-card rounded-2xl p-6 border-2 border-amber-500/30">
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
              </CollapsibleSection>
            )}

            {/* Cosmic Stats */}
            <CollapsibleSection title="Cosmic Journey" icon="🚀">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <StatCard icon="🌍" label="Earth Orbits" value={stats.earthOrbits} delay={18} decimals={2} />
                <StatCard icon="🌕" label="Full Moons" value={stats.fullMoons} delay={19} showFull />
                <StatCard icon="🌑" label="New Moons" value={stats.newMoons} delay={20} showFull />
                <StatCard icon="🍂" label="Seasons" value={stats.seasonsExperienced} delay={21} showFull />
                <StatCard icon="☀️" label="Solar Eclipses" value={stats.solarEclipses} delay={22} showFull />
                <StatCard icon="🌘" label="Lunar Eclipses" value={stats.lunarEclipses} delay={23} showFull />
                <StatCard icon="📅" label="Leap Years" value={stats.leapYears} delay={24} showFull />
                <StatCard icon="🚀" label="Miles Through Space" value={stats.milesThroughSpace} delay={25} units={unitConversions.milesThroughSpace} />
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                * Earth travels 1.6 million miles per day around the Sun. You&apos;ve been along for the ride!
              </p>
            </CollapsibleSection>

            {/* Planetary Ages */}
            <CollapsibleSection title="Your Age on Other Planets" icon="🪐">
              <PlanetaryAges planetaryAges={stats.planetaryAges} />
            </CollapsibleSection>

            {/* Life in Weeks Grid */}
            <CollapsibleSection title="Your Life in Weeks" icon="📊" defaultOpen={false}>
              <LifeInWeeksGrid lifeInWeeks={stats.lifeInWeeks} />
            </CollapsibleSection>

            {/* Digital Stats */}
            <CollapsibleSection title="Digital Life" icon="📱">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard icon="🔍" label="Google Searches" value={stats.googleSearches} delay={24} units={unitConversions.googleSearches} />
                <StatCard icon="📧" label="Emails" value={stats.emailsSent} delay={25} units={unitConversions.emails} />
                <StatCard icon="📸" label="Photos Taken" value={stats.photosTaken} delay={26} units={unitConversions.photos} />
                <StatCard icon="🎬" label="Video Watched" value={stats.hoursOfVideoWatched} delay={27} units={unitConversions.videoHours} />
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                * Calculated from internet era (1998) and smartphone era (2010)
              </p>
            </CollapsibleSection>

            {/* Consumption Stats */}
            <CollapsibleSection title="Consumption" icon="🍽️" badge={`${COUNTRY_PROFILES[country || 'us'].flag} local cuisine`} badgeColor="emerald">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {stats.foodStats.map((food, index) => (
                  <StatCard 
                    key={food.key}
                    icon={food.icon} 
                    label={food.label} 
                    value={food.value} 
                    delay={28 + index}
                    decimals={food.decimals}
                    showFull={food.showFull}
                  />
                ))}
                <StatCard icon="💧" label="Water Drunk" value={stats.gallonsOfWaterDrunk} delay={34} units={unitConversions.water} />
                <StatCard icon="☕" label="Cups of Coffee" value={stats.cupsOfCoffee} delay={35} units={unitConversions.coffee} />
                <StatCard icon="🍽️" label="Meals Eaten" value={stats.mealsEaten} delay={36} units={unitConversions.meals} />
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                * Based on {COUNTRY_PROFILES[country || 'us'].name} averages. Coffee counted from age 18+.
              </p>
            </CollapsibleSection>

            {/* Time Spent Stats */}
            <CollapsibleSection title="Time Spent" icon="⏰" badge={`${COUNTRY_PROFILES[country || 'us'].flag} adjusted`} badgeColor="emerald">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <StatCard icon="🍽️" label="Eating" value={stats.hoursEating} delay={34} units={unitConversions.eating} />
                <StatCard icon="🚿" label="Showering" value={stats.hoursShowering} delay={35} units={unitConversions.showering} />
                <StatCard icon="🛁" label="Bathing" value={stats.hoursBathing} delay={36} units={unitConversions.bathing} />
                <StatCard icon="🚶" label="Standing in Line" value={stats.hoursInLine} delay={37} units={unitConversions.inLine} />
                <StatCard icon="🚇" label="On Transit" value={stats.hoursOnTransit} delay={38} units={unitConversions.transit} />
                <StatCard icon="🚗" label="Driving" value={stats.hoursDriving} delay={39} units={unitConversions.driving} />
                <StatCard icon="🚦" label="At Red Lights" value={stats.hoursAtRedLights} delay={40} units={unitConversions.redLights} />
                <StatCard icon="🚙" label="In Traffic" value={stats.hoursInTraffic} delay={41} units={unitConversions.traffic} />
                <StatCard icon="📱" label="On Screens" value={stats.hoursOnScreens} delay={42} units={unitConversions.screens} />
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                * Adjusted for {COUNTRY_PROFILES[country || 'us'].name} lifestyle. Driving stats from age 16+. Screens from smartphone era.
              </p>
            </CollapsibleSection>

            {/* World Events */}
            <CollapsibleSection title="World Events" icon="🏛️" defaultOpen={false}>
              <div className="stat-card rounded-2xl p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <div className="text-sm text-gray-400 mb-2">US Presidents in Your Lifetime</div>
                    <div className="text-3xl font-bold text-white mb-2">{stats.usPresidents.length}</div>
                    <div className="text-xs text-gray-500 space-y-1">
                      {stats.usPresidents.slice(-5).map((p, i) => (
                        <div key={i}>{p}</div>
                      ))}
                      {stats.usPresidents.length > 5 && (
                        <div className="text-indigo-400">+{stats.usPresidents.length - 5} more</div>
                      )}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-2">Summer Olympics</div>
                    <div className="text-3xl font-bold text-amber-400">{stats.olympicsHeld}</div>
                    <div className="text-xs text-gray-500">held during your lifetime</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-2">FIFA World Cups</div>
                    <div className="text-3xl font-bold text-emerald-400">{stats.worldCups}</div>
                    <div className="text-xs text-gray-500">held during your lifetime</div>
                  </div>
                </div>
              </div>
            </CollapsibleSection>

            {/* World Context */}
            <CollapsibleSection title="Your World" icon="🌍" defaultOpen={false}>
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
            </CollapsibleSection>

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
            <CollapsibleSection title="Fun Facts" icon="💡" defaultOpen={false}>
              <div className="stat-card rounded-2xl p-6">
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
            </CollapsibleSection>

            {/* Share Section */}
            <ShareCard stats={stats} birthday={birthdayDate} />

            {/* Footer */}
            <div className="text-center text-gray-500 text-sm pt-8">
              <p>Made with ❤️ • Every number tells your story</p>
            </div>
          </div>
        )}

        {/* Personalization Modal */}
        <PersonalizationModal
          isOpen={showPersonalization}
          onClose={() => setShowPersonalization(false)}
          onComplete={async (data) => {
            setPersonalData(data);
            setShowPersonalization(false);
            setIsSaving(true);
            
            // Save to Supabase
            try {
              const profileData = personalDataToProfile(data, birthday, gender, country);
              const newProfileId = await saveProfile(profileData);
              
              if (newProfileId) {
                setProfileId(newProfileId);
                localStorage.setItem('lifestats_profile_id', newProfileId);
                console.log('Profile saved:', newProfileId);
              }
            } catch (error) {
              console.error('Failed to save profile:', error);
            } finally {
              setIsSaving(false);
            }
          }}
        />
      </div>
    </main>
  );
}
