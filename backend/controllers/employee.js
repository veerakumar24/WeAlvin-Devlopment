
import Employee from '../models/employee.js';
import fs from 'fs';
import mongoose from 'mongoose';

export const createEmployee = async (req, res) => {
    try {
        const { f_Id, f_Name, f_Email, f_Mobile, f_Designation, f_gender, f_Course } = req.fields;
        const { f_Image } = req.files;

        // Validation
        if (!f_Id || !f_Id.trim()) return res.status(400).send('Employee ID is required');
        if (!f_Name || !f_Name.trim()) return res.status(400).send('Name is required');
    
        if (!f_Email || !f_Email.trim()) return res.status(400).send('Mobile number is required');
        if (!f_Mobile || !f_Mobile.trim()) return res.status(400).send('Mobile number is required');
        if (!f_Designation || !f_Designation.trim()) return res.status(400).send('Designation is required');
        if (!f_gender || !f_gender.trim()) return res.status(400).send('Gender is required');
        if (!f_Course || !f_Course.trim()) return res.status(400).send('Course is required');
        if (f_Image && f_Image.size > 1000000) return res.status(400).send('Image size should be less than 1MB');

        // Check for duplicate email
        const existingEmployee = await Employee.findOne({ f_Email });
        if (existingEmployee) return res.status(409).send('Email already exists');

        const employee = new Employee({ ...req.fields });

        if (f_Image) {
            try {
                employee.f_Image.data = fs.readFileSync(f_Image.path);
                employee.f_Image.contentType = f_Image.type;
            } catch (err) {
                return res.status(500).send('Error reading image file');
            }
        }

        await employee.save();
        res.status(201).send({ message: 'Employee created successfully', employee });
   } catch (err) {
        console.error('Error details:', err);
        if (err.code === 11000) {
            return res.status(409).send('Duplicate email found');
        }
        res.status(500).send('Error creating employee');
    }
};


export const listEmployees = async (req, res) => {
    try {
        const employees = await Employee.find({}).select('-f_Image').sort({ createdAt: -1 });
        res.status(200).send(employees);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching employees');
    }
};

export const readEmployee = async (req, res) => {
    try {
        const employeeId = req.params.id;
        console.log("Fetching employee with ID:", employeeId);

        if (!mongoose.isValidObjectId(employeeId)) {
            return res.status(400).send('Invalid Employee ID');
        }

        const employee = await Employee.findById(employeeId).select('-f_Image');
        if (!employee) return res.status(404).send('Employee not found');

        res.status(200).send(employee);
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).send('Error fetching employee details');
    }
};

export const employeePhoto = async (req, res) => {
    try {
        const employeeId = req.params.employeeId;
        if (!mongoose.isValidObjectId(employeeId)) {
            return res.status(400).send('Invalid Employee ID');
        }

        const employee = await Employee.findById(employeeId).select('f_Image');
        if (employee && employee.f_Image.data) {
            res.set('Content-Type', employee.f_Image.contentType);
            return res.send(employee.f_Image.data);
        }
        res.status(404).send('Employee photo not found');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching employee photo');
    }
};

export const removeEmployee = async (req, res) => {
    try {
        const employeeId = req.params.id;
        if (!mongoose.isValidObjectId(employeeId)) {
            return res.status(400).send('Invalid Employee ID');
        }

        const employee = await Employee.findByIdAndDelete(employeeId);
        if (!employee) return res.status(404).send('Employee not found');
        res.status(200).send({ message: 'Employee deleted successfully', employee });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting employee');
    }
};

export const updateEmployee = async (req, res) => {
    try {
        const { f_Name, f_Email, f_Mobile, f_Designation, f_gender, f_Course } = req.fields;
        const { f_Image } = req.files;

        // Validation
        if (!f_Name.trim()) return res.status(400).send('Name is required');
        if (!f_Email.trim()) return res.status(400).send('Email is required');
        if (!f_Mobile.trim()) return res.status(400).send('Mobile number is required');
        if (!f_Designation.trim()) return res.status(400).send('Designation is required');
        if (!f_gender.trim()) return res.status(400).send('Gender is required');
        if (!f_Course.trim()) return res.status(400).send('Course is required');
        if (f_Image && f_Image.size > 1000000) return res.status(400).send('Image size should be less than 1MB');

        const employeeId = req.params.id;
        if (!mongoose.isValidObjectId(employeeId)) {
            return res.status(400).send('Invalid Employee ID');
        }

        const employee = await Employee.findById(employeeId);
        if (!employee) return res.status(404).send('Employee not found');

        // Update employee details
        Object.assign(employee, req.fields);

        if (f_Image) {
            try {
                employee.f_Image.data = fs.readFileSync(f_Image.path);
                employee.f_Image.contentType = f_Image.type;
            } catch (err) {
                return res.status(500).send('Error reading image file');
            }
        }

        await employee.save();
        res.status(200).send(employee);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error updating employee');
    }
};

export const employeeSearch = async (req, res) => {
    try {
        const { keyword } = req.params; 
        const results = await Employee.find({
            $or: [
                { f_Name: { $regex: keyword, $options: "i" } },  
                { f_Id: { $regex: keyword, $options: "i" } },    
            ],
        }).select("-f_Image");  // Exclude image from the search results
        
        res.json(results);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" }); 
    }
};
