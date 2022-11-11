import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';


const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { 
        type: String, 
        required: [true, "Username is Required"],
        index: { unique: true }, 
    },
    firstName: { 
        type: String,
        required: [true, "First name is Required"],
    },
    lastName: { 
        type: String,
        required: [true, "Last name is Required"],
    },
    email: { 
        type: String, 
        required: [true, "Email is Required"],
        index: { unique: true } 
    },
    password: { 
        type: String, 
        required: [true, "Password is Required"],
    },
    address: {
        street: {  type: String, },
        number: {  type: String, },
        city: { type: String, },
        code: { type: String, },
        country: { type: String, },
    },
    role: {
        type: String, 
        required: true 
    },
}, {
    timestamps: true,    
});

// Index the fields
userSchema.index({ username: 1, email: 1 }); // schema level

// pre save hook
userSchema.pre("save", async function (next) {
 
    if (!this.isModified("password")) {
        return next();
    }

    const salt = await bcryptjs.genSalt();
    this.password = await bcryptjs.hash(this.password, salt);
    next();
});
  


// Method for checking if the password given matches the user's password
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcryptjs.compare(enteredPassword, this.password);
}

/* 
userSchema.statics.login = async function (email, password) {
    
    const user = await this.findOne({ email });

    if (!user) {
        throw Error("incorrect email");
    }
    
    const auth = await bcryptjs.compare(password, user.password);

    if (!auth) {
        throw Error("incorrect password");
    }
    
    return user;
    
}; */


const User = mongoose.model('User', userSchema);

export default User;