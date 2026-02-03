'use client';

import { useState, ReactNode } from 'react';

interface CollapsibleSectionProps {
  title: string;
  icon: string;
  children: ReactNode;
  defaultOpen?: boolean;
  badge?: string;
  badgeColor?: string;
}

export default function CollapsibleSection({ 
  title, 
  icon, 
  children, 
  defaultOpen = true,
  badge,
  badgeColor = 'emerald'
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const badgeColors: Record<string, string> = {
    emerald: 'text-emerald-400 bg-emerald-500/20',
    amber: 'text-amber-400 bg-amber-500/20',
    indigo: 'text-indigo-400 bg-indigo-500/20',
    purple: 'text-purple-400 bg-purple-500/20',
    cyan: 'text-cyan-400 bg-cyan-500/20',
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left mb-4 group"
      >
        <h2 className="text-lg font-semibold text-gray-300 flex items-center gap-2">
          <span>{icon}</span> {title}
          {badge && (
            <span className={`text-xs px-2 py-0.5 rounded-full ${badgeColors[badgeColor] || badgeColors.emerald}`}>
              {badge}
            </span>
          )}
        </h2>
        <span 
          className={`text-gray-500 group-hover:text-gray-300 transition-all duration-200 ${
            isOpen ? 'rotate-0' : '-rotate-90'
          }`}
        >
          ▼
        </span>
      </button>
      
      <div 
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        {children}
      </div>
    </div>
  );
}
