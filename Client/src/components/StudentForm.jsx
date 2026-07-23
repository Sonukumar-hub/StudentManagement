import { useState, useEffect } from "react";
import "./StudentForm.css";

function StudentForm({ addStudent, editStudent, updateStudent }) {
  const [name, setName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [department, setDepartment] = useState("");
  const [marks, setMarks] = useState("");

  useEffect(() => {
    if (editStudent) {
      setName(editStudent.name);
      setRollNo(editStudent.rollNo);
      setDepartment(editStudent.department);
      setMarks(editStudent.marks);
    } else {
      setName("");
      setRollNo("");
      setDepartment("");
      setMarks("");
    }
  }, [editStudent]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const student = {
      ...(editStudent && { _id: editStudent._id }),
      name,
      rollNo,
      department,
      marks: Number(marks),
    };

    if (editStudent) {
      updateStudent(student);
    } else {
      addStudent(student);
    }

    setName("");
    setRollNo("");
    setDepartment("");
    setMarks("");
  };

  return (
    <div className="student-form-container">
      <h2>Student Management System</h2>

      <form className="student-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Name"
            required
          />
        </div>

        <div className="form-group">
          <label>Roll No</label>
          <input
            type="text"
            value={rollNo}
            onChange={(e) => setRollNo(e.target.value)}
            placeholder="Enter Roll Number"
            required
          />
        </div>

        <div className="form-group">
          <label>Department</label>
          <input
            type="text"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            placeholder="Enter Department"
            required
          />
        </div>

        <div className="form-group">
          <label>Marks</label>
          <input
            type="number"
            value={marks}
            onChange={(e) => setMarks(e.target.value)}
            placeholder="Enter Marks"
            required
          />
        </div>

        <button type="submit">
          {editStudent ? "Update Student" : "Add Student"}
        </button>
      </form>
    </div>
  );
}

export default StudentForm;