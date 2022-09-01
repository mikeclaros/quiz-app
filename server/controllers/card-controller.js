const Card = require('../models/card-model')
const _ = require('lodash/lang')



class ResponseCreator {
    constructor(res) {
        this.res = res
        this.success = this.res.status(201)
        this.fail = this.res.status(400)
    }

    failStatus(errorMsg) {
        return this.fail.json({
            success: false,
            error: errorMsg
        })
    }

    okStatus(schemaObj, successMsg) {
        return this.success.json({
            success: true,
            id: schemaObj._id,
            message: successMsg,
        })
    }

    okStatusDataDump(cards, msg) {
        return this.success.json({
            success: true,
            data: cards,
            message: msg
        })
    }

    okStatusOne(card, msg) {
        return this.success.json({
            success: true,
            data: card,
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
        return responseObj.okStatus(card, 'Card created!')
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
        if (err || _.isEmpty(cards)) return responseObj.failStatus((err) ? err : 'cards list empty')
        return responseObj.okStatusDataDump(cards, "Cards Found!")
    }).catch(err => console.log(err))
}

var getCardById = async (req, res) => {
    let responseObj = new ResponseCreator(res)
    await Card.findOne({ _id: req.params.id }, (err, card) => {
        if (err || !card) return responseObj.failStatus((err) ? err : 'card not found')
        return responseObj.okStatusOne(card, 'Card Found!')
    }).catch(err => console.log(err))
}

module.exports = {
    createCard,
    updateCard,
    getCards,
    getCardById
}