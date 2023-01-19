const Card = require('../models/card-model')
const _ = require('lodash/lang')



class ResponseCreator {
    constructor(res) {
        this.res = res
        // below causes return to always display status 400 for some reason
        // this.success = this.res.status(201)
        // this.notFound = this.res.status(404)
        // this.fail = this.res.status(400)
    }

    failStatus(errorMsg) {
        return this.res.status(400).json({
            success: false,
            error: errorMsg
        })
    }

    nothingHere(msg) {
        return this.res.status(404).json({
            success: false,
            error: msg
        })
    }

    okCreated(schemaObj, successMsg) {
        return this.res.status(201).json({
            success: true,
            id: schemaObj._id,
            message: successMsg,
        })
    }

    okStatus(dataReceived, msg) {
        return this.res.status(200).json({
            success: true,
            data: dataReceived,
            message: msg
        })
    }

    checkBody(body) {
        let msg = 'NO DATA!'
        if (!body || _.isEmpty(body)) {
            return this.failStatus(msg)
        }
    }
}


var createCard = async (req, res) => {
    let responseObj = new ResponseCreator(res)
    const body = req.body
    responseObj.checkBody(body)

    const card = new Card(body)
    if (!card) {
        return responseObj.failStatus('unable to create card')
    }

    card.save().then(() => {
        return responseObj.okCreated(card, 'Card created!')
    }).catch(error => {
        console.log('ERROR MESSAGE: ', error)
        return responseObj.failStatus('Card not created')
    })
}

var updateCard = async (req, res) => {
    let responseObj = new ResponseCreator(res)
    const body = req.body
    responseObj.checkBody(body)

    Card.findOne({ _id: req.params.id }, (err, card) => {
        if (err) {
            return responseObj.failStatus(err)
        }
        card.display = body.display
        card.question = body.question
        card.answer = body.answer
        card.title = body.title

        card.save().then(() => {
            return responseObj.okStatus(Card, `Update OK new data: ${card.question} | ${card.answer}`)
        }).catch(error => {
            return responseObj.failStatus(error)
        })

    })
}

var getCards = async (req, res) => {
    let responseObj = new ResponseCreator(res)

    await Card.find({}, (err, cards) => {
        if (err) return responseObj.failStatus(err)
        if (_.isEmpty(cards)) return responseObj.nothingHere('no cards!')
        return responseObj.okStatus(cards, "Cards Found!")
    }).clone().catch(err => console.log(err))
}

var getCardById = async (req, res) => {
    let responseObj = new ResponseCreator(res)
    await Card.findOne({ _id: req.params.id }, (err, card) => {
        if (err || !card) return responseObj.failStatus((err) ? err : 'card not found')
        return responseObj.okStatus(card, 'Card Found!')
    }).catch(err => console.log(err))
}

var deleteCard = async (req, res) => {
    let responseObj = new ResponseCreator(res)
    await Card.deleteOne({ _id: req.params.id }, (err, card) => {
        if (err) return responseObj.failStatus(err)
        if (card.deletedCount === 0) return responseObj.nothingHere('no cards to delete!')
        return responseObj.okStatus(card, 'Card found...to be deleted!')
    }).catch(err => console.log(err))
}

module.exports = {
    createCard,
    updateCard,
    getCards,
    getCardById,
    deleteCard
}