import mongoose, { Schema } from 'mongoose';

const commentSchema = new mongoose.Schema({
    authorId: { 
        type: Schema.Types.ObjectId, ref:'User', 
        required: [true, "Author is Required"],
    },
    recipientId: { 
        type: Schema.Types.ObjectId, ref:'User',
        required: [true, "Recipient is Required"],
    },
    comment: { 
        type: String,
        required: [true, "Cannot have empty comment"],
    },
}, {
    timestamps: true,    
});

// Index the fields
commentSchema.index({ author: 1, recipient: 1 }); // schema level

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;