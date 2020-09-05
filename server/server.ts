import express from 'express' // ts
import bodyParser from 'body-parser'
import cors from 'cors'
// const express = require('express') // js
import mongoose from 'mongoose'
import User from './models/user'
import jwt from 'jsonwebtoken'

// initializes websocket server
import './websocket'
import { JWT_SECRET_TOKEN } from './utilities'
const app = express()
const PRODUCTION = process.env.NODE_ENV === 'production'

if (PRODUCTION) {
	app.use('/', express.static('/home/ubuntu/webapp/client/build'))
	mongoose.connect('mongodb://localhost:27017/codedamn-live')
} else {
	mongoose.connect(
		'mongodb://admin:0O3lP2MRRmIVZ2WPlUaOPvIiNVDpZZh0aDBisdB2nQtPXB9Ao2oTgRMvG1F4Z6ayDcbj0W0wdkMh4tO25TF7XO7Y@localhost:27017/codedamn-live?authSource=admin'
	)
}

if (process.env.NODE_ENV !== 'production') {
	app.use(cors())
}

app.use(bodyParser.json())

app.get('/', (req, res) => {
	res.sendFile('')
})

app.post('/api/register', async (req, res) => {
	console.log(req.body)

	const { email, password } = req.body

	if (!email || !password) {
		return res.json({ status: 'error', error: 'Invalid email/password' })
	}

	// TODO: Hashing the password
	// bcrypt

	try {
		const user = new User({ email, password })
		await user.save()
	} catch (error) {
		console.log('Error', error)
		res.json({ status: 'error', error: 'Duplicate email' })
	}

	res.json({ status: 'ok' })
})

app.post('/api/login', async (req, res) => {
	console.log(req.body)

	const { email, password } = req.body

	const user = await User.findOne({ email, password }).lean()

	if (!user) {
		return res.json({ status: 'error', error: 'User Not Found' })
	}

	// TODO:
	// 1. Refresh tokens XX
	// 2. Storing JWT in memory instead of localStorage XX

	// Right now:
	// 1. JWT tokens directly
	// 2. localStorage

	// Refresh token -> httpOnly cookie

	const payload = jwt.sign({ email }, JWT_SECRET_TOKEN) // 10-15 minutes

	return res.json({ status: 'ok', data: payload })
})

app.listen(1337)
