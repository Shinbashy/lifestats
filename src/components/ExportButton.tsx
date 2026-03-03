'use client';

import { useState } from 'react';
import { LifeStats, GenderStats, Gender, Country } from '@/lib/calculations';

// TODO: Wire to Stripe subscription check when premium tier launches
const isPremium = true; // Currently free — gate this when Stripe is live

interface ExportButtonProps {
  stats: LifeStats;
  genderStats?: GenderStats | null;
  birthday: Date;
  gender?: Gender;
  country?: Country;
}

export default function ExportButton({
  stats,
  genderStats,
  birthday,
  gender,
  country,
}: ExportButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleExport = async () => {
    if (!isPremium) {
      setError('PDF export is a premium feature. Upgrade to unlock!');
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const { generateLifeStatsPDF } = await import('@/lib/generate-pdf');
      await generateLifeStatsPDF({
        stats,
        genderStats,
        birthday,
        gender,
        country,
      });
    } catch (err) {
      console.error('PDF generation failed:', err);
      setError('Failed to generate PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={handleExport}
        disabled={isGenerating}
        className={`
          flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white
          transition-all duration-200 shadow-lg
          ${
            isGenerating
              ? 'bg-indigo-500/50 cursor-not-allowed opacity-70'
              : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 hover:shadow-indigo-500/30 active:scale-95'
          }
        `}
        title="Download your life stats as a PDF report"
      >
        {isGenerating ? (
          <>
            <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
            Generating PDF...
          </>
        ) : (
          <>
            <span>📄</span>
            Download PDF Report
          </>
        )}
      </button>

      {error && (
        <p className="text-red-400 text-sm">{error}</p>
      )}

      {!isPremium && (
        <p className="text-amber-400 text-xs">
          🔒 Premium feature — upgrade to unlock PDF export
        </p>
      )}
    </div>
  );
}
