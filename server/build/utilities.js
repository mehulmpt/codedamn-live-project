"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function processMessage(payload) {
    try {
        return JSON.parse(payload);
    }
    catch (error) {
        return null;
    }
}
exports.processMessage = processMessage;
