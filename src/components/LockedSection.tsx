'use client';

import { ReactNode } from 'react';

type LockTier = 'free' | 'account' | 'premium';

interface LockedSectionProps {
  title: string;
  icon: string;
  tier: LockTier;
  isUnlocked: boolean;
  children: ReactNode;
  badge?: string;
  badgeColor?: string;
  previewLines?: number;
}

export default function LockedSection({
  title,
  icon,
  tier,
  isUnlocked,
  children,
  badge,
  badgeColor = 'emerald',
  previewLines = 3,
}: LockedSectionProps) {
  const badgeColors: Record<string, string> = {
    emerald: 'text-emerald-400 bg-emerald-500/20',
    amber: 'text-amber-400 bg-amber-500/20',
    indigo: 'text-indigo-400 bg-indigo-500/20',
    purple: 'text-purple-400 bg-purple-500/20',
    cyan: 'text-cyan-400 bg-cyan-500/20',
  };

  const tierConfig = {
    account: {
      label: 'Free Account',
      labelColor: 'text-blue-400 bg-blue-500/20 border-blue-500/30',
      icon: '🔓',
      cta: 'Create a free account to unlock',
      ctaButton: 'Sign Up Free',
      ctaColor: 'bg-blue-600 hover:bg-blue-500',
      glowColor: 'from-blue-500/20',
    },
    premium: {
      label: 'Premium',
      labelColor: 'text-amber-400 bg-amber-500/20 border-amber-500/30',
      icon: '⭐',
      cta: 'Unlock with Premium',
      ctaButton: 'Get Premium — $9.99',
      ctaColor: 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500',
      glowColor: 'from-amber-500/20',
    },
    free: {
      label: '',
      labelColor: '',
      icon: '',
      cta: '',
      ctaButton: '',
      ctaColor: '',
      glowColor: '',
    },
  };

  const config = tierConfig[tier];

  if (isUnlocked || tier === 'free') {
    return <>{children}</>;
  }

  return (
    <div className="relative">
      {/* Section header */}
      <div className="w-full flex items-center justify-between text-left mb-4">
        <h2 className="text-lg font-semibold text-gray-300 flex items-center gap-2">
          <span>{icon}</span> {title}
          {badge && (
            <span className={`text-xs px-2 py-0.5 rounded-full ${badgeColors[badgeColor] || badgeColors.emerald}`}>
              {badge}
            </span>
          )}
          <span className={`text-[10px] px-2 py-0.5 rounded-full border ${config.labelColor}`}>
            {config.icon} {config.label}
          </span>
        </h2>
      </div>

      {/* Blurred preview */}
      <div className="relative overflow-hidden rounded-xl">
        {/* Fake content that gets blurred */}
        <div className="blur-[6px] select-none pointer-events-none opacity-60" aria-hidden="true">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {Array.from({ length: previewLines }).map((_, i) => (
              <div key={i} className="bg-gray-800/60 rounded-xl p-4 border border-gray-700/50">
                <div className="text-xs text-gray-500 mb-1">
                  {['Loading...', 'Calculating...', 'Unlocked stat', 'Your data', 'Personalized', 'Detailed'][i % 6]}
                </div>
                <div className="text-2xl font-bold text-gray-300">
                  {['42,847', '1.2M', '847K', '12,456', '3.7B', '98.6°'][i % 6]}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Overlay CTA */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className={`absolute inset-0 bg-gradient-to-t ${config.glowColor} to-transparent opacity-40`} />
          <div className="relative z-10 text-center px-4">
            <div className="text-3xl mb-2">{config.icon === '🔓' ? '🔒' : '⭐'}</div>
            <p className="text-sm text-gray-400 mb-3">{config.cta}</p>
            <button className={`px-6 py-2.5 rounded-lg text-white text-sm font-semibold transition-all shadow-lg hover:shadow-xl hover:scale-105 ${config.ctaColor}`}>
              {config.ctaButton}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
