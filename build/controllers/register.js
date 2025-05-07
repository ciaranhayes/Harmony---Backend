"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = registerUser;
const userModel_1 = require("../models/userModel");
function registerUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const username = req.body.username;
            const firstName = req.body.firstName;
            const lastName = req.body.lastName;
            const email = req.body.email;
            const age = parseInt(req.body.age, 10);
            const genre = req.body.genre;
            if (!username || !firstName || !lastName || !email) {
                return res.status(400).json({ message: "Missing required fields" });
            }
            const newUser = new userModel_1.User({
                username: username,
                firstName: firstName,
                lastName: lastName,
                email: email,
                age: age,
                genre: genre
            });
            yield newUser.save();
            res.json(newUser);
        }
        catch (error) {
            console.error("Register error:", error); // 🔍 This helps you debug
            res.status(500).json({ message: "Failed to register" });
        }
    });
}
