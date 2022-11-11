import User from '../models/user.model.js';
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

const secret = process.env.JWT_SECRET;

export const authenticateJWT = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.status(401).json({ message: "Unauthorized user." });
    }
    
    const token = authHeader.split(' ')[1];

    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Unauthorized user." });
        }
        console.log('decoded', decoded);
        req.userId = decoded.id;
        next();
    });
    
};
