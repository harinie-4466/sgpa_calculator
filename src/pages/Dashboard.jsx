import React from 'react';
import StatCard from '../components/cards/StatCard';
import SgpaLineChart from '../components/charts/SgpaLineChart';

// Dummy data – you can plug real data from localStorage or planner
const dummyTrend = [
  { sem: 'Sem 1', sgpa: 8.1 },
  { sem: 'Sem 2', sgpa: 7.8 },
  { sem: 'Sem 3', sgpa: 8.6 },
  { sem: 'Sem 4', sgpa: 9.0 },
];

export default function Dashboard() {
  const latest = dummyTrend[dummyTrend.length - 1]?.sgpa ?? 0;
  const avg = (dummyTrend.reduce((s, d) => s + d.sgpa, 0) / dummyTrend.length).toFixed(2);

  return (
    <>
      <h1>Dashboard</h1>
      <div className="grid-3">
        <StatCard label="Latest SGPA" value={latest.toFixed(2)} />
        <StatCard label="Average SGPA" value={avg} />
        <StatCard label="Goal CGPA" value="9.3" sublabel="+ target" positive />
      </div>

      <SgpaLineChart data={dummyTrend} />
    </>
  );
}
