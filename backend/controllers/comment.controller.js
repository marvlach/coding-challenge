import User from "../models/user.model.js";
import Comment from "../models/comment.model.js";

// GET Method for comments either by author or recipient or both
export const getComments = async (req, res) => {
    try {
        const userId = req.userId;

        const { authorId, recipientId } = req.query;

        if (!authorId && !recipientId) {
            throw new Error(`Please specify comment author or comment recipient`);
        }

        // we have either comment author or comment recipient or both
        // it;s ok to have one but 
        const commentQuery = {};
        const userQuery = [];
        let expectedUsersFound = 0;

        if (authorId) {
            commentQuery.authorId = authorId;
            userQuery.push({ _id: authorId })
            expectedUsersFound ++;
        }
        
        if (recipientId) {
            commentQuery.recipientId = recipientId;
            userQuery.push({ _id: recipientId })
            expectedUsersFound ++;
        }
        
        const foundUsers = await User.find({ $or: userQuery});

        if (expectedUsersFound !== foundUsers.length) {
            throw new Error("Could not find comment author/recipent");
        }

        // get comments
        const foundComments = await Comment.find(commentQuery);

        res.status(200).json(foundComments);

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

// GET Method for one/all users, by token
export const getCommentById = async (req, res) => {
    try {
        const commentId = req.params.commentId;

        const foundComment = await Comment.findById(commentId);

        if (!foundComment) {
            throw new Error("Comment does not exist");
        }

        res.status(200).json(foundComment);

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}


// GET Method for one/all users, by token
export const createComment = async (req, res) => {
    try {
        const authorId = req.userId;
        const {recipientId, comment} = req.body.recipientId;

        const foundRecipient = await User.findById(recipientId).select("-password").lean().exec();

        if (!foundRecipient) {
            throw new Error("Comment recipient does not exist");
        }

        const createdComment = await Comment.create({authorId, recipientId, comment});

        res.status(200).json({ data: createdComment, message: 'Comment posted successfully.' });

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

