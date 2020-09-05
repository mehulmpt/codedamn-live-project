import express from 'express' // ts
import bodyParser from 'body-parser'
import cors from 'cors'
// const express = require('express') // js

const app = express()

if (process.env.NODE_ENV !== 'production') {
	app.use(cors())
}

app.use(bodyParser.json())

app.get('/', (req, res) => {
	res.send('ok')
})

app.post('/api/register', (req, res) => {
	console.log(req.body)

	res.json({ status: 'ok' })
})

app.listen(1337)
