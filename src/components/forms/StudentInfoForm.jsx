import React from 'react';

export default function StudentInfoForm({ info, onChange }) {
  const handle = (e) => {
    const { name, value } = e.target;
    onChange({ ...info, [name]: value });
  };

  return (
    <fieldset className="card">
      <legend>Student Info</legend>
      <div className="row">
        <label>
          Name
          <input name="name" value={info.name} onChange={handle} placeholder="John Doe" />
        </label>
        <label>
          Roll No
          <input name="roll" value={info.roll} onChange={handle} placeholder="CSE23XXXX" />
        </label>
      </div>
      <div className="row">
        <label>
          Semester
          <input type="number" name="semester" value={info.semester} onChange={handle} placeholder="4" />
        </label>
        <label>
          Department
          <input name="department" value={info.department} onChange={handle} placeholder="CSE" />
        </label>
      </div>
    </fieldset>
  );
}

