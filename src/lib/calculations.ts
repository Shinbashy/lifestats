export type Gender = 'male' | 'female' | null;
export type Country = 'us' | 'jp' | 'uk' | 'de' | 'au' | 'ca' | 'fr' | 'kr' | null;

export interface FoodItem {
  key: string;
  icon: string;
  label: string;
  perYear: number;
  decimals?: number;
  showFull?: boolean;
}

export interface CountryProfile {
  name: string;
  flag: string;
  lifeExpectancy: number;
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
  foods: FoodItem[];
}

export const COUNTRY_PROFILES: Record<string, CountryProfile> = {
  us: {
    name: 'United States',
    flag: '🇺🇸',
    lifeExpectancy: 77,
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
    foods: [
      { key: 'pizzas', icon: '🍕', label: 'Pizzas Eaten', perYear: 46 },
      { key: 'burgers', icon: '🍔', label: 'Burgers Eaten', perYear: 50 },
      { key: 'hotdogs', icon: '🌭', label: 'Hot Dogs Eaten', perYear: 20 },
      { key: 'chickens', icon: '🐔', label: 'Chickens Eaten', perYear: 28 },
      { key: 'tacos', icon: '🌮', label: 'Tacos Eaten', perYear: 35 },
      { key: 'steaks', icon: '🥩', label: 'Steaks Eaten', perYear: 24 },
    ],
  },
  jp: {
    name: 'Japan',
    flag: '🇯🇵',
    lifeExpectancy: 84,
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
    foods: [
      { key: 'ramen', icon: '🍜', label: 'Bowls of Ramen', perYear: 62 },
      { key: 'sushi', icon: '🍣', label: 'Sushi Pieces', perYear: 480 },
      { key: 'kare', icon: '🍛', label: 'Bowls of Kare', perYear: 84 },
      { key: 'onigiri', icon: '🍙', label: 'Onigiri Eaten', perYear: 156 },
      { key: 'udon', icon: '🍲', label: 'Bowls of Udon', perYear: 48 },
      { key: 'bento', icon: '🍱', label: 'Bentos Eaten', perYear: 104 },
    ],
  },
  uk: {
    name: 'United Kingdom',
    flag: '🇬🇧',
    lifeExpectancy: 81,
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
    foods: [
      { key: 'fishnchips', icon: '🐟', label: 'Fish & Chips', perYear: 26 },
      { key: 'fullbreakfast', icon: '🍳', label: 'Full Breakfasts', perYear: 52 },
      { key: 'pies', icon: '🥧', label: 'Meat Pies', perYear: 35 },
      { key: 'curries', icon: '🍛', label: 'Curries Eaten', perYear: 48 },
      { key: 'sandwiches', icon: '🥪', label: 'Sandwiches', perYear: 200 },
      { key: 'roasts', icon: '🍖', label: 'Sunday Roasts', perYear: 45 },
    ],
  },
  de: {
    name: 'Germany',
    flag: '🇩🇪',
    lifeExpectancy: 81,
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
    foods: [
      { key: 'bratwurst', icon: '🌭', label: 'Bratwursts', perYear: 84 },
      { key: 'schnitzel', icon: '🍖', label: 'Schnitzels', perYear: 35 },
      { key: 'pretzels', icon: '🥨', label: 'Pretzels', perYear: 52 },
      { key: 'bread', icon: '🍞', label: 'Loaves of Bread', perYear: 60 },
      { key: 'kartoffeln', icon: '🥔', label: 'Potato Dishes', perYear: 180 },
      { key: 'kebab', icon: '🥙', label: 'Döner Kebabs', perYear: 30 },
    ],
  },
  au: {
    name: 'Australia',
    flag: '🇦🇺',
    lifeExpectancy: 83,
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
    foods: [
      { key: 'meatpies', icon: '🥧', label: 'Meat Pies', perYear: 52 },
      { key: 'vegemite', icon: '🍞', label: 'Vegemite Toasts', perYear: 200 },
      { key: 'bbq', icon: '🍖', label: 'BBQ Meals', perYear: 48 },
      { key: 'flatwhite', icon: '☕', label: 'Flat Whites', perYear: 312 },
      { key: 'prawns', icon: '🦐', label: 'Prawns on Barbie', perYear: 24 },
      { key: 'avotoast', icon: '🥑', label: 'Avo Toasts', perYear: 52 },
    ],
  },
  ca: {
    name: 'Canada',
    flag: '🇨🇦',
    lifeExpectancy: 82,
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
    foods: [
      { key: 'poutine', icon: '🍟', label: 'Poutines Eaten', perYear: 24 },
      { key: 'maplesyrup', icon: '🍁', label: 'Maple Syrup (L)', perYear: 0.5, decimals: 1 },
      { key: 'timbits', icon: '🍩', label: 'Timbits', perYear: 300 },
      { key: 'caesars', icon: '🍹', label: 'Caesar Cocktails', perYear: 36 },
      { key: 'bacon', icon: '🥓', label: 'Canadian Bacon', perYear: 100 },
      { key: 'nanaimo', icon: '🍫', label: 'Nanaimo Bars', perYear: 12 },
    ],
  },
  fr: {
    name: 'France',
    flag: '🇫🇷',
    lifeExpectancy: 82,
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
    foods: [
      { key: 'baguettes', icon: '🥖', label: 'Baguettes', perYear: 120 },
      { key: 'croissants', icon: '🥐', label: 'Croissants', perYear: 52 },
      { key: 'cheese', icon: '🧀', label: 'Cheese (kg)', perYear: 27, decimals: 1 },
      { key: 'wine', icon: '🍷', label: 'Wine Glasses', perYear: 156 },
      { key: 'crepes', icon: '🥞', label: 'Crêpes Eaten', perYear: 24 },
      { key: 'escargot', icon: '🐌', label: 'Escargots', perYear: 12 },
    ],
  },
  kr: {
    name: 'South Korea',
    flag: '🇰🇷',
    lifeExpectancy: 83,
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
    foods: [
      { key: 'kimchi', icon: '🥬', label: 'Kimchi Servings', perYear: 730 },
      { key: 'kbbq', icon: '🥩', label: 'Korean BBQ Meals', perYear: 52 },
      { key: 'bibimbap', icon: '🍚', label: 'Bibimbap Bowls', perYear: 48 },
      { key: 'friedchicken', icon: '🍗', label: 'Fried Chicken', perYear: 60 },
      { key: 'ramyeon', icon: '🍜', label: 'Ramyeon Packs', perYear: 80 },
      { key: 'soju', icon: '🍶', label: 'Soju Bottles', perYear: 70 },
    ],
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

// Zodiac data
export const ZODIAC_SIGNS = [
  { name: 'Capricorn', symbol: '♑', emoji: '🐐', start: [12, 22], end: [1, 19], element: 'Earth', traits: ['Ambitious', 'Disciplined', 'Patient'] },
  { name: 'Aquarius', symbol: '♒', emoji: '🏺', start: [1, 20], end: [2, 18], element: 'Air', traits: ['Independent', 'Innovative', 'Humanitarian'] },
  { name: 'Pisces', symbol: '♓', emoji: '🐟', start: [2, 19], end: [3, 20], element: 'Water', traits: ['Compassionate', 'Artistic', 'Intuitive'] },
  { name: 'Aries', symbol: '♈', emoji: '🐏', start: [3, 21], end: [4, 19], element: 'Fire', traits: ['Courageous', 'Confident', 'Enthusiastic'] },
  { name: 'Taurus', symbol: '♉', emoji: '🐂', start: [4, 20], end: [5, 20], element: 'Earth', traits: ['Reliable', 'Patient', 'Devoted'] },
  { name: 'Gemini', symbol: '♊', emoji: '👯', start: [5, 21], end: [6, 20], element: 'Air', traits: ['Adaptable', 'Curious', 'Witty'] },
  { name: 'Cancer', symbol: '♋', emoji: '🦀', start: [6, 21], end: [7, 22], element: 'Water', traits: ['Loyal', 'Emotional', 'Protective'] },
  { name: 'Leo', symbol: '♌', emoji: '🦁', start: [7, 23], end: [8, 22], element: 'Fire', traits: ['Creative', 'Passionate', 'Generous'] },
  { name: 'Virgo', symbol: '♍', emoji: '👸', start: [8, 23], end: [9, 22], element: 'Earth', traits: ['Analytical', 'Practical', 'Hardworking'] },
  { name: 'Libra', symbol: '♎', emoji: '⚖️', start: [9, 23], end: [10, 22], element: 'Air', traits: ['Diplomatic', 'Fair', 'Social'] },
  { name: 'Scorpio', symbol: '♏', emoji: '🦂', start: [10, 23], end: [11, 21], element: 'Water', traits: ['Passionate', 'Resourceful', 'Brave'] },
  { name: 'Sagittarius', symbol: '♐', emoji: '🏹', start: [11, 22], end: [12, 21], element: 'Fire', traits: ['Optimistic', 'Adventurous', 'Honest'] },
];

export const CHINESE_ZODIAC = [
  { animal: 'Rat', emoji: '🐀', years: [1924, 1936, 1948, 1960, 1972, 1984, 1996, 2008, 2020], traits: ['Quick-witted', 'Resourceful', 'Versatile'] },
  { animal: 'Ox', emoji: '🐂', years: [1925, 1937, 1949, 1961, 1973, 1985, 1997, 2009, 2021], traits: ['Diligent', 'Dependable', 'Strong'] },
  { animal: 'Tiger', emoji: '🐅', years: [1926, 1938, 1950, 1962, 1974, 1986, 1998, 2010, 2022], traits: ['Brave', 'Competitive', 'Confident'] },
  { animal: 'Rabbit', emoji: '🐇', years: [1927, 1939, 1951, 1963, 1975, 1987, 1999, 2011, 2023], traits: ['Gentle', 'Quiet', 'Elegant'] },
  { animal: 'Dragon', emoji: '🐉', years: [1928, 1940, 1952, 1964, 1976, 1988, 2000, 2012, 2024], traits: ['Confident', 'Ambitious', 'Charismatic'] },
  { animal: 'Snake', emoji: '🐍', years: [1929, 1941, 1953, 1965, 1977, 1989, 2001, 2013, 2025], traits: ['Wise', 'Enigmatic', 'Intuitive'] },
  { animal: 'Horse', emoji: '🐴', years: [1930, 1942, 1954, 1966, 1978, 1990, 2002, 2014, 2026], traits: ['Energetic', 'Independent', 'Impatient'] },
  { animal: 'Goat', emoji: '🐐', years: [1931, 1943, 1955, 1967, 1979, 1991, 2003, 2015, 2027], traits: ['Calm', 'Gentle', 'Sympathetic'] },
  { animal: 'Monkey', emoji: '🐒', years: [1932, 1944, 1956, 1968, 1980, 1992, 2004, 2016, 2028], traits: ['Clever', 'Curious', 'Mischievous'] },
  { animal: 'Rooster', emoji: '🐓', years: [1933, 1945, 1957, 1969, 1981, 1993, 2005, 2017, 2029], traits: ['Observant', 'Hardworking', 'Confident'] },
  { animal: 'Dog', emoji: '🐕', years: [1934, 1946, 1958, 1970, 1982, 1994, 2006, 2018, 2030], traits: ['Loyal', 'Honest', 'Friendly'] },
  { animal: 'Pig', emoji: '🐷', years: [1935, 1947, 1959, 1971, 1983, 1995, 2007, 2019, 2031], traits: ['Compassionate', 'Generous', 'Diligent'] },
];

export const BIRTHSTONES = [
  { month: 1, name: 'Garnet', emoji: '🔴', color: 'Deep Red' },
  { month: 2, name: 'Amethyst', emoji: '🟣', color: 'Purple' },
  { month: 3, name: 'Aquamarine', emoji: '🔵', color: 'Light Blue' },
  { month: 4, name: 'Diamond', emoji: '💎', color: 'Clear' },
  { month: 5, name: 'Emerald', emoji: '💚', color: 'Green' },
  { month: 6, name: 'Pearl', emoji: '🤍', color: 'White' },
  { month: 7, name: 'Ruby', emoji: '❤️', color: 'Red' },
  { month: 8, name: 'Peridot', emoji: '💛', color: 'Light Green' },
  { month: 9, name: 'Sapphire', emoji: '💙', color: 'Blue' },
  { month: 10, name: 'Opal', emoji: '🌈', color: 'Multicolor' },
  { month: 11, name: 'Topaz', emoji: '🧡', color: 'Orange' },
  { month: 12, name: 'Turquoise', emoji: '🩵', color: 'Blue-Green' },
];

// Generation definitions
export const GENERATIONS = [
  { name: 'Greatest Generation', start: 1901, end: 1927, emoji: '🎖️', traits: ['Resilient', 'Patriotic', 'Self-sacrificing'] },
  { name: 'Silent Generation', start: 1928, end: 1945, emoji: '📻', traits: ['Disciplined', 'Respectful', 'Loyal'] },
  { name: 'Baby Boomer', start: 1946, end: 1964, emoji: '📺', traits: ['Optimistic', 'Competitive', 'Workaholic'] },
  { name: 'Generation X', start: 1965, end: 1980, emoji: '📼', traits: ['Independent', 'Skeptical', 'Adaptable'] },
  { name: 'Millennial', start: 1981, end: 1996, emoji: '💻', traits: ['Tech-savvy', 'Collaborative', 'Purpose-driven'] },
  { name: 'Generation Z', start: 1997, end: 2012, emoji: '📱', traits: ['Digital native', 'Pragmatic', 'Diverse'] },
  { name: 'Generation Alpha', start: 2013, end: 2025, emoji: '🤖', traits: ['AI native', 'Global', 'Visual learners'] },
];

// Tech milestones
export const TECH_MILESTONES = [
  { year: 1969, event: 'Moon Landing', emoji: '🌙' },
  { year: 1971, event: 'First Email', emoji: '📧' },
  { year: 1983, event: 'Internet Born', emoji: '🌐' },
  { year: 1989, event: 'World Wide Web', emoji: '🕸️' },
  { year: 1994, event: 'Amazon Founded', emoji: '📦' },
  { year: 1995, event: 'Windows 95', emoji: '🪟' },
  { year: 1997, event: 'Netflix Founded', emoji: '🎬' },
  { year: 1998, event: 'Google Founded', emoji: '🔍' },
  { year: 2001, event: 'Wikipedia Launched', emoji: '📚' },
  { year: 2001, event: 'iPod Released', emoji: '🎵' },
  { year: 2004, event: 'Facebook Founded', emoji: '👤' },
  { year: 2005, event: 'YouTube Launched', emoji: '▶️' },
  { year: 2006, event: 'Twitter Founded', emoji: '🐦' },
  { year: 2007, event: 'iPhone Released', emoji: '📱' },
  { year: 2008, event: 'Bitcoin Created', emoji: '₿' },
  { year: 2009, event: 'Minecraft Released', emoji: '⛏️' },
  { year: 2010, event: 'Instagram Launched', emoji: '📸' },
  { year: 2011, event: 'Snapchat Released', emoji: '👻' },
  { year: 2016, event: 'TikTok Launched', emoji: '🎵' },
  { year: 2020, event: 'COVID Pandemic', emoji: '😷' },
  { year: 2022, event: 'ChatGPT Released', emoji: '🤖' },
  { year: 2024, event: 'Claude 3 Released', emoji: '🧠' },
];

// Famous birthdays (month-day format)
export const FAMOUS_BIRTHDAYS: Record<string, { name: string; year: number; desc: string }[]> = {
  '1-1': [{ name: 'J.D. Salinger', year: 1919, desc: 'Author' }],
  '1-8': [{ name: 'Elvis Presley', year: 1935, desc: 'King of Rock' }, { name: 'David Bowie', year: 1947, desc: 'Musician' }],
  '1-15': [{ name: 'Martin Luther King Jr.', year: 1929, desc: 'Civil Rights Leader' }],
  '1-17': [{ name: 'Muhammad Ali', year: 1942, desc: 'Boxing Legend' }, { name: 'Jim Carrey', year: 1962, desc: 'Actor' }],
  '1-27': [{ name: 'Wolfgang Mozart', year: 1756, desc: 'Composer' }],
  '2-4': [{ name: 'Mark Zuckerberg', year: 1984, desc: 'Facebook Founder' }],
  '2-11': [{ name: 'Thomas Edison', year: 1847, desc: 'Inventor' }, { name: 'Jennifer Aniston', year: 1969, desc: 'Actress' }],
  '2-12': [{ name: 'Abraham Lincoln', year: 1809, desc: '16th US President' }],
  '2-15': [{ name: 'Galileo Galilei', year: 1564, desc: 'Astronomer' }],
  '2-24': [{ name: 'Steve Jobs', year: 1955, desc: 'Apple Founder' }],
  '3-14': [{ name: 'Albert Einstein', year: 1879, desc: 'Physicist' }, { name: 'Stephen Curry', year: 1988, desc: 'NBA Star' }],
  '3-21': [{ name: 'Ayrton Senna', year: 1960, desc: 'F1 Legend' }],
  '3-26': [{ name: 'Keira Knightley', year: 1985, desc: 'Actress' }],
  '4-4': [{ name: 'Robert Downey Jr.', year: 1965, desc: 'Actor' }],
  '4-15': [{ name: 'Leonardo da Vinci', year: 1452, desc: 'Renaissance Master' }, { name: 'Emma Watson', year: 1990, desc: 'Actress' }],
  '4-21': [{ name: 'Queen Elizabeth II', year: 1926, desc: 'British Monarch' }],
  '4-23': [{ name: 'William Shakespeare', year: 1564, desc: 'Playwright' }],
  '5-4': [{ name: 'Audrey Hepburn', year: 1929, desc: 'Actress' }],
  '5-14': [{ name: 'Mark Zuckerberg', year: 1984, desc: 'Meta CEO' }],
  '5-21': [{ name: 'Mr. T', year: 1952, desc: 'Actor' }],
  '6-1': [{ name: 'Marilyn Monroe', year: 1926, desc: 'Actress' }, { name: 'Tom Holland', year: 1996, desc: 'Actor' }],
  '6-9': [{ name: 'Johnny Depp', year: 1963, desc: 'Actor' }, { name: 'Natalie Portman', year: 1981, desc: 'Actress' }],
  '6-22': [{ name: 'Meryl Streep', year: 1949, desc: 'Actress' }],
  '6-28': [{ name: 'Elon Musk', year: 1971, desc: 'Tech Entrepreneur' }],
  '7-4': [{ name: 'Post Malone', year: 1995, desc: 'Musician' }],
  '7-6': [{ name: 'Dalai Lama', year: 1935, desc: 'Spiritual Leader' }, { name: '50 Cent', year: 1975, desc: 'Rapper' }],
  '7-21': [{ name: 'Robin Williams', year: 1951, desc: 'Actor/Comedian' }],
  '7-26': [{ name: 'Mick Jagger', year: 1943, desc: 'Rolling Stones' }],
  '7-30': [{ name: 'Arnold Schwarzenegger', year: 1947, desc: 'Actor/Governor' }],
  '8-4': [{ name: 'Barack Obama', year: 1961, desc: '44th US President' }],
  '8-15': [{ name: 'Napoleon Bonaparte', year: 1769, desc: 'French Emperor' }],
  '8-18': [{ name: 'Patrick Swayze', year: 1952, desc: 'Actor' }],
  '8-28': [{ name: 'Jack Black', year: 1969, desc: 'Actor' }],
  '9-2': [{ name: 'Keanu Reeves', year: 1964, desc: 'Actor' }],
  '9-9': [{ name: 'Adam Sandler', year: 1966, desc: 'Actor/Comedian' }],
  '9-21': [{ name: 'Stephen King', year: 1947, desc: 'Author' }],
  '9-23': [{ name: 'Bruce Springsteen', year: 1949, desc: 'Musician' }],
  '10-9': [{ name: 'John Lennon', year: 1940, desc: 'Beatles' }],
  '10-28': [{ name: 'Bill Gates', year: 1955, desc: 'Microsoft Founder' }],
  '10-31': [{ name: 'Vanilla Ice', year: 1967, desc: 'Rapper' }],
  '11-4': [{ name: 'Matthew McConaughey', year: 1969, desc: 'Actor' }],
  '11-10': [{ name: 'Leonardo DiCaprio', year: 1974, desc: 'Actor' }],
  '11-19': [{ name: 'Jodie Foster', year: 1962, desc: 'Actress' }],
  '11-28': [{ name: 'Jon Stewart', year: 1962, desc: 'Comedian' }],
  '11-30': [{ name: 'Mark Twain', year: 1835, desc: 'Author' }],
  '12-3': [{ name: 'Julianne Moore', year: 1960, desc: 'Actress' }],
  '12-5': [{ name: 'Walt Disney', year: 1901, desc: 'Disney Founder' }],
  '12-18': [{ name: 'Brad Pitt', year: 1963, desc: 'Actor' }, { name: 'Steven Spielberg', year: 1946, desc: 'Director' }],
  '12-21': [{ name: 'Samuel L. Jackson', year: 1948, desc: 'Actor' }],
  '12-25': [{ name: 'Isaac Newton', year: 1642, desc: 'Physicist' }],
};

// Birth year context data
export const BIRTH_YEAR_CONTEXT: Record<number, { song?: string; movie?: string; event?: string; price_gas?: number; price_bread?: number }> = {
  1950: { song: '"Goodnight Irene" - The Weavers', movie: 'All About Eve', event: 'Korean War begins', price_gas: 0.27, price_bread: 0.14 },
  1955: { song: '"Rock Around the Clock" - Bill Haley', movie: 'Lady and the Tramp', event: 'Disneyland opens', price_gas: 0.29, price_bread: 0.18 },
  1960: { song: '"Theme from A Summer Place"', movie: 'Psycho', event: 'JFK elected', price_gas: 0.31, price_bread: 0.20 },
  1965: { song: '"(I Can\'t Get No) Satisfaction" - Rolling Stones', movie: 'The Sound of Music', event: 'Vietnam War escalates', price_gas: 0.31, price_bread: 0.21 },
  1970: { song: '"Bridge Over Troubled Water" - Simon & Garfunkel', movie: 'Love Story', event: 'First Earth Day', price_gas: 0.36, price_bread: 0.24 },
  1975: { song: '"Love Will Keep Us Together" - Captain & Tennille', movie: 'Jaws', event: 'Vietnam War ends', price_gas: 0.57, price_bread: 0.36 },
  1980: { song: '"Call Me" - Blondie', movie: 'The Empire Strikes Back', event: 'Mt. St. Helens erupts', price_gas: 1.19, price_bread: 0.50 },
  1985: { song: '"Careless Whisper" - Wham!', movie: 'Back to the Future', event: 'Live Aid concert', price_gas: 1.12, price_bread: 0.55 },
  1990: { song: '"Hold On" - Wilson Phillips', movie: 'Home Alone', event: 'Berlin Wall falls', price_gas: 1.15, price_bread: 0.70 },
  1991: { song: '"(Everything I Do) I Do It for You" - Bryan Adams', movie: 'Terminator 2', event: 'USSR dissolves', price_gas: 1.14, price_bread: 0.72 },
  1992: { song: '"End of the Road" - Boyz II Men', movie: 'Aladdin', event: 'Clinton elected', price_gas: 1.13, price_bread: 0.74 },
  1993: { song: '"I Will Always Love You" - Whitney Houston', movie: 'Jurassic Park', event: 'World Wide Web public', price_gas: 1.11, price_bread: 0.76 },
  1994: { song: '"The Sign" - Ace of Base', movie: 'The Lion King', event: 'O.J. Simpson trial', price_gas: 1.11, price_bread: 0.78 },
  1995: { song: '"Gangsta\'s Paradise" - Coolio', movie: 'Toy Story', event: 'Windows 95 released', price_gas: 1.15, price_bread: 0.80 },
  1996: { song: '"Macarena" - Los del Río', movie: 'Independence Day', event: 'Dolly the sheep cloned', price_gas: 1.23, price_bread: 0.87 },
  1997: { song: '"Candle in the Wind" - Elton John', movie: 'Titanic', event: 'Princess Diana dies', price_gas: 1.23, price_bread: 0.87 },
  1998: { song: '"Too Close" - Next', movie: 'Saving Private Ryan', event: 'Google founded', price_gas: 1.06, price_bread: 0.87 },
  1999: { song: '"Believe" - Cher', movie: 'The Matrix', event: 'Y2K panic', price_gas: 1.17, price_bread: 0.89 },
  2000: { song: '"Breathe" - Faith Hill', movie: 'Gladiator', event: 'Y2K non-event', price_gas: 1.51, price_bread: 0.99 },
  2001: { song: '"Hanging by a Moment" - Lifehouse', movie: 'Harry Potter & Sorcerer\'s Stone', event: '9/11 attacks', price_gas: 1.46, price_bread: 1.02 },
  2002: { song: '"How You Remind Me" - Nickelback', movie: 'Spider-Man', event: 'Euro currency debuts', price_gas: 1.36, price_bread: 1.03 },
  2003: { song: '"In da Club" - 50 Cent', movie: 'Finding Nemo', event: 'Iraq War begins', price_gas: 1.59, price_bread: 1.05 },
  2004: { song: '"Yeah!" - Usher', movie: 'The Incredibles', event: 'Facebook founded', price_gas: 1.88, price_bread: 0.97 },
  2005: { song: '"We Belong Together" - Mariah Carey', movie: 'Star Wars: Episode III', event: 'Hurricane Katrina', price_gas: 2.30, price_bread: 1.05 },
  2006: { song: '"Bad Day" - Daniel Powter', movie: 'Pirates of the Caribbean 2', event: 'Twitter launched', price_gas: 2.59, price_bread: 1.14 },
  2007: { song: '"Umbrella" - Rihanna', movie: 'Transformers', event: 'iPhone released', price_gas: 2.80, price_bread: 1.22 },
  2008: { song: '"Low" - Flo Rida', movie: 'The Dark Knight', event: 'Financial crisis', price_gas: 3.27, price_bread: 1.42 },
  2009: { song: '"Boom Boom Pow" - Black Eyed Peas', movie: 'Avatar', event: 'Obama inaugurated', price_gas: 2.35, price_bread: 1.41 },
  2010: { song: '"Tik Tok" - Kesha', movie: 'Toy Story 3', event: 'iPad released', price_gas: 2.79, price_bread: 1.39 },
  2011: { song: '"Rolling in the Deep" - Adele', movie: 'Harry Potter & Deathly Hallows 2', event: 'Bin Laden killed', price_gas: 3.53, price_bread: 1.42 },
  2012: { song: '"Somebody That I Used to Know" - Gotye', movie: 'The Avengers', event: 'Curiosity lands on Mars', price_gas: 3.64, price_bread: 1.43 },
  2013: { song: '"Thrift Shop" - Macklemore', movie: 'Frozen', event: 'Boston Marathon bombing', price_gas: 3.53, price_bread: 1.42 },
  2014: { song: '"Happy" - Pharrell', movie: 'Guardians of the Galaxy', event: 'Ice Bucket Challenge', price_gas: 3.37, price_bread: 1.40 },
  2015: { song: '"Uptown Funk" - Bruno Mars', movie: 'Star Wars: Force Awakens', event: 'Paris Climate Agreement', price_gas: 2.45, price_bread: 1.43 },
  2016: { song: '"Love Yourself" - Justin Bieber', movie: 'Finding Dory', event: 'Trump elected', price_gas: 2.14, price_bread: 1.39 },
  2017: { song: '"Shape of You" - Ed Sheeran', movie: 'Beauty and the Beast', event: 'Bitcoin hits $20K', price_gas: 2.42, price_bread: 1.35 },
  2018: { song: '"God\'s Plan" - Drake', movie: 'Black Panther', event: 'Royal Wedding (Harry & Meghan)', price_gas: 2.74, price_bread: 1.37 },
  2019: { song: '"Old Town Road" - Lil Nas X', movie: 'Avengers: Endgame', event: 'Notre Dame fire', price_gas: 2.60, price_bread: 1.39 },
  2020: { song: '"Blinding Lights" - The Weeknd', movie: 'Bad Boys for Life', event: 'COVID-19 pandemic', price_gas: 2.17, price_bread: 1.53 },
  2021: { song: '"Levitating" - Dua Lipa', movie: 'Spider-Man: No Way Home', event: 'Jan 6 Capitol riot', price_gas: 3.01, price_bread: 1.58 },
  2022: { song: '"As It Was" - Harry Styles', movie: 'Top Gun: Maverick', event: 'ChatGPT released', price_gas: 3.97, price_bread: 1.80 },
  2023: { song: '"Flowers" - Miley Cyrus', movie: 'Barbie', event: 'AI explosion', price_gas: 3.52, price_bread: 1.85 },
  2024: { song: '"Espresso" - Sabrina Carpenter', movie: 'Inside Out 2', event: 'Claude 3 released', price_gas: 3.40, price_bread: 1.90 },
  2025: { song: 'TBD', movie: 'TBD', event: 'Trump 2nd term begins', price_gas: 3.35, price_bread: 1.95 },
};

export interface BirthInfo {
  // Zodiac
  westernZodiac: { name: string; symbol: string; emoji: string; element: string; traits: string[] };
  chineseZodiac: { animal: string; emoji: string; traits: string[] };
  birthstone: { name: string; emoji: string; color: string };
  
  // Day of birth
  dayOfWeek: string;
  dayOfWeekEmoji: string;
  moonPhase: string;
  moonEmoji: string;
  season: string;
  seasonEmoji: string;
  
  // Generation
  generation: { name: string; emoji: string; traits: string[] };
  
  // Famous twins
  famousBirthdays: { name: string; year: number; desc: string }[];
  
  // Birth year context
  birthYearContext: {
    song?: string;
    movie?: string;
    event?: string;
    price_gas?: number;
    price_bread?: number;
  };
  
  // Tech milestones
  techTimeline: { year: number; event: string; emoji: string; ageAtEvent: number }[];
}

export interface FutureMilestone {
  name: string;
  emoji: string;
  date: Date;
  daysUntil: number;
  description: string;
}

export interface LifeInWeeks {
  totalWeeksLived: number;
  totalWeeksExpected: number;
  weeksRemaining: number;
  percentComplete: number;
  yearsLived: number;
  expectedLifespan: number;
}

export interface LifeStats {
  // Time
  daysAlive: number;
  hoursAlive: number;
  minutesAlive: number;
  secondsAlive: number;
  weeksAlive: number;
  
  // Birth info (NEW)
  birthInfo: BirthInfo;
  
  // Future milestones (NEW)
  futureMilestones: FutureMilestone[];
  
  // Achievement badges (NEW)
  achievements: { name: string; emoji: string; earned: boolean; description: string }[];
  
  // Planetary ages (NEW)
  planetaryAges: PlanetaryAge[];
  
  // Life in Weeks (NEW)
  lifeInWeeks: LifeInWeeks;
  
  // New moon data
  newMoons: number;
  lunarEclipses: number;
  
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
  foodStats: { key: string; icon: string; label: string; value: number; decimals?: number; showFull?: boolean }[];
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
const WATER_GALLONS_PER_DAY = 0.5; // Drinking water

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

// Planetary orbital periods in Earth days
export const PLANETS = [
  { name: 'Mercury', emoji: '☿️', orbitalPeriod: 87.97, color: 'gray', fact: 'You\'d have had {age} birthdays!' },
  { name: 'Venus', emoji: '♀️', orbitalPeriod: 224.7, color: 'yellow', fact: 'Venus days are longer than its years!' },
  { name: 'Earth', emoji: '🌍', orbitalPeriod: 365.25, color: 'blue', fact: 'Home sweet home' },
  { name: 'Mars', emoji: '♂️', orbitalPeriod: 686.98, color: 'red', fact: 'A year on Mars = 687 Earth days' },
  { name: 'Jupiter', emoji: '♃', orbitalPeriod: 4332.59, color: 'orange', fact: 'The largest planet in our solar system' },
  { name: 'Saturn', emoji: '♄', orbitalPeriod: 10759.22, color: 'amber', fact: 'Famous for its beautiful rings' },
  { name: 'Uranus', emoji: '♅', orbitalPeriod: 30688.5, color: 'cyan', fact: 'Rotates on its side!' },
  { name: 'Neptune', emoji: '♆', orbitalPeriod: 60182, color: 'indigo', fact: 'Windiest planet - 1,200 mph winds' },
];

export interface PlanetaryAge {
  name: string;
  emoji: string;
  age: number;
  nextBirthday: number; // days until next birthday on this planet
  fact: string;
  color: string;
}

// Recorded human history ~5000 years (writing invented ~3000 BCE)
const RECORDED_HISTORY_YEARS = 5000;

// Helper functions for birth info
function getWesternZodiac(month: number, day: number) {
  for (const sign of ZODIAC_SIGNS) {
    const [startM, startD] = sign.start;
    const [endM, endD] = sign.end;
    
    if (startM === 12 && endM === 1) {
      // Capricorn spans year boundary
      if ((month === 12 && day >= startD) || (month === 1 && day <= endD)) {
        return sign;
      }
    } else if ((month === startM && day >= startD) || (month === endM && day <= endD) || (month > startM && month < endM)) {
      return sign;
    }
  }
  return ZODIAC_SIGNS[0]; // Default to Capricorn
}

function getChineseZodiac(year: number) {
  const idx = (year - 1924) % 12;
  return CHINESE_ZODIAC[idx >= 0 ? idx : idx + 12];
}

function getBirthstone(month: number) {
  return BIRTHSTONES[month - 1];
}

function getGeneration(year: number) {
  for (const gen of GENERATIONS) {
    if (year >= gen.start && year <= gen.end) {
      return gen;
    }
  }
  return GENERATIONS[GENERATIONS.length - 1];
}

function getDayOfWeek(date: Date): { name: string; emoji: string } {
  const days = [
    { name: 'Sunday', emoji: '☀️' },
    { name: 'Monday', emoji: '🌙' },
    { name: 'Tuesday', emoji: '🔥' },
    { name: 'Wednesday', emoji: '💨' },
    { name: 'Thursday', emoji: '⚡' },
    { name: 'Friday', emoji: '💕' },
    { name: 'Saturday', emoji: '🪐' },
  ];
  return days[date.getDay()];
}

function getMoonPhase(date: Date): { phase: string; emoji: string } {
  // Simplified moon phase calculation
  const knownNewMoon = new Date(2000, 0, 6).getTime(); // Jan 6, 2000 was a new moon
  const lunarCycle = 29.53059 * 24 * 60 * 60 * 1000; // in ms
  const diff = date.getTime() - knownNewMoon;
  const daysIntoCycle = (diff % lunarCycle) / (24 * 60 * 60 * 1000);
  const phase = daysIntoCycle / 29.53059;
  
  if (phase < 0.0625) return { phase: 'New Moon', emoji: '🌑' };
  if (phase < 0.1875) return { phase: 'Waxing Crescent', emoji: '🌒' };
  if (phase < 0.3125) return { phase: 'First Quarter', emoji: '🌓' };
  if (phase < 0.4375) return { phase: 'Waxing Gibbous', emoji: '🌔' };
  if (phase < 0.5625) return { phase: 'Full Moon', emoji: '🌕' };
  if (phase < 0.6875) return { phase: 'Waning Gibbous', emoji: '🌖' };
  if (phase < 0.8125) return { phase: 'Last Quarter', emoji: '🌗' };
  if (phase < 0.9375) return { phase: 'Waning Crescent', emoji: '🌘' };
  return { phase: 'New Moon', emoji: '🌑' };
}

function getSeason(month: number, isNorthern: boolean = true): { season: string; emoji: string } {
  const seasons = isNorthern ? [
    { months: [12, 1, 2], season: 'Winter', emoji: '❄️' },
    { months: [3, 4, 5], season: 'Spring', emoji: '🌸' },
    { months: [6, 7, 8], season: 'Summer', emoji: '☀️' },
    { months: [9, 10, 11], season: 'Fall', emoji: '🍂' },
  ] : [
    { months: [12, 1, 2], season: 'Summer', emoji: '☀️' },
    { months: [3, 4, 5], season: 'Fall', emoji: '🍂' },
    { months: [6, 7, 8], season: 'Winter', emoji: '❄️' },
    { months: [9, 10, 11], season: 'Spring', emoji: '🌸' },
  ];
  
  for (const s of seasons) {
    if (s.months.includes(month)) {
      return { season: s.season, emoji: s.emoji };
    }
  }
  return { season: 'Spring', emoji: '🌸' };
}

function getFamousBirthdays(month: number, day: number): { name: string; year: number; desc: string }[] {
  const key = `${month}-${day}`;
  return FAMOUS_BIRTHDAYS[key] || [];
}

function getTechTimeline(birthYear: number, currentYear: number): { year: number; event: string; emoji: string; ageAtEvent: number }[] {
  return TECH_MILESTONES
    .filter(t => t.year >= birthYear && t.year <= currentYear)
    .map(t => ({
      ...t,
      ageAtEvent: t.year - birthYear
    }))
    .slice(0, 10); // Limit to 10 most relevant
}

function calculateFutureMilestones(birthday: Date, now: Date, daysAlive: number, secondsAlive: number): FutureMilestone[] {
  const milestones: FutureMilestone[] = [];
  const birthYear = birthday.getFullYear();
  const currentYear = now.getFullYear();
  
  // Decade birthdays
  for (const age of [30, 40, 50, 60, 70, 80, 90, 100]) {
    const date = new Date(birthYear + age, birthday.getMonth(), birthday.getDate());
    if (date > now) {
      milestones.push({
        name: `${age}th Birthday`,
        emoji: age === 100 ? '💯' : '🎂',
        date,
        daysUntil: Math.ceil((date.getTime() - now.getTime()) / (24 * 60 * 60 * 1000)),
        description: `You'll turn ${age} years old!`
      });
    }
  }
  
  // 10,000 days
  const tenKDays = 10000;
  if (daysAlive < tenKDays) {
    const date = new Date(birthday.getTime() + tenKDays * 24 * 60 * 60 * 1000);
    milestones.push({
      name: '10,000 Days Club',
      emoji: '🎯',
      date,
      daysUntil: tenKDays - daysAlive,
      description: 'Join the exclusive 10K days club (~27.4 years)'
    });
  }
  
  // 1 billion seconds
  const billionSeconds = 1000000000;
  if (secondsAlive < billionSeconds) {
    const date = new Date(birthday.getTime() + billionSeconds * 1000);
    milestones.push({
      name: 'Billion Seconds Club',
      emoji: '🏆',
      date,
      daysUntil: Math.ceil((billionSeconds - secondsAlive) / 86400),
      description: 'Reach 1,000,000,000 seconds alive (~31.7 years)'
    });
  }
  
  // 20,000 days
  const twentyKDays = 20000;
  if (daysAlive < twentyKDays) {
    const date = new Date(birthday.getTime() + twentyKDays * 24 * 60 * 60 * 1000);
    milestones.push({
      name: '20,000 Days Club',
      emoji: '⭐',
      date,
      daysUntil: twentyKDays - daysAlive,
      description: 'Double 10K! (~54.8 years)'
    });
  }
  
  // 500 full moons
  const daysFor500Moons = Math.ceil(500 * LUNAR_CYCLE_DAYS);
  if (daysAlive < daysFor500Moons) {
    const date = new Date(birthday.getTime() + daysFor500Moons * 24 * 60 * 60 * 1000);
    milestones.push({
      name: '500 Full Moons',
      emoji: '🌕',
      date,
      daysUntil: daysFor500Moons - daysAlive,
      description: 'Witness 500 full moons (~40.4 years)'
    });
  }
  
  // 1 billion heartbeats
  const billionHeartbeats = 1000000000;
  const heartbeatsPerDay = 100000;
  const daysForBillionHeartbeats = Math.ceil(billionHeartbeats / heartbeatsPerDay);
  if (daysAlive < daysForBillionHeartbeats) {
    const date = new Date(birthday.getTime() + daysForBillionHeartbeats * 24 * 60 * 60 * 1000);
    milestones.push({
      name: 'Billion Heartbeats',
      emoji: '💓',
      date,
      daysUntil: daysForBillionHeartbeats - daysAlive,
      description: 'Your heart will beat 1 billion times (~27.4 years)'
    });
  }
  
  return milestones.sort((a, b) => a.daysUntil - b.daysUntil).slice(0, 6);
}

function calculateAchievements(daysAlive: number, secondsAlive: number, fullMoons: number, heartbeats: number, yearsAlive: number): { name: string; emoji: string; earned: boolean; description: string }[] {
  return [
    { name: '1,000 Days', emoji: '📅', earned: daysAlive >= 1000, description: 'Alive for 1,000 days' },
    { name: '5,000 Days', emoji: '🗓️', earned: daysAlive >= 5000, description: 'Alive for 5,000 days' },
    { name: '10,000 Days Club', emoji: '🎯', earned: daysAlive >= 10000, description: 'The legendary 10K days' },
    { name: '20,000 Days Club', emoji: '⭐', earned: daysAlive >= 20000, description: 'Double 10K!' },
    { name: 'Billion Seconds Club', emoji: '🏆', earned: secondsAlive >= 1000000000, description: '1 billion seconds alive' },
    { name: '100 Full Moons', emoji: '🌔', earned: fullMoons >= 100, description: 'Witnessed 100 full moons' },
    { name: '500 Full Moons', emoji: '🌕', earned: fullMoons >= 500, description: 'Witnessed 500 full moons' },
    { name: 'Billion Heartbeats', emoji: '💓', earned: heartbeats >= 1000000000, description: '1 billion heartbeats' },
    { name: 'Quarter Century', emoji: '🎉', earned: yearsAlive >= 25, description: '25 years old' },
    { name: 'Third Decade', emoji: '🎊', earned: yearsAlive >= 30, description: '30 years old' },
    { name: 'Half Century', emoji: '🎖️', earned: yearsAlive >= 50, description: '50 years old' },
    { name: 'Golden Years', emoji: '👑', earned: yearsAlive >= 65, description: '65 years young' },
  ];
}

function calculatePlanetaryAges(daysAlive: number): PlanetaryAge[] {
  return PLANETS.map(planet => {
    const age = daysAlive / planet.orbitalPeriod;
    const completedOrbits = Math.floor(age);
    const progressIntoYear = age - completedOrbits;
    const daysUntilNextBirthday = Math.ceil((1 - progressIntoYear) * planet.orbitalPeriod);
    
    return {
      name: planet.name,
      emoji: planet.emoji,
      age: age,
      nextBirthday: daysUntilNextBirthday,
      fact: planet.fact.replace('{age}', completedOrbits.toString()),
      color: planet.color,
    };
  });
}

function calculateLifeInWeeks(daysAlive: number, lifeExpectancy: number): LifeInWeeks {
  const weeksLived = Math.floor(daysAlive / 7);
  const expectedWeeks = Math.floor(lifeExpectancy * 52.1775);
  const yearsLived = daysAlive / 365.25;
  
  return {
    totalWeeksLived: weeksLived,
    totalWeeksExpected: expectedWeeks,
    weeksRemaining: Math.max(0, expectedWeeks - weeksLived),
    percentComplete: (weeksLived / expectedWeeks) * 100,
    yearsLived: yearsLived,
    expectedLifespan: lifeExpectancy,
  };
}

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
  const newMoons = fullMoons; // Same count, different phase
  const lunarEclipses = Math.floor(yearsAlive * 2.4); // ~2.4 lunar eclipses per year globally
  
  // Weeks alive
  const weeksAlive = Math.floor(daysAlive / 7);
  
  // Seasons (4 per year)
  const seasonsExperienced = Math.floor(earthOrbits * 4);
  
  // Lifespan percentage (country-adjusted)
  const countryLifeExpectancy = profile.lifeExpectancy;
  const averageLifespanMs = countryLifeExpectancy * 365.25 * 24 * 60 * 60 * 1000;
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
  
  // Consumption stats (country-specific foods)
  const foodStats = profile.foods.map(food => ({
    key: food.key,
    icon: food.icon,
    label: food.label,
    value: food.decimals !== undefined 
      ? Math.round(yearsAlive * food.perYear * Math.pow(10, food.decimals)) / Math.pow(10, food.decimals)
      : Math.floor(yearsAlive * food.perYear),
    decimals: food.decimals,
    showFull: food.showFull,
  }));
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
  
  // Birth info calculations
  const birthMonth = birthday.getMonth() + 1;
  const birthDay = birthday.getDate();
  const westernZodiac = getWesternZodiac(birthMonth, birthDay);
  const chineseZodiac = getChineseZodiac(birthYearNum);
  const birthstone = getBirthstone(birthMonth);
  const generation = getGeneration(birthYearNum);
  const dayOfWeekInfo = getDayOfWeek(birthday);
  const moonPhaseInfo = getMoonPhase(birthday);
  const seasonInfo = getSeason(birthMonth);
  const famousBirthdays = getFamousBirthdays(birthMonth, birthDay);
  const birthYearContext = BIRTH_YEAR_CONTEXT[birthYearNum] || {};
  const techTimeline = getTechTimeline(birthYearNum, currentYearNum);
  
  const birthInfo: BirthInfo = {
    westernZodiac: {
      name: westernZodiac.name,
      symbol: westernZodiac.symbol,
      emoji: westernZodiac.emoji,
      element: westernZodiac.element,
      traits: westernZodiac.traits,
    },
    chineseZodiac: {
      animal: chineseZodiac.animal,
      emoji: chineseZodiac.emoji,
      traits: chineseZodiac.traits,
    },
    birthstone: {
      name: birthstone.name,
      emoji: birthstone.emoji,
      color: birthstone.color,
    },
    dayOfWeek: dayOfWeekInfo.name,
    dayOfWeekEmoji: dayOfWeekInfo.emoji,
    moonPhase: moonPhaseInfo.phase,
    moonEmoji: moonPhaseInfo.emoji,
    season: seasonInfo.season,
    seasonEmoji: seasonInfo.emoji,
    generation: {
      name: generation.name,
      emoji: generation.emoji,
      traits: generation.traits,
    },
    famousBirthdays,
    birthYearContext,
    techTimeline,
  };
  
  // Future milestones
  const futureMilestones = calculateFutureMilestones(birthday, now, daysAlive, secondsAlive);
  
  // Achievements
  const achievements = calculateAchievements(daysAlive, secondsAlive, fullMoons, heartbeats, yearsAlive);
  
  // Planetary ages
  const planetaryAges = calculatePlanetaryAges(daysAlive);
  
  // Life in weeks
  const lifeInWeeks = calculateLifeInWeeks(daysAlive, countryLifeExpectancy);
  
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
    weeksAlive,
    
    // Birth info (NEW)
    birthInfo,
    
    // Future milestones (NEW)
    futureMilestones,
    
    // Achievement badges (NEW)
    achievements,
    
    // Planetary ages (NEW)
    planetaryAges,
    
    // Life in weeks (NEW)
    lifeInWeeks,
    
    // Moon data
    newMoons,
    lunarEclipses,
    
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
    foodStats,
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
// These are deltas from country average (men ~3 less, women ~3 more)
const MALE_LIFE_EXPECTANCY_DELTA = -3;
const FEMALE_LIFE_EXPECTANCY_DELTA = 3;
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
  now: Date = new Date(),
  country: Country = 'us'
): GenderStats | null {
  if (!gender) return null;
  
  const msAlive = now.getTime() - birthday.getTime();
  const daysAlive = Math.floor(msAlive / (24 * 60 * 60 * 1000));
  const yearsAlive = msAlive / (365.25 * 24 * 60 * 60 * 1000);
  
  const isMale = gender === 'male';
  const isFemale = gender === 'female';
  
  // Get country profile for base life expectancy
  const profile = COUNTRY_PROFILES[country || 'us'] || COUNTRY_PROFILES.us;
  
  // Adjusted life expectancy (country + gender)
  const genderDelta = isMale ? MALE_LIFE_EXPECTANCY_DELTA : FEMALE_LIFE_EXPECTANCY_DELTA;
  const adjustedLifeExpectancy = profile.lifeExpectancy + genderDelta;
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
