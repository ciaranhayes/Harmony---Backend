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
const userModel_1 = require("./models/userModel");
const express_jwt_1 = require("express-jwt");
const body_parser_1 = __importDefault(require("body-parser"));
const register_1 = require("./controllers/register");
const login_1 = require("./controllers/login");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 3000;
const user = userModel_1.User;
const JWT_SECRET = process.env.JWT_SECRET;
const jwtMiddleware = (0, express_jwt_1.expressjwt)({ secret: JWT_SECRET, algorithms: ['HS256'] });
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
const mongoUri = process.env.MONGO_URI;
app.get('/', (req, res) => {
    res.send('User API is live!');
});
app.get('/user/:_id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.params._id === '0')
        next('route');
    else
        next();
}), (req, res, next) => {
    res.send('Welcome');
});
app.post('/register', register_1.registerUser);
app.post('/login', login_1.loginUser);
(0, db_1.default)().then(() => {
    app.listen(port, () => {
        console.log(`✅ Connected to MongoDB`);
        console.log(`🚀 Server is running on http://localhost:${port}`);
    });
}).catch((error) => {
    console.error('❌ Failed to connect to MongoDB:', error.message);
});
