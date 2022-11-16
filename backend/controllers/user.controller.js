import User from "../models/user.model.js";
import { generateToken } from "../utils/generateToken.js";

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

        const foundObjectUsers = await User.findById(objectUserId).select("-password").lean().exec();

        if (!foundObjectUsers) {
            throw new Error("Could not find user");        
        }

        foundObjectUsers.requestedBy = subjectUserId;

        res.status(200).json(foundObjectUsers);

    } catch (err) {
        console.log(err.message)
        res.status(400).json({ message: err.message })
    }

}


// POST method for signup
export const signupUser = async (req, res) => {

    try {
        const { username, firstName, lastName, email, password, address, role } = req.body;
        
        const createdUser = await User.create({username, firstName, lastName, email, password, address, role});
        
        res.status(200).json({ message: "User created successfully." });

    } catch (err) {
        // should filter some errors here
        res.status(400).json({ message: err.message });
    }

}

// POST method for creating users
export const createUser = async (req, res) => {

    try {
        // subject user creates user
        const subjectUserId = req.userId;
        
        // expects an array of objects
        const usersToAdd = req.body;

        // get all emails and usernames
        const allEmails = usersToAdd.map(user => user.email);
        const allUsernames = usersToAdd.map(user => user.username);
        
        // find dups within emails
        const dupEmails = allEmails.filter((item, index) => allEmails.indexOf(item) !== index);

        // find dups within usernames
        const dupUsernames = allUsernames.filter((item, index) => allUsernames.indexOf(item) !== index);

        if (dupEmails.length > 0 || dupUsernames.length > 0) {
            throw new Error(`There are duplicates withing your form. Aborting`);
        }

        // find username, email dups in DB
        const dupsDB = await User.find( { $or: [ 
            { username: { $in: allUsernames } }, 
            { email: { $in: allEmails } } 
        ]});

        if (dupsDB.length) {
            throw new Error(`User with username: ${dupsDB[0].username} and email: ${dupsDB[0].email} already exist. Aborting`);
        }

        const createdUsers = await User.insertMany(usersToAdd);
        
        res.status(200).json({ message: "User(s) created successfully." });

    } catch (err) {
        // should filter some errors here
        res.status(400).json({ message: err.message });
    }

}


export const authUser = async (req, res) => {
    try {
        const foundUser = await User.findOne({ email: req.body.email }).exec();

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

export const updateUser = async (req, res) => {
    try {

        // new Info
        const { username, firstName, lastName, email, address, role } = req.body;

        // subject user updates object user
        const subjectUserId = req.userId;
        const userToUpdate = req.params.userId;

        console.log(subjectUserId, userToUpdate);

        const updatedUser = await User.findOneAndUpdate({_id: userToUpdate},{
            username, firstName, lastName, email, address, role
        }, {new: true}).select('-password');
        
        if (!updatedUser) {
            throw new Error("User does not exist");
        }

        res.status(200).json({data: updatedUser, message: 'User updated successfully.'});

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const deleteUser = async (req, res) => {
    try {
        // subject user deletes object user
        const subjectUserId = req.userId;
        const userToDelete = req.params.userId;

        console.log(subjectUserId, userToUpdate);

        const deletedUser = await User.findOneAndDelete({ _id: userToDelete }).select('-password');

        if (!deletedUser) {
            throw new Error("User does not exist");
        } 
        
        res.status(200).json({data: deletedUser, message: 'User updated successfully.'});

    } catch (error) {
        res.status(400).json({ message: err.message })
    }
}
