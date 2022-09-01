const express = require('express')
const CardControl = require('../controllers/card-controller')
const router = express.Router()

router.post('/card', CardControl.createCard)
// router.put('/card', CardControl.updateCard)
// router.delete('/card', CardControl.deleteCard)
// router.get('/card/:id', CardControl.getCardById)

module.exports = router

