import {PLAYGROUNDHEIGHT, PLAYGROUNDWIDTH} from "../config/config.js";
import { socketIOEventEmitterManager } from '../socket_manager/socketManager.js';
import {Game} from './Game.js'

const TETROMINOS_COLLISION = 1;
const BORDER_MAP_COLLISION = 2;
const NO_COLLLISION = 0;

export class Player {
	constructor(name, socketId) {
		if (!name || typeof name !== 'string' || !/^[a-zA-Z0-9 ]+$/.test(name)) {
            throw new Error("Invalid player name argument. Only alphanumeric characters are allowed!");
		} else if (name.length > 10) {
            throw new Error("Name must contain a maximum of 10 characters!");
		}
		this.name = name;
		this.socketId = socketId;
		this.game = null;
		this.isPlaying = false;
		this.score = 0;
		this.rows = 0;
		this.level = 0;
		this.tetromino = {
			shape: null,
			coord: { x: 0, y: 0},
			index: 0,
		};
		this.nextTetrominos = [];
		this.spectrum = [];
		this.hasLost = false;
		this.board = null;
		this.dropIntervalId = null;
		this.dropFrequency = 0;
	}
	manageTetrominoEvents(offsetX = 0, offsetY = 0, drop = 0, rotation = 0) {
		let collisionType = 0;

		if (!this.tetromino.shape)
			this.getNextTetromino();
		if ((collisionType = this.checkTetrominoCollision(offsetX, offsetY, rotation, drop))) {
			let tmpOffsetX = 0;
			if (this.playerGameMustStop(collisionType)) {
				this.setHasLost();
				return;
			} else if (offsetY || drop) {
				this.fixTetrominoOnPlayerBoard();
				this.deleteAllFullStages();
				this.computeSpectrum();
				socketIOEventEmitterManager('updatePlayerStats', this.socketId, { level: this.level, score: this.score, rows: this.rows });
				this.manageTetrominoEvents();
				return;
			} else if (rotation && (tmpOffsetX = this.lookForSmartRotation(rotation))) {
				offsetX = tmpOffsetX;
			} else {
				return;
			}
		}
		this.updateTetromino(offsetX, offsetY, rotation);
		let printableBoard = this.getPrintableBoard();
		socketIOEventEmitterManager('updatePlayerBoard', this.socketId, { board: printableBoard });
	}


	/**
	 * @return {[[Number]]}
	 */
	getNextTetromino() {
		if (!this.game) {
			throw new Error('Player is not part of any game');
		} else if (!this.isPlaying) {
			throw new Error('Player is not playing');
		}
		this.tetromino.shape = this.game.getCorrespondingTetrimino(this.tetromino.index).shape;
		this.tetromino.index++;
		this.tetromino.coord = {x: 5 - Math.round(this.tetromino.shape[0].length / 2), y: 0};
		this.getTetrominoPrevision();
	}

	getTetrominoPrevision() {
		for (let i = 0; i < this.game.nbOfNextTetrominos; i++) {
			if (i === 0 && this.nextTetrominos[i])
				this.nextTetrominos.splice(0, 1);
			if (!this.nextTetrominos[i]) {
				let tetromino = JSON.parse(JSON.stringify(this.game.getCorrespondingTetrimino(this.tetromino.index + i).shape));
				this.nextTetrominos.push(tetromino);
				while (this.nextTetrominos[i].length > 2) {
					this.nextTetrominos[i].pop()
				}
				if (this.nextTetrominos[i][1][0] === 'I')
					this.nextTetrominos[i].splice(0, 1);
			}
		}
		socketIOEventEmitterManager('updateNextTetromino', this.socketId, this.nextTetrominos);
	}


	playerGameMustStop(collisionType) {
		if (collisionType == TETROMINOS_COLLISION && this.tetromino.coord.y === 0) {
			return true;
		}
		return false;
	}
	updateTetromino(offsetX, offsetY, rotation) {
		this.tetromino.shape = this.getRotatedTetromino(rotation);
		this.tetromino.coord.x += offsetX;
		this.tetromino.coord.y += offsetY;
	}
	computeSpectrum() {
		if (!this.board || this.board.length < 20) {
			throw new Error('Invalid player board detected in computeSpectrum!');
		}
		this.resetSpectrum();
		for (let j = 0; j < this.board[0].length; j++) {
			for  (let i = 0; i < this.board.length; i++) {
				if (this.board[i][j]) {
					this.fillColumnFromIndex(i, j);
					break;
				}
			}
		}
		this.game.diffuseSpectrum();
	}
	fillColumnFromIndex(i, j) {
		while (i < this.board.length) {
			this.spectrum[i][j] = 1;
			i++;
		}
	}
	resetSpectrum(i, j) {
		for (i = 0; i < this.spectrum.length; i++) {
			this.spectrum[i].fill(0);
		}
	}
	lookForSmartRotation(rotation) {
		if (!this.checkTetrominoCollision(1, 0, rotation)) {
			return 1;
		} else if (!this.checkTetrominoCollision(-1, 0, rotation)) {
			return -1;
		}
		return 0;
	}
	
	deleteAllFullStages() {
		var cellFilledcounter = 0;
		var deletedLinesCounter = 0;

		for (let i = 0; i < this.board.length; i++) {
			cellFilledcounter = 0;
			for (let j = 0; j < this.board[i].length; j++) {
				if (this.board[i][j] && this.board[i][j] != 1)
					cellFilledcounter++;
			}
			if (cellFilledcounter == this.board[i].length) {
				this.deleteStage(i);
				deletedLinesCounter++;
			}
		}
		this.userGameStatsManager(deletedLinesCounter);
		this.checkForIndestructibleLines(deletedLinesCounter);
	}
	checkForIndestructibleLines(nbOfDeletedLines) {
		if (nbOfDeletedLines < 2) {
			return;
		}
		this.game.addIndestructibleLinesOnPlayers(this, nbOfDeletedLines - 1);
	}
	userGameStatsManager(deletedLinesCounter) {

		this.rows += deletedLinesCounter;
		this.score += scoreCalculator(this.level, 0, deletedLinesCounter);
		this.level = Math.floor(this.rows / 10);
		if (this.game.fallFrequency === 4) {
			let tmpDropFrequency = (this.level > 10) ? 100 : 1000 - (this.level * 100);
			if (tmpDropFrequency != this.dropFrequency) {
				this.dropFrequency = tmpDropFrequency;
				this.stopPlayerGameInterval();
				this.setPlayerGameInterval();
			}
		}
	}
	deleteStage(stageIndex) {
		this.board.splice(stageIndex, 1);
		this.board.unshift(Array(10).fill(0))
	}
	getPrintableBoard() {
		var printableBoard = [];

		for (var i = 0; i < this.board.length; i++) 
			printableBoard[i] = this.board[i].slice();
		this.fixTetrominoProjectionOnBoard(printableBoard, this.getProjectedTetromino());
		this.fixTetrominoOnBoard(printableBoard);
		return printableBoard;
	}
	getProjectedTetromino() {
		if (!this.tetromino || !this.tetromino.shape)
			return null;
		let projectedTetromino = JSON.parse(JSON.stringify(this.tetromino));
		projectedTetromino.shape.forEach((stage, stageIndex) => {
			stage.forEach((cell, cellIndex) => {
				if (cell)
					projectedTetromino.shape[stageIndex][cellIndex] = cell + 'p';
			})
		})
		return projectedTetromino;
	}
	fixTetrominoOnPlayerBoard() {
		this.fixTetrominoOnBoard(this.board);
		this.score += scoreCalculator(this.level, 1, 0);
		this.tetromino.shape = null;
	}
	fixTetrominoOnBoard(board, tetromino = this.tetromino) {
		for (let i = 0; i < tetromino.shape.length; i++) {
			for (let j = 0; j < tetromino.shape[i].length; j++) {
				if (tetromino.shape[i][j]) {
					board[tetromino.coord.y + i][tetromino.coord.x + j] = tetromino.shape[i][j];
				}
			}
		}
	}
	fixTetrominoProjectionOnBoard(board, projectedTetromino) {
		this.dropTetrominoOnBoard(board, projectedTetromino);
		this.fixTetrominoOnBoard(board, projectedTetromino);
	}
	dropTetrominoOnBoard(board, tetromino) {
		if (!this.checkTetrominoCollision(0, 1, 0, 0, tetromino)) {
			tetromino.coord.y++;
			this.dropTetrominoOnBoard(board, tetromino);
		}
	}
	checkTetrominoCollision(offsetX, offsetY, rotation = 0, drop = 0, tetromino = this.tetromino)  {
		let tetroCellX = 0;
		let tetroCellY = 0;
		let shape = this.getRotatedTetromino(rotation);
		if (drop) {
			this.dropTetrominoOnBoard(this.board, this.tetromino);
			return BORDER_MAP_COLLISION;
		}
		for (let i = 0; i < shape.length; i++) {
			for (let j = 0; j < shape[i].length; j++) {
				tetroCellY = tetromino.coord.y + offsetY + i;
				tetroCellX = tetromino.coord.x + offsetX + j;
				if (shape[i][j]) {
					if ((tetroCellY < 0 || tetroCellY >= this.board.length)
					|| (tetroCellX < 0 || tetroCellX >= this.board[0].length)) {
						return BORDER_MAP_COLLISION;
					}
					if (this.board[tetroCellY][tetroCellX]) {
						return TETROMINOS_COLLISION;
					}
				} 
			}
		}
		return NO_COLLLISION;
	}
	getRotatedTetromino(rotation) {
		var shape = [];

		if (!rotation) {
			return this.tetromino.shape;
		}
		for (var i = 0; i < this.tetromino.shape.length; i++) 
			shape[i] = this.tetromino.shape[i].slice();
		const rotatedTetro = shape.map((_, index) => shape.map(col => col[index]))
		return rotatedTetro.map(row => row.reverse())
	}

	resetParameters() {
		this.isPlaying = false;
		this.hasLost = false;
		this.score = 0;
		this.rows = 0;
		this.level = 0;
		this.nextTetrominos = [];
		this.tetromino.shape = null;
		this.tetromino.index = 0;
		this.tetromino.coord = {x: 0, y: 0};
		this.dropFrequency = this.getDropFrequency();
		this.spectrum = Array(20);
		this.board = Array(20);
		this.rank = 0;
		for (var i = 0; i < 20; i++) {
			this.spectrum[i] = Array(10).fill(0);
			this.board[i] = Array(10).fill(0);
		}
	}
	getDropFrequency() {
		if (this.game.fallFrequency === 4)
			return 1000;
		return 1000 - (333 * (this.game.fallFrequency - 1));
	}
	setHasLost() {
		if (!this.hasLost) {
			const game = this.game;
			let rank = 0;
			for (let i = 0; i < game.players.length; i++) {
				if (game.players[i].isPlaying && !game.players[i].hasLost) {
					rank += 1;
				}
			}
			this.rank = rank;
			this.hasLost = true;
			this.stopPlayerGame();
			socketIOEventEmitterManager('playerGameIsOver', this.socketId, null);
			this.game.checkIfGameShouldEnd();
		}
	}

	/**
	 * 
	 * @param {Boolean} isPlaying 
	 */
	setPlayerGameInterval() {
		if (this.dropIntervalId) {
			this.stopPlayerGameInterval();
		}
		this.dropIntervalId = setInterval(() => {
			this.manageTetrominoEvents(0, 1);
		}, this.dropFrequency);
	}
	stopPlayerGameInterval() {
		if (this.dropIntervalId) { 
			clearInterval(this.dropIntervalId);
			this.dropIntervalId = null;
		}
	}
	startPlayerGame() {
		this.setPlayerGameInterval();
		this.manageTetrominoEvents();
		this.game.diffuseSpectrum();
		socketIOEventEmitterManager('updatePlayerStats', this.socketId, { score: this.score, rows: this.rows, level: this.level});
		socketIOEventEmitterManager('updateNextTetromino', this.socketId, this.nextTetrominos);
	}
	stopPlayerGame() {
		this.stopPlayerGameInterval();
	}
	setIsPlaying(isPlaying) {
		this.isPlaying = isPlaying;
		if (isPlaying) {
			this.startPlayerGame();
		} else {
			this.stopPlayerGame();
		}
	}

	joinGame(game) {
		if (this.game != null) {
			throw new Error('Player is already in a game.')
		} else if (!(game instanceof Game)) {
			throw new Error("Invalid game type arg.")
		}
		game.addPlayer(this);
	}

	leaveGame() {
		if (this.game != null) {
			if (this.isPlaying)
				this.setIsPlaying(false);
			this.game.deletePlayer(this);
			this.game = null;
			// this.resetParameters();
		} else {
			throw new Error("Player is not part of any game.")
		}
	}
}
const scoreCalculator = (level, tetromino = 0, rows = 0) => {
	if (tetromino) {
		return (10 * (level + 1));
	}
	switch (rows) {
		case 1:
			return 100 * (level + 1);
		case 2:
			return 300 * (level + 1);
		case 3:
			return 500 * (level + 1);
		case 4:
			return 1000 * (level + 1);
		default:
			return 0;
	}
}