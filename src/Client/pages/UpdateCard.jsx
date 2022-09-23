import React, { useState, useEffect } from 'react'
import apis from '../api'
import { useParams } from 'react-router-dom'
import '../index.css'
const _ = require('lodash')

export function UpdateCard() {
    const [card, setCard] = useState({})
    const [edited, setEdited] = useState({})
    const { id } = useParams()

    useEffect(() => { getCard() }, [])

    async function getCard() {
        try {
            const res = await apis.getCardById(id)
            console.log('res data??', res.data)
            setCard(() => res.data)
        } catch (error) {
            console.log(error)
        }
    }

    // const handleQuestionEdit = (e) => {
    //     e.preventDefault()
    //     console.log('in handle question edit', e.target.question.value)
    //     editCard(e.target.question.value)
    // }

    // async function editCard(editString) {
    //     try {
    //         const res = await apis.editCard(id, editString)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    // const handleAnswerEdit = (e) => {
    //     e.preventDefault()
    //     console.log('in handle answer edit')
    // }

    const handleEdit = (e) => {
        e.preventDefault()
        console.log("in handle edit", e.target.parentNode)
        let questionEditVal = e.target.parentNode.question.value
        let answerEditVal = e.target.parentNode.answer.value


        console.log(`Question value: ${questionEditVal}\nAnswer value: ${answerEditVal}`)
        if (questionEditVal && answerEditVal) {
            console.log('values entered attempting edit')
            editCard({
                "question": questionEditVal,
                "answer": answerEditVal,
                "display": true
            })
        } else {
            //display prompt to fill each entry
            console.log("missing values")
            let msg = 'Missing values; Please enter for question and answer'
            alert(msg)
        }
    }

    async function editCard(obj) {
        try {
            const res = await apis.editCard(id, obj)
            // window.location.href = '/'
            const newCard = await apis.getCardById(id)
            setEdited(() => newCard.data)
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className='update-form-display'>
            <p>CARD ID: {id}</p>
            <div className='edit-form-display'>
                <form>
                    <div>
                        <span>{(!_.isEmpty(card)) ? card.data.question : ''}</span>
                        <input name='question' placeholder='Edit question here' />
                    </div>
                    <div>
                        <span>{!_.isEmpty(card) ? card.data.answer : ''}</span>
                        <input name='answer' placeholder='Edit answer here' />
                    </div>
                    <button onClick={(e) => handleEdit(e)}>Submit</button>
                </form>
            </div>

            <div className='basic-flex-column'>
                <span>{(!_.isEmpty(edited) ? 'Previous data: ' + card.data.question + ' : ' + card.data.answer : '')}</span>
                {console.log('edited?', edited)}
                <span>{(!_.isEmpty(edited) ? 'New data: ' + edited.data.question + ' : ' + edited.data.answer : '')}</span>
            </div>
        </div>
    )
}