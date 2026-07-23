import "./StudentCard.css";

function StudentCard({ student, deleteStudent, handleEdit }) {
  return (
    <div className="student-card">
      <h3>{student.name}</h3>

      <p>
        <strong>Roll No:</strong> {student.rollNo}
      </p>

      <p>
        <strong>Department:</strong> {student.department}
      </p>

      <p>
        <strong>Marks:</strong> {student.marks}
      </p>

      <div className="card-buttons">
        <button
          className="edit-btn"
          onClick={() => handleEdit(student)}
        >
          Edit
        </button>

        <button
          className="delete-btn"
          onClick={() => deleteStudent(student._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default StudentCard;