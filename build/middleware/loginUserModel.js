"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const loginSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true }
});
const Login = mongoose_1.default.model('Login', loginSchema);
exports.default = Login;
