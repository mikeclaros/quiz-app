import React, { useState, useEffect } from 'react'


export function CardListForm() {

    const handleList = (e) => {
        e.preventDefault()
        window.location.href = '/cards/'
    }

    return (
        <div>
            <button id='list' onClick={(e) => handleList(e)}>See Cards</button>
        </div>
    )
}
