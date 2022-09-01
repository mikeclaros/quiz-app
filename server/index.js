const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 3000
const db = require('./db')
const cardRouter = require('./routes/card-router')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'Connection Error'))

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.use('/api', cardRouter)

app.listen(port, () => console.log(`Server running: port - ${port}`))