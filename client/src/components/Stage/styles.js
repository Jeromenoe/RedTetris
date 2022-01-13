import styled from 'styled-components'

export const StyledStage = styled.div`
		display: grid;
		grid-template-rows: repeat(
			${props => props.height}, ${props => props.cellSize + 'px'});
		grid-template-columns: repeat(${props => props.width}, ${props => props.cellSize + 'px'});
		grid-gap: 1px ;
		border: 2px solid rgb(231, 76, 60) ;
		background: rgb( 189, 195, 199);
		/* background-color: #ecf0f1; */
		width: ${props => props.width * props.cellSize + props.width + 'px'};
		height: ${props => props.height * props.cellSize + props.height + 'px'};
		margin: 10px;
		padding: 1px;
		margin-right: 0px;
`