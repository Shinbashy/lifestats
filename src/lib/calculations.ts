export type Gender = 'male' | 'female' | null;
export type Country = 'us' | 'jp' | 'uk' | 'de' | 'au' | 'ca' | 'fr' | 'kr' | null;

export interface CountryProfile {
  name: string;
  flag: string;
  stepsPerDay: number;
  transitMinutesPerDay: number;
  drivingMinutesPerDay: number;
  coffeePerDay: number;
  teaCupsPerDay: number;
  bathsPerWeek: number;
  lineWaitMinutesPerDay: number;
  screenHoursPerDay: number;
  trafficMinutesPerDay: number;
  beerPerWeek: number;
}

export const COUNTRY_PROFILES: Record<string, CountryProfile> = {
  us: {
    name: 'United States',
    flag: '🇺🇸',
    stepsPerDay: 5000,
    transitMinutesPerDay: 10,
    drivingMinutesPerDay: 50,
    coffeePerDay: 2.7,
    teaCupsPerDay: 0.3,
    bathsPerWeek: 0.5,
    lineWaitMinutesPerDay: 20,
    screenHoursPerDay: 7,
    trafficMinutesPerDay: 25,
    beerPerWeek: 3,
  },
  jp: {
    name: 'Japan',
    flag: '🇯🇵',
    stepsPerDay: 8500,
    transitMinutesPerDay: 60,
    drivingMinutesPerDay: 15,
    coffeePerDay: 1.5,
    teaCupsPerDay: 3,
    bathsPerWeek: 7,
    lineWaitMinutesPerDay: 15,
    screenHoursPerDay: 5,
    trafficMinutesPerDay: 10,
    beerPerWeek: 2,
  },
  uk: {
    name: 'United Kingdom',
    flag: '🇬🇧',
    stepsPerDay: 6500,
    transitMinutesPerDay: 35,
    drivingMinutesPerDay: 25,
    coffeePerDay: 1.7,
    teaCupsPerDay: 4,
    bathsPerWeek: 1,
    lineWaitMinutesPerDay: 25,
    screenHoursPerDay: 6,
    trafficMinutesPerDay: 20,
    beerPerWeek: 4,
  },
  de: {
    name: 'Germany',
    flag: '🇩🇪',
    stepsPerDay: 7000,
    transitMinutesPerDay: 40,
    drivingMinutesPerDay: 30,
    coffeePerDay: 2.5,
    teaCupsPerDay: 0.5,
    bathsPerWeek: 0.5,
    lineWaitMinutesPerDay: 15,
    screenHoursPerDay: 5.5,
    trafficMinutesPerDay: 18,
    beerPerWeek: 5,
  },
  au: {
    name: 'Australia',
    flag: '🇦🇺',
    stepsPerDay: 5500,
    transitMinutesPerDay: 20,
    drivingMinutesPerDay: 45,
    coffeePerDay: 3.2,
    teaCupsPerDay: 1,
    bathsPerWeek: 0.3,
    lineWaitMinutesPerDay: 15,
    screenHoursPerDay: 6.5,
    trafficMinutesPerDay: 22,
    beerPerWeek: 3.5,
  },
  ca: {
    name: 'Canada',
    flag: '🇨🇦',
    stepsPerDay: 5200,
    transitMinutesPerDay: 25,
    drivingMinutesPerDay: 45,
    coffeePerDay: 3.0,
    teaCupsPerDay: 0.8,
    bathsPerWeek: 0.5,
    lineWaitMinutesPerDay: 18,
    screenHoursPerDay: 6.5,
    trafficMinutesPerDay: 25,
    beerPerWeek: 2.5,
  },
  fr: {
    name: 'France',
    flag: '🇫🇷',
    stepsPerDay: 7200,
    transitMinutesPerDay: 35,
    drivingMinutesPerDay: 25,
    coffeePerDay: 2.2,
    teaCupsPerDay: 0.5,
    bathsPerWeek: 0.5,
    lineWaitMinutesPerDay: 20,
    screenHoursPerDay: 5,
    trafficMinutesPerDay: 20,
    beerPerWeek: 2,
  },
  kr: {
    name: 'South Korea',
    flag: '🇰🇷',
    stepsPerDay: 8000,
    transitMinutesPerDay: 55,
    drivingMinutesPerDay: 20,
    coffeePerDay: 2.8,
    teaCupsPerDay: 2,
    bathsPerWeek: 3,
    lineWaitMinutesPerDay: 12,
    screenHoursPerDay: 8,
    trafficMinutesPerDay: 15,
    beerPerWeek: 4,
  },
};

export interface GenderStats {
  // Adjusted based on gender
  adjustedLifeExpectancy: number;
  adjustedLifespanPercentage: number;
  adjustedHeartbeats: number;
  caloriesBurned: number;
  redBloodCellsProduced: number;
  
  // Female-specific
  menstrualCycles?: number;
  periodsHad?: number;
  eggsReleased?: number;
  
  // Male-specific
  testosteroneCycles?: number;
  facialHairGrown?: number; // in inches
}

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
  fingernailsGrownInches: number;
  timesLaughed: number;
  sneezes: number;
  toiletHours: number;
  bloodRecycles: number;
  
  // Cosmic
  fullMoons: number;
  earthOrbits: number;
  seasonsExperienced: number;
  sunrisesWitnessed: number;
  milesThroughSpace: number;
  solarEclipses: number;
  leapYears: number;
  
  // Life
  mealsEaten: number;
  wordsSpoken: number;
  stepsWalked: number;
  
  // Digital (post-internet era)
  googleSearches: number;
  emailsSent: number;
  photosTaken: number;
  hoursOfVideoWatched: number;
  
  // Consumption
  chickensConsumed: number;
  cowsWorthOfBeef: number;
  pizzasEaten: number;
  gallonsOfWaterDrunk: number;
  cupsOfCoffee: number;
  
  // Time Spent
  hoursAtRedLights: number;
  hoursEating: number;
  hoursShowering: number;
  hoursInLine: number;
  hoursOnTransit: number;
  hoursDriving: number;
  hoursInTraffic: number;
  hoursOnScreens: number;
  hoursBathing: number;
  
  // World Events
  usPresidents: string[];
  olympicsHeld: number;
  worldCups: number;
  
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

// New body constants
const FINGERNAIL_INCHES_PER_YEAR = 1.5; // ~3.5mm/month
const LAUGHS_PER_DAY = 15;
const SNEEZES_PER_YEAR = 200;
const TOILET_MINUTES_PER_DAY = 30; // ~3 years over lifetime
const BLOOD_RECYCLES_PER_DAY = 1440; // Full cycle every minute

// Digital era constants
const GOOGLE_SEARCHES_PER_DAY = 8; // Average since widespread adoption
const EMAILS_PER_DAY = 40; // Sent + received average
const PHOTOS_PER_DAY_SMARTPHONE = 3; // Since smartphone era (~2010)
const VIDEO_HOURS_PER_DAY = 2.5; // YouTube/streaming average

// Consumption constants
const CHICKENS_PER_YEAR = 28; // US average
const BEEF_LBS_PER_YEAR = 57; // US average
const COW_BEEF_LBS = 440; // Retail beef from one cow
const PIZZAS_PER_YEAR = 46; // US average
const WATER_GALLONS_PER_DAY = 0.5; // Drinking water
const COFFEE_CUPS_PER_DAY = 2.7; // US average (for coffee drinkers, ~18+)

// Time spent constants
const RED_LIGHT_MINUTES_PER_DAY = 5; // For drivers
const EATING_MINUTES_PER_DAY = 67;
const SHOWER_MINUTES_PER_DAY = 8;

// US Presidents with inauguration years
const US_PRESIDENTS: { name: string; start: number; end: number }[] = [
  { name: 'Harry S. Truman', start: 1945, end: 1953 },
  { name: 'Dwight D. Eisenhower', start: 1953, end: 1961 },
  { name: 'John F. Kennedy', start: 1961, end: 1963 },
  { name: 'Lyndon B. Johnson', start: 1963, end: 1969 },
  { name: 'Richard Nixon', start: 1969, end: 1974 },
  { name: 'Gerald Ford', start: 1974, end: 1977 },
  { name: 'Jimmy Carter', start: 1977, end: 1981 },
  { name: 'Ronald Reagan', start: 1981, end: 1989 },
  { name: 'George H. W. Bush', start: 1989, end: 1993 },
  { name: 'Bill Clinton', start: 1993, end: 2001 },
  { name: 'George W. Bush', start: 2001, end: 2009 },
  { name: 'Barack Obama', start: 2009, end: 2017 },
  { name: 'Donald Trump', start: 2017, end: 2021 },
  { name: 'Joe Biden', start: 2021, end: 2025 },
  { name: 'Donald Trump', start: 2025, end: 2029 },
];

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

export function calculateLifeStats(birthday: Date, now: Date = new Date(), country: Country = 'us'): LifeStats {
  // Get country profile (default to US)
  const profile = COUNTRY_PROFILES[country || 'us'] || COUNTRY_PROFILES.us;
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
  const fingernailsGrownInches = Math.round(yearsAlive * FINGERNAIL_INCHES_PER_YEAR * 10) / 10;
  const timesLaughed = Math.floor(daysAlive * LAUGHS_PER_DAY);
  const sneezes = Math.floor(yearsAlive * SNEEZES_PER_YEAR);
  const toiletHours = Math.floor(daysAlive * TOILET_MINUTES_PER_DAY / 60);
  const bloodRecycles = Math.floor(daysAlive * BLOOD_RECYCLES_PER_DAY);
  
  // Cosmic stats
  const sunrisesWitnessed = daysAlive;
  const milesThroughSpace = Math.floor(daysAlive * MILES_PER_DAY_THROUGH_SPACE);
  const solarEclipses = Math.floor(yearsAlive * SOLAR_ECLIPSES_PER_YEAR);
  
  // Leap years
  const birthYearNum = birthday.getFullYear();
  const currentYearNum = now.getFullYear();
  let leapYears = 0;
  for (let y = birthYearNum; y <= currentYearNum; y++) {
    if ((y % 4 === 0 && y % 100 !== 0) || y % 400 === 0) {
      leapYears++;
    }
  }
  
  // Life stats (country-adjusted)
  const mealsEaten = Math.floor(daysAlive * MEALS_PER_DAY);
  const wordsSpoken = Math.floor(daysAlive * WORDS_PER_DAY);
  const stepsWalked = Math.floor(daysAlive * profile.stepsPerDay);
  
  // Digital stats (era-aware, country-adjusted screen time)
  const GOOGLE_START = 1998;
  const SMARTPHONE_ERA = 2010;
  const googleYears = Math.max(0, currentYearNum - Math.max(birthYearNum, GOOGLE_START));
  const smartphoneYears = Math.max(0, currentYearNum - Math.max(birthYearNum, SMARTPHONE_ERA));
  
  const googleSearches = Math.floor(googleYears * 365.25 * GOOGLE_SEARCHES_PER_DAY);
  const emailsSent = Math.floor(googleYears * 365.25 * EMAILS_PER_DAY);
  const photosTaken = Math.floor(smartphoneYears * 365.25 * PHOTOS_PER_DAY_SMARTPHONE);
  const hoursOfVideoWatched = Math.floor(smartphoneYears * 365.25 * VIDEO_HOURS_PER_DAY);
  
  // Consumption stats (some country-adjusted)
  const chickensConsumed = Math.floor(yearsAlive * CHICKENS_PER_YEAR);
  const cowsWorthOfBeef = Math.round((yearsAlive * BEEF_LBS_PER_YEAR / COW_BEEF_LBS) * 100) / 100;
  const pizzasEaten = Math.floor(yearsAlive * PIZZAS_PER_YEAR);
  const gallonsOfWaterDrunk = Math.floor(daysAlive * WATER_GALLONS_PER_DAY);
  // Coffee only counts from age 18, country-adjusted
  const coffeeYears = Math.max(0, yearsAlive - 18);
  const cupsOfCoffee = Math.floor(coffeeYears * 365.25 * profile.coffeePerDay);
  
  // Time spent stats (country-adjusted)
  const drivingYears = Math.max(0, yearsAlive - 16);
  const hoursAtRedLights = Math.floor(drivingYears * 365.25 * RED_LIGHT_MINUTES_PER_DAY / 60);
  const hoursEating = Math.floor(daysAlive * EATING_MINUTES_PER_DAY / 60);
  const hoursShowering = Math.floor(daysAlive * SHOWER_MINUTES_PER_DAY / 60);
  
  // New time spent stats (country-adjusted)
  const hoursInLine = Math.floor(daysAlive * profile.lineWaitMinutesPerDay / 60);
  const hoursOnTransit = Math.floor(daysAlive * profile.transitMinutesPerDay / 60);
  const hoursDriving = Math.floor(drivingYears * 365.25 * profile.drivingMinutesPerDay / 60);
  const hoursInTraffic = Math.floor(drivingYears * 365.25 * profile.trafficMinutesPerDay / 60);
  const hoursOnScreens = Math.floor(smartphoneYears * 365.25 * profile.screenHoursPerDay);
  const hoursBathing = Math.floor(daysAlive * profile.bathsPerWeek / 7 * 0.5); // 30 min per bath
  
  // US Presidents during lifetime
  const usPresidents = US_PRESIDENTS
    .filter(p => p.start <= currentYearNum && p.end >= birthYearNum)
    .map(p => p.name);
  
  // Olympics (Summer, every 4 years, skipped 2020 to 2021)
  const olympicsHeld = Math.floor((currentYearNum - Math.max(birthYearNum, 1896)) / 4);
  
  // FIFA World Cup (every 4 years since 1930)
  const worldCups = Math.floor((currentYearNum - Math.max(birthYearNum, 1930)) / 4);
  
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
    fingernailsGrownInches,
    timesLaughed,
    sneezes,
    toiletHours,
    bloodRecycles,
    
    // Cosmic
    fullMoons,
    earthOrbits,
    seasonsExperienced,
    sunrisesWitnessed,
    milesThroughSpace,
    solarEclipses,
    leapYears,
    
    // Life
    mealsEaten,
    wordsSpoken,
    stepsWalked,
    
    // Digital
    googleSearches,
    emailsSent,
    photosTaken,
    hoursOfVideoWatched,
    
    // Consumption
    chickensConsumed,
    cowsWorthOfBeef,
    pizzasEaten,
    gallonsOfWaterDrunk,
    cupsOfCoffee,
    
    // Time Spent
    hoursAtRedLights,
    hoursEating,
    hoursShowering,
    hoursInLine,
    hoursOnTransit,
    hoursDriving,
    hoursInTraffic,
    hoursOnScreens,
    hoursBathing,
    
    // World Events
    usPresidents,
    olympicsHeld,
    worldCups,
    
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

// Gender-specific constants
const MALE_LIFE_EXPECTANCY = 76;
const FEMALE_LIFE_EXPECTANCY = 81;
const MALE_HEARTBEATS_PER_DAY = 100800; // ~70 bpm
const FEMALE_HEARTBEATS_PER_DAY = 112320; // ~78 bpm
const MALE_CALORIES_PER_DAY = 2500;
const FEMALE_CALORIES_PER_DAY = 2000;
const RED_BLOOD_CELLS_PER_DAY_MALE = 200_000_000_000; // 200 billion
const RED_BLOOD_CELLS_PER_DAY_FEMALE = 180_000_000_000; // 180 billion

// Female-specific
const MENSTRUAL_CYCLE_DAYS = 28;
const MENARCHE_AGE = 12; // Average age of first period
const MENOPAUSE_AGE = 51; // Average age of menopause

// Male-specific
const PUBERTY_AGE_MALE = 13;
const FACIAL_HAIR_INCHES_PER_YEAR = 5.5; // After puberty

export function calculateGenderStats(
  birthday: Date,
  gender: Gender,
  now: Date = new Date()
): GenderStats | null {
  if (!gender) return null;
  
  const msAlive = now.getTime() - birthday.getTime();
  const daysAlive = Math.floor(msAlive / (24 * 60 * 60 * 1000));
  const yearsAlive = msAlive / (365.25 * 24 * 60 * 60 * 1000);
  
  const isMale = gender === 'male';
  const isFemale = gender === 'female';
  
  // Adjusted life expectancy
  const adjustedLifeExpectancy = isMale ? MALE_LIFE_EXPECTANCY : FEMALE_LIFE_EXPECTANCY;
  const adjustedLifespanMs = adjustedLifeExpectancy * 365.25 * 24 * 60 * 60 * 1000;
  const adjustedLifespanPercentage = (msAlive / adjustedLifespanMs) * 100;
  
  // Adjusted heartbeats
  const heartbeatsPerDay = isMale ? MALE_HEARTBEATS_PER_DAY : FEMALE_HEARTBEATS_PER_DAY;
  const adjustedHeartbeats = Math.floor(daysAlive * heartbeatsPerDay);
  
  // Calories burned
  const caloriesPerDay = isMale ? MALE_CALORIES_PER_DAY : FEMALE_CALORIES_PER_DAY;
  const caloriesBurned = Math.floor(daysAlive * caloriesPerDay);
  
  // Red blood cells produced
  const rbcPerDay = isMale ? RED_BLOOD_CELLS_PER_DAY_MALE : RED_BLOOD_CELLS_PER_DAY_FEMALE;
  const redBloodCellsProduced = Math.floor(daysAlive * rbcPerDay);
  
  const baseStats: GenderStats = {
    adjustedLifeExpectancy,
    adjustedLifespanPercentage,
    adjustedHeartbeats,
    caloriesBurned,
    redBloodCellsProduced,
  };
  
  // Female-specific stats
  if (isFemale) {
    const yearsWithPeriods = Math.max(0, Math.min(yearsAlive - MENARCHE_AGE, MENOPAUSE_AGE - MENARCHE_AGE));
    const daysWithPeriods = yearsWithPeriods * 365.25;
    
    if (yearsAlive >= MENARCHE_AGE) {
      baseStats.menstrualCycles = Math.floor(daysWithPeriods / MENSTRUAL_CYCLE_DAYS);
      baseStats.periodsHad = baseStats.menstrualCycles;
      baseStats.eggsReleased = baseStats.menstrualCycles; // Roughly 1 egg per cycle
    }
  }
  
  // Male-specific stats
  if (isMale) {
    const yearsAfterPuberty = Math.max(0, yearsAlive - PUBERTY_AGE_MALE);
    
    if (yearsAlive >= PUBERTY_AGE_MALE) {
      // Testosterone cycles roughly daily
      baseStats.testosteroneCycles = Math.floor(yearsAfterPuberty * 365.25);
      baseStats.facialHairGrown = yearsAfterPuberty * FACIAL_HAIR_INCHES_PER_YEAR;
    }
  }
  
  return baseStats;
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
