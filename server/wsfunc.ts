import { CustomWebSocket } from './utilities'
import Message from './models/messages'
import { v4 as uuid } from 'uuid'

export let clients: CustomWebSocket[] = []

export function setClients(newClients: CustomWebSocket[]) {
	clients = newClients
}

export function broadCastMessage(message: any, ws: CustomWebSocket) {
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
}

export async function retrieveAndSendMessages(ws: CustomWebSocket, count: number) {
	const messages = await Message.find({}, { email: 1, message: 1 })
		.sort({ date: -1 })
		.limit(count)
		.lean()

	ws.send(
		JSON.stringify({
			intent: 'old-messages',
			data: messages
		})
	)
}
