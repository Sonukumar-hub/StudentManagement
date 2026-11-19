import React, { useEffect, useState } from 'react'
import axios from 'axios'

const TotalSize = () => {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/students')
                let counts = response.data.length;
                setCount(counts);
            } catch (err) {
                console.error('Error fetching total size:', err);
            }
        }
        fetchStudent();
    }, [])

    return (
        <div className="card total-size-card">
            <span className="total-label">Total Enrollment</span>
            <div className="total-value-wrapper">
                <h1 className="total-number">{count}</h1>
                <span className="total-suffix">Registered Students</span>
            </div>
        </div>
    )
}

export default TotalSize
