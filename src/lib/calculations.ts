export interface LifeStats {
  daysAlive: number;
  hoursAlive: number;
  minutesAlive: number;
  secondsAlive: number;
  heartbeats: number;
  breaths: number;
  fullMoons: number;
  earthOrbits: number;
  seasonsExperienced: number;
  lifespanPercentage: number;
  daysUntilBirthday: number;
  nextBirthdayAge: number;
  sleepHours: number;
  mealsEaten: number;
  wordsSpoken: number;
  stepsWalked: number;
  blinks: number;
}

const AVERAGE_LIFESPAN_YEARS = 80;
const HEARTBEATS_PER_DAY = 100000; // ~70 bpm average
const BREATHS_PER_DAY = 20000; // ~14 breaths/min
const LUNAR_CYCLE_DAYS = 29.53059;
const SLEEP_HOURS_PER_DAY = 8;
const MEALS_PER_DAY = 3;
const WORDS_PER_DAY = 16000;
const STEPS_PER_DAY = 7500;
const BLINKS_PER_DAY = 15000; // ~15-20k/day

export function calculateLifeStats(birthday: Date, now: Date = new Date()): LifeStats {
  const msAlive = now.getTime() - birthday.getTime();
  const secondsAlive = Math.floor(msAlive / 1000);
  const minutesAlive = Math.floor(secondsAlive / 60);
  const hoursAlive = Math.floor(minutesAlive / 60);
  const daysAlive = Math.floor(hoursAlive / 24);
  
  // Years as Earth orbits (more precise)
  const earthOrbits = msAlive / (365.25 * 24 * 60 * 60 * 1000);
  
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
  
  // Estimated stats
  const heartbeats = Math.floor(daysAlive * HEARTBEATS_PER_DAY);
  const breaths = Math.floor(daysAlive * BREATHS_PER_DAY);
  const sleepHours = Math.floor(daysAlive * SLEEP_HOURS_PER_DAY);
  const mealsEaten = Math.floor(daysAlive * MEALS_PER_DAY);
  const wordsSpoken = Math.floor(daysAlive * WORDS_PER_DAY);
  const stepsWalked = Math.floor(daysAlive * STEPS_PER_DAY);
  const blinks = Math.floor(daysAlive * BLINKS_PER_DAY);
  
  return {
    daysAlive,
    hoursAlive,
    minutesAlive,
    secondsAlive,
    heartbeats,
    breaths,
    fullMoons,
    earthOrbits,
    seasonsExperienced,
    lifespanPercentage,
    daysUntilBirthday,
    nextBirthdayAge,
    sleepHours,
    mealsEaten,
    wordsSpoken,
    stepsWalked,
    blinks,
  };
}

export function formatNumber(num: number): string {
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

export function generateShareText(stats: LifeStats, birthday: Date): string {
  const age = Math.floor(stats.earthOrbits);
  return `🌍 My Life in Numbers:

⏱️ ${formatNumber(stats.secondsAlive)} seconds alive
💓 ${formatNumber(stats.heartbeats)} heartbeats
🌬️ ${formatNumber(stats.breaths)} breaths taken
🌙 ${stats.fullMoons} full moons witnessed
🌎 ${age} trips around the sun
📊 ${stats.lifespanPercentage.toFixed(1)}% of average lifespan

Find your stats at lifestats.app ✨`;
}
