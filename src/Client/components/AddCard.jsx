import React, { useState, useEffect } from 'react'


export function AddCard() {

    const handleNew = (e) => {
        e.preventDefault()
        window.location.href = '/card/'
    }


    return (
        <div>
            <button id="newCard" onClick={(e) => handleNew(e)}>Add Card</button>
        </div>
    )
}