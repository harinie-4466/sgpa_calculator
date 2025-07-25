import React, { useState } from 'react';
import { computePlan } from '../utils/planner';
import { gradeFromGP } from '../utils/sgpa';

export default function TargetPlanner() {
  const [past, setPast] = useState([{ sgpa: '', credits: '' }]);
  const [targetCgpa, setTargetCgpa] = useState('');
  const [remainingSemesters, setRemainingSemesters] = useState('');
  const [upcomingCreditsPerSem, setUpcomingCreditsPerSem] = useState(['']);
  const [result, setResult] = useState(null);

  const addPast = () => setPast((p) => [...p, { sgpa: '', credits: '' }]);
  const removePast = (idx) => setPast((p) => p.filter((_, i) => i !== idx || p.length === 1));

  const addUpcoming = () => setUpcomingCreditsPerSem((u) => [...u, '']);
  const removeUpcoming = (idx) => setUpcomingCreditsPerSem((u) => u.filter((_, i) => i !== idx || u.length === 1));

  const updatePast = (idx, field, value) => {
    const copy = [...past];
    copy[idx] = { ...copy[idx], [field]: value };
    setPast(copy);
  };

  const updateUpcoming = (idx, value) => {
    const copy = [...upcomingCreditsPerSem];
    copy[idx] = value;
    setUpcomingCreditsPerSem(copy);
  };

  const handleCompute = (e) => {
    e.preventDefault();
    const parsedPast = past.map(p => ({ sgpa: Number(p.sgpa), credits: Number(p.credits) }));
    const parsedUpcoming = upcomingCreditsPerSem.map(Number);
    const r = computePlan({
      past: parsedPast,
      remainingSemesters: Number(remainingSemesters),
      targetCgpa: Number(targetCgpa),
      upcomingCreditsPerSem: parsedUpcoming,
    });
    setResult(r);
  };

  return (
    <>
      <h1>Target CGPA Planner</h1>
      <form onSubmit={handleCompute}>
        <section className="card">
          <h2>Past Semesters</h2>
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>SGPA</th>
                <th>Credits</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {past.map((p, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>
                    <input
                      type="number"
                      step="0.01"
                      value={p.sgpa}
                      onChange={(e) => updatePast(i, 'sgpa', e.target.value)}
                      placeholder="8.5"
                      min={0}
                      max={10}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={p.credits}
                      onChange={(e) => updatePast(i, 'credits', e.target.value)}
                      placeholder="20"
                      min={0}
                    />
                  </td>
                  <td>
                    <button type="button" onClick={() => removePast(i)} disabled={past.length === 1}>✕</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button type="button" onClick={addPast}>+ Add Past Semester</button>
        </section>

        <section className="card">
          <h2>Target</h2>
          <div className="row">
            <label>
              Target CGPA
              <input
                type="number"
                step="0.01"
                value={targetCgpa}
                onChange={(e) => setTargetCgpa(e.target.value)}
                placeholder="9.3"
                min={0}
                max={10}
              />
            </label>
            <label>
              Remaining Semesters
              <input
                type="number"
                value={remainingSemesters}
                onChange={(e) => setRemainingSemesters(e.target.value)}
                placeholder="4"
                min={0}
              />
            </label>
          </div>
        </section>

        <section className="card">
          <h2>Upcoming Credits per Semester</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Sem #</th>
                <th>Credits</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {upcomingCreditsPerSem.map((c, i) => (
                <tr key={i}>
                  <td>#{i + 1}</td>
                  <td>
                    <input
                      type="number"
                      value={c}
                      onChange={(e) => updateUpcoming(i, e.target.value)}
                      placeholder="20"
                      min={0}
                    />
                  </td>
                  <td>
                    <button type="button" onClick={() => removeUpcoming(i)} disabled={upcomingCreditsPerSem.length === 1}>✕</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button type="button" onClick={addUpcoming}>+ Add Remaining Semester</button>
        </section>

        <div className="actions">
          <button type="submit">Compute Plan</button>
        </div>
      </form>

      {result && (
        <section className="card">
          <h2>Plan Result</h2>
          <ul>
            <li><strong>Completed Credits:</strong> {result.completedCredits}</li>
            <li><strong>Remaining Credits:</strong> {result.remainingCredits}</li>
            <li><strong>Total Credits (final):</strong> {result.totalCredits}</li>
            <li><strong>Required Avg SGPA (across remaining):</strong> {result.requiredAvgSGPA.toFixed(2)}</li>
          </ul>

          <p>
            To reach your target CGPA of <strong>{Number(targetCgpa).toFixed(2)}</strong>, you need to
            average at least <strong>{result.requiredAvgSGPA.toFixed(2)}</strong> SGPA in the remaining semesters.
            That roughly corresponds to a minimum grade band of <strong>{gradeFromGP(Math.ceil(result.requiredAvgSGPA))}</strong> (or higher)
            on average.
          </p>

          <p>
            Tip: Plan subject-wise credits for each semester and ensure the **weighted average GP** meets or exceeds
            <strong> {result.requiredAvgSGPA.toFixed(2)}</strong>.
          </p>
        </section>
      )}
    </>
  );
}
