"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); // ts
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
// const express = require('express') // js
const app = express_1.default();
if (process.env.NODE_ENV !== 'production') {
    app.use(cors_1.default());
}
app.use(body_parser_1.default.json());
app.get('/', (req, res) => {
    res.send('ok');
});
app.post('/api/register', (req, res) => {
    console.log(req.body);
    res.json({ status: 'ok' });
});
app.listen(1337);
