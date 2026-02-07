// Quick test script for birthstone and generation logic

const BIRTHSTONES = [
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

const GENERATIONS = [
  { name: 'Greatest Generation', start: 1901, end: 1927 },
  { name: 'Silent Generation', start: 1928, end: 1945 },
  { name: 'Baby Boomer', start: 1946, end: 1964 },
  { name: 'Generation X', start: 1965, end: 1980 },
  { name: 'Millennial', start: 1981, end: 1996 },
  { name: 'Generation Z', start: 1997, end: 2012 },
  { name: 'Generation Alpha', start: 2013, end: 2025 },
];

const ZODIAC_SIGNS = [
  { name: 'Capricorn', start: [12, 22], end: [1, 19] },
  { name: 'Aquarius', start: [1, 20], end: [2, 18] },
  { name: 'Pisces', start: [2, 19], end: [3, 20] },
  { name: 'Aries', start: [3, 21], end: [4, 19] },
  { name: 'Taurus', start: [4, 20], end: [5, 20] },
  { name: 'Gemini', start: [5, 21], end: [6, 20] },
  { name: 'Cancer', start: [6, 21], end: [7, 22] },
  { name: 'Leo', start: [7, 23], end: [8, 22] },
  { name: 'Virgo', start: [8, 23], end: [9, 22] },
  { name: 'Libra', start: [9, 23], end: [10, 22] },
  { name: 'Scorpio', start: [10, 23], end: [11, 21] },
  { name: 'Sagittarius', start: [11, 22], end: [12, 21] },
];

function getBirthstone(month) {
  return BIRTHSTONES[month - 1];
}

function getGeneration(year) {
  for (const gen of GENERATIONS) {
    if (year >= gen.start && year <= gen.end) {
      return gen;
    }
  }
  return GENERATIONS[GENERATIONS.length - 1];
}

function getWesternZodiac(month, day) {
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

// Test cases
const tests = [
  { date: '12/25/1972', expected: { zodiac: 'Capricorn', stone: 'Turquoise', gen: 'Generation X' } },
  { date: '01/15/2000', expected: { zodiac: 'Capricorn', stone: 'Garnet', gen: 'Generation Z' } },
  { date: '06/15/1985', expected: { zodiac: 'Gemini', stone: 'Pearl', gen: 'Millennial' } },
];

console.log('=== BIRTHSTONE & GENERATION TEST ===\n');

tests.forEach(test => {
  const [month, day, year] = test.date.split('/').map(Number);
  const birthdate = new Date(year, month - 1, day);
  
  // Get month from Date object (0-11) and add 1 to make it 1-12
  const jsMonth = birthdate.getMonth() + 1;
  const jsDay = birthdate.getDate();
  
  const zodiac = getWesternZodiac(jsMonth, jsDay);
  const stone = getBirthstone(jsMonth);
  const gen = getGeneration(year);
  
  console.log(`Testing: ${test.date}`);
  console.log(`  Expected: ${test.expected.zodiac}, ${test.expected.stone}, ${test.expected.gen}`);
  console.log(`  Got: ${zodiac.name}, ${stone.name}, ${gen.name}`);
  console.log(`  Debug: jsMonth=${jsMonth}, jsDay=${jsDay}, year=${year}`);
  
  const pass = zodiac.name === test.expected.zodiac && 
               stone.name === test.expected.stone && 
               gen.name === test.expected.gen;
  
  console.log(`  ${pass ? '✅ PASS' : '❌ FAIL'}\n`);
});

// Additional edge case tests
console.log('=== EDGE CASE TESTS ===\n');

// Test all 12 months for birthstones
console.log('Testing birthstone array indexing:');
for (let m = 1; m <= 12; m++) {
  const stone = getBirthstone(m);
  console.log(`  Month ${m}: ${stone.name} (array index: ${m-1})`);
}

// Test generation boundaries
console.log('\nTesting generation boundaries:');
const boundaryYears = [1964, 1965, 1980, 1981, 1996, 1997];
boundaryYears.forEach(year => {
  const gen = getGeneration(year);
  console.log(`  ${year}: ${gen.name}`);
});
