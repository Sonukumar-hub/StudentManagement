import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SearchStudent = () => {
  const [name, setName] = useState("");
  const [students, setStudents] = useState([]);
  const [result, setResult] = useState([]);

  useEffect(() => {
    const findStudent = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3000/api/students'
        );

        setStudents(response.data);
      } catch (err) {
        console.log(err.message);
      }
    };

    findStudent();
  }, []);

  const searchStudent = (e) => {
    const value = e.target.value;
    setName(value);

    const filtered = students.filter((student) =>
      student.name.toLowerCase().includes(value.toLowerCase())
    );

    setResult(filtered);
  };

  const handleDelete = async (id, studentName) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${studentName || 'this student'}"?`
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:3000/api/students/${id}`);
      setStudents((prev) => prev.filter((s) => s._id !== id));
      setResult((prev) => prev.filter((s) => s._id !== id));
      alert("Student deleted successfully!");
    } catch (err) {
      console.error("Failed to delete student:", err);
      alert("Failed to delete student. Please try again.");
    }
  };

  return (
    <div className="card search-card">
      <div className="card-header">
        <h2 className="card-title">🔍 Search Student</h2>
        {result.length > 0 && (
          <span className="badge badge-dept">{result.length} found</span>
        )}
      </div>

      <div className="search-input-wrapper">
        <span className="search-icon">🔎</span>
        <input
          type="text"
          className="search-input"
          value={name}
          placeholder="Search by student name..."
          onChange={searchStudent}
        />
      </div>

      {name.trim() !== "" && result.length === 0 && (
        <div className="search-empty-text">No students found matching "{name}"</div>
      )}

      {result.length > 0 && (
        <div className="search-results-list">
          {result.map((student) => (
            <div key={student._id} className="search-result-item">
              <div className="search-result-header">
                <span className="search-result-name">{student.name}</span>
                <span className="search-result-roll">Roll: {student.rollNo}</span>
              </div>
              <div className="search-result-details">
                <span>📚 {student.department}</span>
                <span>🎯 Marks: {student.marks}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                <button
                  className="btn-delete"
                  onClick={() => handleDelete(student._id, student.name)}
                  title="Delete Student"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchStudent;