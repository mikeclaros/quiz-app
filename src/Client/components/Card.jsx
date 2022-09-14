import React, { useState, useEffect } from 'react';
import axios from 'axios';
import apis from '../api';

export function Card({ value }) {
    const [cards, setCards] = useState([])
    useEffect(() => { handleValue(value) })


    function handleValue(value) {
        setCards(() => value)
    }

    function randomQuestion() {
        return cards[Math.floor(Math.random() * cards.length)].question //random number from range max min: (max -min) + min -> (data.length -0) - 0
    }

    return (
        <div >
            <div className='card-display'>
                <div>
                    <div>
                        {(cards.length > 0 && cards != undefined) ? randomQuestion() : console.log('Error!', cards)}
                    </div>
                </div>
            </div>

            <div className='padding'>
                <form className='form'>
                    <button id="prev">Prev</button>
                    <button id="submit">Submit</button>
                    <button id="next">Next</button>
                </form>
            </div>

            {/* {data.map((item, index) => <li key={index}>{item.question}</li>)} */}
        </div>
    )


}
