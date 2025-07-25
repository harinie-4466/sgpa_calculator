import React, { useState } from 'react';
import StudentInfoForm from '../components/forms/StudentInfoForm';
import SubjectsTable from '../components/forms/SubjectsTable';
import { calcSGPA } from '../utils/sgpa';
import {
  LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts';

export default function Calculator() {
  const [studentInfo, setStudentInfo] = useState({
    name: '',
    roll: '',
    semester: '',
    department: '',
  });

  const [subjects, setSubjects] = useState([
    { name: '', credits: '', marks: '' },
  ]);

  const [result, setResult] = useState(null);

  const addSubject = () => setSubjects((s) => [...s, { name: '', credits: '', marks: '' }]);
  const removeSubject = (idx) => setSubjects((s) => s.filter((_, i) => i !== idx));

  const handleCalculate = (e) => {
    e.preventDefault();
    const r = calcSGPA(subjects);
    setResult(r);
  };

  const handleReset = () => {
    setStudentInfo({ name: '', roll: '', semester: '', department: '' });
    setSubjects([{ name: '', credits: '', marks: '' }]);
    setResult(null);
  };

  const chartData = result ? result.breakdown.map((b) => ({
    subject: b.name,
    gp: b.gp,
  })) : [];

  return (
    <>
      <h1>SGPA Calculator</h1>
      <form onSubmit={handleCalculate}>
        <StudentInfoForm info={studentInfo} onChange={setStudentInfo} />

        <SubjectsTable
          subjects={subjects}
          setSubjects={setSubjects}
          onAdd={addSubject}
          onRemove={removeSubject}
        />

        <div className="actions">
          <button type="submit">Calculate SGPA</button>
          <button type="button" onClick={handleReset} className="secondary">Reset</button>
        </div>
      </form>

      {result && (
        <section className="card">
          <h2>Result</h2>
          <p>
            <strong>Student:</strong> {studentInfo.name || '-'} &nbsp; | &nbsp;
            <strong>Roll No:</strong> {studentInfo.roll || '-'} &nbsp; | &nbsp;
            <strong>Dept:</strong> {studentInfo.department || '-'} &nbsp; | &nbsp;
            <strong>Semester:</strong> {studentInfo.semester || '-'}
          </p>

          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Subject</th>
                <th>Credits</th>
                <th>Marks</th>
                <th>Grade</th>
                <th>GP</th>
                <th>Credits × GP</th>
              </tr>
            </thead>
            <tbody>
              {result.breakdown.map((b) => (
                <tr key={b.sno}>
                  <td>{b.sno}</td>
                  <td>{b.name}</td>
                  <td>{b.credits}</td>
                  <td>{b.marks}</td>
                  <td>{b.grade}</td>
                  <td>{b.gp}</td>
                  <td>{b.weighted.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={2}><strong>Totals</strong></td>
                <td><strong>{result.totalCredits}</strong></td>
                <td colSpan={2}></td>
                <td></td>
                <td><strong>{result.totalWeighted.toFixed(2)}</strong></td>
              </tr>
            </tfoot>
          </table>

          <h3>SGPA: {result.sgpa.toFixed(2)}</h3>

          {/* Simple graph: GP per subject */}
          <div style={{ height: 260, marginTop: 24 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid stroke="#333" strokeDasharray="3 3" />
              <XAxis dataKey="subject" />
              <YAxis domain={[0, 10]} />
              <Tooltip />
              <Line type="monotone" dataKey="gp" stroke="#82ca9d" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
          </div>
        </section>
      )}
    </>
  );
}
