import React, { useState, useEffect } from 'react'


export function CardDisplay({ value }) {
    const [cards, setCards] = useState([])
    const [answer, setAnswer] = useState('')
    const [curIndex, setCurIndex] = useState(-1)

    useEffect(() => { handleData(value) }, [value])

    function handleData(value) {
        setCards(() => value.cards)
        setAnswer(() => value.answer)
        setCurIndex(() => value.curIndex)
    }

    return (
        <div className='card-display'>
            <div>
                <div>
                    {(cards.length > 0 && cards != undefined) ? cards[curIndex].question : ''}
                </div>
            </div>
            <div className='padding'>
                {(answer != undefined && answer !== '') ? answer : ''}
            </div>
        </div>
    )
}