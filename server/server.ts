import express from 'express' // ts

// const express = require('express') // js

const app = express()

app.get('/', (req, res) => {
	res.send('ok')
})

app.listen(1337)
