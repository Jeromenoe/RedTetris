import styled from 'styled-components'

export const StyledTetrisWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	/* justify-content: center; */
	height: 100%;
	width: 100%;
`

export const StyledTetris = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	border-radius: 8px;
	height: 65vh;
	width: 70vw;
	min-width: 750px;
	min-height: 550px;
	background-color: rgba(110, 110, 110, 0.3);
	border: 1px solid;
	box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
`

export const StyledBoard = styled.div`
	display: flex;
	justify-content: center;
`

export const StyledTetrisContainer = styled.div`
	width: 100%;
	height: 100%;
	position: relative;
	display: flex;
	align-items: center;
	justify-content: space-evenly;
`