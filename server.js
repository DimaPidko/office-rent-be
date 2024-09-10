const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())

const PORT = process.env.PORT || 3307
app.listen(PORT, () => {
	console.log(`Server started at PORT - ${PORT}`)
})