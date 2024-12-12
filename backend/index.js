import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import morgan from 'morgan';
import authRoutes from './routes/auth.js';

import cors from "cors";
import employeeRoutes from "./routes/employeeRoutes.js"

dotenv.config();
const app = express();

app.get('/', (req, res) => {
    res.send('Welcome to the API!'); // or any other message you want
});


mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log(err));


// middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/api', authRoutes);

app.use('/api',employeeRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); 