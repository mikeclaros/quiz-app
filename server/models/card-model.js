const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Card = new Schema({
    display: { type: Boolean, required: true },
    question: { type: String, required: true },
    answer: { type: String, required: true },
    title: { type: String, required: false }
})

module.exports = mongoose.model('cards', Card)