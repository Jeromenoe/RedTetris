import styled from 'styled-components'

export const GameSettingsContainer = styled.div`
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.3s linear;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.7);
`

export const ModalContent = styled.div`
    position: absolute;
    border-radius: 6px;
    width: 60%;
    min-width: 550px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 15px;
    border: 1px solid #888;
    margin: auto;
    background-color: rgb(200, 54, 67);
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
	color: #fff;
`