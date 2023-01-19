import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { NavContainer, StyledLink } from './NavElements'


export function TopNavBar() {



    return (
        <NavContainer>
            <StyledLink to='/'>Home</StyledLink>
            <StyledLink to='/card/'>Add Card</StyledLink>
            <StyledLink to='/cards/'>See Cards</StyledLink>
        </NavContainer>
    )
}