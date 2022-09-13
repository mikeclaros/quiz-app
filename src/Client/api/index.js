import axios from 'axios'

const api = axios.create({ baseURL: 'http://localhost:3000/api' })

const newCard = (pl) => api.post(`/card`, pl)
const editCard = (id, pl) => api.put(`/cards/:${id}`, pl)
const getCards = () => api.get(`/cards`)
const getCardById = (id) => api.get(`/card/${id}`)
const delCardById = (id) => api.delete(`/card/${id}`)

const apis = {
    newCard,
    editCard,
    getCards,
    getCardById,
    delCardById
}

export default apis