export const getNextPieces = state => state.me.nextPieces

export const getPlayerDatas = state => ({
	name: state.me.name,
	hasLost: state.me.hasLost,
	level: state.me.level,
	score: state.me.score,
	rows: state.me.rows
})

export const getGameInfos = state => state.game

export const getStage = state => state.me.stage

export const getOpponents = state => state.game.opponents

export const gameIsOver = state => state.game.isOver
