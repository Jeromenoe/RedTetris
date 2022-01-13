import styled from 'styled-components'

export const StyledBlockNextPieces = styled.div`
	background: rgb(229, 231, 233);
	margin: 10px 20px 11px 8px;
	padding: 5px 5px;
	border: 1px solid rgb(231, 76, 60);
	width: 100px;
	display: flex;
	flex-direction: column;
	align-items: center;
`

export const StyledContainerNextPiece = styled.div`
	height: 40px;
	padding: 5px 10px;
	display: flex;
	align-items: center;
`


export const StyledNextPiece = styled.div`
	display: grid;
	grid-template-rows: repeat(
		${props => props.height}, 19px);
	grid-template-columns: repeat(${props => props.width}, 19px);
	width: calc(${props => props.width} * 20px);
	grid-gap: 1px ;
`

export const StyledTitleNextPieces = styled.h1`
	border-bottom: 1px solid rgb(231, 76, 60);
	margin: 0px;
	margin-bottom: 4px;
	color: rgb(231, 76, 60);
	font-size: 12px;
	font-family: 'Press Start 2P', cursive;
	width: 100%;
`