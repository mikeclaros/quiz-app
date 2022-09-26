import axios from 'axios'
import React, { useEffect, useState } from 'react'
import apis from '../api'
import '../index.css'
import { Container } from "./Container"

export function DataContainer() {
    const [cards, setCards] = useState([])

    useEffect(() => { getCardsFromDB() }, [])

    async function getCardsFromDB() {
        try {
            const res = await apis.getCards().then()
            console.log("RESPONSE RECEIVED: ", res.data.data)
            setCards(() => res.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Container value={cards} />
    )
}