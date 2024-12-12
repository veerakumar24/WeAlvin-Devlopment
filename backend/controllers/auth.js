import User from '../models/user.js';
import { hashPassword , comparePassword } from '../helpers/auth.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const register = async (req, res) => {
   try{
    // destructure the req.body
    const {name, email, password} = req.body;
    // all fields are required
    if (!name.trim()) {
        return res.status(400).json({error: 'Name is required'});
    }
    if (!email) {
        return res.status(400).json({error: 'Email is required'});
    }
    if (!password || password.length < 6) {
        return res.status(400).json({error: 'Password must be at least 6 characters'});
    }
    // check if the user already exists
    const existingUser = await User.findOne({email});
    if (existingUser) {
        return res.status(400).json({error: 'User already exists'});
    }
    //hash the password
    const hashedPassword = await hashPassword(password);
    //register the user
    const user = await new User({name, email, password: hashedPassword}).save();
    // create a signed jwt token
    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: '13d'});
    //send the user
    res.json({
        user: {
            name: user.name,
            email: user.email,
            role: user.role,
            address: user.address,
          
        },
        token
    });
} catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
   }
};

export const login = async (req, res) => {
    try{
     // destructure the req.body
     const {email, password} = req.body;
     // all fields are required
    
     if (!email) {
         return res.status(400).json({error: 'Email is required'});
     }
     if (!password || password.length < 6) {
         return res.status(400).json({error: 'Password must be at least 6 characters'});
     }
     // check if the user already exists
     const user = await User.findOne({email});
     if (!user) {
         return res.status(400).json({error: 'User not found'});
     }
     //compare the password
     const match = await comparePassword(password, user.password);
     if (!match) {
         return res.status(400).json({error: 'Invalid password'});
     }
   
     // create a signed jwt token
     const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: '13d'});
     //send the user
     res.json({
         user: {
             name: user.name,
             email: user.email,
             role: user.role,
             address: user.address,
           
         },
         token
     });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
       }
 };



