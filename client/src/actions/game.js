export const UPDATE_NEXT_PIECES = 'UPDATE_NEXT_PIECES';
export const UPDATE_DATA = 'UPDATE_DATA';
export const UPDATE_GAME_STATUS = 'UPDATE_GAME_STATUS';
export const UPDATE_ME_STAGE = 'UPDATE_ME_STAGE';


export const updateNextPieces = (nextPieces) => ({
	type: UPDATE_NEXT_PIECES,
	nextPieces: nextPieces
})

export const updateData = (payload) => ({
	type:  UPDATE_DATA,
	payload: payload
})

export const updateMeStage = (payload) => ({
	type: UPDATE_DATA,
	payload: payload
})

export const updateGameStatus = (payload) => ({
	type: UPDATE_GAME_STATUS,
	payload: payload.isStarted
})