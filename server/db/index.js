const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const user = encodeURIComponent(process.env.USER)
const pass = encodeURIComponent(process.env.PASS)
const cluster = encodeURIComponent("cluster0.85jwg.mongodb.net")
const dbName = encodeURIComponent(process.env.DB_NAME)
const uri = `mongodb+srv://${user}:${pass}@${cluster}/${dbName}`

mongoose.connect(uri, {
    useNewUrlParser: true
}).catch(e => {
    console.log('error: ', e.message)
})

//mongoose.connect(uri, { useNewUrlParser: true }).catch(e => { console.error('Connection error', e.message) })
const db = mongoose.connection
console.log("MONGOOSE CONNECTION OK!")
module.exports = db