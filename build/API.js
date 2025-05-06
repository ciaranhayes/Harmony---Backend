"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./database/db"));
dotenv_1.default.config();
(0, db_1.default)();
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
const mongoUri = process.env.MONGO_URI;
app.get('/', (req, res) => {
    res.send('User API is live!');
});
app.get('/user/:_id', (req, res, next) => {
    // if the user ID is 0, skip to the next route
    if (req.params._id === '0')
        next('route');
    // otherwise pass the control to the next middleware function in this stack
    else
        next();
}, (req, res, next) => {
    // send a regular response
    res.send('Welcome');
});
// handler for the /user/:id path, which sends a special response
app.get('/user/:id', (req, res, next) => {
    res.send('special');
});
app.post('/register', (req, res) => {
});
app.post('/login', (req, res) => {
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
