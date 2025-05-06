import mongoose from "mongoose";

const userSchema = new mongoose.Schema ({
    _id: { type: Number, required: true},
    username: { type: String, required: true, unique: true},
    firstName: { type: String, required: true},
    lastName: { type: String, required: true},
    email:{ type: String, required: true, unique: true},
    age: { type: Number, required: true},
    genre: {type: [String], required: true}
}, { collection: 'Harmony'});

const loginSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true }
});

const User = mongoose.model("User", userSchema);
const Login = mongoose.model('Login',loginSchema);

export default User;