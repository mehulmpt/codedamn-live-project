"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_SECRET_TOKEN = 'sdifHghghdgfhjg&%^@#&^!*@&*@#&^&#^&ysduytruweiyhjfkhdsfjsdgfhjsdgqwuejgdbdshjfgj32234';
function processMessage(payload) {
    try {
        return JSON.parse(payload);
    }
    catch (error) {
        return null;
    }
}
exports.processMessage = processMessage;
