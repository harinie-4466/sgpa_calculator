import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Calculator from './pages/Calculator';
import TargetPlanner from './pages/TargetPlanner';
import Formula from './pages/Formula';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/planner" element={<TargetPlanner />} />
        <Route path="/formula" element={<Formula />} />
      </Route>
    </Routes>
  );
}
