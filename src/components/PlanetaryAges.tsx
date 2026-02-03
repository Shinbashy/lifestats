'use client';

import { PlanetaryAge } from '@/lib/calculations';

interface PlanetaryAgesProps {
  planetaryAges: PlanetaryAge[];
}

const planetColors: Record<string, string> = {
  gray: 'from-gray-500/20 to-gray-600/20 border-gray-500/30',
  yellow: 'from-yellow-500/20 to-amber-500/20 border-yellow-500/30',
  blue: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30',
  red: 'from-red-500/20 to-orange-500/20 border-red-500/30',
  orange: 'from-orange-500/20 to-amber-500/20 border-orange-500/30',
  amber: 'from-amber-500/20 to-yellow-500/20 border-amber-500/30',
  cyan: 'from-cyan-500/20 to-teal-500/20 border-cyan-500/30',
  indigo: 'from-indigo-500/20 to-blue-500/20 border-indigo-500/30',
};

const textColors: Record<string, string> = {
  gray: 'text-gray-300',
  yellow: 'text-yellow-300',
  blue: 'text-blue-300',
  red: 'text-red-300',
  orange: 'text-orange-300',
  amber: 'text-amber-300',
  cyan: 'text-cyan-300',
  indigo: 'text-indigo-300',
};

export default function PlanetaryAges({ planetaryAges }: PlanetaryAgesProps) {
  return (
    <div className="stat-card rounded-2xl p-6">
      <p className="text-sm text-gray-400 mb-4">
        Each planet has a different orbital period. Here&apos;s how old you&apos;d be!
      </p>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {planetaryAges.map((planet) => {
          const colorClass = planetColors[planet.color] || planetColors.gray;
          const textClass = textColors[planet.color] || textColors.gray;
          const isEarth = planet.name === 'Earth';
          const wholeAge = Math.floor(planet.age);
          const decimal = (planet.age - wholeAge).toFixed(2).slice(1);
          
          return (
            <div 
              key={planet.name}
              className={`
                bg-gradient-to-br ${colorClass} 
                rounded-xl p-4 border transition-transform hover:scale-105
                ${isEarth ? 'ring-2 ring-blue-500/50' : ''}
              `}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{planet.emoji}</span>
                <span className="font-medium text-white">{planet.name}</span>
              </div>
              
              <div className={`text-3xl font-bold ${textClass} mb-1`}>
                {wholeAge}
                <span className="text-lg opacity-60">{decimal}</span>
              </div>
              
              <div className="text-xs text-gray-400 mb-2">
                {planet.name === 'Earth' ? 'years old' : `${planet.name} years`}
              </div>
              
              {!isEarth && (
                <div className="text-[10px] text-gray-500 border-t border-gray-700/50 pt-2 mt-2">
                  {planet.nextBirthday === 1 
                    ? '🎂 Birthday tomorrow!' 
                    : `🎂 Next birthday: ${planet.nextBirthday} Earth days`
                  }
                </div>
              )}
              
              {isEarth && (
                <div className="text-[10px] text-blue-400 border-t border-gray-700/50 pt-2 mt-2">
                  ✨ {planet.fact}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Fun facts section */}
      <div className="mt-6 bg-gray-800/30 rounded-xl p-4">
        <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
          <span>💫</span> Planet Fun Facts
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-gray-400">
          {planetaryAges
            .filter(p => p.name !== 'Earth')
            .slice(0, 4)
            .map(planet => (
              <div key={planet.name} className="flex items-start gap-2">
                <span>{planet.emoji}</span>
                <span>{planet.fact}</span>
              </div>
            ))
          }
        </div>
      </div>

      <p className="text-[10px] text-gray-500 mt-4 text-center">
        On Mercury, you&apos;d be {Math.floor(planetaryAges[0]?.age || 0)} years old! 
        On Neptune, you might not even be 1 yet. 🌌
      </p>
    </div>
  );
}
