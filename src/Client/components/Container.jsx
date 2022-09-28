import React, { useState, useEffect } from 'react'
import { EditForm } from './EditForm'
import { AddCard } from './AddCard'
import { CardDisplay } from './CardDisplay'
import { ListCards } from '../pages'
import { CardListForm } from './CardListForm'


export function Container({ value }) {
    const [cards, setCards] = useState([])
    const [curIndex, setCurIndex] = useState(-1)
    const [grade, setGrade] = useState('')
    const [answer, setAnswer] = useState('')
    const [showAnswer, setShowAnswer] = useState(false)

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
        clearEntryBox(e)
        clearGrade()
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
        clearEntryBox(e)
        clearGrade()
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
        //toggles the hide/show button AND the display of the answer
        e.preventDefault()
        setShowAnswer(() => !showAnswer)
        let answer = cards[curIndex].answer
        setAnswer(() => answer)
        if (showAnswer) {
            //if answer is shown then hide answer
            hideAnswer()
        }
    }

    function hideAnswer() {
        setAnswer(() => '')
    }

    function clearEntryBox(e) {
        // getting input object and replacing value to '' on selecting next or prev
        let inputNode = e.target.parentNode.parentNode.children[2]
        inputNode[0].value = ''
    }

    function clearGrade() {
        setGrade(() => '')
    }

    return (
        <div>
            <CardDisplay value={{ "cards": cards, "answer": answer, "curIndex": curIndex }} />
            <form className='form-display padding'>
                <button id="showButton" onClick={(e) => handleShow(e)}>{(showAnswer) ? 'Hide Answer' : 'Show Answer'}</button>
                <EditForm value={(cards != undefined && cards.length > 0) ? cards[curIndex]._id : ''} />
            </form>
            <form className='form-display padding' onSubmit={(e) => handleAnswer(e)}>
                <input name='answer' placeholder='Enter Answer' />
                <button id="submit">Submit</button>
            </form>
            <div id="status" className='form-display padding'>
                <div>{(grade != undefined && grade !== '') ? grade : ''}</div>
            </div>
            <div className='btn padding'>
                <button id="prev" onClick={(e) => handlePrev(e)}>Prev</button>
                <button id="next" onClick={(e) => handleNext(e)}>Next</button>
            </div>
        </div>
    )


}
