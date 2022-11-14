import User from "../models/user.model.js";
import { generateToken } from "../utils/generateToken.js";
import { isEmptyString } from "../utils/common.js";

// GET Method for one/all users, by token
export const getUser = async (req, res) => {
    try {
        const queryString = req.query.all ? {} : {_id: req.userId};
        const users = await User.find(queryString).select("-password").lean().exec();
        res.status(200).json(req.query.all ? users : users[0]);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

// GET Method for one user
export const getUserById = async (req, res) => {
    try {
        // subject user asks for object
        const subjectUserId = req.userId;
        const objectUserId = req.params.userId;
        const objectFoundUser = await User.findById(objectUserId).select("-password").lean().exec();

        if (!objectFoundUser) {
            throw new Error("Could not find user");        
        }

        objectFoundUser.requestedBy = subjectUserId;
        res.status(200).json(objectFoundUser);

    } catch (err) {
        console.log(err.message)
        res.status(400).json({ message: err.message })
    }

}


// POST method for signup
export const createUser = async (req, res) => {

    try {
        const { username, firstName, lastName, email, password, address, role } = req.body;
        
        const createdUser = await User.create({username, firstName, lastName, email, password, address, role});
        
        res.status(200).json({ message: "User created successfully." });

    } catch (err) {
        res.status(400).json({ message: err.message });
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
        res.status(400).json({ message: err.message })
    }
}
