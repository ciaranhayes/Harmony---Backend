import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import { User } from '../models/userModel';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;
if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
}


async function loginUser (req: Request, res: Response): Promise<any> {
    try {
    console.log('Login request received');
    const { username, password } = req.body;

    if (!username || !password) {
        res.status(400).json({ message: 'Username and password required' });
        return
    }

    const user = await User.findOne({ username });
    if (!user) {
        res.status(401).json({ message: 'Invalid username or password' });
        return;
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        res.status(401).json({ message: 'Invalid username or password' });
        return;
    }

    const token = jwt.sign(
        { id: user._id, username: user.username },
        JWT_SECRET,
        { expiresIn: '1h' }
    );

    return res.json({ token });

    } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Internal server error' });
    }
};

export {loginUser};