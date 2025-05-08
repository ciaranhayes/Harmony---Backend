import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import connectDB from './database/db';
import jwt from 'jsonwebtoken';
import { User } from './models/userModel';
import { expressjwt } from 'express-jwt';
import bodyParser from 'body-parser';
import { registerUser } from './controllers/register';
import { loginUser } from './controllers/login';

dotenv.config();


const app = express()
const port: number = 3000;
const user = User;
const JWT_SECRET = process.env.JWT_SECRET as string;

const jwtMiddleware = expressjwt({ secret: JWT_SECRET, algorithms: ['HS256'] });

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const mongoUri = process.env.MONGO_URI

app.get('/', (req, res) => {
res.send('User API is live!');
})

app.get('/user/:_id', async (req, res, next) => {
    if (req.params._id === '0') next('route')
    else next()
}, (req, res, next) => {
    res.send('Welcome')
})

app.post('/register', registerUser);

app.post('/login', loginUser);

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`✅ Connected to MongoDB`);
        console.log(`🚀 Server is running on http://localhost:${port}`);
    });
}).catch((error) => {
    console.error('❌ Failed to connect to MongoDB:', error.message);
});