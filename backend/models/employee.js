import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
    f_Id: {
        type: String,
        required: true,
        unique: true,
    },
    f_Image: {
        data: Buffer,
        contentType: String,
    },
    f_Name: {
        type: String,
        trim: true,
        required: true,
        maxLength: 100,
    },
    f_Email: { type: String, required: true, unique: true },

    f_Mobile: {
        type: String,
        trim: true,
        required: true,
        maxLength: 15,
    },
    f_Designation: {
        type: String,
        trim: true,
        required: true,
        enum: ['HR', 'Manager', 'Sales'],
    },
    f_gender: {
        type: String,
        trim: true,
        required: true,
    },
    f_Course: {
        type: String,
        trim: true,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
}, { timestamps: true });

export default mongoose.model('Employee', employeeSchema);
