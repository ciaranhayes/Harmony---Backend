import mongoose from "mongoose";

const userSchema = new mongoose.Schema ({
    username: { type: String, required: true, unique: true},
    firstName: { type: String, required: true},
    lastName: { type: String, required: true},
    email:{ type: String, required: true, unique: true},
    password:{ type:String, required: true},
    age: { type: Number, required: true},
    genre: {type: [String], required: true}
}, { collection: 'Harmony'});

const loginSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true }
}, { collection: 'Harmony'});

const User = mongoose.model("User", userSchema);
const Login = mongoose.model('Login',loginSchema);

export {User, Login};