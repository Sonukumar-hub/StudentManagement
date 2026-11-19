import React, { useState } from 'react'
import AddStudent from './components/AddStudent'
import ViewStudent from './components/ViewStudent'
import TotalSize from './components/TotalSize'
import SearchStudent from './components/SearchStudent'

const App = () => {
  const [addStudent, setAddStudent] = useState({
    name: "",
    rollNo: "",
    department: "",
    marks: ""
  });
  const [students, setStudents] = useState([]);

  return (
    <div className="app-container">
      <header className="app-header">
        <span className="header-badge">Admin Dashboard</span>
        <h1 className="app-title">Student Management System</h1>
        <p className="app-subtitle">
          Manage student records, search profiles, and monitor admissions effortlessly.
        </p>
      </header>

      <section className="dashboard-top-grid">
        <TotalSize />
        <SearchStudent />
      </section>

      <main className="dashboard-main-grid">
        <AddStudent
          addStudent={addStudent}
          setAddStudent={setAddStudent}
        />
        <ViewStudent students={students} setStudents={setStudents} />
      </main>
    </div>
  )
}

export default App
