import axios from 'axios';
import React, { useEffect, useState } from 'react';
import apis from '../api';
import '../index.css'
import { Card } from './Card';

export function Container() {
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
        <Card value={cards} />
    )
}