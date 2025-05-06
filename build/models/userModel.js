"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    _id: { type: Number, required: true },
    username: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    genre: { type: [String], required: true }
}, { collection: 'Harmony' });
const loginSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true }
});
const User = mongoose_1.default.model("User", userSchema);
const Login = mongoose_1.default.model('Login', loginSchema);
exports.default = User;
