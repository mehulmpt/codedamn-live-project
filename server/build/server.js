"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); // ts
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
// const express = require('express') // js
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = __importDefault(require("./models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// initializes websocket server
require("./websocket");
const utilities_1 = require("./utilities");
const app = express_1.default();
const PRODUCTION = process.env.NODE_ENV === 'production';
if (PRODUCTION) {
    app.use(express_1.default.static('/home/ubuntu/webapp/client/build'));
    mongoose_1.default.connect('mongodb://localhost:27017/codedamn-live');
}
else {
    mongoose_1.default.connect('mongodb://admin:0O3lP2MRRmIVZ2WPlUaOPvIiNVDpZZh0aDBisdB2nQtPXB9Ao2oTgRMvG1F4Z6ayDcbj0W0wdkMh4tO25TF7XO7Y@localhost:27017/codedamn-live?authSource=admin');
}
if (process.env.NODE_ENV !== 'production') {
    app.use(cors_1.default());
}
app.use(body_parser_1.default.json());
app.post('/api/register', async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;
    if (!email || !password) {
        return res.json({ status: 'error', error: 'Invalid email/password' });
    }
    // TODO: Hashing the password
    // bcrypt
    try {
        const user = new user_1.default({ email, password });
        await user.save();
    }
    catch (error) {
        console.log('Error', error);
        res.json({ status: 'error', error: 'Duplicate email' });
    }
    res.json({ status: 'ok' });
});
app.post('/api/login', async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;
    const user = await user_1.default.findOne({ email, password }).lean();
    if (!user) {
        return res.json({ status: 'error', error: 'User Not Found' });
    }
    // TODO:
    // 1. Refresh tokens XX
    // 2. Storing JWT in memory instead of localStorage XX
    // Right now:
    // 1. JWT tokens directly
    // 2. localStorage
    // Refresh token -> httpOnly cookie
    const payload = jsonwebtoken_1.default.sign({ email }, utilities_1.JWT_SECRET_TOKEN); // 10-15 minutes
    return res.json({ status: 'ok', data: payload });
});
app.listen(1337);
