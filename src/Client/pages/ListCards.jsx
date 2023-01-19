import React, { useState, useEffect } from 'react'
import apis from '../api'
import { CardDisplay } from '../components/CardDisplay'

const _ = require('lodash')

export function ListCards() {
    const [cards, setCards] = useState([])

    useEffect(() => { getCards() }, [])

    async function getCards() {
        try {
            const res = await apis.getCards()
            setCards(() => res.data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='basic-flex-column center-item'>
            <h1>Cards</h1>
            {(!_.isEmpty(cards)) ? cards.data.map((data, index) => <CardDisplay key={index} value={{ "cards": cards.data, "answer": data.answer, "curIndex": index }} />) : console.log('error, ListCards')}
        </div>
    )
}