// src/utils/planner.js

/**
 * past: [{ sgpa: number, credits: number }]
 * remainingSemesters: number
 * targetCgpa: number
 * upcomingCreditsPerSem: number[] (length can equal remainingSemesters, or one number reused)
 */
export function computePlan({ past, remainingSemesters, targetCgpa, upcomingCreditsPerSem }) {
  const completedCredits = past.reduce((a, b) => a + (Number(b.credits) || 0), 0);
  const completedGP = past.reduce((a, b) => a + (Number(b.sgpa) || 0) * (Number(b.credits) || 0), 0);

  let remainingCredits = 0;
  if (Array.isArray(upcomingCreditsPerSem) && upcomingCreditsPerSem.length > 0) {
    remainingCredits = upcomingCreditsPerSem.reduce((a, b) => a + (Number(b) || 0), 0);
  } else {
    // If not provided, assume equal to last semester or 20 each, etc.
    remainingCredits = remainingSemesters * 20;
  }

  const totalCredits = completedCredits + remainingCredits;
  const targetTotalGP = targetCgpa * totalCredits;
  const needGP = targetTotalGP - completedGP;

  const requiredAvgSGPA = remainingCredits > 0 ? needGP / remainingCredits : 0;

  return {
    completedCredits,
    completedGP,
    remainingCredits,
    totalCredits,
    targetTotalGP,
    needGP,
    requiredAvgSGPA: Math.max(0, Math.min(10, requiredAvgSGPA)),
  };
}
