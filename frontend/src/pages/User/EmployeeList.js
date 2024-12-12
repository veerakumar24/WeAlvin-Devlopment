
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

export default function EmployeeList() {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const { data } = await axios.get('https://backend-7-o9m5.onrender.com/api/employees');
                setEmployees(data || []);
            } catch (error) {
                console.error('Error fetching employees:', error);
                toast.error('Failed to fetch employees');
            }
        };

        fetchEmployees();
    }, []);

    const handleDelete = async (employeeId) => {
        try {
            const answer = window.confirm("Are you sure you want to delete this employee?");
            if (!answer) return;

            const { data } = await axios.delete(`https://backend-7-o9m5.onrender.com/api/employee/${employeeId}`);
            toast.success(`"${data.employee.f_Name}" is deleted`);

            // Remove the deleted employee from the state
            setEmployees(employees.filter(employee => employee._id !== employeeId));
        } catch (err) {
            console.error(err);
            toast.error("Delete failed. Try again.");
        }
    };

    const handleUpdate = (employeeId) => {
        console.log('Update employee:', employeeId);
      
    };

    if (!Array.isArray(employees)) {
        return <p>Error: Employees data is not available.</p>;
    }

    if (employees.length === 0) {
        return <p>No employees found.</p>;
    }

    return (
        <div className="container-fluid">
            <h2>Employee List</h2>
            <table className="table table-striped table-bordered">
                <thead className="thead-dark">
                    <tr>
                        <th>ID</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Designation</th>
                        <th>Gender</th>
                        <th>Course</th>
                        <th>createdAt</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee._id}>
                            <td>{employee.f_Id}</td>
                            <td>
                                <img
                                    src={`https://backend-7-o9m5.onrender.com/api/employee/photo/${employee._id}`}
                                    alt={employee.f_Name}
                                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                />
                            </td>
                            <td>{employee.f_Name}</td>
                            <td>{employee.f_Email}</td>
                            <td>{employee.f_Mobile}</td>
                            <td>{employee.f_Designation}</td>
                            <td>{employee.f_gender}</td>
                            <td>{employee.f_Course}</td>
                            <td>{new Date(employee.createdAt).toLocaleDateString()}</td>
                            <td>
                                <button
                                    onClick={() => handleDelete(employee._id)}
                                    className="btn btn-danger btn-sm mr-3"
                                >
                                    Delete
                                </button>
                                <Link to={`/employee-list/update/${employee._id}`}>
                                    <button
                                        onClick={() => handleUpdate(employee._id)}
                                        className="btn btn-primary btn-sm"
                                    >
                                        Update
                                    </button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
