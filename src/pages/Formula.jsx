import React from 'react';

export default function Formula() {
  return (
    <>
      <h1>How SGPA & CGPA Are Calculated</h1>

      <section className="card">
        <h2>SGPA</h2>
        <p>
          <strong>SGPA (Semester Grade Point Average)</strong> is calculated as:
        </p>
        <pre>SGPA = Σ(credit × gradePoint) / Σ(credit)</pre>
        <p>Where:</p>
        <ul>
          <li><em>credit</em> is the credit assigned to a subject</li>
          <li><em>gradePoint</em> is the numeric point for the grade obtained (e.g., O=10, A+=9, ...)</li>
        </ul>
      </section>

      <section className="card">
        <h2>CGPA</h2>
        <p>
          <strong>CGPA (Cumulative Grade Point Average)</strong> up to a semester is:
        </p>
        <pre>CGPA = Σ(semesterSGPA × semesterCredits) / Σ(semesterCredits)</pre>
      </section>

      <section className="card">
        <h2>Example Grade Scale</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Marks</th>
              <th>Grade</th>
              <th>Grade Point</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>90–100</td><td>O</td><td>10</td></tr>
            <tr><td>80–89</td><td>A+</td><td>9</td></tr>
            <tr><td>70–79</td><td>A</td><td>8</td></tr>
            <tr><td>60–69</td><td>B+</td><td>7</td></tr>
            <tr><td>50–59</td><td>B</td><td>6</td></tr>
            <tr><td>40–49</td><td>C</td><td>5</td></tr>
            <tr><td>{'< 40'}</td><td>F</td><td>0</td></tr>
          </tbody>
        </table>
      </section>
    </>
  );
}
