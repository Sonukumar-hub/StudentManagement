import React from 'react';
import axios from 'axios';

const AddStudent = ({ addStudent, setAddStudent }) => {
  const handleChange = (e) => {
    const { id, value } = e.target;

    setAddStudent({
      ...addStudent,
      [id]: value
    });
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:3000/api/students',
        {
          ...addStudent,
          marks: Number(addStudent.marks)
        }
      );

      console.log(response.data);
      alert('Student added successfully!');

      setAddStudent({
        name: '',
        rollNo: '',
        department: '',
        marks: ''
      });
    } catch (err) {
      console.error('Student data not added:', err);
      alert('Failed to add student. Please try again.');
    }
  };

  return (
    <div className="card form-card">
      <div className="card-header">
        <h2 className="card-title">📝 Add New Student</h2>
      </div>

      <form className="student-form" onSubmit={submit}>
        <div className="form-group">
          <label className="form-label" htmlFor="name">Full Name</label>
          <input
            className="form-input"
            type="text"
            id="name"
            value={addStudent.name}
            onChange={handleChange}
            placeholder="e.g. John Doe"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="rollNo">Roll Number</label>
          <input
            className="form-input"
            type="text"
            id="rollNo"
            value={addStudent.rollNo}
            onChange={handleChange}
            placeholder="e.g. CS101"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="department">Department</label>
          <input
            className="form-input"
            type="text"
            id="department"
            value={addStudent.department}
            onChange={handleChange}
            placeholder="e.g. Computer Science"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="marks">Marks</label>
          <input
            className="form-input"
            type="number"
            id="marks"
            value={addStudent.marks}
            onChange={handleChange}
            placeholder="e.g. 85"
            min="0"
            required
          />
        </div>

        <button className="btn-primary" type="submit">
          + Add Student Record
        </button>
      </form>
    </div>
  );
};

export default AddStudent;