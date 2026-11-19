import { useEffect } from 'react'
import axios from 'axios'

const ViewStudent = ({ students, setStudents }) => {
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get(
                    'http://localhost:3000/api/students'
                )
                console.log('Fetched data:', response.data);
                setStudents(response.data);
            } catch (err) {
                console.log('Failed to fetch students:', err);
            }
        }
        fetchStudents();
    }, [setStudents])

    const handleDelete = async (id, name) => {
        const confirmDelete = window.confirm(
            `Are you sure you want to delete student "${name || 'Record'}"?`
        );
        if (!confirmDelete) return;

        try {
            const response = await axios.delete(
                `http://localhost:3000/api/students/${id}`
            );
            console.log('Student deleted:', response.data);
            alert('Student deleted successfully!');

            // Update state so the student is immediately removed from UI
            setStudents((prev) => prev.filter((student) => student._id !== id));
        } catch (err) {
            console.error('Failed to delete student:', err);
            alert('Failed to delete student. Please try again.');
        }
    };

    return (
        <div className="card student-list-container">
            <div className="card-header">
                <h2 className="card-title">🎓 Student Directory</h2>
                <span className="badge badge-dept">{students.length} Records</span>
            </div>

            {students.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-icon">📂</div>
                    <p>No student records available yet.</p>
                </div>
            ) : (
                <div className="student-list-grid">
                    {students.map((student) => (
                        <div key={student._id} className="student-card">
                            <div className="student-card-header">
                                <div className="student-avatar">
                                    {student.name ? student.name.charAt(0).toUpperCase() : 'S'}
                                </div>
                                <div className="student-info-main">
                                    <h3 className="student-name">{student.name}</h3>
                                    <span className="student-roll">Roll No: {student.rollNo}</span>
                                </div>
                            </div>

                            <div className="student-card-body">
                                <span className="badge badge-dept">🏛️ {student.department}</span>
                                <span className="badge badge-marks">📊 Marks: {student.marks}</span>
                            </div>

                            <div className="student-card-footer">
                                <span>Student ID:</span>
                                <span className="student-id">{student._id}</span>
                            </div>

                            <div className="student-card-actions">
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
    )
}

export default ViewStudent
