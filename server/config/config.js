////////////////////////
//// GAME SETTINGS /////
////////////////////////

export const MAX_PLAYERS = 15;

////////////////////////
////// PLAYGROUND //////
////////////////////////

export const PLAYGROUNDHEIGHT = 20;
export const PLAYGROUNDWIDTH = 10;

////////////////////////
//////// PIECES ////////
////////////////////////

export const TETROMINOS = {
	0: { shape: [[0]] },
	I : {
		shape : [
			[0, 0, 0, 0],
			['I', 'I', 'I', 'I'],
			[0, 0, 0, 0],
			[0, 0, 0, 0]
		]
	},
	J: {
		shape : [
			['J', 0, 0],
			['J', 'J', 'J'],
			[0, 0, 0]
		]
	},
	L: {
		shape : [
			[0, 0, 'L'],
			['L', 'L', 'L'],
			[0, 0, 0]
		]
	},
	O: {
		shape : [
			['O', 'O'],
			['O', 'O']
		]
	},
	S: {
		shape : [
			[0, 'S', 'S'],
			['S', 'S', 0],
			[0, 0, 0]
		]
	},
	T: {
		shape : [
			[0, 'T', 0],
			['T', 'T', 'T'],
			[0, 0, 0]
		]
	},
	Z: {
		shape : [
			['Z', 'Z', 0],
			[0, 'Z', 'Z'],
			[0, 0, 0]
		]
	}
}

export const randomTetromino = () => {
	const tetrominos = 'IJLOSTZ';
	const randTetromino = tetrominos[Math.floor(Math.random() * tetrominos.length)];
	return TETROMINOS[randTetromino];
}