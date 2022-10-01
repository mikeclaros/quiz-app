import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { LabelStatusCustomDiv as StyledDiv } from '../styles'


export function StatusLabel({ value }) {
    const [grade, setGrade] = useState('')

    useEffect(() => { handleData(value) }, [value])

    function handleData(value) {
        let { statusMap, curId } = value
        setGrade(() => statusMap.get(curId))
    }

    return (
        <div>
            <StyledDiv background={(grade === 'PASS') ? '#0dc757' : (grade === 'WRONG') ? '#d9322b' : 'white'} />
        </div>
    )
}