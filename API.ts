import express, { NextFunction, Request, Response } from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import connectDB from './database/db'
import jwt from 'jsonwebtoken'
import User from './models/userModel'
import { expressjwt } from 'express-jwt';

dotenv.config();
connectDB();

const app = express()
const port: number = 3000;
const user = User;
const JWT_SECRET = process.env.JWT_SECRET as string;

const jwtMiddleware = expressjwt({ secret: JWT_SECRET, algorithms: ['HS256'] });

app.use(express.json());


const mongoUri = process.env.MONGO_URI

app.get('/', (req, res) => {
res.send('User API is live!');
})

app.get('/user/:_id', async (req, res, next) => {
// if the user ID is 0, skip to the next route
if (req.params._id === '0') next('route')
// otherwise pass the control to the next middleware function in this stack
else next()
}, (req, res, next) => {
// send a regular response
res.send('Welcome')

})

// handler for the /user/:id path, which sends a special response
app.get('/user/:_id', (req, res, next) => {
res.send('special')
})


app.post('/register', async (req: Request, res: Response): Promise<any> => {
try {
const { username, password, firstName, lastName, age, genre } = req.body

if (!username || !password || !firstName || !lastName || !age || !genre) {
    return res.status(400).json({ message: 'All fields are required' })
}

const existingUser = await User.findOne({ username })
if (existingUser) {
    return res.status(409).json({ message: 'Username already taken' })
}


const newUser = new User({
    username,
    firstName,
    lastName,
    age,
    genre,
    password
})

await newUser.save()
return res.status(201).json({ message: 'User registered successfully' })

} catch (err) {
return res.status(500).json({ message: 'Server error' })
}
})

app.post('/login', (req: Request, res: Response) => {
const { username, password } = req.body;

// In a real-world app, you'd validate the user against your database
if (username === 'user' && password === 'password') {
    // Generate a JWT token
    const token = jwt.sign({ username }, secret, { expiresIn: '1h' });
    return res.json({ token });
}

return res.status(401).json({ message: 'Invalid credentials' });
});

// Protected route, accessible only with a valid JWT (Bearer token)
app.get('/protected', jwtMiddleware, (req, res) => {
res.send('This is a protected route. You are authenticated with a Bearer token!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
});

app.listen(port, () => {
console.log(`Example app listening on port ${port}`)
})