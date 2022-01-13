
import { updateData } from './actions/game';
import store from './store/index';

export const initSockets = (socket) => {
	// Game is on
	socket.on('startGameSignal', () => {
		// console.log('Start game signal received');
		let game = store.getState().game;
		let clonedGame = {...game};
		clonedGame.isStarted = true;
		clonedGame.isOver = false;
		store.dispatch(updateData({ game: clonedGame}))
	});
	// Game is over
	socket.on('gameIsOver', () => {
		// console.log('gameIsOver');
		let game = store.getState().game;
		let clonedGame = {...game};
		clonedGame.isOver = true;
		store.dispatch(updateData({ game: clonedGame}))
	});
	// Update the current stage
	socket.on('updatePlayerBoard', (payload) => {
		let state = store.getState();
		state.me.stage = payload.board;
		store.dispatch(updateData({ state: state }))
	});
	// Update the player datas like score, level, rows...
	socket.on('updatePlayerStats', (payload) => {
		const me = store.getState().me;
		let meCloned = {
			...me,
			score: payload.score,
			rows: payload.rows,
			level: payload.level,
		};
		store.dispatch(updateData({me: meCloned}));
	})
	// Get the three next tetrominos
	socket.on('updateNextTetromino', (payload) => {
		// console.log('updateNextTetromino');
		const me = store.getState().me;
		let meCloned = {
			...me,
			nextPieces: payload
		};
		store.dispatch(updateData({me: meCloned}))
	})
	socket.on('updateGameInfos', (payload) => {
		// console.log('received updateGameInfos');
		const game = store.getState().game;
		let gameCloned = {
			...game,
			name: payload.game.name,
			players: payload.game.players
		}
		store.dispatch(updateData({game: gameCloned}));
	});
	// socket.on('updateMeInfos', (payload) => {
	// 	console.log('received updateMeInfos');
	// 	// store.dispatch(updateData({me: payload.me}))
	// })
	

	// Get the new spectrum of the players
	socket.on('updatePlayersSpectrums', (payload) => {
		const game = store.getState().game;
		let gameCloned = {
			...game,
			opponents: payload.players
		}
		store.dispatch(updateData({game: gameCloned}))
	})

	

	// Player has lost the game
	// socket.on('playerGameIsOver', () => {
	// 	console.log('playerGameIsOver');
	// 	store.dispatch(updateData({ isOver: true}))
	// });
}