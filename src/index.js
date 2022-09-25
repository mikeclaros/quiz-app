import React, { Component } from 'react'
import ReactDOM from 'react-dom/client'
import { DataContainer } from './Client/components/DataContainer'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ListCards, InsertCard, UpdateCard } from './Client/pages'


const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <BrowserRouter>
        <Routes>
            <Route>
                <Route path="/" element={<DataContainer />} />
                <Route path="/cards" element={<ListCards />} />
                <Route path="/card" element={<InsertCard />} />
                <Route path="/card/:id" element={<UpdateCard />} />
            </Route>
        </Routes>
    </BrowserRouter>
)