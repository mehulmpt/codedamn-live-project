import React, { useState } from 'react'
import { TextField, Button } from '@material-ui/core'
import './style.css'
import { apiCall } from '../../utility'

export default function Register() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	async function loginUser() {
		const res = await apiCall('/api/login', { email, password })

		if (res.status === 'ok') {
			// TODO: Bad practice -> refresh tokens
			localStorage.setItem('token', res.data)
			alert('You are logged in')
		} else {
			alert(res.error)
		}
	}

	return (
		<div className="form">
			<h1>Login</h1>
			<form className="register-fields">
				<TextField
					fullWidth
					placeholder="you@awesome.com"
					label="Your Email"
					value={email}
					onChange={(e: any) => setEmail(e.target.value)}
					variant="outlined"
				/>
				<TextField
					fullWidth
					value={password}
					onChange={(e: any) => setPassword(e.target.value)}
					placeholder="p@$$w0rd"
					label="Password"
					variant="outlined"
				/>
				<Button color="primary" variant="contained" onClick={loginUser}>
					Login
				</Button>
			</form>
		</div>
	)
}
