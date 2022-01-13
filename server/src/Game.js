import {MAX_PLAYERS} from "../config/config.js";
import {Player} from './Player.js'
import {Piece} from './Piece.js'
import { socketIOEventEmitterManager } from '../socket_manager/socketManager.js';
import { getDeepCopyOfGame } from '../socket_manager/socketManager.js'

export class Game {
    //////// Contructor ////////
    constructor(name, creator, maxPlayers = MAX_PLAYERS, fallFrequency = 1) {
        if (!name || typeof name !== 'string' || !/^[a-zA-Z0-9_ ]+$/.test(name)) {
            throw new Error("Invalid game name argument. Only alphanumeric characters are allowed!");
        } else if (name.length > 10) {
            throw new Error("Game must contain a maximum of 10 characters!");
		}
        this.name = name;
        this.players = [];
        this.tetrominos = [];
        this.setFallFrequency(fallFrequency);
        this.setMaxPlayers(maxPlayers);
        this.addPlayer(creator);
        this.isStarted = false;
        this.setRemoveOwnIndestructibleLine(false);
        this.setNbOfNextTetrominos(3);
    }
    setNbOfNextTetrominos(nbOfNextTetrominos) {
        if (nbOfNextTetrominos < 0 || nbOfNextTetrominos > 5) {
            throw new Error('Invalid number of next Tetrominos');
        }
        this.nbOfNextTetrominos = nbOfNextTetrominos;
    }
    setRemoveOwnIndestructibleLine(value) {
        if (typeof value !== 'boolean') {
            throw new Error('Invalid type RemoveOwnIndestructibleLine');
        }
        this.removeOwnIndestructibleLine = value;
    }
    //////// Methodes //////////
    startGame() {
        this.isStarted = true;
        this.tetrominos = [];
        for (let i = 0; i < this.players.length; i++) {
            this.players[i].resetParameters();
            this.players[i].setIsPlaying(true);
        }
    }
    stopGame() {
		socketIOEventEmitterManager('updateGameInfos', this.name, {game: getDeepCopyOfGame(this)});
		socketIOEventEmitterManager('gameIsOver', this.name, null);
        this.isStarted = false;
        for (let i = 0; i < this.players.length; i++) {
            this.players[i].setIsPlaying(false);
        }
    }
    /**
     * 
     * @param {Number} pieceIdx
     * @return {Number}
     */
    getCorrespondingTetrimino(tetrominoIdx) {
        if (typeof tetrominoIdx != 'number') {
            throw new Error("Invalid tetrominoIdx type.");
        } else if (tetrominoIdx < 0 || tetrominoIdx > this.tetrominos.length) {
            throw new Error("Invalid tetrominoIdx value.")
        }
        if (tetrominoIdx === this.tetrominos.length) {
            let newTetrimino = new Piece();
            this.tetrominos.push(newTetrimino);
        }
        return this.tetrominos[tetrominoIdx];
    }
    checkIfGameShouldEnd() {
        let playerStillInGame = 0;

        if (this.isStarted == false) {
            return ;
        }
        for (let i = 0; i < this.players.length; i++) {
            if (this.players[i].isPlaying && !this.players[i].hasLost) {
                playerStillInGame += 1;
            }
        }
        if (playerStillInGame < 2) {
			for (let i = 0; i < this.players.length; i++) {
				if (this.players[i].rank == 0) {
					this.players[i].rank = 1;
				}
			}
			this.stopGame();
        }
    }
    /**
     * 
     * @param {Number} maxPlayers 
     */
    setMaxPlayers(maxPlayers) {
        if (typeof maxPlayers != 'number') {
            throw new Error("Invalid maxPlayers type.");
        }
        if (maxPlayers < 1 || maxPlayers > MAX_PLAYERS) {
            throw new Error("maxPlayers value is out of range (1 to " + MAX_PLAYERS.toString() + ")");
        }
        this.maxPlayers = maxPlayers;
    }
    /**
     * 
     * @param {Number} fallFrequency 
     */
    setFallFrequency(fallFrequency) {
        if (typeof fallFrequency != 'number' || !Number.isInteger(fallFrequency)) {
            throw new Error("Invalid fallFrequency type.");
        } else if (fallFrequency < 1 || fallFrequency > 4) {
            throw new Error("FallFrequency value is out of range (1 to 4).");
        }
        this.fallFrequency = fallFrequency
    }
    /**
     * 
     * @param {Player} player 
     */
    addPlayer(player) {
        if (!(player instanceof Player)) {
            throw new Error("Invalid creator object type.");
        } else if (this.players.length >= this.maxPlayers) {
            throw new Error("There cannot be more than " + this.maxPlayers + " players in the game.")
        }
        for (let i = 0; i < this.players.length; i++) {
            if (this.players[i].name === player.name)
                throw new Error("Username already exists in this game!")
        }
        player.game = this;
        player.setIsPlaying(false);
        this.players.push(player);
    }
    /**
     * 
     * @param {Player} player 
     */
    deletePlayer(player) {
        if (!(player instanceof Player)) {
            throw new Error("Invalid creator object type.");
        }
        for (let i = 0; i < this.players.length; i++) {
            if (this.players[i] === player) {
                this.players.splice(i, 1);
                return ;
            }
        }
        throw new Error("No player named \"" + player.name + "\" in this game.");
        // If there is no more player in the game, delete it from Game big array 
    }
    addIndestructibleLinesOnPlayers(author, nbOfLines) {
        if (!this.isStarted || !author || !(author instanceof Player)) {
            return;
        }
        if (this.removeOwnIndestructibleLine)
            nbOfLines = this.takeOffIndestructibleLinesFromPlayer(author, nbOfLines);
        for (let i = 0; i < this.players.length; i++) {
            if (this.players[i] != author && !this.players[i].hasLost) {
                for (let j = 0; j < nbOfLines; j++) {
                    this.players[i].board.splice(0, 1);
                    this.players[i].board.push(Array(10).fill(1));
                    if (this.players[i].tetromino.coord.y > 0)
                        this.players[i].tetromino.coord.y--;
                }
                this.players[i].manageTetrominoEvents();
                this.players[i].computeSpectrum();
            }
        }
    }
    takeOffIndestructibleLinesFromPlayer(player, nbOfLines) {
        while (nbOfLines && player.board[player.board.length - 1][0] == 1) {
            player.board.splice(player.board.length - 1, 1);
            player.board.unshift(Array(10).fill(0));
            nbOfLines--;
        }
        return nbOfLines;
    }
    /**
	 * 
	 * @param {[[Number]]} spectrum 
	 * @return {[[Number]]}
	 */
	diffuseSpectrum() {
        let playersSpectrums = null;
        if (!this.isStarted)
            throw new Error('Error in diffuseSpectrum');
        for (let i = 0; i < this.players.length; i++) {
            playersSpectrums = [];
            for (let j = 0; j < this.players.length; j++) {
                if (this.players[i] != this.players[j] && this.players[j].isPlaying) {
                    playersSpectrums.push({ name: this.players[j].name, spectrum: this.players[j].spectrum });
                }
            }
            socketIOEventEmitterManager('updatePlayersSpectrums', this.players[i].socketId, {players: playersSpectrums});
        }

	}
}
