import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const requireSignIn = async (req, res, next) => {
   try {
       // Get the token from the 'Authorization' header
       const token = req.headers.authorization?.split(' ')[1];
       
       // Check if token exists
       if (!token) {
           return res.status(401).json({ error: 'Unauthorized' });
       }
       
       // Verify the token
       const decoded = jwt.verify(token, process.env.JWT_SECRET);
       req.user = decoded;
       next();
   } catch (err) {
       return res.status(401).json({ error: 'Unauthorized' });
   }
};


export const isAdmin = async (req, res, next) => {
    try {
        // Fetch the user using the ID from the decoded token
        const user = await User.findById(req.user._id);
        
        // Check if the user's role is admin
        if (user.role !== 1) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        
        next();
    } catch (err) {
        console.log(err); // Log any errors for debugging
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

