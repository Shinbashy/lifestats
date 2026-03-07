'use client';

import { useState, useEffect } from 'react';

interface UpgradeBannerProps {
  onUpgrade: () => void;
}

export default function UpgradeBanner({ onUpgrade }: UpgradeBannerProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem('lifestats_banner_dismissed');
    if (!dismissed) {
      setVisible(true);
    }
  }, []);

  const dismiss = () => {
    sessionStorage.setItem('lifestats_banner_dismissed', '1');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 px-3 pb-3 md:px-4 md:pb-4 pointer-events-none">
      <div className="max-w-2xl mx-auto pointer-events-auto">
        <div className="bg-gradient-to-r from-amber-700/95 to-orange-700/95 backdrop-blur-md rounded-2xl px-4 py-3 flex items-center gap-3 shadow-2xl border border-amber-500/40">
          <span className="text-2xl flex-shrink-0">⭐</span>

          <div className="flex-1 min-w-0">
            <p className="text-white font-semibold text-sm leading-tight">
              Unlock 15+ premium stats —{' '}
              <span className="text-amber-200">$4.99/month</span>
            </p>
            <p className="text-amber-200/70 text-xs mt-0.5 hidden sm:block">
              Gender insights, extended life expectancy &amp; more
            </p>
          </div>

          <button
            onClick={onUpgrade}
            className="bg-white text-amber-700 font-bold text-sm px-4 py-1.5 rounded-xl hover:bg-amber-50 active:bg-amber-100 transition-colors flex-shrink-0 shadow"
          >
            Unlock
          </button>

          <button
            onClick={dismiss}
            className="text-amber-200/60 hover:text-white transition-colors flex-shrink-0 text-lg leading-none w-7 h-7 flex items-center justify-center rounded-full hover:bg-amber-800/40"
            aria-label="Dismiss banner"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}
