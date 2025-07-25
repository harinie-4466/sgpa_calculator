import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">SGPAx</div>
      <nav>
        <NavLink to="/" end>Dashboard</NavLink>
        <NavLink to="/calculator">SGPA Calculator</NavLink>
        <NavLink to="/planner">Target Planner</NavLink>
        <NavLink to="/formula">Formula / Explanation</NavLink>
      </nav>
    </aside>
  );
}
