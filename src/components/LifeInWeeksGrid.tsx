'use client';

import { useMemo } from 'react';
import { LifeInWeeks } from '@/lib/calculations';

interface LifeInWeeksGridProps {
  lifeInWeeks: LifeInWeeks;
}

export default function LifeInWeeksGrid({ lifeInWeeks }: LifeInWeeksGridProps) {
  const { totalWeeksLived, totalWeeksExpected, yearsLived, expectedLifespan } = lifeInWeeks;
  
  // Generate weeks grid (52 weeks per row, up to expected lifespan)
  const weeksPerRow = 52;
  const totalRows = Math.ceil(expectedLifespan);
  
  const grid = useMemo(() => {
    const rows = [];
    for (let year = 0; year < totalRows; year++) {
      const weeks = [];
      for (let week = 0; week < weeksPerRow; week++) {
        const weekNumber = year * weeksPerRow + week;
        const isLived = weekNumber < totalWeeksLived;
        const isCurrentWeek = weekNumber === totalWeeksLived;
        weeks.push({ weekNumber, isLived, isCurrentWeek });
      }
      rows.push({ year, weeks });
    }
    return rows;
  }, [totalRows, totalWeeksLived]);

  // Decade markers
  const decades = [10, 20, 30, 40, 50, 60, 70, 80, 90];

  return (
    <div className="stat-card rounded-2xl p-6">
      <h2 className="text-lg font-semibold text-gray-300 mb-2 flex items-center gap-2">
        <span>📊</span> Your Life in Weeks
      </h2>
      <p className="text-sm text-gray-400 mb-4">
        Each box = 1 week. Each row = 1 year. Inspired by{' '}
        <a 
          href="https://waitbutwhy.com/2014/05/life-weeks.html" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-indigo-400 hover:underline"
        >
          Wait But Why
        </a>
      </p>
      
      {/* Stats summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-indigo-500/10 rounded-xl p-3 text-center border border-indigo-500/20">
          <div className="text-2xl font-bold text-indigo-300">{totalWeeksLived.toLocaleString()}</div>
          <div className="text-xs text-gray-400">weeks lived</div>
        </div>
        <div className="bg-gray-500/10 rounded-xl p-3 text-center border border-gray-500/20">
          <div className="text-2xl font-bold text-gray-300">{lifeInWeeks.weeksRemaining.toLocaleString()}</div>
          <div className="text-xs text-gray-400">weeks remaining*</div>
        </div>
        <div className="bg-purple-500/10 rounded-xl p-3 text-center border border-purple-500/20">
          <div className="text-2xl font-bold text-purple-300">{lifeInWeeks.percentComplete.toFixed(1)}%</div>
          <div className="text-xs text-gray-400">of expected life</div>
        </div>
      </div>

      {/* The Grid */}
      <div className="relative overflow-x-auto pb-4">
        <div className="min-w-[400px]">
          {/* Year labels on left */}
          <div className="flex">
            <div className="w-8 flex-shrink-0" /> {/* Spacer for year labels */}
            <div className="flex-1">
              {/* Decade column markers */}
              <div className="flex mb-1">
                {[0, 10, 20, 30, 40, 50].map(w => (
                  <div 
                    key={w} 
                    className="text-[8px] text-gray-500"
                    style={{ width: `${(10/52)*100}%`, marginLeft: w === 0 ? 0 : undefined }}
                  >
                    {w > 0 && `${w}w`}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {grid.map(({ year, weeks }) => (
            <div key={year} className="flex items-center mb-[1px]">
              {/* Year label */}
              <div className="w-8 flex-shrink-0 text-[9px] text-gray-500 text-right pr-1">
                {decades.includes(year) && `${year}`}
              </div>
              
              {/* Week boxes */}
              <div className="flex-1 flex gap-[1px]">
                {weeks.map(({ weekNumber, isLived, isCurrentWeek }) => (
                  <div
                    key={weekNumber}
                    className={`
                      aspect-square flex-1 rounded-[1px] transition-colors
                      ${isCurrentWeek 
                        ? 'bg-yellow-400 animate-pulse shadow-lg shadow-yellow-400/50' 
                        : isLived 
                          ? 'bg-indigo-500' 
                          : 'bg-gray-700/30'
                      }
                    `}
                    style={{ maxWidth: '6px', maxHeight: '6px' }}
                    title={`Week ${weekNumber + 1} (Age ${Math.floor(weekNumber / 52)})`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-4 text-xs text-gray-400">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-indigo-500" />
          <span>Weeks lived</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-yellow-400 animate-pulse" />
          <span>This week</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-gray-700/30" />
          <span>Future</span>
        </div>
      </div>

      <p className="text-[10px] text-gray-500 mt-4 text-center">
        * Based on {expectedLifespan}-year life expectancy for your country. Make every week count! 💪
      </p>
    </div>
  );
}
