export interface LifeStats {
  // Time
  daysAlive: number;
  hoursAlive: number;
  minutesAlive: number;
  secondsAlive: number;
  
  // Body
  heartbeats: number;
  breaths: number;
  blinks: number;
  sleepHours: number;
  bloodPumpedGallons: number;
  hairGrownInches: number;
  skinCellsShed: number;
  dreamsHad: number;
  
  // Cosmic
  fullMoons: number;
  earthOrbits: number;
  seasonsExperienced: number;
  sunrisesWitnessed: number;
  milesThroughSpace: number;
  solarEclipses: number;
  
  // Life
  mealsEaten: number;
  wordsSpoken: number;
  stepsWalked: number;
  
  // World Context
  worldPopulationAtBirth: number;
  worldPopulationNow: number;
  populationGrowth: number;
  percentOfRecordedHistory: number;
  
  // Milestones
  lifespanPercentage: number;
  daysUntilBirthday: number;
  nextBirthdayAge: number;
  daysUntil10k: number | null;
  daysUntilBillionSeconds: number | null;
  billionSecondsDate: Date | null;
  tenThousandDaysDate: Date | null;
  isInBillionClub: boolean;
  isIn10kClub: boolean;
}

// Constants
const AVERAGE_LIFESPAN_YEARS = 80;
const HEARTBEATS_PER_DAY = 100000; // ~70 bpm average
const BREATHS_PER_DAY = 20000; // ~14 breaths/min
const LUNAR_CYCLE_DAYS = 29.53059;
const SLEEP_HOURS_PER_DAY = 8;
const MEALS_PER_DAY = 3;
const WORDS_PER_DAY = 16000;
const STEPS_PER_DAY = 7500;
const BLINKS_PER_DAY = 15000;

// New constants
const BLOOD_GALLONS_PER_DAY = 2000; // Heart pumps ~2000 gallons/day
const HAIR_INCHES_PER_YEAR = 6; // Average hair growth
const SKIN_CELLS_PER_DAY = 500_000_000; // ~500 million/day
const DREAMS_PER_NIGHT = 5; // Average 4-6 dreams per night
const MILES_PER_DAY_THROUGH_SPACE = 1_600_000; // Earth's orbital speed around sun

// World population data (approximate)
const POPULATION_DATA: { year: number; pop: number }[] = [
  { year: 1950, pop: 2_500_000_000 },
  { year: 1960, pop: 3_000_000_000 },
  { year: 1970, pop: 3_700_000_000 },
  { year: 1980, pop: 4_400_000_000 },
  { year: 1990, pop: 5_300_000_000 },
  { year: 2000, pop: 6_100_000_000 },
  { year: 2010, pop: 6_900_000_000 },
  { year: 2020, pop: 7_800_000_000 },
  { year: 2025, pop: 8_100_000_000 },
  { year: 2030, pop: 8_500_000_000 },
];

// Solar eclipses by year range (total + annular visible somewhere on Earth)
// Roughly 2-5 solar eclipses per year globally
const SOLAR_ECLIPSES_PER_YEAR = 2.4;

// Recorded human history ~5000 years (writing invented ~3000 BCE)
const RECORDED_HISTORY_YEARS = 5000;

function interpolatePopulation(year: number): number {
  // Clamp to data range
  if (year <= POPULATION_DATA[0].year) return POPULATION_DATA[0].pop;
  if (year >= POPULATION_DATA[POPULATION_DATA.length - 1].year) {
    return POPULATION_DATA[POPULATION_DATA.length - 1].pop;
  }
  
  // Find surrounding years
  for (let i = 0; i < POPULATION_DATA.length - 1; i++) {
    const curr = POPULATION_DATA[i];
    const next = POPULATION_DATA[i + 1];
    if (year >= curr.year && year <= next.year) {
      const ratio = (year - curr.year) / (next.year - curr.year);
      return Math.round(curr.pop + ratio * (next.pop - curr.pop));
    }
  }
  return POPULATION_DATA[POPULATION_DATA.length - 1].pop;
}

export function calculateLifeStats(birthday: Date, now: Date = new Date()): LifeStats {
  const msAlive = now.getTime() - birthday.getTime();
  const secondsAlive = Math.floor(msAlive / 1000);
  const minutesAlive = Math.floor(secondsAlive / 60);
  const hoursAlive = Math.floor(minutesAlive / 60);
  const daysAlive = Math.floor(hoursAlive / 24);
  const yearsAlive = msAlive / (365.25 * 24 * 60 * 60 * 1000);
  
  // Years as Earth orbits (more precise)
  const earthOrbits = yearsAlive;
  
  // Full moons witnessed
  const fullMoons = Math.floor(daysAlive / LUNAR_CYCLE_DAYS);
  
  // Seasons (4 per year)
  const seasonsExperienced = Math.floor(earthOrbits * 4);
  
  // Lifespan percentage
  const averageLifespanMs = AVERAGE_LIFESPAN_YEARS * 365.25 * 24 * 60 * 60 * 1000;
  const lifespanPercentage = (msAlive / averageLifespanMs) * 100;
  
  // Days until next birthday
  const currentYear = now.getFullYear();
  let nextBirthday = new Date(currentYear, birthday.getMonth(), birthday.getDate());
  if (nextBirthday <= now) {
    nextBirthday = new Date(currentYear + 1, birthday.getMonth(), birthday.getDate());
  }
  const daysUntilBirthday = Math.ceil((nextBirthday.getTime() - now.getTime()) / (24 * 60 * 60 * 1000));
  const nextBirthdayAge = nextBirthday.getFullYear() - birthday.getFullYear();
  
  // Body stats
  const heartbeats = Math.floor(daysAlive * HEARTBEATS_PER_DAY);
  const breaths = Math.floor(daysAlive * BREATHS_PER_DAY);
  const sleepHours = Math.floor(daysAlive * SLEEP_HOURS_PER_DAY);
  const blinks = Math.floor(daysAlive * BLINKS_PER_DAY);
  const bloodPumpedGallons = Math.floor(daysAlive * BLOOD_GALLONS_PER_DAY);
  const hairGrownInches = Math.round(yearsAlive * HAIR_INCHES_PER_YEAR * 10) / 10;
  const skinCellsShed = Math.floor(daysAlive * SKIN_CELLS_PER_DAY);
  const dreamsHad = Math.floor(daysAlive * DREAMS_PER_NIGHT);
  
  // Cosmic stats
  const sunrisesWitnessed = daysAlive;
  const milesThroughSpace = Math.floor(daysAlive * MILES_PER_DAY_THROUGH_SPACE);
  const solarEclipses = Math.floor(yearsAlive * SOLAR_ECLIPSES_PER_YEAR);
  
  // Life stats
  const mealsEaten = Math.floor(daysAlive * MEALS_PER_DAY);
  const wordsSpoken = Math.floor(daysAlive * WORDS_PER_DAY);
  const stepsWalked = Math.floor(daysAlive * STEPS_PER_DAY);
  
  // World context
  const birthYear = birthday.getFullYear();
  const worldPopulationAtBirth = interpolatePopulation(birthYear);
  const worldPopulationNow = interpolatePopulation(now.getFullYear());
  const populationGrowth = worldPopulationNow - worldPopulationAtBirth;
  const percentOfRecordedHistory = (yearsAlive / RECORDED_HISTORY_YEARS) * 100;
  
  // Milestones
  const BILLION_SECONDS = 1_000_000_000;
  const TEN_THOUSAND_DAYS = 10_000;
  
  const isInBillionClub = secondsAlive >= BILLION_SECONDS;
  const isIn10kClub = daysAlive >= TEN_THOUSAND_DAYS;
  
  // Calculate days until milestones (null if already passed)
  let daysUntilBillionSeconds: number | null = null;
  let billionSecondsDate: Date | null = null;
  if (!isInBillionClub) {
    const secondsRemaining = BILLION_SECONDS - secondsAlive;
    daysUntilBillionSeconds = Math.ceil(secondsRemaining / 86400);
    billionSecondsDate = new Date(birthday.getTime() + BILLION_SECONDS * 1000);
  }
  
  let daysUntil10k: number | null = null;
  let tenThousandDaysDate: Date | null = null;
  if (!isIn10kClub) {
    daysUntil10k = TEN_THOUSAND_DAYS - daysAlive;
    tenThousandDaysDate = new Date(birthday.getTime() + TEN_THOUSAND_DAYS * 24 * 60 * 60 * 1000);
  }
  
  return {
    // Time
    daysAlive,
    hoursAlive,
    minutesAlive,
    secondsAlive,
    
    // Body
    heartbeats,
    breaths,
    blinks,
    sleepHours,
    bloodPumpedGallons,
    hairGrownInches,
    skinCellsShed,
    dreamsHad,
    
    // Cosmic
    fullMoons,
    earthOrbits,
    seasonsExperienced,
    sunrisesWitnessed,
    milesThroughSpace,
    solarEclipses,
    
    // Life
    mealsEaten,
    wordsSpoken,
    stepsWalked,
    
    // World Context
    worldPopulationAtBirth,
    worldPopulationNow,
    populationGrowth,
    percentOfRecordedHistory,
    
    // Milestones
    lifespanPercentage,
    daysUntilBirthday,
    nextBirthdayAge,
    daysUntil10k,
    daysUntilBillionSeconds,
    billionSecondsDate,
    tenThousandDaysDate,
    isInBillionClub,
    isIn10kClub,
  };
}

export function formatNumber(num: number): string {
  if (num >= 1_000_000_000_000) {
    return (num / 1_000_000_000_000).toFixed(2) + 'T';
  }
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(2) + 'B';
  }
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(2) + 'M';
  }
  if (num >= 1_000) {
    return num.toLocaleString();
  }
  return num.toString();
}

export function formatNumberFull(num: number): string {
  return num.toLocaleString();
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function generateShareText(stats: LifeStats, birthday: Date): string {
  const age = Math.floor(stats.earthOrbits);
  return `🌍 My Life in Numbers:

⏱️ ${formatNumber(stats.secondsAlive)} seconds alive
💓 ${formatNumber(stats.heartbeats)} heartbeats
🚀 ${formatNumber(stats.milesThroughSpace)} miles through space
🩸 ${formatNumber(stats.bloodPumpedGallons)} gallons of blood pumped
🌙 ${stats.fullMoons} full moons witnessed
🌎 ${age} trips around the sun
${stats.isInBillionClub ? '🏆 BILLION SECONDS CLUB MEMBER' : ''}

Find your stats at lifestats.app ✨`;
}
