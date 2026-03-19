'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface LifePathInfo {
  number: number;
  name: string;
  emoji: string;
  summary: string;
  traits: string[];
  strengths: string[];
  challenges: string[];
  careers: string[];
  famousExamples: string[];
  isMaster: boolean;
  color: string;
}

const LIFE_PATHS: Record<number, LifePathInfo> = {
  1: {
    number: 1, name: 'The Leader', emoji: '👑', isMaster: false,
    color: 'from-orange-500/20 to-red-600/20 border-orange-400/40',
    summary: 'Independent, driven, and original. Life Path 1s are born leaders who forge their own path and inspire others to follow.',
    traits: ['Independent', 'Ambitious', 'Innovative', 'Self-motivated', 'Bold'],
    strengths: ['Natural leadership', 'Originality', 'Determination', 'Confidence'],
    challenges: ['Stubbornness', 'Impatience', 'Tendency toward ego', 'Difficulty delegating'],
    careers: ['Entrepreneur', 'Executive', 'Politician', 'Athlete', 'Inventor'],
    famousExamples: ['Steve Jobs (Feb 24, 1955)', 'Martin Luther King Jr. (Jan 15, 1929)', 'Lady Gaga (Mar 28, 1986)'],
  },
  2: {
    number: 2, name: 'The Mediator', emoji: '🤝', isMaster: false,
    color: 'from-blue-500/20 to-indigo-600/20 border-blue-400/40',
    summary: 'Cooperative, empathetic, and diplomatic. Life Path 2s are natural peacemakers who thrive in partnership and seek balance.',
    traits: ['Diplomatic', 'Intuitive', 'Sensitive', 'Cooperative', 'Supportive'],
    strengths: ['Empathy', 'Conflict resolution', 'Team building', 'Listening skills'],
    challenges: ['Over-sensitivity', 'Indecisiveness', 'Avoidance of conflict', 'Self-doubt'],
    careers: ['Counselor', 'Diplomat', 'Mediator', 'Musician', 'Social worker'],
    famousExamples: ['Barack Obama (Aug 4, 1961)', 'Bill Clinton (Aug 19, 1946)', 'Jennifer Aniston (Feb 11, 1969)'],
  },
  3: {
    number: 3, name: 'The Creative', emoji: '🎨', isMaster: false,
    color: 'from-yellow-500/20 to-orange-600/20 border-yellow-400/40',
    summary: 'Expressive, optimistic, and artistic. Life Path 3s are the communicators and entertainers of numerology — joyful and inspiring.',
    traits: ['Creative', 'Expressive', 'Optimistic', 'Charming', 'Social'],
    strengths: ['Communication', 'Creativity', 'Humor', 'Enthusiasm', 'Inspiration'],
    challenges: ['Scattering energy', 'Moodiness', 'Superficiality', 'Lack of focus'],
    careers: ['Artist', 'Writer', 'Actor', 'Designer', 'Teacher', 'Comedian'],
    famousExamples: ['David Bowie (Jan 8, 1947)', 'Cate Blanchett (May 14, 1969)', 'Shaquille O\'Neal (Mar 6, 1972)'],
  },
  4: {
    number: 4, name: 'The Builder', emoji: '🏗️', isMaster: false,
    color: 'from-green-500/20 to-emerald-600/20 border-green-400/40',
    summary: 'Disciplined, practical, and trustworthy. Life Path 4s are the architects of the world — they build lasting structures through hard work.',
    traits: ['Hardworking', 'Reliable', 'Methodical', 'Loyal', 'Patient'],
    strengths: ['Organization', 'Discipline', 'Trustworthiness', 'Planning', 'Follow-through'],
    challenges: ['Rigidity', 'Stubbornness', 'Workaholic tendencies', 'Resistance to change'],
    careers: ['Engineer', 'Accountant', 'Manager', 'Architect', 'Military officer'],
    famousExamples: ['Oprah Winfrey (Jan 29, 1954)', 'Clint Eastwood (May 31, 1930)', 'Arnold Schwarzenegger (Jul 30, 1947)'],
  },
  5: {
    number: 5, name: 'The Adventurer', emoji: '🌍', isMaster: false,
    color: 'from-teal-500/20 to-cyan-600/20 border-teal-400/40',
    summary: 'Free-spirited, adaptable, and curious. Life Path 5s crave variety, freedom, and new experiences above all else.',
    traits: ['Adventurous', 'Adaptable', 'Charismatic', 'Curious', 'Freedom-loving'],
    strengths: ['Versatility', 'Progressive thinking', 'Communication', 'Enthusiasm for life'],
    challenges: ['Restlessness', 'Commitment issues', 'Impulsiveness', 'Overindulgence'],
    careers: ['Journalist', 'Travel writer', 'Sales', 'Marketer', 'Performer', 'Explorer'],
    famousExamples: ['Angelina Jolie (Jun 4, 1975)', 'Abraham Lincoln (Feb 12, 1809)', 'Mick Jagger (Jul 26, 1943)'],
  },
  6: {
    number: 6, name: 'The Nurturer', emoji: '🌸', isMaster: false,
    color: 'from-pink-500/20 to-rose-600/20 border-pink-400/40',
    summary: 'Compassionate, responsible, and family-oriented. Life Path 6s are natural caregivers who create harmony wherever they go.',
    traits: ['Nurturing', 'Responsible', 'Protective', 'Loving', 'Idealistic'],
    strengths: ['Empathy', 'Commitment', 'Healing', 'Domestic harmony', 'Service'],
    challenges: ['Self-sacrifice', 'Perfectionism', 'Controlling tendencies', 'Martyrdom'],
    careers: ['Doctor', 'Teacher', 'Social worker', 'Counselor', 'Chef', 'Nurse'],
    famousExamples: ['John Lennon (Oct 9, 1940)', 'Albert Einstein (Mar 14, 1879)', 'Michael Jackson (Aug 29, 1958)'],
  },
  7: {
    number: 7, name: 'The Seeker', emoji: '🔭', isMaster: false,
    color: 'from-indigo-500/20 to-violet-600/20 border-indigo-400/40',
    summary: 'Analytical, spiritual, and introspective. Life Path 7s are the deep thinkers and truth-seekers — always searching for meaning beneath the surface.',
    traits: ['Intellectual', 'Introspective', 'Spiritual', 'Analytical', 'Private'],
    strengths: ['Deep thinking', 'Research skills', 'Intuition', 'Wisdom', 'Objectivity'],
    challenges: ['Isolation', 'Skepticism', 'Difficulty in relationships', 'Perfectionism'],
    careers: ['Philosopher', 'Scientist', 'Researcher', 'Analyst', 'Mystic', 'Writer'],
    famousExamples: ['Elon Musk (Jun 28, 1971)', 'Princess Diana (Jul 1, 1961)', 'Stephen Hawking (Jan 8, 1942)'],
  },
  8: {
    number: 8, name: 'The Powerhouse', emoji: '💎', isMaster: false,
    color: 'from-amber-500/20 to-yellow-600/20 border-amber-400/40',
    summary: 'Ambitious, authoritative, and goal-oriented. Life Path 8s are built for success — natural executives with a drive to achieve and accumulate.',
    traits: ['Ambitious', 'Authoritative', 'Confident', 'Goal-oriented', 'Resilient'],
    strengths: ['Leadership', 'Financial acumen', 'Efficiency', 'Determination', 'Strategy'],
    challenges: ['Materialism', 'Workaholic', 'Controlling', 'Difficulty with vulnerability'],
    careers: ['CEO', 'Banker', 'Lawyer', 'Real estate developer', 'Entrepreneur'],
    famousExamples: ['Nelson Mandela (Jul 18, 1918)', 'Pablo Picasso (Oct 25, 1881)', 'Martha Stewart (Aug 3, 1941)'],
  },
  9: {
    number: 9, name: 'The Humanitarian', emoji: '🌏', isMaster: false,
    color: 'from-emerald-500/20 to-teal-600/20 border-emerald-400/40',
    summary: 'Compassionate, wise, and idealistic. Life Path 9s are the old souls of numerology — driven by a deep desire to serve humanity.',
    traits: ['Compassionate', 'Generous', 'Idealistic', 'Wise', 'Artistic'],
    strengths: ['Empathy', 'Humanitarian vision', 'Creativity', 'Tolerance', 'Wisdom'],
    challenges: ['Idealism vs. reality', 'Letting go', 'Emotional intensity', 'Martyrdom'],
    careers: ['Humanitarian', 'Artist', 'Healer', 'Spiritual leader', 'Activist', 'Philosopher'],
    famousExamples: ['Mahatma Gandhi (Oct 2, 1869)', 'Mother Teresa (Aug 26, 1910)', 'Jim Carrey (Jan 17, 1962)'],
  },
  11: {
    number: 11, name: 'The Intuitive — Master 11', emoji: '⚡', isMaster: true,
    color: 'from-purple-500/20 to-violet-600/20 border-purple-400/50',
    summary: 'Highly intuitive, spiritually aware, and visionary. Master 11s bridge the material and spiritual worlds — they are channels for higher wisdom.',
    traits: ['Intuitive', 'Inspirational', 'Empathetic', 'Visionary', 'Idealistic'],
    strengths: ['Spiritual insight', 'Inspiration of others', 'Psychic sensitivity', 'Leadership through example'],
    challenges: ['Anxiety', 'Nervous tension', 'Idealism', 'Feeling different/misunderstood'],
    careers: ['Spiritual teacher', 'Psychologist', 'Artist', 'Healer', 'Inventor', 'Counselor'],
    famousExamples: ['Edgar Allan Poe (Jan 19, 1809)', 'Michelle Obama (Jan 17, 1964)', 'Wolfgang Amadeus Mozart (Jan 27, 1756)'],
  },
  22: {
    number: 22, name: 'The Master Builder — Master 22', emoji: '🏛️', isMaster: true,
    color: 'from-blue-500/20 to-cyan-600/20 border-blue-400/50',
    summary: 'Practical visionary and master manifestor. Master 22s can turn dreams into reality at a global scale — the most powerful life path.',
    traits: ['Visionary', 'Disciplined', 'Charismatic', 'Intuitive', 'Capable'],
    strengths: ['Manifestation', 'Leadership at scale', 'Combining intuition with practicality', 'Legacy-building'],
    challenges: ['Pressure from great potential', 'Fear of failure', 'Perfectionism', 'Overwhelm'],
    careers: ['Visionary leader', 'Architect', 'Global entrepreneur', 'Head of state', 'Philanthropist'],
    famousExamples: ['Bill Gates (Oct 28, 1955)', 'Dalai Lama (Jul 6, 1935)', 'Leonardo da Vinci (Apr 15, 1452)'],
  },
  33: {
    number: 33, name: 'The Master Teacher — Master 33', emoji: '✨', isMaster: true,
    color: 'from-gold-500/20 to-yellow-600/20 border-yellow-300/50',
    summary: 'The rarest master number. Master 33s are devoted to the illumination of all humanity — pure compassion, healing, and spiritual service at the highest level.',
    traits: ['Compassionate', 'Nurturing', 'Self-sacrificing', 'Visionary', 'Healing'],
    strengths: ['Unconditional love', 'Spiritual teaching', 'Healing abilities', 'Creative expression'],
    challenges: ['Self-sacrifice to excess', 'Overwhelming responsibility', 'Emotional depth', 'Rare and demanding path'],
    careers: ['Spiritual teacher', 'Healer', 'Humanitarian leader', 'Therapist', 'Artist'],
    famousExamples: ['Stephen King (Sep 21, 1947)', 'Meryl Streep (Jun 22, 1949)', 'Albert Camus (Nov 7, 1913)'],
  },
};

function reduceToLifePath(birthdate: string): { lifePath: number; steps: string } | null {
  const birth = new Date(birthdate + 'T00:00:00');
  if (isNaN(birth.getTime())) return null;
  const now = new Date();
  if (birth > now) return null;

  const month = birth.getMonth() + 1;
  const day = birth.getDate();
  const year = birth.getFullYear();

  // Format as digits
  const mm = String(month).padStart(2, '0');
  const dd = String(day).padStart(2, '0');
  const yyyy = String(year);

  const allDigits = `${mm}${dd}${yyyy}`;
  let sum = 0;
  for (const d of allDigits) sum += parseInt(d, 10);

  const step1 = `${mm.split('').join('+')}+${dd.split('').join('+')}+${yyyy.split('').join('+')} = ${sum}`;

  // Reduce — check master numbers at each step
  let current = sum;
  const reductions: string[] = [step1];

  while (current > 9 && current !== 11 && current !== 22 && current !== 33) {
    const digits = String(current).split('');
    const newSum = digits.reduce((a, b) => a + parseInt(b, 10), 0);
    reductions.push(`${digits.join('+')} = ${newSum}`);
    current = newSum;
  }

  return { lifePath: current, steps: reductions.join(' → ') };
}

export default function LifePathCalculator() {
  const [birthday, setBirthday] = useState<string>('');
  const [result, setResult] = useState<{ lifePath: number; steps: string; info: LifePathInfo } | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    try {
      const stored = localStorage.getItem('lifestats_birthdate') || localStorage.getItem('lifestats_birthday');
      if (stored) {
        setBirthday(stored);
        const r = reduceToLifePath(stored);
        if (r && LIFE_PATHS[r.lifePath]) {
          setResult({ ...r, info: LIFE_PATHS[r.lifePath] });
        }
      }
    } catch { /* ignore */ }
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const r = reduceToLifePath(birthday);
    if (!r) {
      setError('Please enter a valid past birthdate.');
      setResult(null);
    } else if (!LIFE_PATHS[r.lifePath]) {
      setError('Could not calculate life path number. Please try again.');
      setResult(null);
    } else {
      setError('');
      setResult({ ...r, info: LIFE_PATHS[r.lifePath] });
      try {
        localStorage.setItem('lifestats_birthdate', birthday);
        localStorage.setItem('lifestats_birthday', birthday);
      } catch { /* ignore */ }
    }
  }

  return (
    <div className="space-y-8">
      {/* Input */}
      <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
        <h2 className="text-2xl font-semibold mb-4 text-white">Enter Your Birthdate</h2>
        <div className="flex gap-4 items-end flex-wrap">
          <div className="flex-1 min-w-[200px]">
            <label htmlFor="birthday" className="block text-violet-200 mb-2 text-sm font-medium">
              Date of Birth
            </label>
            <input
              id="birthday"
              type="date"
              value={birthday}
              max={new Date().toISOString().split('T')[0]}
              onChange={(e) => setBirthday(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white text-lg placeholder-white/40 focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-400/30 transition-all [color-scheme:dark]"
            />
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-violet-500 to-purple-500 text-white px-8 py-3 rounded-xl text-lg font-semibold hover:from-violet-600 hover:to-purple-600 transition-all shadow-lg"
          >
            Calculate
          </button>
        </div>
        {error && <p className="mt-3 text-red-400 text-sm">{error}</p>}
      </form>

      {/* Results */}
      {result && (
        <div className="space-y-6">
          {/* Main Number */}
          <div className={`bg-gradient-to-br ${result.info.color} backdrop-blur-sm rounded-2xl p-8 border text-center`}>
            {result.info.isMaster && (
              <p className="text-violet-300 text-sm font-medium uppercase tracking-widest mb-2">⭐ Master Number ⭐</p>
            )}
            <p className="text-violet-300 text-sm font-medium uppercase tracking-wider mb-2">Your Life Path Number</p>
            <p className="text-9xl font-black text-white mb-3">{result.info.emoji}</p>
            <p className="text-8xl font-black text-white mb-2">{result.info.number}</p>
            <p className="text-3xl text-violet-200 font-semibold">{result.info.name}</p>
          </div>

          {/* Calculation Steps */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-5">
            <p className="text-violet-300 text-xs uppercase tracking-wider mb-2">How It Was Calculated</p>
            <p className="text-white font-mono text-sm leading-relaxed">{result.steps}</p>
            {result.info.isMaster && (
              <p className="text-violet-400 text-xs mt-2">Master numbers are NOT reduced further.</p>
            )}
          </div>

          {/* Summary */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <p className="text-violet-200 leading-relaxed">{result.info.summary}</p>
          </div>

          {/* Traits */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-3">🌟 Key Traits</h3>
            <div className="flex flex-wrap gap-2">
              {result.info.traits.map(t => (
                <span key={t} className="bg-violet-500/20 border border-violet-400/30 rounded-full px-4 py-1.5 text-white text-sm">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Strengths & Challenges */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-green-500/10 border border-green-400/30 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-green-300 mb-3">💪 Strengths</h3>
              <ul className="space-y-1">
                {result.info.strengths.map(s => (
                  <li key={s} className="text-green-200 text-sm">✓ {s}</li>
                ))}
              </ul>
            </div>
            <div className="bg-orange-500/10 border border-orange-400/30 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-orange-300 mb-3">⚡ Challenges</h3>
              <ul className="space-y-1">
                {result.info.challenges.map(c => (
                  <li key={c} className="text-orange-200 text-sm">• {c}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Best Careers */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-3">💼 Career Paths</h3>
            <div className="flex flex-wrap gap-2">
              {result.info.careers.map(c => (
                <span key={c} className="bg-white/10 border border-white/20 rounded-lg px-3 py-1.5 text-violet-200 text-sm">
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* Famous Examples */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-3">🌟 Famous Life Path {result.info.number}s</h3>
            <ul className="space-y-1">
              {result.info.famousExamples.map(e => (
                <li key={e} className="text-violet-200 text-sm">• {e}</li>
              ))}
            </ul>
          </div>

          {/* All Life Path Numbers Reference */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">🔢 All Life Path Numbers</h3>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
              {[1,2,3,4,5,6,7,8,9,11,22,33].map(n => {
                const info = LIFE_PATHS[n];
                const isActive = n === result.info.number;
                return (
                  <div
                    key={n}
                    className={`rounded-xl p-3 text-center ${isActive ? 'bg-violet-500/40 border border-violet-400/60' : 'bg-white/5'}`}
                  >
                    <div className="text-xl font-bold text-white">{n}</div>
                    <div className={`text-xs mt-1 ${isActive ? 'text-violet-200 font-semibold' : 'text-violet-400'}`}>
                      {info?.name.split(' — ')[0].replace('The ', '')}
                    </div>
                    {info?.isMaster && <div className="text-yellow-400 text-xs">Master</div>}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-2">
            <Link
              href="/#calculator"
              className="inline-block bg-gradient-to-r from-violet-500 to-purple-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-violet-600 hover:to-purple-600 transition-all shadow-lg"
            >
              See Your Full Life Stats at LifeStats →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
