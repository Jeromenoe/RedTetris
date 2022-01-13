import { TETROMINOS, randomTetromino } from "../config/config.js";

export class Piece {
	constructor () {
		this.shape = randomTetromino().shape
	}
} 