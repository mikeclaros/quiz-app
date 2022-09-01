const express = require('express')
const CardControl = require('../controllers/card-controller')
const router = express.Router()

router.post('/card', CardControl.createCard)        //ex. localhost:3000/api/card/
router.put('/card/:id', CardControl.updateCard)     //ex. localhost:3000/api/card/631011a493858a7f4d69b0a4
router.get('/cards', CardControl.getCards)
// router.get('/card/:id', CardControl.getCardById)
// router.delete('/card', CardControl.deleteCard)

module.exports = router

