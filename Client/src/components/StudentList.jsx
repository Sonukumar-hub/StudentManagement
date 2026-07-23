import StudentCard from "./StudentCard";
import "./StudentList.css";

function StudentList({ students, deleteStudent, handleEdit }) {
  return (
    <div className="student-list-container">
      <h2 className="student-list h2">Student List</h2>

      <div className="student-list">
        {students.length > 0 ? (
          students.map((student) => (
            <StudentCard
              key={student._id}
              student={student}
              deleteStudent={deleteStudent}
              handleEdit={handleEdit}
            />
          ))
        ) : (
          <p>No students found.</p>
        )}
      </div>
    </div>
  );
}

export default StudentList;