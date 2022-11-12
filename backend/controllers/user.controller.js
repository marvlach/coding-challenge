import User from "../models/user.model.js";
import { generateToken } from "../utils/generateToken.js";
import { isEmptyString } from "../utils/common.js";

// GET Method for all users(needs jwt auth)
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password").lean().exec();
        res.status(200).json(users);
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
}

// GET Method for one user
export const getUser = async (req, res) => {
    try {
        
        res.json(foundUser);

    } catch (err) {
        res.status(400).json('Error: ' + err)
    }

}


// POST method for signup
export const createUser = async (req, res) => {

    try {
        const { username, firstName, lastName, email, password, address, role } = req.body;
        
        const createdUser = await User.create({username, firstName, lastName, email, password, address, role});
        
        res.status(200).json({ message: "User created successfully." });

    } catch (err) {
        res.status(400).json('Error: ' + err);
    }

}


export const authUser = async (req, res) => {
    try {
        const foundUser = await User.findOne({ email: req.body.email }).exec();

        // 
        if (!foundUser) {
            throw new Error("Wrong credentials");
        }

        const match = await foundUser.matchPassword(req.body.password);

        if (!match) {
            throw new Error("Wrong credentials");
        }

        const token = generateToken(foundUser.id);
        res.status(200).json({token: token});
        

    } catch (err) {
        res.status(400).json('Error: ' + err)
    }
}