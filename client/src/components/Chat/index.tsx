import React, { useEffect, useState } from 'react'
import {
	TextField,
	Button,
	ListItem,
	ListItemAvatar,
	Avatar,
	ListItemText,
	Typography
} from '@material-ui/core'
import { useHistory } from 'react-router-dom'

type Message = {
	user: string
	message: string
	intent: 'chat'
}

function processMessage(payload: string) {
	try {
		return JSON.parse(payload)
	} catch (error) {
		return null
	}
}

export default function Chat() {
	const [chatMessage, setChatMessage] = useState('')
	const [chatMessages, setChatMessages] = useState<Message[]>([])
	const [wsRef, setWSRef] = useState<null | WebSocket>(null)

	const history = useHistory()

	function sendMessage() {
		if (wsRef?.readyState !== WebSocket.OPEN) {
			// websocket not connected
			return
		}

		wsRef.send(JSON.stringify({ message: chatMessage, intent: 'chat' }))
		setChatMessage('')
	}

	useEffect(() => {
		const ws = new WebSocket('ws://localhost:1338/' + localStorage.getItem('token'))

		ws.addEventListener('error', () => {
			alert('Please login first')
			history.replace('/login')
		})

		ws.addEventListener('message', (event) => {
			const data = event.data

			const message: null | Message = processMessage(data)

			if (!message) return

			if (message.intent === 'chat') {
				setChatMessages((oldMessages) => {
					return [...oldMessages, message]
				})
			}
		})

		setWSRef(ws)

		return () => {
			ws.close()
		}
	}, [])

	return (
		<div>
			<h1>Chat Page</h1>
			<div className="chat-box">
				{chatMessages.map((message, index) => {
					return (
						<ListItem alignItems="flex-start" key={index}>
							<ListItemAvatar>
								<Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
							</ListItemAvatar>
							<ListItemText
								primary={message.user}
								secondary={
									<React.Fragment>
										<Typography
											component="span"
											variant="body2"
											color="textPrimary"
										>
											{message.message}
										</Typography>
									</React.Fragment>
								}
							/>
						</ListItem>

						// <div className="message" key={index}>
						// 	<div className="author">{message.user}</div>
						// 	<div className="text">{message.message}</div>
						// </div>
					)
				})}
			</div>

			<TextField
				onChange={(e) => setChatMessage(e.target.value)}
				value={chatMessage}
				multiline
				rows={2}
				variant="outlined"
				color="primary"
			/>

			<Button variant="outlined" color="primary" onClick={sendMessage}>
				Send Message
			</Button>
		</div>
	)
}
