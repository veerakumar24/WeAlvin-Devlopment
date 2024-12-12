import express from 'express';
import formidable from 'express-formidable';
import {
    createEmployee,
    listEmployees,
    readEmployee,
    employeePhoto,
    removeEmployee,
    updateEmployee,
    employeeSearch
} from '../controllers/employee.js';

const router = express.Router();

// Employee Routes
router.post('/employee',  formidable(), createEmployee);  // Create a new employee
router.get('/employees', listEmployees);  // List all employees
router.get('/employee/:id', readEmployee);  // Get details of a specific employee by ID
router.get('/employee/photo/:employeeId', employeePhoto);  // Get the employee's photo
router.delete('/employee/:id', removeEmployee);  // Delete an employee
router.put('/employee/:id',  formidable(), updateEmployee);  // Update an employee's details
router.get('/employees/search/:keyword', employeeSearch)
export default router;
