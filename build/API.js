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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./database/db"));
const userModel_1 = __importDefault(require("./models/userModel"));
const express_jwt_1 = require("express-jwt");
dotenv_1.default.config();
(0, db_1.default)();
const app = (0, express_1.default)();
const port = 3000;
const user = userModel_1.default;
const JWT_SECRET = process.env.JWT_SECRET;
const jwtMiddleware = (0, express_jwt_1.expressjwt)({ secret: JWT_SECRET, algorithms: ['HS256'] });
app.use(express_1.default.json());
const mongoUri = process.env.MONGO_URI;
app.get('/', (req, res) => {
    res.send('User API is live!');
});
app.get('/user/:_id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // if the user ID is 0, skip to the next route
    if (req.params._id === '0')
        next('route');
    // otherwise pass the control to the next middleware function in this stack
    else
        next();
}), (req, res, next) => {
    // send a regular response
    res.send('Welcome');
});
// handler for the /user/:id path, which sends a special response
app.get('/user/:_id', (req, res, next) => {
    res.send('special');
});
app.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password, firstName, lastName, age, genre } = req.body;
        if (!username || !password || !firstName || !lastName || !age || !genre) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const existingUser = yield userModel_1.default.findOne({ username });
        if (existingUser) {
            return res.status(409).json({ message: 'Username already taken' });
        }
        const newUser = new userModel_1.default({
            username,
            firstName,
            lastName,
            age,
            genre,
            password
        });
        yield newUser.save();
        return res.status(201).json({ message: 'User registered successfully' });
    }
    catch (err) {
        return res.status(500).json({ message: 'Server error' });
    }
}));
// app.post('/login', (req: Request, res: Response) => {
// const { username, password } = req.body;
// // In a real-world app, you'd validate the user against your database
// if (username === 'user' && password === 'password') {
//     // Generate a JWT token
//     const token = jwt.sign({ username }, secret, { expiresIn: '1h' });
//     return res.json({ token });
// }
// return res.status(401).json({ message: 'Invalid credentials' });
// });
// // Protected route, accessible only with a valid JWT (Bearer token)
// app.get('/protected', jwtMiddleware, (req, res) => {
// res.send('This is a protected route. You are authenticated with a Bearer token!');
// });
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
