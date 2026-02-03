'use client';

import { PersonalData } from './PersonalizationModal';
import { LifeStats, COUNTRY_PROFILES, Country } from '@/lib/calculations';

interface ComparisonItem {
  icon: string;
  label: string;
  yours: number | string;
  average: number | string;
  unit: string;
  diff?: number; // percentage difference
  diffLabel?: string;
  highlight?: 'good' | 'bad' | 'neutral';
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
  const profile = COUNTRY_PROFILES[country || 'us'];
  
  const comparisons: ComparisonItem[] = [];

  // Sleep comparison
  if (personalData.sleepHours) {
    const avgSleep = 8;
    const yourSleepYears = (personalData.sleepHours / 24) * 365.25 * yearsAlive;
    const avgSleepYears = (avgSleep / 24) * 365.25 * yearsAlive;
    const diff = ((personalData.sleepHours - avgSleep) / avgSleep) * 100;
    
    comparisons.push({
      icon: '😴',
      label: 'Sleep per Night',
      yours: personalData.sleepHours,
      average: avgSleep,
      unit: 'hours',
      diff,
      diffLabel: diff > 0 
        ? `${Math.abs(diff).toFixed(0)}% more sleep`
        : `${Math.abs(diff).toFixed(0)}% less sleep`,
      highlight: diff > 0 ? 'good' : diff < -10 ? 'bad' : 'neutral',
    });
    
    comparisons.push({
      icon: '🛏️',
      label: 'Total Time Slept',
      yours: yourSleepYears.toFixed(1),
      average: avgSleepYears.toFixed(1),
      unit: 'years',
      diff,
      highlight: 'neutral',
    });
  }

  // Coffee comparison
  if (personalData.coffeePerDay !== undefined) {
    const avgCoffee = profile.coffeePerDay;
    const coffeeYears = Math.max(0, yearsAlive - 18);
    const yourTotalCoffee = Math.floor(personalData.coffeePerDay * 365.25 * coffeeYears);
    const avgTotalCoffee = Math.floor(avgCoffee * 365.25 * coffeeYears);
    const diff = avgCoffee > 0 ? ((personalData.coffeePerDay - avgCoffee) / avgCoffee) * 100 : 0;
    
    comparisons.push({
      icon: '☕',
      label: 'Daily Coffee',
      yours: personalData.coffeePerDay,
      average: avgCoffee.toFixed(1),
      unit: 'cups',
      diff,
      diffLabel: diff > 0 
        ? `${Math.abs(diff).toFixed(0)}% more caffeine`
        : diff < 0 
          ? `${Math.abs(diff).toFixed(0)}% less caffeine`
          : 'Same as average',
      highlight: Math.abs(diff) > 50 ? 'neutral' : 'neutral',
    });

    comparisons.push({
      icon: '☕',
      label: 'Lifetime Coffee',
      yours: yourTotalCoffee.toLocaleString(),
      average: avgTotalCoffee.toLocaleString(),
      unit: 'cups',
      highlight: 'neutral',
    });
  }

  // Work hours comparison
  if (personalData.workHoursPerWeek) {
    const avgWorkHours = 40;
    const workYears = Math.max(0, yearsAlive - 22); // Assuming work starts ~22
    const yourWorkHours = personalData.workHoursPerWeek * 52 * workYears;
    const avgWorkHoursTotal = avgWorkHours * 52 * workYears;
    const diff = ((personalData.workHoursPerWeek - avgWorkHours) / avgWorkHours) * 100;
    
    comparisons.push({
      icon: '💼',
      label: 'Work Hours/Week',
      yours: personalData.workHoursPerWeek,
      average: avgWorkHours,
      unit: 'hrs',
      diff,
      diffLabel: diff > 0 
        ? `${Math.abs(diff).toFixed(0)}% more than avg`
        : `${Math.abs(diff).toFixed(0)}% less than avg`,
      highlight: diff > 20 ? 'bad' : diff < -10 ? 'good' : 'neutral',
    });

    comparisons.push({
      icon: '⏰',
      label: 'Career Hours',
      yours: (yourWorkHours / 8760).toFixed(1),
      average: (avgWorkHoursTotal / 8760).toFixed(1),
      unit: 'years',
      highlight: 'neutral',
    });
  }

  // Commute comparison
  if (personalData.commuteMinutes) {
    const avgCommute = 30; // minutes per day
    const workDays = 250; // ~250 work days per year
    const workYears = Math.max(0, yearsAlive - 22);
    const yourCommuteHours = (personalData.commuteMinutes / 60) * workDays * workYears;
    const avgCommuteHours = (avgCommute / 60) * workDays * workYears;
    const diff = ((personalData.commuteMinutes - avgCommute) / avgCommute) * 100;
    
    comparisons.push({
      icon: '🚗',
      label: 'Daily Commute',
      yours: personalData.commuteMinutes,
      average: avgCommute,
      unit: 'min',
      diff,
      diffLabel: diff > 0 
        ? `${Math.abs(diff).toFixed(0)}% longer commute`
        : `${Math.abs(diff).toFixed(0)}% shorter`,
      highlight: diff > 50 ? 'bad' : diff < -20 ? 'good' : 'neutral',
    });

    comparisons.push({
      icon: '🛣️',
      label: 'Lifetime Commuting',
      yours: (yourCommuteHours / 24 / 365.25).toFixed(2),
      average: (avgCommuteHours / 24 / 365.25).toFixed(2),
      unit: 'years',
      highlight: 'neutral',
    });
  }

  // Activity level impact on steps
  if (personalData.activityLevel) {
    const activityMultipliers: Record<string, number> = {
      sedentary: 0.6,
      moderate: 1.0,
      active: 1.5,
      very_active: 2.0,
    };
    const multiplier = activityMultipliers[personalData.activityLevel] || 1;
    const avgSteps = profile.stepsPerDay;
    const yourSteps = Math.floor(avgSteps * multiplier);
    const diff = ((yourSteps - avgSteps) / avgSteps) * 100;
    
    comparisons.push({
      icon: '👟',
      label: 'Daily Steps',
      yours: yourSteps.toLocaleString(),
      average: avgSteps.toLocaleString(),
      unit: 'steps',
      diff,
      diffLabel: diff > 0 
        ? `${Math.abs(diff).toFixed(0)}% more active`
        : `${Math.abs(diff).toFixed(0)}% less active`,
      highlight: diff > 20 ? 'good' : diff < -20 ? 'bad' : 'neutral',
    });
  }

  // BMI if height and weight provided
  if (personalData.heightFeet && personalData.weightLbs) {
    const heightInches = (personalData.heightFeet * 12) + (personalData.heightInches || 0);
    const bmi = (personalData.weightLbs / (heightInches * heightInches)) * 703;
    const avgBmi = 26.5; // US average
    const diff = ((bmi - avgBmi) / avgBmi) * 100;
    
    let bmiCategory = 'Normal';
    let highlight: 'good' | 'bad' | 'neutral' = 'good';
    if (bmi < 18.5) { bmiCategory = 'Underweight'; highlight = 'neutral'; }
    else if (bmi < 25) { bmiCategory = 'Normal'; highlight = 'good'; }
    else if (bmi < 30) { bmiCategory = 'Overweight'; highlight = 'neutral'; }
    else { bmiCategory = 'Obese'; highlight = 'bad'; }
    
    comparisons.push({
      icon: '⚖️',
      label: 'BMI',
      yours: bmi.toFixed(1),
      average: avgBmi.toFixed(1),
      unit: bmiCategory,
      diff,
      diffLabel: bmiCategory,
      highlight,
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
      <h2 className="text-lg font-semibold text-gray-300 mb-2 flex items-center gap-2">
        <span>📊</span> Your Stats vs Average
      </h2>
      <p className="text-sm text-gray-400 mb-6">
        Based on your personal data compared to {COUNTRY_PROFILES[country || 'us'].name} averages
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {comparisons.map((item, i) => (
          <div 
            key={i} 
            className={`rounded-xl p-4 border ${highlightBg[item.highlight || 'neutral']}`}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium text-white">{item.label}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="text-center flex-1">
                <div className="text-2xl font-bold text-white">{item.yours}</div>
                <div className="text-xs text-indigo-400">YOURS</div>
              </div>
              
              <div className="text-gray-600 px-3">vs</div>
              
              <div className="text-center flex-1">
                <div className="text-2xl font-bold text-gray-500">{item.average}</div>
                <div className="text-xs text-gray-500">AVG</div>
              </div>
            </div>
            
            <div className="text-xs text-gray-400 mt-2 text-center">
              {item.unit}
            </div>
            
            {item.diffLabel && (
              <div className={`text-xs mt-2 text-center ${highlightColors[item.highlight || 'neutral']}`}>
                {item.diffLabel}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
