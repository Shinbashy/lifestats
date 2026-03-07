'use client';

import { ReactNode } from 'react';

interface PremiumGateProps {
  children: ReactNode;
  featureLabel?: string;
  isPremium?: boolean;
  onUpgrade?: () => void;
}

export default function PremiumGate({
  children,
  featureLabel = 'Premium Feature',
  isPremium = false,
  onUpgrade,
}: PremiumGateProps) {
  if (isPremium) return <>{children}</>;

  return (
    <div className="relative rounded-xl overflow-hidden">
      {/* Blurred content preview */}
      <div
        className="blur-[8px] select-none pointer-events-none opacity-60"
        aria-hidden="true"
      >
        {children}
      </div>

      {/* Lock overlay */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer z-10"
        onClick={onUpgrade}
        role="button"
        aria-label={`Unlock ${featureLabel}`}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-gray-900/10" />
        <div className="relative z-10 text-center px-6 py-8">
          <div className="w-16 h-16 bg-amber-500/20 border-2 border-amber-500/50 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
            <span className="text-3xl">🔒</span>
          </div>
          <div className="text-amber-400 font-semibold text-xs mb-1 tracking-wider uppercase">
            ★ Premium Feature
          </div>
          <div className="text-white font-bold text-xl mb-1">{featureLabel}</div>
          <div className="text-gray-400 text-sm mb-5">
            Unlock deeper insights into your life journey
          </div>
          <button
            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-semibold px-7 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105 text-sm"
            onClick={(e) => {
              e.stopPropagation();
              onUpgrade?.();
            }}
          >
            Unlock for $4.99/month →
          </button>
        </div>
      </div>
    </div>
  );
}
