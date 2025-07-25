// src/utils/sgpa.js
export const GRADE_SCALE = [
  { min: 90, grade: 'O', gp: 10 },
  { min: 80, grade: 'A+', gp: 9 },
  { min: 70, grade: 'A', gp: 8 },
  { min: 60, grade: 'B+', gp: 7 },
  { min: 50, grade: 'B', gp: 6 },
  { min: 40, grade: 'C', gp: 5 },
  { min: 0,  grade: 'F', gp: 0 },
];

export function markToGrade(mark) {
  const m = Number(mark);
  if (Number.isNaN(m) || m < 0) return { grade: '-', gp: 0 };
  for (const row of GRADE_SCALE) {
    if (m >= row.min) return { grade: row.grade, gp: row.gp };
  }
  return { grade: '-', gp: 0 };
}

export function calcSGPA(subjects) {
  let totalCredits = 0;
  let totalWeighted = 0;

  const breakdown = subjects.map((s, idx) => {
    const credits = Number(s.credits) || 0;
    const marks = Number(s.marks) || 0;
    const { grade, gp } = markToGrade(marks);
    const weighted = credits * gp;

    totalCredits += credits;
    totalWeighted += weighted;

    return {
      sno: idx + 1,
      name: s.name || `Subject ${idx + 1}`,
      credits,
      marks,
      grade,
      gp,
      weighted,
    };
  });

  const sgpa = totalCredits > 0 ? (totalWeighted / totalCredits) : 0;
  return { sgpa, totalCredits, totalWeighted, breakdown };
}

export function gradeFromGP(gp) {
  // simple helper: which grade first meets or exceeds this gp
  const sorted = [...GRADE_SCALE].sort((a, b) => a.gp - b.gp);
  for (const r of sorted) {
    if (gp <= r.gp) return r.grade;
  }
  return 'O';
}
