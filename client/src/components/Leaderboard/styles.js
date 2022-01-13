import styled from 'styled-components'

export const StyledLeaderboardContainer = styled.div`
	visibility: ${props => props.gameOver === true ? "visible" : "hidden"};
	opacity: ${props => props.gameOver === true ? "1" : "0"};
	transition:visibility 0.3s linear,opacity 0.3s linear;

	background-color: rgba(0, 0, 0, 0.7);
	position: absolute;
	left: 0; 
	top: 0; 
	width: 100%; 
	height:100%;
	display: flex;
	justify-content: center;
	align-items: center;
	/* font-family: 'Press Start 2P', cursive; */
`

export const StyledLeaderboard = styled.div`
	/* background-color: hsl(210, 70%, 45%); */
	background-color: rgb(200, 54, 67);
	box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
	color: #fff;
	text-align: center;
	border-radius: 6px;
	padding: 8px 0;
	width: 50%;
	min-width: 310px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`