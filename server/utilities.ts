import WebSocket from 'ws'

export const JWT_SECRET_TOKEN =
	'sdifHghghdgfhjg&%^@#&^!*@&*@#&^&#^&ysduytruweiyhjfkhdsfjsdgfhjsdgqwuejgdbdshjfgj32234'

export function processMessage(payload: string) {
	try {
		return JSON.parse(payload)
	} catch (error) {
		return null
	}
}

export interface CustomWebSocket extends WebSocket {
	connectionID: string
}
