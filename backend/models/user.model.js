import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';


const userSchema = new mongoose.Schema({
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

// pre save hook for password hashing
userSchema.pre("save", async function (next) {
 
    if (!this.isModified("password")) {
        return next();
    }

    const salt = await bcryptjs.genSalt();
    this.password = await bcryptjs.hash(this.password, salt);
    next();
});
  

// pre insertMany hook for password hashing
userSchema.pre("insertMany", async function (next, docs) {
    if (!Array.isArray(docs) || !docs.length) {
        return next(new Error('User list shopuld not be empty'));
    }

    const hashedUsers = docs.map(async user => {
        return await new Promise((resolve, reject) => {
            bcryptjs.genSalt().then(salt => {
                let password = user.password.toString();
                bcryptjs.hash(password, salt).then(hash => {
                    user.password = hash;
                    resolve(user);
                }).catch(e => { reject(e); })
            }).catch(e => { reject(e) });
        })
    })

    docs = await Promise.all(hashedUsers);
    next();
});

// Method for checking if the password given matches the user's password
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcryptjs.compare(enteredPassword, this.password);
}

const User = mongoose.model('User', userSchema);

export default User;