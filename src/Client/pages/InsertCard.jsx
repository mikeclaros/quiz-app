import React, { useState, useEffect } from 'react'
import apis from '../api'
import { useParams } from 'react-router-dom'
import { CustomInsertForm, CustomTextArea } from '../styles'



const _ = require('lodash')




export function InsertCard() {
    const [card, setCard] = useState({})
    const [cardId, setCardId] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('Insert card, submitted: ', e)
        let q = e.target.parentNode.question.value
        let a = e.target.parentNode.answer.value

        if (q && a) {
            createCard({
                "question": q,
                "answer": a,
                "display": true
            })
        } else {
            alert("Please Enter both a question and an answer!")
        }
    }

    async function createCard(pl) {
        try {
            const res = await apis.newCard(pl)
            console.log('create card que es?', res.data.id)
            let id = res.data.id
            const cardResponse = await apis.getCardById(id)

            setCard(() => cardResponse.data)
            setCardId(() => id)
        } catch (error) {
            console.log(error)
        }
    }

    function textAreaCreator(title, placeholderTitle) {
        return <CustomTextArea name={title} placeholder={placeholderTitle} maxLength='256' resize='none' />
    }

    return (
        <div>
            <CustomInsertForm>
                <p>Enter New Card Data</p>
                {textAreaCreator('question', 'Enter Question Here')}
                {textAreaCreator('answer', 'Enter Answer Here')}
                <button onClick={(e) => handleSubmit(e)}>Submit</button>
            </CustomInsertForm>
            <div className='basic-flex-column'>
                {/*for debugging */}
                {/* <span>{(!_.isEmpty(card)) ? 'Question entered: ' + card.data.question + ' | Answer entered: ' + card.data.answer : ''}</span>
                <span>{(!_.isEmpty(card)) ? `Card ID: ${cardId}` : ''}</span> */}
                <span>{!_.isEmpty(card) ? 'Card saved!' : ''}</span>
            </div>
        </div>
    )
}
