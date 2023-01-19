import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { UpdateCard } from '../pages'

export function EditForm({ value }) {
    const [id, setId] = useState('')

    useEffect(() => { handleData(value) })

    const handleData = (value) => {
        if (value != undefined && value != '')
            setId(() => value)
    }


    const handleClick = (e) => {
        e.preventDefault()
        console.log('in form? what is id', id)
        if (id != undefined && id != '')
            window.location.href = `/card/${id}`
    }

    return (
        <div>
            <button onClick={handleClick}>Edit Card</button>
        </div>
    )
}