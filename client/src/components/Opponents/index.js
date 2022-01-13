import React from 'react';
import { useSelector } from 'react-redux';
import { getOpponents } from '../../selectors/game';
import { StyledOpponentSpectrum, StyledOpponentsBlock, StyledOpponentDisplay } from './styles'
import Cell from '../Cell/index';

const OpponentSpectrum = ({ spectrum }) => {
	const height = spectrum.length;
	const width = (height > 0) ? spectrum[0].length : 0;
	return(
		<StyledOpponentSpectrum width={width} height={height}>
			{spectrum.map(row => row.map((cell, x) => <Cell key={x} type={cell === 0 ? '0' : 'spectrum'}/>))}
		</StyledOpponentSpectrum>
	)
}

export const Opponents = () => {
	const opponents = useSelector(getOpponents);
	return (
		<>
			{opponents.length > 0 &&
				<div style={{height: '100%', width: '1px', background: 'rgba(0,0,0,0.7)'}}></div>
			}
			{opponents.length > 0 &&
				<aside>
					<StyledOpponentsBlock nbOpponents={opponents.length}>
						{opponents.map((opponent, index) => <StyledOpponentDisplay key={index}><OpponentSpectrum spectrum={opponent.spectrum}/> <br/> {opponent.name}</StyledOpponentDisplay>)}
					</StyledOpponentsBlock>
				</aside>
			}
		</>
	)
}
