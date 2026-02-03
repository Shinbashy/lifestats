'use client';

import { useEffect, useState } from 'react';
import { formatNumber, formatNumberFull } from '@/lib/calculations';

export interface UnitOption {
  label: string;
  value: number;
  suffix?: string;
  decimals?: number;
}

interface StatCardProps {
  label: string;
  value: number;
  suffix?: string;
  icon: string;
  delay?: number;
  isLive?: boolean;
  showFull?: boolean;
  decimals?: number;
  units?: UnitOption[];
}

export default function StatCard({ 
  label, 
  value, 
  suffix = '', 
  icon, 
  delay = 0,
  isLive = false,
  showFull = false,
  decimals = 0,
  units,
}: StatCardProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [showFullNumber, setShowFullNumber] = useState(false);
  const [unitIndex, setUnitIndex] = useState(0);

  // Get current unit (if units provided) or use default props
  const currentUnit = units?.[unitIndex];
  const activeValue = currentUnit?.value ?? value;
  const activeLabel = currentUnit?.label ?? label;
  const activeSuffix = currentUnit?.suffix ?? suffix;
  const activeDecimals = currentUnit?.decimals ?? decimals;

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
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const current = Math.min(activeValue * (step / steps), activeValue);
      setDisplayValue(current);

      if (step >= steps) {
        clearInterval(timer);
        setDisplayValue(activeValue);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [activeValue, isVisible]);

  // Update display when unit changes (instant, no animation)
  useEffect(() => {
    if (isVisible) {
      setDisplayValue(activeValue);
    }
  }, [unitIndex, activeValue, isVisible]);

  const handleClick = () => {
    if (units && units.length > 1) {
      // Cycle through units
      setUnitIndex((prev) => (prev + 1) % units.length);
    } else {
      // Toggle full number display
      setShowFullNumber(!showFullNumber);
    }
  };

  const formattedValue = activeDecimals > 0 
    ? displayValue.toFixed(activeDecimals)
    : showFullNumber || showFull
      ? formatNumberFull(Math.floor(displayValue))
      : formatNumber(Math.floor(displayValue));

  const hasMultipleUnits = units && units.length > 1;
  const canToggleFull = !showFull && activeValue >= 1000 && !hasMultipleUnits;

  return (
    <div 
      className={`stat-card rounded-2xl p-5 cursor-pointer transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      } ${hasMultipleUnits ? 'ring-1 ring-indigo-500/20' : ''}`}
      onClick={handleClick}
    >
      <div className="flex items-start justify-between mb-3">
        <span className="text-3xl">{icon}</span>
        {isLive && (
          <span className="text-xs text-indigo-400 bg-indigo-500/20 px-2 py-1 rounded-full animate-pulse">
            LIVE
          </span>
        )}
        {hasMultipleUnits && (
          <span className="text-xs text-indigo-400 bg-indigo-500/20 px-2 py-1 rounded-full">
            ↻
          </span>
        )}
      </div>
      <div className={`text-2xl md:text-3xl font-bold mb-1 ${isLive ? 'live-counter text-indigo-300' : 'text-white'}`}>
        {formattedValue}{activeSuffix && ` ${activeSuffix}`}
      </div>
      <div className="text-sm text-gray-400">{activeLabel}</div>
      
      {/* Hint text */}
      {hasMultipleUnits && (
        <div className="text-xs text-indigo-400 mt-2">
          tap to change unit ({unitIndex + 1}/{units.length})
        </div>
      )}
      {canToggleFull && (
        <div className="text-xs text-gray-500 mt-1">
          {showFullNumber ? 'tap to abbreviate' : 'tap for full number'}
        </div>
      )}
    </div>
  );
}
