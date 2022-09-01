const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const uri = `mongodb+srv://shiba:${process.env.PASS}@cluster0.85jwg.mongodb.net/?retryWrites=true&w=majority`


mongoose.connect(uri).catch(e => { console.error('Connection error', e.message) })
const db = mongoose.connection
console.log("MONGOOSE CONNECTION OK!")
module.exports = db