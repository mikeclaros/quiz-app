const Card = require('../models/card-model')


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
}

var createCard = async (req, res) => {
    let responseObj = new ResponseCreator(res)

    const body = req.body
    if (!body) {
        return responseObj.failStatus('Enter a question')
    }

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

var updateCard = async (req, res) =>{
    let responseObj = new ResponseCreator(res)
    const body = req.body

    if(!body){
        return responseObj.failStatus('Invalid Body')
    }

    Card.findOne({_id: req.params.id}, (err, card) =>{
        if(err){
            return responseObj.failStatus(err)
        }
        card.display = body.display
        card.question = body.question
        card.answer = body.answer
        card.title = body.title

        card.save().then(() =>{
            return responseObj.okStatus(Card, `Update OK new data: ${card.question} | ${card.answer}`)
        }).catch(error =>{
            return responseObj.failStatus(error)
        })
        
    })
}

module.exports = {
    createCard,
    updateCard
}