import React, { useState, useEffect } from 'react';
import axios from 'axios';
import apis from '../api';

export function Card() {
    const [data, setData] = useState([])
    const [randIndex, setRanIndex] = useState(0)
    const [cardCount, setCardCount] = useState(-1)

    useEffect(() => { getCardsFromDB() }, [])

    async function getCardsFromDB() {
        try {
            const res = await apis.getCards().then()
            console.log("RESPONSE RECEIVED: ", res.data.data)
            setData(() => res.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    function randomQuestion() {
        return data[Math.floor(Math.random() * data.length)].question //random number from range max min: (max -min) + min -> (data.length -0) - 0
    }

    return (
        <div className='card-display'>
            {console.log('LEN: ', (data.length > 0) ? data.length : 'data not set')}
            <div>
                {(data.length > 0 && data != undefined) ? randomQuestion() : ''}
            </div>
            {/* {data.map((item, index) => <li key={index}>{item.question}</li>)} */}
        </div>
    )


}
