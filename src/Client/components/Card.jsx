import React, { useState, useEffect } from 'react';
import axios from 'axios';
import apis from '../api';

export function Card({ value }) {
    const [cards, setCards] = useState([])
    const [curIndex, setCurIndex] = useState(-1)
    useEffect(() => { handleValue(value) }, [value])


    function handleValue(data) {
        setCards(() => data)
        let randIndex = Math.floor(Math.random() * data.length) //random number from range max min: (max -min) + min -> (data.length -0) - 0
        setCurIndex(() => randIndex)
    }

    const handleNext = (e) => {
        e.preventDefault()
        setCurIndex(() => {
            if (curIndex + 1 < cards.length) {
                return curIndex + 1
            } else {
                return 0
            }
        })
    }

    const handlePrev = (e) => {
        e.preventDefault()
        setCurIndex(() => {
            if (curIndex - 1 < 0) {
                return cards.length - 1
            } else {
                return curIndex - 1
            }
        })
    }

    return (
        <div >
            <div className='card-display'>
                <div>
                    <div>
                        {console.log('index ?', curIndex)}
                        {(cards.length > 0 && cards != undefined) ? cards[curIndex].question : ''}
                    </div>
                </div>
            </div>

            <div className='padding'>
                <form className='form'>
                    <button id="prev" onClick={(e) => handlePrev(e)}>Prev</button>
                    <button id="submit">Submit</button>
                    <button id="next" onClick={(e) => handleNext(e)}>Next</button>
                </form>
            </div>

            {/* {data.map((item, index) => <li key={index}>{item.question}</li>)} */}
        </div>
    )


}
