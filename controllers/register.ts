import { User } from '../models/userModel';
import { Request, Response } from 'express';


async function registerUser(req: Request, res: Response): Promise<any> {
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

        const newUser = new User({
            username: username,
            firstName: firstName,
            lastName: lastName,
            email: email,
            age: age,
            genre: genre
        });

        await newUser.save();

        res.json(newUser);
    } catch (error) {
        console.error("Register error:", error); // 🔍 This helps you debug
        res.status(500).json({ message: "Failed to register" });
    }
}

export {registerUser}