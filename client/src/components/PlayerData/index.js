import React from 'react';
import { getPlayerDatas } from '../../selectors/game';
import { useSelector } from "react-redux";
import { StyledPlayerData } from './styles';

export const PlayerData = () => {
	const { level, score, rows } = useSelector(getPlayerDatas);
	return (
		<div style={{alignSelf: 'flex-end', width: "70px", marginRight: "6px", marginBottom: "6px"}}>
			<StyledPlayerData>
				<div style={{marginBottom: "15px"}}><div style={{marginBottom: "6px"}}>Level</div><span style={{paddingRight: "6px"}}>{level}</span></div>
				<div style={{marginBottom: "15px"}}><div style={{marginBottom: "6px"}}>Score</div><span style={{paddingRight: "6px"}}>{score}</span></div>
				<div style={{marginBottom: "20px"}}><div style={{marginBottom: "6px"}}>Lines</div><span style={{paddingRight: "6px"}}>{rows}</span></div>
			</StyledPlayerData>
		</div>
	)
}
