'use client';

import { useEffect, useState } from 'react';
import { formatNumber, formatNumberFull } from '@/lib/calculations';

interface StatCardProps {
  label: string;
  value: number;
  suffix?: string;
  icon: string;
  delay?: number;
  isLive?: boolean;
  showFull?: boolean;
  decimals?: number;
}

export default function StatCard({ 
  label, 
  value, 
  suffix = '', 
  icon, 
  delay = 0,
  isLive = false,
  showFull = false,
  decimals = 0
}: StatCardProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [showFullNumber, setShowFullNumber] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay * 100);

    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 1500;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(value * (step / steps), value);
      setDisplayValue(current);

      if (step >= steps) {
        clearInterval(timer);
        setDisplayValue(value);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value, isVisible]);

  const formattedValue = decimals > 0 
    ? displayValue.toFixed(decimals)
    : showFullNumber || showFull
      ? formatNumberFull(Math.floor(displayValue))
      : formatNumber(Math.floor(displayValue));

  return (
    <div 
      className={`stat-card rounded-2xl p-5 cursor-pointer transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      onClick={() => setShowFullNumber(!showFullNumber)}
    >
      <div className="flex items-start justify-between mb-3">
        <span className="text-3xl">{icon}</span>
        {isLive && (
          <span className="text-xs text-indigo-400 bg-indigo-500/20 px-2 py-1 rounded-full animate-pulse">
            LIVE
          </span>
        )}
      </div>
      <div className={`text-2xl md:text-3xl font-bold mb-1 ${isLive ? 'live-counter text-indigo-300' : 'text-white'}`}>
        {formattedValue}{suffix}
      </div>
      <div className="text-sm text-gray-400">{label}</div>
      {!showFull && value >= 1000 && (
        <div className="text-xs text-gray-500 mt-1">
          {showFullNumber ? 'tap to abbreviate' : 'tap for full number'}
        </div>
      )}
    </div>
  );
}
