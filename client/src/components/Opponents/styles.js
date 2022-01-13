import styled from 'styled-components'

export const StyledOpponentSpectrum = styled.div`
	display: grid;
	grid-template-rows: repeat(
		${props => props.height}, 7px);
	grid-template-columns: repeat(${props => props.width}, 7px);
	border: 2px solid rgb(231, 76, 60);
	border-top: 0px;
	background-color: rgb(93, 173, 226);
	width: 70px;
	height: 160px;
	margin: 6px;
`

export const StyledOpponentsBlock = styled.div`
	display: grid;
	grid-row-gap: 15px;
	grid-template-rows: repeat(2, 170px);
	grid-template-columns: repeat(${props => props.nbOpponents === 1 ? 1 : (props.nbOpponents / 2)}, 80px);
	grid-auto-flow: column;
	margin-left: 20px;
`

export const StyledOpponentDisplay = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	color: rgb(240, 240, 240);
`