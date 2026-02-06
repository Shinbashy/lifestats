'use client';

import { useState } from 'react';
import { PersonalData } from './PersonalizationModal';
import { LifeStats, COUNTRY_PROFILES, Country } from '@/lib/calculations';
import SortableGrid from '@/components/SortableGrid';

type CompareMode = 'average' | 'recommended';

// Actual global/country averages
const AVERAGES = {
  sleep: 7,           // Global average
  workHours: 37,      // OECD average
  commute: 30,        // Global average (minutes)
  steps: 5000,        // US average (sedentary)
  coffee: 2.7,        // US average
  exercise: 'light',  // 1-2x/week
  bmi: 26.5,          // US average (overweight)
  screenTime: 7,      // hours/day
};

// Health recommendations
const RECOMMENDED = {
  sleep: 8,           // CDC/WHO recommended
  workHours: 40,      // Standard full-time (not a health rec, but benchmark)
  commute: 20,        // Ideal for wellbeing
  steps: 10000,       // CDC recommended
  coffee: 3,          // Max safe (400mg caffeine)
  exercise: 'moderate', // 3-4x/week CDC
  bmi: 22,            // Middle of healthy range
  screenTime: 4,      // Recommended max
};

interface ComparisonItem {
  icon: string;
  label: string;
  yours: number | string;
  baseline: number | string;
  unit: string;
  diff?: number;
  diffLabel?: string;
  highlight?: 'good' | 'bad' | 'neutral';
  insight?: string; // Extra context for recommended mode
}

interface PersonalizedComparisonProps {
  personalData: PersonalData;
  stats: LifeStats;
  country: Country;
  yearsAlive: number;
}

export default function PersonalizedComparison({ 
  personalData, 
  stats, 
  country,
  yearsAlive 
}: PersonalizedComparisonProps) {
  const [mode, setMode] = useState<CompareMode>('average');
  const profile = COUNTRY_PROFILES[country || 'us'];
  const isRecommended = mode === 'recommended';
  
  const comparisons: ComparisonItem[] = [];

  // Sleep comparison
  if (personalData.sleepHours) {
    const baseline = isRecommended ? RECOMMENDED.sleep : AVERAGES.sleep;
    const yourSleepYears = (personalData.sleepHours / 24) * 365.25 * yearsAlive;
    const baselineSleepYears = (baseline / 24) * 365.25 * yearsAlive;
    const diff = ((personalData.sleepHours - baseline) / baseline) * 100;
    
    // Different highlight logic for each mode
    let highlight: 'good' | 'bad' | 'neutral';
    let diffLabel: string;
    
    if (isRecommended) {
      // For recommended: meeting or exceeding is good
      highlight = personalData.sleepHours >= RECOMMENDED.sleep ? 'good' : 
                  personalData.sleepHours >= 7 ? 'neutral' : 'bad';
      diffLabel = personalData.sleepHours >= RECOMMENDED.sleep 
        ? '✓ Meeting recommendation'
        : `${(RECOMMENDED.sleep - personalData.sleepHours).toFixed(1)}hrs below target`;
    } else {
      // For average: just show difference
      highlight = diff > 0 ? 'good' : diff < -10 ? 'bad' : 'neutral';
      diffLabel = diff > 0 
        ? `${Math.abs(diff).toFixed(0)}% more sleep`
        : `${Math.abs(diff).toFixed(0)}% less sleep`;
    }
    
    comparisons.push({
      icon: '😴',
      label: 'Sleep per Night',
      yours: personalData.sleepHours,
      baseline,
      unit: 'hours',
      diff,
      diffLabel,
      highlight,
      insight: isRecommended ? 'CDC recommends 7-9 hours' : undefined,
    });
    
    comparisons.push({
      icon: '🛏️',
      label: 'Total Time Slept',
      yours: yourSleepYears.toFixed(1),
      baseline: baselineSleepYears.toFixed(1),
      unit: 'years',
      highlight: 'neutral',
    });
  }

  // Coffee comparison
  if (personalData.coffeePerDay !== undefined) {
    const baseline = isRecommended ? RECOMMENDED.coffee : (profile.coffeePerDay || AVERAGES.coffee);
    const coffeeYears = Math.max(0, yearsAlive - 18);
    const yourTotalCoffee = Math.floor(personalData.coffeePerDay * 365.25 * coffeeYears);
    const baselineTotalCoffee = Math.floor(baseline * 365.25 * coffeeYears);
    const diff = baseline > 0 ? ((personalData.coffeePerDay - baseline) / baseline) * 100 : 0;
    
    let highlight: 'good' | 'bad' | 'neutral' = 'neutral';
    let diffLabel: string;
    
    if (isRecommended) {
      highlight = personalData.coffeePerDay <= RECOMMENDED.coffee ? 'good' : 'neutral';
      diffLabel = personalData.coffeePerDay <= RECOMMENDED.coffee
        ? '✓ Within safe limit'
        : 'Above 400mg caffeine/day';
    } else {
      diffLabel = diff > 0 
        ? `${Math.abs(diff).toFixed(0)}% more caffeine`
        : diff < 0 
          ? `${Math.abs(diff).toFixed(0)}% less caffeine`
          : 'Same as average';
    }
    
    comparisons.push({
      icon: '☕',
      label: 'Daily Coffee',
      yours: personalData.coffeePerDay,
      baseline: typeof baseline === 'number' ? baseline.toFixed(1) : baseline,
      unit: 'cups',
      diff,
      diffLabel,
      highlight,
      insight: isRecommended ? 'FDA: max 400mg caffeine (~4 cups)' : undefined,
    });

    comparisons.push({
      icon: '☕',
      label: 'Lifetime Coffee',
      yours: yourTotalCoffee.toLocaleString(),
      baseline: baselineTotalCoffee.toLocaleString(),
      unit: 'cups',
      highlight: 'neutral',
    });
  }

  // Work hours comparison
  if (personalData.workHoursPerWeek) {
    const baseline = isRecommended ? RECOMMENDED.workHours : AVERAGES.workHours;
    const workYears = Math.max(0, yearsAlive - 22);
    const yourWorkHours = personalData.workHoursPerWeek * 52 * workYears;
    const baselineWorkHoursTotal = baseline * 52 * workYears;
    const diff = ((personalData.workHoursPerWeek - baseline) / baseline) * 100;
    
    let highlight: 'good' | 'bad' | 'neutral';
    let diffLabel: string;
    
    if (isRecommended) {
      // Less work = better work-life balance
      highlight = personalData.workHoursPerWeek <= 40 ? 'good' : 
                  personalData.workHoursPerWeek <= 50 ? 'neutral' : 'bad';
      diffLabel = personalData.workHoursPerWeek <= 40
        ? '✓ Healthy work-life balance'
        : personalData.workHoursPerWeek <= 50
          ? 'Slightly over standard'
          : '⚠️ Risk of burnout';
    } else {
      highlight = diff > 20 ? 'bad' : diff < -10 ? 'good' : 'neutral';
      diffLabel = diff > 0 
        ? `${Math.abs(diff).toFixed(0)}% more than avg`
        : `${Math.abs(diff).toFixed(0)}% less than avg`;
    }
    
    comparisons.push({
      icon: '💼',
      label: 'Work Hours/Week',
      yours: personalData.workHoursPerWeek,
      baseline,
      unit: 'hrs',
      diff,
      diffLabel,
      highlight,
      insight: isRecommended ? '40hrs = standard full-time' : undefined,
    });

    comparisons.push({
      icon: '⏰',
      label: 'Career Hours',
      yours: (yourWorkHours / 8760).toFixed(1),
      baseline: (baselineWorkHoursTotal / 8760).toFixed(1),
      unit: 'years',
      highlight: 'neutral',
    });
  }

  // Daily steps
  if (personalData.dailySteps) {
    const baseline = isRecommended ? RECOMMENDED.steps : (profile.stepsPerDay || AVERAGES.steps);
    const diff = ((personalData.dailySteps - baseline) / baseline) * 100;
    
    let highlight: 'good' | 'bad' | 'neutral';
    let diffLabel: string;
    
    if (isRecommended) {
      highlight = personalData.dailySteps >= 10000 ? 'good' : 
                  personalData.dailySteps >= 7500 ? 'neutral' : 'bad';
      diffLabel = personalData.dailySteps >= 10000
        ? '✓ Meeting 10k goal'
        : `${(10000 - personalData.dailySteps).toLocaleString()} steps to goal`;
    } else {
      highlight = diff > 20 ? 'good' : diff < -20 ? 'bad' : 'neutral';
      diffLabel = diff > 0 
        ? `${Math.abs(diff).toFixed(0)}% more than avg`
        : `${Math.abs(diff).toFixed(0)}% fewer than avg`;
    }
    
    comparisons.push({
      icon: '👟',
      label: 'Daily Steps',
      yours: personalData.dailySteps.toLocaleString(),
      baseline: baseline.toLocaleString(),
      unit: 'steps',
      diff,
      diffLabel,
      highlight,
      insight: isRecommended ? 'CDC: 10,000 steps/day' : undefined,
    });

    // Lifetime steps
    const yourLifetimeSteps = personalData.dailySteps * 365.25 * yearsAlive;
    const baselineLifetimeSteps = baseline * 365.25 * yearsAlive;
    comparisons.push({
      icon: '🚶',
      label: 'Lifetime Steps',
      yours: (yourLifetimeSteps / 1_000_000).toFixed(1) + 'M',
      baseline: (baselineLifetimeSteps / 1_000_000).toFixed(1) + 'M',
      unit: 'million steps',
      highlight: 'neutral',
    });

    // Miles walked
    const yourMiles = Math.floor(yourLifetimeSteps / 2000);
    const baselineMiles = Math.floor(baselineLifetimeSteps / 2000);
    comparisons.push({
      icon: '🗺️',
      label: 'Miles Walked',
      yours: yourMiles.toLocaleString(),
      baseline: baselineMiles.toLocaleString(),
      unit: 'miles',
      highlight: yourMiles > baselineMiles ? 'good' : 'neutral',
    });
  }

  // Exercise frequency
  if (personalData.exerciseFrequency) {
    const exerciseLabels: Record<string, string> = {
      rarely: 'Rarely',
      light: '1-2x/week',
      moderate: '3-4x/week',
      intense: '5+/week',
    };
    
    const exerciseOrder = ['rarely', 'light', 'moderate', 'intense'];
    const yourIndex = exerciseOrder.indexOf(personalData.exerciseFrequency);
    const recIndex = exerciseOrder.indexOf('moderate'); // CDC recommends 3-4x
    
    let highlight: 'good' | 'bad' | 'neutral';
    let diffLabel: string | undefined;
    
    if (isRecommended) {
      highlight = yourIndex >= recIndex ? 'good' : yourIndex === 1 ? 'neutral' : 'bad';
      diffLabel = yourIndex >= recIndex 
        ? '✓ Meeting CDC guidelines'
        : 'Below recommended activity';
    } else {
      highlight = personalData.exerciseFrequency === 'rarely' ? 'bad' : 
                  personalData.exerciseFrequency === 'light' ? 'neutral' : 'good';
    }
    
    comparisons.push({
      icon: '🏋️',
      label: 'Exercise',
      yours: exerciseLabels[personalData.exerciseFrequency] || personalData.exerciseFrequency,
      baseline: isRecommended ? '3-4x/week' : '1-2x/week',
      unit: isRecommended ? '(CDC guideline)' : '(national avg)',
      highlight,
      diffLabel,
      insight: isRecommended ? '150 min/week moderate activity' : undefined,
    });
  }

  // BMI
  if (personalData.heightFeet && personalData.weightLbs) {
    const heightInches = (personalData.heightFeet * 12) + (personalData.heightInches || 0);
    const bmi = (personalData.weightLbs / (heightInches * heightInches)) * 703;
    const baseline = isRecommended ? RECOMMENDED.bmi : AVERAGES.bmi;
    const diff = ((bmi - baseline) / baseline) * 100;
    
    let bmiCategory = 'Normal';
    let highlight: 'good' | 'bad' | 'neutral' = 'good';
    if (bmi < 18.5) { bmiCategory = 'Underweight'; highlight = 'neutral'; }
    else if (bmi < 25) { bmiCategory = 'Normal'; highlight = 'good'; }
    else if (bmi < 30) { bmiCategory = 'Overweight'; highlight = 'neutral'; }
    else { bmiCategory = 'Obese'; highlight = 'bad'; }
    
    const diffLabel = isRecommended 
      ? (bmi >= 18.5 && bmi < 25 ? '✓ Healthy BMI range' : `Target: 18.5-24.9`)
      : bmiCategory;
    
    comparisons.push({
      icon: '⚖️',
      label: 'BMI',
      yours: bmi.toFixed(1),
      baseline: baseline.toFixed(1),
      unit: bmiCategory,
      diff,
      diffLabel,
      highlight,
      insight: isRecommended ? 'Healthy range: 18.5-24.9' : undefined,
    });
  }

  // Alcohol comparison
  if (personalData.alcoholFrequency) {
    const alcoholLabels: Record<string, string> = {
      never: 'Never',
      occasionally: 'Occasionally',
      weekly: 'Weekly',
      daily: 'Daily',
    };
    
    const alcoholOrder = ['never', 'occasionally', 'weekly', 'daily'];
    const yourIndex = alcoholOrder.indexOf(personalData.alcoholFrequency);
    
    let highlight: 'good' | 'bad' | 'neutral';
    let diffLabel: string | undefined;
    
    if (isRecommended) {
      highlight = yourIndex <= 1 ? 'good' : yourIndex === 2 ? 'neutral' : 'bad';
      diffLabel = yourIndex <= 1
        ? '✓ Low risk drinking'
        : yourIndex === 2
          ? 'Moderate — monitor intake'
          : '⚠️ Daily use increases health risks';
    } else {
      highlight = yourIndex <= 1 ? 'good' : yourIndex === 2 ? 'neutral' : 'bad';
      diffLabel = yourIndex === 0 ? 'Below average consumption' 
        : yourIndex === 1 ? 'Typical consumption'
        : yourIndex === 2 ? 'Above average frequency'
        : 'Well above average';
    }
    
    // Estimate lifetime drinks
    const drinkingYears = Math.max(0, yearsAlive - 21);
    const drinksPerWeek: Record<string, number> = { never: 0, occasionally: 1, weekly: 4, daily: 10 };
    const yourLifetimeDrinks = Math.floor(drinksPerWeek[personalData.alcoholFrequency] * 52 * drinkingYears);
    
    if (yourLifetimeDrinks > 0) {
      comparisons.push({
        icon: '🥂',
        label: 'Est. Lifetime Drinks',
        yours: yourLifetimeDrinks.toLocaleString(),
        baseline: Math.floor(1 * 52 * drinkingYears).toLocaleString(),
        unit: 'drinks',
        highlight: 'neutral',
      });
    }
  }

  // Smoking status comparison
  if (personalData.smokerStatus) {
    const smokerLabels: Record<string, string> = { never: 'Never', former: 'Former', current: 'Current' };
    
    let highlight: 'good' | 'bad' | 'neutral';
    let diffLabel: string | undefined;
    
    if (isRecommended) {
      highlight = personalData.smokerStatus === 'never' ? 'good' : 
                  personalData.smokerStatus === 'former' ? 'neutral' : 'bad';
      diffLabel = personalData.smokerStatus === 'never' 
        ? '✓ Smoke-free'
        : personalData.smokerStatus === 'former'
          ? 'Lungs recovering — great choice!'
          : '⚠️ #1 preventable cause of death';
    } else {
      // ~12% of US adults smoke
      highlight = personalData.smokerStatus === 'never' ? 'good' : 
                  personalData.smokerStatus === 'former' ? 'neutral' : 'bad';
      diffLabel = personalData.smokerStatus === 'never' 
        ? 'Majority non-smoker'
        : personalData.smokerStatus === 'former'
          ? 'Joined the 88% non-smokers'
          : 'Top 12% usage';
    }
    
    comparisons.push({
      icon: '🚬',
      label: 'Smoking Status',
      yours: smokerLabels[personalData.smokerStatus],
      baseline: isRecommended ? 'Never' : 'Never (88%)',
      unit: isRecommended ? '(WHO guideline)' : '(US adults)',
      highlight,
      diffLabel,
      insight: isRecommended 
        ? personalData.smokerStatus === 'former' 
          ? 'After 10yrs, lung cancer risk halves' 
          : personalData.smokerStatus === 'current'
            ? 'Quitting at any age adds years'
            : undefined
        : undefined,
    });
  }

  if (comparisons.length === 0) {
    return null;
  }

  const highlightColors = {
    good: 'text-emerald-400',
    bad: 'text-red-400',
    neutral: 'text-gray-400',
  };

  const highlightBg = {
    good: 'bg-emerald-500/10 border-emerald-500/30',
    bad: 'bg-red-500/10 border-red-500/30',
    neutral: 'bg-gray-500/10 border-gray-500/30',
  };

  return (
    <div className="stat-card rounded-2xl p-6 border-2 border-indigo-500/30">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold text-gray-300 flex items-center gap-2">
          <span>📊</span> Your Stats vs {isRecommended ? 'Recommended' : 'Average'}
        </h2>
        
        {/* Toggle */}
        <div className="flex items-center gap-1 bg-gray-800/50 rounded-lg p-1">
          <button
            onClick={() => setMode('average')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
              mode === 'average' 
                ? 'bg-indigo-600 text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            vs Average
          </button>
          <button
            onClick={() => setMode('recommended')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
              mode === 'recommended' 
                ? 'bg-emerald-600 text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            vs Recommended
          </button>
        </div>
      </div>
      
      <p className="text-sm text-gray-400 mb-6">
        {isRecommended 
          ? 'How you measure up against health guidelines & recommendations'
          : `Based on your personal data compared to ${COUNTRY_PROFILES[country || 'us'].name} averages`
        }
      </p>

      <SortableGrid sectionKey={`stats-vs-${mode}`} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {comparisons.map((item, i) => (
          <div 
            key={i} 
            className={`rounded-xl p-4 border flex flex-col min-h-[160px] ${highlightBg[item.highlight || 'neutral']}`}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium text-white text-sm">{item.label}</span>
            </div>
            
            <div className="flex items-center justify-between flex-1">
              <div className="text-center flex-1">
                <div className="text-xl font-bold text-white truncate">{item.yours}</div>
                <div className="text-xs text-indigo-400">YOURS</div>
              </div>
              
              <div className="text-gray-600 px-2 text-sm">vs</div>
              
              <div className="text-center flex-1">
                <div className="text-xl font-bold text-gray-500 truncate">{item.baseline}</div>
                <div className="text-xs text-gray-500">
                  {isRecommended ? 'REC' : 'AVG'}
                </div>
              </div>
            </div>
            
            <div className="mt-auto pt-2 space-y-1">
              <div className="text-xs text-gray-400 text-center">
                {item.unit}
              </div>
              
              <div className={`text-xs text-center min-h-[16px] ${item.diffLabel ? highlightColors[item.highlight || 'neutral'] : 'text-transparent'}`}>
                {item.diffLabel || '\u00A0'}
              </div>
              
              <div className={`text-xs text-center min-h-[16px] ${item.insight ? 'text-gray-500 italic' : 'text-transparent'}`}>
                {item.insight || '\u00A0'}
              </div>
            </div>
          </div>
        ))}
      </SortableGrid>
    </div>
  );
}
