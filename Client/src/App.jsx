import { useState, useEffect } from "react";
import API from "./services/api";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import SearchBar from "./components/SearchBar";

function App() {
  const [students, setStudents] = useState([]);
  const [editStudent, setEditStudent] = useState(null);
  const [search, setSearch] = useState("");

  // Fetch Students
  const fetchStudents = async () => {
    try {
      const res = await API.get("/students");
      setStudents(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Add Student
  const addStudent = async (student) => {
    try {
      const res = await API.post("/students", student);

      setStudents((prev) => [...prev, res.data]);
    } catch (error) {
      console.log(error);
    }
  };

  // Delete Student
  const deleteStudent = async (id) => {
    try {
      await API.delete(`/students/${id}`);

      setStudents((prev) =>
        prev.filter((student) => student._id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  // Select Student for Editing
  const handleEdit = (student) => {
    setEditStudent(student);
  };

  // Update Student
  const updateStudent = async (student) => {
    try {
      const res = await API.put(
        `/students/${student._id}`,
        student
      );

      setStudents((prev) =>
        prev.map((s) =>
          s._id === student._id ? res.data : s
        )
      );

      setEditStudent(null);
    } catch (error) {
      console.log(error);
    }
  };

  // Search Student
  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <StudentForm
        addStudent={addStudent}
        editStudent={editStudent}
        updateStudent={updateStudent}
      />

      <SearchBar
        search={search}
        setSearch={setSearch}
      />

      <StudentList
        students={filteredStudents}
        deleteStudent={deleteStudent}
        handleEdit={handleEdit}
      />
    </div>
  );
}

export default App;