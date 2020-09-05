import WebSocket from 'ws'
import { processMessage, CustomWebSocket, JWT_SECRET_TOKEN } from './utilities'
import Message from './models/messages'
import { v4 as uuid } from 'uuid'
import http from 'http'
import jwt from 'jsonwebtoken'

const server = http.createServer()
const wss = new WebSocket.Server({ noServer: true })

let clients: CustomWebSocket[] = []

wss.on('connection', function connection(ws: CustomWebSocket) {
	// a single client has joined

	clients.push(ws)

	ws.on('close', () => {
		clients = clients.filter((generalSocket) => generalSocket.connectionID !== ws.connectionID)
	})

	ws.on('message', function incoming(payload) {
		const message = processMessage(payload.toString())
		if (!message || message.intent !== 'chat') {
			// corrupted message from client
			// ignore
			return
		}

		console.log(message)

		const newMessage = new Message({
			email: ws.connectionID,
			message: message.message,
			date: Date.now()
		})

		newMessage.save()

		// broadcast it to all clients
		for (let i = 0; i < clients.length; i++) {
			const client = clients[i]
			client.send(
				JSON.stringify({
					message: message.message,
					user: ws.connectionID,
					intent: 'chat'
				})
			)
		}
	})
})

server.on('upgrade', function upgrade(request, socket, head) {
	// This function is not defined on purpose. Implement it with your own logic.

	const token = request.url.slice(1) // / + jwt token

	let email: string = ''

	try {
		const payload: any = jwt.verify(token, JWT_SECRET_TOKEN)
		email = payload.email
	} catch (error) {
		//
		socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n')
		socket.destroy()
		return
	}

	wss.handleUpgrade(request, socket, head, function done(ws) {
		const _ws = ws as CustomWebSocket

		_ws.connectionID = email

		wss.emit('connection', _ws, request)
	})
	// })
})

server.listen(1338)
