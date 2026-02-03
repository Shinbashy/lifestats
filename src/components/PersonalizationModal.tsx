'use client';

import { useState } from 'react';

export interface PersonalData {
  // Body
  heightFeet?: number;
  heightInches?: number;
  weightLbs?: number;
  
  // Activity (split into work + exercise)
  workActivity?: 'mostly_sitting' | 'mixed' | 'on_feet' | 'physical_job';
  exerciseFrequency?: 'rarely' | 'light' | 'moderate' | 'intense';
  dailySteps?: number;
  
  // Lifestyle
  sleepHours?: number;
  coffeePerDay?: number;
  alcoholFrequency?: 'never' | 'occasionally' | 'weekly' | 'daily';
  smokerStatus?: 'never' | 'former' | 'current';
  
  // Work
  workStyle?: 'office' | 'hybrid' | 'remote';
  workHoursPerWeek?: number;
  commuteMinutes?: number;
  industry?: string;
  
  // Consent
  acceptedTerms?: boolean;
}

interface PersonalizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (data: PersonalData) => void;
}

const INDUSTRIES = [
  'Technology',
  'Healthcare',
  'Finance',
  'Education',
  'Retail',
  'Manufacturing',
  'Government',
  'Entertainment',
  'Food & Hospitality',
  'Construction',
  'Transportation',
  'Other',
];

export default function PersonalizationModal({ isOpen, onClose, onComplete }: PersonalizationModalProps) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<PersonalData>({});

  if (!isOpen) return null;

  const updateData = (updates: Partial<PersonalData>) => {
    setData(prev => ({ ...prev, ...updates }));
  };

  const handleComplete = () => {
    if (!data.acceptedTerms) {
      alert('Please accept the Terms & Privacy Policy to continue');
      return;
    }
    onComplete(data);
    onClose();
  };

  const canProceed = () => {
    // All fields optional - can always proceed
    return true;
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-gray-700">
        {/* Header */}
        <div className="sticky top-0 bg-gray-900 p-6 border-b border-gray-800">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-white">Personalize Your Stats</h2>
              <p className="text-sm text-gray-400">Get insights tailored to YOU</p>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-white transition-colors text-2xl"
            >
              ×
            </button>
          </div>
          
          {/* Progress bar */}
          <div className="flex gap-2 mt-4">
            {[1, 2, 3].map(s => (
              <div 
                key={s}
                className={`h-1 flex-1 rounded-full transition-colors ${
                  s <= step ? 'bg-indigo-500' : 'bg-gray-700'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="p-6">
          {step === 1 && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-lg font-semibold text-white mb-4">
                <span>👤</span> About Your Body
              </div>

              {/* Height */}
              <div>
                <label className="block text-sm text-gray-400 mb-2">Height</label>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <input
                      type="number"
                      placeholder="5"
                      value={data.heightFeet || ''}
                      onChange={e => updateData({ heightFeet: parseInt(e.target.value) || undefined })}
                      className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500"
                    />
                    <span className="text-xs text-gray-500 mt-1 block">feet</span>
                  </div>
                  <div className="flex-1">
                    <input
                      type="number"
                      placeholder="10"
                      value={data.heightInches || ''}
                      onChange={e => updateData({ heightInches: parseInt(e.target.value) || undefined })}
                      className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500"
                    />
                    <span className="text-xs text-gray-500 mt-1 block">inches</span>
                  </div>
                </div>
              </div>

              {/* Weight */}
              <div>
                <label className="block text-sm text-gray-400 mb-2">Weight</label>
                <div className="flex gap-3 items-center">
                  <input
                    type="number"
                    placeholder="175"
                    value={data.weightLbs || ''}
                    onChange={e => updateData({ weightLbs: parseInt(e.target.value) || undefined })}
                    className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500"
                  />
                  <span className="text-gray-400">lbs</span>
                </div>
              </div>

              {/* Work Activity */}
              <div>
                <label className="block text-sm text-gray-400 mb-2">During work, you&apos;re usually...</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { value: 'mostly_sitting', label: '🪑 Mostly sitting', desc: 'Desk/computer work' },
                    { value: 'mixed', label: '🧍 Mix sit/stand', desc: 'Standing desk, some moving' },
                    { value: 'on_feet', label: '🚶 On your feet', desc: 'Retail, teaching, etc.' },
                    { value: 'physical_job', label: '🏗️ Physical job', desc: 'Construction, warehouse' },
                  ].map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => updateData({ workActivity: opt.value as PersonalData['workActivity'] })}
                      className={`p-3 rounded-xl text-left transition-all ${
                        data.workActivity === opt.value
                          ? 'bg-indigo-500/30 border-2 border-indigo-500'
                          : 'bg-gray-800 border border-gray-700 hover:border-gray-600'
                      }`}
                    >
                      <div className="font-medium text-white text-sm">{opt.label}</div>
                      <div className="text-xs text-gray-400">{opt.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Exercise Frequency */}
              <div>
                <label className="block text-sm text-gray-400 mb-2">Exercise habits</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { value: 'rarely', label: '😴 Rarely/never', desc: 'Less than 1x/week' },
                    { value: 'light', label: '🚶 Light', desc: '1-2x per week' },
                    { value: 'moderate', label: '🏃 Moderate', desc: '3-4x per week' },
                    { value: 'intense', label: '💪 Intense', desc: '5+ times per week' },
                  ].map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => updateData({ exerciseFrequency: opt.value as PersonalData['exerciseFrequency'] })}
                      className={`p-3 rounded-xl text-left transition-all ${
                        data.exerciseFrequency === opt.value
                          ? 'bg-indigo-500/30 border-2 border-indigo-500'
                          : 'bg-gray-800 border border-gray-700 hover:border-gray-600'
                      }`}
                    >
                      <div className="font-medium text-white text-sm">{opt.label}</div>
                      <div className="text-xs text-gray-400">{opt.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Daily Steps */}
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Daily Steps <span className="text-gray-500">(if you track them)</span>
                </label>
                <div className="flex gap-3 items-center">
                  <input
                    type="number"
                    min="0"
                    step="500"
                    placeholder="8000"
                    value={data.dailySteps || ''}
                    onChange={e => updateData({ dailySteps: parseInt(e.target.value) || undefined })}
                    className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500"
                  />
                  <span className="text-gray-400">steps/day</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Check your phone&apos;s health app or fitness tracker</p>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-lg font-semibold text-white mb-4">
                <span>🌙</span> Your Lifestyle
              </div>

              {/* Sleep */}
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Average Sleep <span className="text-white">{data.sleepHours || 7} hours/night</span>
                </label>
                <input
                  type="range"
                  min="4"
                  max="12"
                  step="0.5"
                  value={data.sleepHours || 7}
                  onChange={e => updateData({ sleepHours: parseFloat(e.target.value) })}
                  className="w-full accent-indigo-500"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>4h</span>
                  <span>12h</span>
                </div>
              </div>

              {/* Coffee */}
              <div>
                <label className="block text-sm text-gray-400 mb-2">Daily Coffee/Caffeine</label>
                <div className="flex gap-2">
                  {[
                    { value: 0, label: 'None ❌' },
                    { value: 1, label: '1-2 ☕' },
                    { value: 3, label: '3-4 ☕☕' },
                    { value: 5, label: '5+ ☕☕☕' },
                  ].map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => updateData({ coffeePerDay: opt.value })}
                      className={`flex-1 py-2 px-3 rounded-xl text-sm transition-all ${
                        data.coffeePerDay === opt.value
                          ? 'bg-indigo-500/30 border-2 border-indigo-500 text-white'
                          : 'bg-gray-800 border border-gray-700 text-gray-300 hover:border-gray-600'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Alcohol */}
              <div>
                <label className="block text-sm text-gray-400 mb-2">Alcohol Consumption</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { value: 'never', label: 'Never 🚫' },
                    { value: 'occasionally', label: 'Occasionally 🍷' },
                    { value: 'weekly', label: 'Weekly 🍺' },
                    { value: 'daily', label: 'Daily 🥃' },
                  ].map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => updateData({ alcoholFrequency: opt.value as PersonalData['alcoholFrequency'] })}
                      className={`py-2 px-3 rounded-xl text-sm transition-all ${
                        data.alcoholFrequency === opt.value
                          ? 'bg-indigo-500/30 border-2 border-indigo-500 text-white'
                          : 'bg-gray-800 border border-gray-700 text-gray-300 hover:border-gray-600'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Smoker */}
              <div>
                <label className="block text-sm text-gray-400 mb-2">Smoking Status</label>
                <div className="flex gap-2">
                  {[
                    { value: 'never', label: 'Never 💚' },
                    { value: 'former', label: 'Former 🔄' },
                    { value: 'current', label: 'Current 🚬' },
                  ].map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => updateData({ smokerStatus: opt.value as PersonalData['smokerStatus'] })}
                      className={`flex-1 py-2 px-3 rounded-xl text-sm transition-all ${
                        data.smokerStatus === opt.value
                          ? 'bg-indigo-500/30 border-2 border-indigo-500 text-white'
                          : 'bg-gray-800 border border-gray-700 text-gray-300 hover:border-gray-600'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-lg font-semibold text-white mb-4">
                <span>💼</span> Work & Life
              </div>

              {/* Work Style */}
              <div>
                <label className="block text-sm text-gray-400 mb-2">Work Style</label>
                <div className="flex gap-2">
                  {[
                    { value: 'office', label: '🏢 Office' },
                    { value: 'hybrid', label: '🔀 Hybrid' },
                    { value: 'remote', label: '🏠 Remote' },
                  ].map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => {
                        updateData({ 
                          workStyle: opt.value as PersonalData['workStyle'],
                          // Auto-set commute to 0 for remote
                          ...(opt.value === 'remote' ? { commuteMinutes: 0 } : {})
                        });
                      }}
                      className={`flex-1 py-3 px-3 rounded-xl text-sm transition-all ${
                        data.workStyle === opt.value
                          ? 'bg-indigo-500/30 border-2 border-indigo-500 text-white'
                          : 'bg-gray-800 border border-gray-700 text-gray-300 hover:border-gray-600'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Work Hours */}
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Work Hours <span className="text-white">{data.workHoursPerWeek || 40} hrs/week</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="80"
                  step="5"
                  value={data.workHoursPerWeek || 40}
                  onChange={e => updateData({ workHoursPerWeek: parseInt(e.target.value) })}
                  className="w-full accent-indigo-500"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>0h</span>
                  <span>80h</span>
                </div>
              </div>

              {/* Commute */}
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Daily Commute (round trip)
                  {data.workStyle === 'remote' && (
                    <span className="text-emerald-400 ml-2">✓ Remote - no commute!</span>
                  )}
                </label>
                <div className="flex gap-3 items-center">
                  <input
                    type="number"
                    min="0"
                    placeholder="0"
                    value={data.commuteMinutes !== undefined ? data.commuteMinutes : ''}
                    onChange={e => {
                      const val = e.target.value;
                      updateData({ commuteMinutes: val === '' ? undefined : parseInt(val) });
                    }}
                    className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500"
                  />
                  <span className="text-gray-400">minutes</span>
                </div>
                {data.workStyle !== 'remote' && (
                  <p className="text-xs text-gray-500 mt-1">Enter 0 if you work from home</p>
                )}
              </div>

              {/* Industry */}
              <div>
                <label className="block text-sm text-gray-400 mb-2">Industry</label>
                <select
                  value={data.industry || ''}
                  onChange={e => updateData({ industry: e.target.value || undefined })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="">Select industry...</option>
                  {INDUSTRIES.map(ind => (
                    <option key={ind} value={ind}>{ind}</option>
                  ))}
                </select>
              </div>

              {/* Terms Checkbox */}
              <div className="pt-4 border-t border-gray-800">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={data.acceptedTerms || false}
                    onChange={e => updateData({ acceptedTerms: e.target.checked })}
                    className="mt-1 w-5 h-5 rounded border-gray-600 bg-gray-800 text-indigo-500 focus:ring-indigo-500"
                  />
                  <span className="text-sm text-gray-400">
                    I agree to the{' '}
                    <a href="#" className="text-indigo-400 hover:underline">Terms of Service</a>
                    {' '}and{' '}
                    <a href="#" className="text-indigo-400 hover:underline">Privacy Policy</a>
                  </span>
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-900 p-6 border-t border-gray-800 flex justify-between">
          <button
            onClick={() => step > 1 ? setStep(step - 1) : onClose()}
            className="px-6 py-2 rounded-xl text-gray-400 hover:text-white transition-colors"
          >
            {step > 1 ? '← Back' : 'Skip'}
          </button>
          
          {step < 3 ? (
            <button
              onClick={() => setStep(step + 1)}
              disabled={!canProceed()}
              className="btn-primary px-6 py-2 rounded-xl font-semibold text-white disabled:opacity-50"
            >
              Next →
            </button>
          ) : (
            <button
              onClick={handleComplete}
              disabled={!data.acceptedTerms}
              className="btn-primary px-6 py-2 rounded-xl font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ✨ See My Personal Stats
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
