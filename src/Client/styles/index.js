import styled from 'styled-components'

export const LabelStatusCustomDiv = styled.div`
display: flex;
width: 50%;
padding: 10px 10px;
border-radius: 8px;
margin-top: 5px;
margin-left: auto;
margin-right: auto;
word-break: break-all;
hyphens: manual;
background: ${props => props.background};
`