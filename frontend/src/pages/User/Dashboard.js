import React from 'react';
import { NavLink } from 'react-router-dom';
import './Dashboard.css'; 


export default function Dashboard() {

   


    return (
        <div className="dashboard-container">
            <aside className="sidebar">
                <h3>Menu</h3>
                <ul className="nav">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/employee-list">Employee List</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/create-employee">ADD Employee</NavLink>
                    </li>
                </ul>

            </aside>
            <main className="main-content">
                <h2>Dashboard</h2>
               
            </main>
          
        </div>
    );
}

