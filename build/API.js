"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
const mongoUri = process.env.MONGO_URI;
app.get('/', (req, res) => {
    res.send('User API is live!');
});
app.post('/register', (req, res) => {
});
app.post('/login', (req, res) => {
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
