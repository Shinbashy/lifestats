'use client';

interface BirthdayCountdownProps {
  daysUntilBirthday: number;
  nextAge: number;
}

export default function BirthdayCountdown({ daysUntilBirthday, nextAge }: BirthdayCountdownProps) {
  const isToday = daysUntilBirthday === 0;
  
  return (
    <div className="stat-card rounded-2xl p-5 text-center">
      {isToday ? (
        <>
          <div className="text-4xl mb-2">🎂</div>
          <div className="text-2xl font-bold gradient-text mb-1">Happy Birthday!</div>
          <div className="text-gray-400">You turn {nextAge} today!</div>
        </>
      ) : (
        <>
          <div className="text-3xl mb-2">🎁</div>
          <div className="text-4xl font-bold text-white mb-1">{daysUntilBirthday}</div>
          <div className="text-sm text-gray-400">
            days until you turn <span className="text-indigo-400 font-semibold">{nextAge}</span>
          </div>
        </>
      )}
    </div>
  );
}
