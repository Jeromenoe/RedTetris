import styled from 'styled-components'

export const WaitingRoomContainer = styled.div`
    width: 550px;
    border-radius: 25px;
    background-color: rgb(240, 240, 240);
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
`

export const ButtonContainer = styled.div`
    width: 80%;
    display: flex;
    justify-content: space-evenly;
`

export const WaitingRoomHeaderContainer = styled.div`
    width: 80%;
    border-bottom: 2px solid rgb(166, 166, 166);
    display: flex;
    align-items: center;
    justify-content: center;
`

export const WaitingPlayer = styled.li`
    text-align: center;
    list-style: none;
    color: ${props => props.color ? props.color : "white"};
    font-size: 25px;
`