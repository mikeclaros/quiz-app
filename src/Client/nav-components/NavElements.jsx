import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const NavContainer = styled.div`
        display: flex;
        justify-content: space-evenly;
        margin-top: -15px;
        background: lightblue;
        padding: 18px 20px;
        border-radius: 8px;
        color: black;
    `

export const StyledLink = styled(Link)`
    color: blue;
    display: flex;
    align-items: center;
    cursor: pointer;
    text-decoration: none;
    &.active{
        color: white;
    }
`