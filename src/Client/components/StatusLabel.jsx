import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { LabelStatusCustomDiv as StyledDiv } from '../styles'


export function StatusLabel({ value }) {
    const [grade, setGrade] = useState('')

    useEffect(() => { handleData(value) }, [value])

    function handleData(value) {
        setGrade(() => value.grade)
    }

    return (
        <div>
            <StyledDiv background={(grade === 'PASS') ? '#0dc757' : (grade === 'WRONG') ? '#d9322b' : 'white'} />
        </div>
    )
}