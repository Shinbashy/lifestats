// generate-pdf.ts — LifeStats PDF Export
// TODO: Wire to Stripe subscription check when premium tier launches
// const isPremium = true; // Currently free — gate this when Stripe is live

import { LifeStats, GenderStats, Gender, Country, COUNTRY_PROFILES, formatNumber } from './calculations';

export interface PDFExportOptions {
  stats: LifeStats;
  genderStats?: GenderStats | null;
  birthday: Date;
  gender?: Gender;
  country?: Country;
}

function formatBirthday(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function getAgeYears(stats: LifeStats): string {
  return stats.earthOrbits.toFixed(1);
}

function drawProgressBar(
  doc: InstanceType<typeof import('jspdf').jsPDF>,
  x: number,
  y: number,
  width: number,
  height: number,
  percentage: number,
  label: string,
  percentLabel: string
) {
  const clamped = Math.min(100, Math.max(0, percentage));

  // Background bar
  doc.setFillColor(40, 40, 60);
  doc.roundedRect(x, y, width, height, 2, 2, 'F');

  // Filled portion
  if (clamped > 0) {
    const fillWidth = (width * clamped) / 100;
    doc.setFillColor(99, 102, 241); // indigo-500
    doc.roundedRect(x, y, fillWidth, height, 2, 2, 'F');
  }

  // Labels
  doc.setFontSize(8);
  doc.setTextColor(160, 160, 180);
  doc.text(label, x, y - 2);
  doc.text(percentLabel, x + width, y - 2, { align: 'right' });
}

export async function generateLifeStatsPDF(options: PDFExportOptions): Promise<void> {
  // TODO: Wire to Stripe subscription check when premium tier launches
  const isPremium = true; // Currently free — gate this when Stripe is live

  if (!isPremium) {
    throw new Error('PDF export is a premium feature. Please upgrade to download your report.');
  }

  const { stats, genderStats, birthday, gender, country } = options;

  const { jsPDF } = await import('jspdf');
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  const countryProfile = COUNTRY_PROFILES[(country || 'us') as string] || COUNTRY_PROFILES.us;
  const genderLabel = gender === 'male' ? 'Male' : gender === 'female' ? 'Female' : null;

  // ─── Helper: check page break ───────────────────────────────────────────────
  function checkPageBreak(neededHeight: number = 20) {
    if (y + neededHeight > pageHeight - 20) {
      doc.addPage();
      y = margin;
    }
  }

  // ─── Helper: section header ──────────────────────────────────────────────────
  function sectionHeader(title: string, icon: string) {
    checkPageBreak(14);
    doc.setFillColor(30, 30, 50);
    doc.rect(margin, y, contentWidth, 9, 'F');
    doc.setFontSize(10);
    doc.setTextColor(160, 130, 255);
    doc.setFont('helvetica', 'bold');
    doc.text(`${icon}  ${title}`, margin + 3, y + 6);
    doc.setFont('helvetica', 'normal');
    y += 13;
  }

  // ─── Helper: stat row ────────────────────────────────────────────────────────
  function statRow(label: string, value: string, col: 'left' | 'right' | 'full' = 'full') {
    checkPageBreak(7);
    const colWidth = (contentWidth - 6) / 2;
    const xLeft = margin;
    const xRight = margin + colWidth + 6;

    if (col === 'full') {
      doc.setFontSize(9);
      doc.setTextColor(150, 150, 170);
      doc.text(label, xLeft, y);
      doc.setTextColor(230, 230, 255);
      doc.setFont('helvetica', 'bold');
      doc.text(value, xLeft + contentWidth / 2, y, { align: 'left' });
      doc.setFont('helvetica', 'normal');
      y += 6;
    } else {
      const x = col === 'left' ? xLeft : xRight;
      doc.setFontSize(9);
      doc.setTextColor(150, 150, 170);
      doc.text(label, x, y);
      doc.setTextColor(230, 230, 255);
      doc.setFont('helvetica', 'bold');
      doc.text(value, x + colWidth - 2, y, { align: 'right' });
      doc.setFont('helvetica', 'normal');
    }
  }

  // ─── PAGE BACKGROUND ─────────────────────────────────────────────────────────
  doc.setFillColor(15, 15, 30);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // ─── HEADER ──────────────────────────────────────────────────────────────────
  // Gradient-ish header block
  doc.setFillColor(40, 30, 80);
  doc.rect(0, 0, pageWidth, 38, 'F');

  // Title
  doc.setFontSize(26);
  doc.setTextColor(200, 180, 255);
  doc.setFont('helvetica', 'bold');
  doc.text('Your Life Statistics', pageWidth / 2, 16, { align: 'center' });

  // Subtitle line
  doc.setFontSize(10);
  doc.setTextColor(140, 120, 200);
  doc.setFont('helvetica', 'normal');
  const subtitleParts: string[] = [];
  subtitleParts.push(`Born: ${formatBirthday(birthday)}`);
  if (genderLabel) subtitleParts.push(genderLabel);
  subtitleParts.push(countryProfile.flag + ' ' + countryProfile.name);
  doc.text(subtitleParts.join('  •  '), pageWidth / 2, 24, { align: 'center' });

  // Age line
  doc.setFontSize(11);
  doc.setTextColor(180, 160, 255);
  doc.setFont('helvetica', 'bold');
  doc.text(`Age: ${getAgeYears(stats)} years`, pageWidth / 2, 32, { align: 'center' });
  doc.setFont('helvetica', 'normal');

  y = 44;

  // ─── LIFE PROGRESS ───────────────────────────────────────────────────────────
  sectionHeader('Life Progress', '📊');
  checkPageBreak(20);

  const lifePercent = Math.min(100, stats.lifespanPercentage);
  const genderPercent = genderStats
    ? Math.min(100, genderStats.adjustedLifespanPercentage)
    : null;

  drawProgressBar(
    doc,
    margin,
    y,
    contentWidth,
    7,
    lifePercent,
    'Life Journey (country average)',
    `${lifePercent.toFixed(1)}%`
  );
  y += 13;

  if (genderPercent !== null && genderStats) {
    drawProgressBar(
      doc,
      margin,
      y,
      contentWidth,
      7,
      genderPercent,
      `Life Journey (${genderLabel} adjusted, ${genderStats.adjustedLifeExpectancy} yr expectancy)`,
      `${genderPercent.toFixed(1)}%`
    );
    y += 13;
  }

  // Life in Weeks summary
  checkPageBreak(10);
  doc.setFontSize(9);
  doc.setTextColor(150, 150, 170);
  const liw = stats.lifeInWeeks;
  doc.text(
    `Life in Weeks: ${liw.totalWeeksLived.toLocaleString()} lived  /  ${liw.weeksRemaining.toLocaleString()} remaining  /  ${liw.totalWeeksExpected.toLocaleString()} expected total`,
    margin,
    y
  );
  y += 10;

  // ─── KEY STATS ───────────────────────────────────────────────────────────────
  sectionHeader('Key Numbers', '✨');

  // Two-column stat rows — time
  const colWidth = (contentWidth - 6) / 2;
  const rows: [string, string, string, string][] = [
    ['Days Alive', stats.daysAlive.toLocaleString(), 'Hours Alive', formatNumber(stats.hoursAlive)],
    ['Weeks Alive', stats.weeksAlive.toLocaleString(), 'Earth Orbits', stats.earthOrbits.toFixed(2)],
    ['Seconds Alive', formatNumber(stats.secondsAlive), 'Full Moons', stats.fullMoons.toLocaleString()],
  ];

  for (const [l1, v1, l2, v2] of rows) {
    checkPageBreak(7);
    const xLeft = margin;
    const xRight = margin + colWidth + 6;

    doc.setFontSize(9);
    doc.setTextColor(150, 150, 170);
    doc.text(l1, xLeft, y);
    doc.setTextColor(230, 230, 255);
    doc.setFont('helvetica', 'bold');
    doc.text(v1, xLeft + colWidth - 2, y, { align: 'right' });
    doc.setFont('helvetica', 'normal');

    doc.setTextColor(150, 150, 170);
    doc.text(l2, xRight, y);
    doc.setTextColor(230, 230, 255);
    doc.setFont('helvetica', 'bold');
    doc.text(v2, xRight + colWidth - 2, y, { align: 'right' });
    doc.setFont('helvetica', 'normal');

    y += 6;
  }

  // ─── BODY STATS ──────────────────────────────────────────────────────────────
  y += 2;
  sectionHeader('Your Body', '🧬');

  const bodyRows: [string, string, string, string][] = [
    ['Heartbeats', formatNumber(stats.heartbeats), 'Breaths Taken', formatNumber(stats.breaths)],
    ['Blinks', formatNumber(stats.blinks), 'Hours Slept', formatNumber(stats.sleepHours)],
    ['Blood Pumped', `${formatNumber(stats.bloodPumpedGallons)} gal`, 'Dreams Had', formatNumber(stats.dreamsHad)],
    ['Hair Grown', `${stats.hairGrownInches.toFixed(1)} in`, 'Skin Cells Shed', formatNumber(stats.skinCellsShed)],
    ['Times Laughed', formatNumber(stats.timesLaughed), 'Yawns', formatNumber(stats.yawns)],
    ['Red Blood Cells', formatNumber(stats.redBloodCellsProduced), 'Saliva Produced', `${stats.salivaProducedLiters.toLocaleString()} L`],
  ];

  for (const [l1, v1, l2, v2] of bodyRows) {
    checkPageBreak(7);
    const xLeft = margin;
    const xRight = margin + colWidth + 6;

    doc.setFontSize(9);
    doc.setTextColor(150, 150, 170);
    doc.text(l1, xLeft, y);
    doc.setTextColor(230, 230, 255);
    doc.setFont('helvetica', 'bold');
    doc.text(v1, xLeft + colWidth - 2, y, { align: 'right' });
    doc.setFont('helvetica', 'normal');

    doc.setTextColor(150, 150, 170);
    doc.text(l2, xRight, y);
    doc.setTextColor(230, 230, 255);
    doc.setFont('helvetica', 'bold');
    doc.text(v2, xRight + colWidth - 2, y, { align: 'right' });
    doc.setFont('helvetica', 'normal');

    y += 6;
  }

  // ─── GENDER STATS ────────────────────────────────────────────────────────────
  if (genderStats && genderLabel) {
    y += 2;
    sectionHeader(`${genderLabel} Biology`, gender === 'male' ? '♂' : '♀');

    const gRows: [string, string, string, string][] = [
      [
        'Life Expectancy',
        `${genderStats.adjustedLifeExpectancy} years`,
        'Adjusted Heartbeats',
        formatNumber(genderStats.adjustedHeartbeats),
      ],
      [
        'Calories Burned',
        formatNumber(genderStats.caloriesBurned),
        'Red Blood Cells',
        formatNumber(genderStats.redBloodCellsProduced),
      ],
    ];

    if (gender === 'female' && genderStats.menstrualCycles !== undefined) {
      gRows.push([
        'Menstrual Cycles',
        genderStats.menstrualCycles.toLocaleString(),
        'Eggs Released',
        (genderStats.eggsReleased || 0).toLocaleString(),
      ]);
    }

    if (gender === 'male' && genderStats.testosteroneCycles !== undefined) {
      gRows.push([
        'Testosterone Cycles',
        genderStats.testosteroneCycles.toLocaleString(),
        'Facial Hair Grown',
        `${genderStats.facialHairGrown?.toFixed(1) || '0'} in`,
      ]);
    }

    for (const [l1, v1, l2, v2] of gRows) {
      checkPageBreak(7);
      const xLeft = margin;
      const xRight = margin + colWidth + 6;

      doc.setFontSize(9);
      doc.setTextColor(150, 150, 170);
      doc.text(l1, xLeft, y);
      doc.setTextColor(230, 230, 255);
      doc.setFont('helvetica', 'bold');
      doc.text(v1, xLeft + colWidth - 2, y, { align: 'right' });
      doc.setFont('helvetica', 'normal');

      doc.setTextColor(150, 150, 170);
      doc.text(l2, xRight, y);
      doc.setTextColor(230, 230, 255);
      doc.setFont('helvetica', 'bold');
      doc.text(v2, xRight + colWidth - 2, y, { align: 'right' });
      doc.setFont('helvetica', 'normal');

      y += 6;
    }
  }

  // ─── BIRTHDAY COUNTDOWN ──────────────────────────────────────────────────────
  y += 2;
  sectionHeader('Birthday Countdown', '🎂');
  checkPageBreak(10);

  doc.setFontSize(10);
  doc.setTextColor(200, 160, 255);
  doc.setFont('helvetica', 'bold');
  doc.text(
    `${stats.daysUntilBirthday} day${stats.daysUntilBirthday === 1 ? '' : 's'} until your ${stats.nextBirthdayAge}${ordinal(stats.nextBirthdayAge)} birthday!`,
    margin,
    y
  );
  doc.setFont('helvetica', 'normal');
  y += 8;

  // ─── COSMIC JOURNEY ──────────────────────────────────────────────────────────
  sectionHeader('Cosmic Journey', '🚀');

  const cosmicRows: [string, string, string, string][] = [
    ['Miles Through Space', formatNumber(stats.milesThroughSpace), 'Solar Eclipses', stats.solarEclipses.toLocaleString()],
    ['Seasons Experienced', stats.seasonsExperienced.toLocaleString(), 'Leap Years', stats.leapYears.toLocaleString()],
    ['Lunar Eclipses', stats.lunarEclipses.toLocaleString(), 'New Moons', stats.newMoons.toLocaleString()],
  ];

  for (const [l1, v1, l2, v2] of cosmicRows) {
    checkPageBreak(7);
    const xLeft = margin;
    const xRight = margin + colWidth + 6;

    doc.setFontSize(9);
    doc.setTextColor(150, 150, 170);
    doc.text(l1, xLeft, y);
    doc.setTextColor(230, 230, 255);
    doc.setFont('helvetica', 'bold');
    doc.text(v1, xLeft + colWidth - 2, y, { align: 'right' });
    doc.setFont('helvetica', 'normal');

    doc.setTextColor(150, 150, 170);
    doc.text(l2, xRight, y);
    doc.setTextColor(230, 230, 255);
    doc.setFont('helvetica', 'bold');
    doc.text(v2, xRight + colWidth - 2, y, { align: 'right' });
    doc.setFont('helvetica', 'normal');

    y += 6;
  }

  // ─── MILESTONE BADGES ────────────────────────────────────────────────────────
  if (stats.isInBillionClub || stats.isIn10kClub) {
    y += 2;
    sectionHeader('Milestone Clubs', '🏆');
    checkPageBreak(10);

    doc.setFontSize(10);
    if (stats.isInBillionClub) {
      doc.setTextColor(255, 215, 0);
      doc.setFont('helvetica', 'bold');
      doc.text('★  BILLION SECONDS CLUB — You have lived over 1,000,000,000 seconds!', margin, y);
      doc.setFont('helvetica', 'normal');
      y += 7;
    }
    if (stats.isIn10kClub) {
      doc.setTextColor(80, 220, 140);
      doc.setFont('helvetica', 'bold');
      doc.text('★  10,000 DAYS CLUB — You have lived over 10,000 days!', margin, y);
      doc.setFont('helvetica', 'normal');
      y += 7;
    }
  }

  // ─── FUN FACTS ───────────────────────────────────────────────────────────────
  y += 2;
  sectionHeader('Fun Facts', '💡');
  checkPageBreak(10);

  const facts = [
    `You have walked approximately ${formatNumber(stats.stepsWalked)} steps (${Math.floor(stats.stepsWalked / 2000).toLocaleString()} miles).`,
    `You have eaten around ${stats.mealsEaten.toLocaleString()} meals.`,
    `You have spoken roughly ${(stats.wordsSpoken / 1_000_000).toFixed(1)}M words — enough for ${Math.floor(stats.wordsSpoken / 80000).toLocaleString()} novels.`,
    `Your hair has grown ${(stats.hairGrownInches / 12).toFixed(1)} feet total.`,
    `You have slept for ${(stats.sleepHours / 24 / 365.25).toFixed(1)} years of your life.`,
  ];

  for (const fact of facts) {
    checkPageBreak(8);
    doc.setFontSize(8.5);
    doc.setTextColor(180, 180, 200);
    const lines = doc.splitTextToSize(`• ${fact}`, contentWidth);
    for (const line of lines) {
      checkPageBreak(6);
      doc.text(line, margin, y);
      y += 5.5;
    }
  }

  // ─── FOOTER ──────────────────────────────────────────────────────────────────
  const totalPages = (doc.internal as { pages: unknown[] }).pages.length - 1;
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);

    // Footer background
    doc.setFillColor(20, 20, 40);
    doc.rect(0, pageHeight - 12, pageWidth, 12, 'F');

    doc.setFontSize(7.5);
    doc.setTextColor(100, 100, 130);
    doc.text('Generated by getlifestats.com', margin, pageHeight - 5);
    doc.text(
      `Page ${i} of ${totalPages}  •  ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`,
      pageWidth - margin,
      pageHeight - 5,
      { align: 'right' }
    );

    // Re-apply dark background on new pages
    if (i > 1) {
      doc.setFillColor(15, 15, 30);
      doc.rect(0, 0, pageWidth, pageHeight - 12, 'F');
    }
  }

  // ─── SAVE ────────────────────────────────────────────────────────────────────
  const ageYears = Math.floor(stats.earthOrbits);
  const filename = `lifestats-${ageYears}yo-${new Date().toISOString().slice(0, 10)}.pdf`;
  doc.save(filename);
}

function ordinal(n: number): string {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return s[(v - 20) % 10] || s[v] || s[0];
}
