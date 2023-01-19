import React, { useState, useEffect } from 'react'
import apis from '../api'
import { useParams } from 'react-router-dom'
import '../index.css'
import { CustomInsertForm, EditCardDisplay } from '../styles'
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
            let msg = 'Missing values. Please enter for question and answer'
            alert(msg)
        }
    }

    const handleDelete = async (e) => {
        e.preventDefault()
        console.log('in handle delete', e)
        if (window.confirm('Delete this card?')) {
            await apis.delCardById(id)
            //window.location.href = '/cards/' // feels awkard when return backing from this point
            window.location.href = '/'
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
        <div>
            <p>CARD ID: {id}</p>
            <div>
                <CustomInsertForm>
                    <EditCardDisplay>{(!_.isEmpty(card)) ? card.data.question : ''}</EditCardDisplay>
                    <input style={{ marginBottom: '5%' }} name='question' placeholder='Edit question here' />
                    <EditCardDisplay>{!_.isEmpty(card) ? card.data.answer : ''}</EditCardDisplay>
                    <input name='answer' placeholder='Edit answer here' />

                    {/*dont put this button in a div... breaks code in handleEdit*/}
                    <button className='margin-washer center-item' onClick={(e) => handleEdit(e)}>Submit</button>
                    <button onClick={(e) => handleDelete(e)}>Delete Card?</button>
                </CustomInsertForm>
            </div>

            <div className='basic-flex-column'>
                <span>{(!_.isEmpty(edited) ? 'Previous data: ' + card.data.question + ' : ' + card.data.answer : '')}</span>
                {console.log('edited?', edited)}
                <span>{(!_.isEmpty(edited) ? 'New data: ' + edited.data.question + ' : ' + edited.data.answer : '')}</span>
            </div>
        </div>
    )
}