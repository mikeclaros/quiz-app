import React, { Component } from 'react'
import ReactDOM from 'react-dom/client'
import { Container } from './Client/components/Container'
// import { BrowserRouter, Link, Routes, Route, Router } from 'react-router-dom'
// import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ListCards, InsertCard, UpdateCard } from './Client/pages'


const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <BrowserRouter>
        <Routes>
            <Route>
                <Route path="/" element={<Container />} />
                <Route path="/cards" element={<ListCards />} />
                <Route path="/card" element={<InsertCard />} />
                <Route path="/card/:id" element={<UpdateCard />} />
            </Route>
        </Routes>
    </BrowserRouter>
)