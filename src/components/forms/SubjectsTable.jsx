import React from 'react';
import { markToGrade } from '../../utils/sgpa';

export default function SubjectsTable({ subjects, setSubjects, onAdd, onRemove }) {
  const update = (idx, field, value) => {
    const copy = [...subjects];
    copy[idx] = { ...copy[idx], [field]: value };
    setSubjects(copy);
  };

  return (
    <fieldset className="card">
      <legend>Subject Info</legend>

      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Subject Name</th>
            <th>Credits</th>
            <th>Marks</th>
            <th>Grade</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((s, i) => {
            const { grade } = markToGrade(s.marks);
            return (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>
                  <input
                    value={s.name}
                    onChange={(e) => update(i, 'name', e.target.value)}
                    placeholder={`Subject ${i + 1}`}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={s.credits}
                    onChange={(e) => update(i, 'credits', e.target.value)}
                    placeholder="3"
                    min={0}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={s.marks}
                    onChange={(e) => update(i, 'marks', e.target.value)}
                    placeholder="85"
                    min={0}
                    max={100}
                  />
                </td>
                <td>{grade}</td>
                <td>
                  <button type="button" onClick={() => onRemove(i)} disabled={subjects.length === 1}>
                    ✕
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <button type="button" onClick={onAdd}>+ Add Subject</button>
    </fieldset>
  );
}
