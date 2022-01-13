import React, { useContext } from 'react';

// Component
import Stage from '../Stage/index';
import { StyledTetris, StyledTetrisWrapper, StyledBoard, StyledTetrisContainer } from './styles';
import {NextPieces} from '../NextPieces/index';
import { PlayerData } from '../PlayerData/index'
import { Opponents } from '../Opponents/index';

import { SocketContext } from '../../context/socket';
// import store from '../../store/index';
import { useStore } from 'react-redux'
import { updateData } from '../../actions/game';
import { Leaderboard } from '../Leaderboard/index';


const Tetris = () => {
	// console.log('re-render Tetris');
	const socket = useContext(SocketContext);
	const store = useStore();
	const state = store.getState();

	const sendPlayerLeaveSignal = () => {
        socket.emit('playerLeave', null);
        let gameCloned = {
			name: null,
			isStarted: false,
			isOver: false,
			opponents: [],
			players: [],
			removeOwnIndestructibleLine: false,
			difficulty: 2,
			nbOfNextTetromino: 3,
        };
        store.dispatch(updateData({game: gameCloned}));
	};
	const move = (keyCode, isOver) => {
		var offsetX = 0;
		var offsetY = 0;
		var drop = 0;
		var rotation = 0;

		if(!isOver) {
			if (keyCode === 37) {
				offsetX = -1;
			} else if (keyCode === 39) {
				offsetX = 1;
			} else if (keyCode === 40) {
				offsetY = 1;
			} else if (keyCode === 38) {
				rotation = 1;
			} else if (keyCode === 32) {
				drop = 1
			}
		}
		return {offsetX, offsetY, drop, rotation};
	}
	const handleKey = ({ keyCode }, isOver) => {
		const { offsetX, offsetY, drop, rotation } = move(keyCode, isOver);
		if (offsetX || offsetY || drop || rotation) {
			socket.emit('USER_ACTION', {offsetX, offsetY, drop, rotation});
		}
	}
	return (
		<StyledTetrisWrapper id="styledTetrisWrapper" role="button" tabIndex="0" onKeyDown={e => handleKey(e, state.game.isOver)}>
				<h1 className="title" style={{marginTop: '60px', marginBottom: '40px'}}>RED TETRIS</h1>
				<StyledTetris>
					<div style={{'fontFamily': '\'Press Start 2P\', cursive', 'fontSize': '12px', 'margin': '5px 0', 'color': 'rgb(55, 55, 55)'}}>
						{store.getState().me.name}@{store.getState().game.name}
					</div>
					<div style={{width: '100%', height: '1px', background: 'rgba(0,0,0,0.7)'}}></div>
					<StyledTetrisContainer>
						<div style={{display: 'flex'}}>
							<PlayerData />
							<aside>
								<StyledBoard>
									<Stage />
									<aside>
										<NextPieces />
									</aside>
								</StyledBoard>
							</aside>
						</div>
						<Opponents />
						<button className="LeaveButton" id="leavePlayingGame" onClick={sendPlayerLeaveSignal}>LEAVE</button>
					</StyledTetrisContainer>
				</StyledTetris>
				<Leaderboard />
		</StyledTetrisWrapper>
	)
}

export default Tetris;