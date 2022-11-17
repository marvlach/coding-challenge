import User from '../models/user.model.js';
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

const secret = process.env.JWT_SECRET;

export const authenticateJWT = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.status(401).json({ message: "Unauthorized user." });
        return;
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Unauthorized user." });
        }

        req.userId = decoded.id;
        next();
    });
    
};

export const verifyUserExistense = async (req, res, next) => {

    const subjectUserId = req.userId;

    if (!subjectUserId) {
        return res.status(500).json({ message: "Server logic error, our fault ;)" });
    }

    const foundSubjectUser = await User.findById(subjectUserId).select("-password").lean().exec();

    if (!foundSubjectUser) {
        return res.status(400).json({ message: "Your account has been deleted" });
    }

    next();
        
};
