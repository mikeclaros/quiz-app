import React, { useState, useEffect } from 'react';
import axios from 'axios';
import apis from '../api';

export function Card({ value }) {
    const [cards, setCards] = useState([])
    const [curIndex, setCurIndex] = useState(-1)
    const [grade, setGrade] = useState('')
    const [showAnswer, setShowAnswer] = useState('')

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
        hideAnswer()
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
        hideAnswer()
    }

    const handleAnswer = (e) => {
        e.preventDefault()
        let userAnswer = e.target.answer.value.toLowerCase()
        let cardAnswer = cards[curIndex].answer.toLowerCase()
        if (userAnswer !== cardAnswer) {
            setGrade(() => 'WRONG')
        } else {
            setGrade(() => 'PASS')
        }
    }

    const handleShow = (e) => {
        e.preventDefault()
        let answer = cards[curIndex].answer
        setShowAnswer(() => answer)
    }

    function hideAnswer() {
        setShowAnswer(() => '')
    }

    return (
        <div>
            <div className='card-display'>
                <div>
                    <div>
                        {(cards.length > 0 && cards != undefined) ? cards[curIndex].question : ''}
                    </div>
                </div>
                <div className='padding'>
                    {(showAnswer != undefined && showAnswer !== '') ? showAnswer : ''}
                </div>
            </div>
            <form className='form-display' onSubmit={(e) => handleShow(e)}>
                <button id="show">Show Answer</button>
            </form>
            <form className='form-display padding' onSubmit={(e) => handleAnswer(e)}>
                <input name='answer' placeholder='Enter Answer' ></input>
                <button id="submit">Submit</button>
            </form>
            <div id="status" className='form-display padding'>
                <div>{(grade != undefined && grade !== '') ? grade : ''}</div>
            </div>
            <div className='btn padding'>
                <button id="prev" onClick={(e) => handlePrev(e)}>Prev</button>
                <button id="next" onClick={(e) => handleNext(e)}>Next</button>
            </div>
            {/* {data.map((item, index) => <li key={index}>{item.question}</li>)} */}
        </div>
    )


}
