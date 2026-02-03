'use client';

import { useEffect, useState } from 'react';

interface ProgressBarProps {
  percentage: number;
  label: string;
}

export default function ProgressBar({ percentage, label }: ProgressBarProps) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setWidth(Math.min(percentage, 100));
    }, 500);

    return () => clearTimeout(timer);
  }, [percentage]);

  return (
    <div className="stat-card rounded-2xl p-5">
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm text-gray-400">{label}</span>
        <span className="text-lg font-bold gradient-text">{percentage.toFixed(1)}%</span>
      </div>
      <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
        <div 
          className="h-full progress-bar rounded-full transition-all duration-1500 ease-out"
          style={{ width: `${width}%` }}
        />
      </div>
      <div className="flex justify-between text-xs text-gray-500 mt-2">
        <span>Birth</span>
        <span>80 years (avg lifespan)</span>
      </div>
    </div>
  );
}
