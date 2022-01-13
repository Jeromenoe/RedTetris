import React from "react";
import { useSelector } from "react-redux";
import { getNextPieces } from "../../selectors/game";

import {
	StyledBlockNextPieces, 
	StyledContainerNextPiece,
	StyledNextPiece,
	StyledTitleNextPieces }
	from "./styles";

import Cell from "../Cell/index";

export const NextPieces = () => {
	const nextPieces = useSelector(getNextPieces);
	return (
		<div>
			<StyledBlockNextPieces>
				<StyledTitleNextPieces>
					NEXT
				</StyledTitleNextPieces>
				{ nextPieces.map((nextPiece, i) => 
					<StyledContainerNextPiece key={i}>
						<StyledNextPiece width={nextPiece[0].length} height={nextPiece.length}>
							{nextPiece.map(row => row.map((cell, x) => <Cell key={x} type={cell === 0 ? 'nextTetro' : cell}/>))}
						</StyledNextPiece>
					</StyledContainerNextPiece>
				)}
			</StyledBlockNextPieces>
		</div>
	);
}