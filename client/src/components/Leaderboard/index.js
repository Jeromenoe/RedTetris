import { StyledLeaderboardContainer, StyledLeaderboard } from './styles'
import { connect, useDispatch, ReactReduxContext } from 'react-redux';
import { SocketContext } from '../../context/socket';
import React, { useContext } from 'react';
import { updateData } from '../../actions/game';

// import store from '../../store/index';

export const SubLeaderbord = ({ gameOver }) => {
	const dispatch = useDispatch();
	const socket = useContext(SocketContext);

	const { store } = useContext(ReactReduxContext);
	const state = store.getState();
	const myName = state.me.name;
	const gamePlayers = state.game.players;

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
		dispatch(updateData({game: gameCloned}));
	};

	const goToWaitingRoom = () => {
		let game = store.getState().game;
		let clonedGame = {...game};
		clonedGame.isStarted = false;
		clonedGame.isOver = false;
		store.dispatch(updateData({ game: clonedGame}))
	};

	const isMe = (player) => {
		return (myName === player.name ? {fontWeight: 'bold'} : {fontWeight: 'normal'})
	}

	const localGamePlayers = gamePlayers.slice()
	localGamePlayers.forEach((player, index) => {
		if (player.isPlaying === false) {
			localGamePlayers.splice(index, 1)
		}
	})

	return (
		<StyledLeaderboardContainer gameOver={gameOver}>
			<StyledLeaderboard>
				<strong style={{display: 'block', alignSelf: "center",borderBottom: '1px solid #ddd', width: '90%', padding: '5px'}}>Game Over</strong>
				<div className="player-score-container">
					<div className="player-score-rank">Rank</div>
					<div className="player-score-name">Name</div>
					<div className="player-score-pts">Score</div>
					<div className="player-score-lines">Lines</div>
					<div className="player-score-lvl">Level</div>
				</div>
				{localGamePlayers.sort((a, b) => a.rank - b.rank).map((player, index) => {
					return (
						<div className="player-score-container" key={index} style={isMe(player)}>
							<div className="player-score-rank">{player.rank}</div>
							<div className="player-score-name">{player.name}{player.name === myName && ' (me)'}</div>
							<div className="player-score-pts">{player.score}</div>
							<div className="player-score-lines">{player.rows}</div>
							<div className="player-score-lvl">{player.level}</div>
						</div>
					);
				})}
				<div className="btn-leaderboard-container">
					<button className="btn-leave-leaderboard" onClick={goToWaitingRoom} >Waiting Room</button>
					<button className="btn-leave-leaderboard" id='btn-leave-in-game' onClick={sendPlayerLeaveSignal}>Leave</button>
				</div>
			</StyledLeaderboard>
		</StyledLeaderboardContainer>
	)
}

const mapStateToProps = state => ({
	// myName: state.me.name,
	// gamePlayers: state.game.players,
	gameOver: state.game.isOver
  });
 
export const Leaderboard = connect(
	mapStateToProps,
	null
  )(SubLeaderbord);