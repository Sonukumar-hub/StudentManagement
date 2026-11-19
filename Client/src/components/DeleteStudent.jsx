import React, { useState } from 'react';
import axios from 'axios';

const DeleteStudent = ({ onStudentDeleted }) => {
  const [studentId, setStudentId] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleDelete = async (e) => {
    e.preventDefault();
    if (!studentId.trim()) {
      alert('Please enter a valid Student ID');
      return;
    }

    const confirmDelete = window.confirm(
      `Are you sure you want to delete student with ID: ${studentId}?`
    );
    if (!confirmDelete) return;

    setLoading(true);
    setMessage(null);

    try {
      const response = await axios.delete(
        `http://localhost:3000/api/students/${studentId.trim()}`
      );
      setMessage({
        type: 'success',
        text: response.data.message || 'Student deleted successfully!'
      });
      const deletedId = studentId.trim();
      setStudentId('');
      if (onStudentDeleted) {
        onStudentDeleted(deletedId);
      }
    } catch (err) {
      console.error('Delete error:', err);
      setMessage({
        type: 'error',
        text: err.response?.data?.message || 'Failed to delete student. Check ID and try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card form-card">
      <div className="card-header">
        <h2 className="card-title">🗑️ Delete Student</h2>
      </div>

      <form className="student-form" onSubmit={handleDelete}>
        <div className="form-group">
          <label className="form-label" htmlFor="deleteId">
            Student ID
          </label>
          <input
            id="deleteId"
            type="text"
            className="form-input"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            placeholder="Enter Student MongoDB _id"
            required
          />
        </div>

        {message && (
          <div
            style={{
              padding: '0.65rem 1rem',
              borderRadius: '8px',
              fontSize: '0.875rem',
              fontWeight: 500,
              backgroundColor: message.type === 'success' ? '#ecfdf5' : '#fef2f2',
              color: message.type === 'success' ? '#047857' : '#b91c1c',
              border: `1px solid ${message.type === 'success' ? '#a7f3d0' : '#fecaca'}`
            }}
          >
            {message.text}
          </div>
        )}

        <button
          type="submit"
          className="btn-delete"
          style={{ width: '100%', justifyContent: 'center', padding: '0.75rem' }}
          disabled={loading}
        >
          {loading ? 'Deleting...' : '🗑️ Delete Student by ID'}
        </button>
      </form>
    </div>
  );
};

export default DeleteStudent;
