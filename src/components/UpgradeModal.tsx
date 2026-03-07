'use client';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FEATURES = [
  { icon: '⚧️', label: 'Gender-specific health insights' },
  { icon: '⏳', label: 'Extended life expectancy data' },
  { icon: '🎯', label: 'Personalized milestones & projections' },
  { icon: '🌍', label: 'Country comparisons & rankings' },
  { icon: '🚫', label: 'Ad-free experience' },
];

export default function UpgradeModal({ isOpen, onClose }: UpgradeModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Upgrade to Premium"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal panel */}
      <div className="relative bg-gray-900 border border-amber-500/30 rounded-2xl w-full max-w-md shadow-2xl z-10 overflow-hidden">
        {/* Decorative gradient bar */}
        <div className="h-1 bg-gradient-to-r from-amber-500 via-orange-400 to-amber-500" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-300 transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-800"
          aria-label="Close"
        >
          ✕
        </button>

        {/* Header */}
        <div className="px-6 pt-6 pb-4 text-center">
          <div className="text-5xl mb-3">⭐</div>
          <h2 className="text-2xl font-bold text-white mb-1">
            LifeStats Premium
          </h2>
          <p className="text-gray-400 text-sm">
            Go beyond averages — get insights built around <em>you</em>
          </p>
        </div>

        {/* Features list */}
        <div className="px-6 pb-4">
          <ul className="space-y-2.5">
            {FEATURES.map((f, i) => (
              <li key={i} className="flex items-center gap-3">
                <span className="w-8 h-8 bg-amber-500/20 border border-amber-500/30 rounded-full flex items-center justify-center text-sm flex-shrink-0">
                  {f.icon}
                </span>
                <span className="text-gray-300 text-sm flex-1">{f.label}</span>
                <span className="text-emerald-400 text-sm font-bold">✓</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Pricing cards */}
        <div className="px-6 pb-2">
          <div className="grid grid-cols-2 gap-3">
            {/* Monthly plan */}
            <a
              href="#"
              data-plan="monthly"
              className="block bg-gray-800 border border-gray-700 hover:border-amber-500/50 rounded-xl p-4 text-center transition-all group"
              onClick={onClose}
            >
              <div className="text-gray-400 text-xs mb-1 uppercase tracking-wider">
                Monthly
              </div>
              <div className="text-3xl font-bold text-white group-hover:text-amber-300 transition-colors">
                $4.99
              </div>
              <div className="text-gray-500 text-xs mb-3">per month</div>
              <div className="bg-amber-500/20 text-amber-400 text-xs px-3 py-1.5 rounded-lg font-semibold border border-amber-500/20">
                Start Free Trial
              </div>
            </a>

            {/* Annual plan */}
            <a
              href="#"
              data-plan="annual"
              className="block bg-gradient-to-br from-amber-500/20 to-orange-500/20 border-2 border-amber-500/60 rounded-xl p-4 text-center relative transition-all hover:border-amber-400 hover:shadow-amber-500/20 hover:shadow-lg"
              onClick={onClose}
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-black text-[10px] font-bold px-3 py-0.5 rounded-full whitespace-nowrap shadow">
                BEST VALUE · SAVE 50%
              </div>
              <div className="text-gray-400 text-xs mb-1 uppercase tracking-wider mt-1">
                Annual
              </div>
              <div className="text-3xl font-bold text-amber-300">$29.99</div>
              <div className="text-gray-400 text-xs mb-3">per year</div>
              <div className="bg-amber-500 text-black text-xs px-3 py-1.5 rounded-lg font-bold shadow">
                Get Annual — Best Value
              </div>
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 pt-3 text-center">
          <p className="text-xs text-gray-600 mb-3">
            Cancel anytime &nbsp;·&nbsp; Secure payment via Stripe
          </p>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-400 text-sm transition-colors"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}
