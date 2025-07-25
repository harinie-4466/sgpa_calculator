import React from 'react';

export default function StatCard({ label, value, sublabel, positive }) {
  return (
    <div className="stat-card">
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
      {sublabel && (
        <div className={`stat-sublabel ${positive ? 'pos' : 'neg'}`}>
          {sublabel}
        </div>
      )}
    </div>
  );
}
