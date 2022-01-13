import { UPDATE_DATA } from '../actions/game';


export const initialState = {
	game: {
		name: null,
		isStarted: false,
		isOver: false,
		opponents: [],
		players: [],
		removeOwnIndestructibleLine: false,
		difficulty: 2,
		nbOfNextTetromino: 3,
	},
	me: {
		name: null,
		hasLost: false,
		stage: [[]],
		nextPieces: [],
		rows: 0,
		level: 0,
		score: 0
	}
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
		case UPDATE_DATA:
			return {...state, ...action.payload};
        default:
            return state;
    }
};