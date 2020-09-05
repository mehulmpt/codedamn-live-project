import WebSocket from 'ws'
import { processMessage } from './utilities'

export default function setupWebSocketServer() {
	const wss = new WebSocket.Server({
		port: 1338
	})

	wss.on('connection', function connection(ws) {
		// a single client has joined

		ws.on('message', function incoming(payload) {
			const message = processMessage(payload.toString())
			if (!message) {
				// corrupted message from client
				// ignore
				return
			}

			ws.send(JSON.stringify(message))
		})
	})
}
