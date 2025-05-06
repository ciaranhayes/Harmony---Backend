import mongoose from 'mongoose';

const loginSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true }
});

const Login = mongoose.model('Login',loginSchema);

export default Login;