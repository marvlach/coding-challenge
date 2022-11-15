import User from '../models/user.model.js';
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

const secret = process.env.JWT_SECRET;

// middleware for body resembling model
export const verifyBody = (req, res, next) => {

    try {
        const requestedBy = req.userId;

        if (!requestedBy) {
            return res.status(500).json({ message: "Server logic error, our fault ;)" });
        }

        const {username, firstName, lastName, email, password, address, role } = req.body;

        if (!username) {
            throw new Error(`Please provide a username`);
        }
        if (!firstName) {
            throw new Error(`Please provide a firstName`);
        }
        if (!lastName) {
            throw new Error(`Please provide a lastName`);
        }
        if (!email) {
            throw new Error(`Please provide a email`);
        }
        if (!role) {
            throw new Error(`Please provide a role`);
        }
        if (!password) {
            throw new Error(`Please provide a password`);
        }
        
        next();
    } catch (error) {
        
    }
    
    
};