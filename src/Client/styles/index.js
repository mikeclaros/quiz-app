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

export const CustomTextArea = styled.textarea`
    resize: none;
    display: flex;
    margin-left: auto;
    margin-right: auto;
    align-items: center;
    width: 50%;
    height: 100px;
`

export const CustomInsertForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 300px;
`

export const EditCardDisplay = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 15em;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 5%;
    width: 50%;
    word-break: break-all;
    hyphens: manual;
`