import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getStage } from '../../selectors/game';

import Cell from '../Cell/index';
import { StyledStage } from './styles';

const CELL_SIZE = 21;

const Stage = () => {
	useEffect(() => {
		if (document.getElementById("styledTetrisWrapper")) {
			if (document.getElementById("styledTetrisWrapper") !== document.activeElement) {
				document.getElementById("styledTetrisWrapper").focus();
			}
		}
	}, []);
	const stage = useSelector(getStage);
	return (
		<StyledStage width={stage[0].length} height={stage.length} cellSize={CELL_SIZE}>
			{stage.map(row => row.map((cell, x) => <Cell key={x} type={cell}/>))}
		</StyledStage>
	)
}

export default Stage;