"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Login = exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    age: { type: Number, required: true },
    genre: { type: [String], required: true }
}, { collection: 'Harmony' });
const loginSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true }
}, { collection: 'Harmony' });
const User = mongoose_1.default.model("User", userSchema);
exports.User = User;
const Login = mongoose_1.default.model('Login', loginSchema);
exports.Login = Login;
