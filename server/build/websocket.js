"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = __importDefault(require("ws"));
const utilities_1 = require("./utilities");
const http_1 = __importDefault(require("http"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const wsfunc_1 = require("./wsfunc");
const server = http_1.default.createServer();
const wss = new ws_1.default.Server({ noServer: true });
wss.on('connection', function connection(ws) {
    // a single client has joined
    wsfunc_1.clients.push(ws);
    ws.on('close', () => {
        wsfunc_1.setClients(wsfunc_1.clients.filter((generalSocket) => generalSocket.connectionID !== ws.connectionID));
    });
    ws.on('message', function incoming(payload) {
        const message = utilities_1.processMessage(payload.toString());
        if (!message) {
            // corrupted message from client
            // ignore
            return;
        }
        console.log(message, 'is the message');
        if (message.intent === 'chat') {
            wsfunc_1.broadCastMessage(message, ws);
        }
        else if (message.intent === 'old-messages') {
            const count = message.count;
            if (!count)
                return;
            wsfunc_1.retrieveAndSendMessages(ws, count);
        }
    });
});
server.on('upgrade', function upgrade(request, socket, head) {
    // This function is not defined on purpose. Implement it with your own logic.
    const token = request.url.slice(1); // / + jwt token
    let email = '';
    try {
        const payload = jsonwebtoken_1.default.verify(token, utilities_1.JWT_SECRET_TOKEN);
        email = payload.email;
    }
    catch (error) {
        //
        socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
        socket.destroy();
        return;
    }
    wss.handleUpgrade(request, socket, head, function done(ws) {
        const _ws = ws;
        _ws.connectionID = email;
        wss.emit('connection', _ws, request);
    });
    // })
});
server.listen(1338);
