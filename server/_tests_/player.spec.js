import { Player } from '../src/Player.js'
import { Game } from '../src/Game.js'
import { httpServer } from '../index.js'
import { expect, test } from '@jest/globals'

describe('Testing Player class', () => {
    test('Player constructor - Giving valid argument', () => {
        let player = new Player('Gerard', 'socketId');
        expect(player.name).toEqual('Gerard');
        expect(player.socketId).toEqual('socketId');
        expect(player.game).toBe(null);
        expect(player.isPlaying).toBe(false);
        expect(player.score).toEqual(0);
        expect(player.rows).toEqual(0);
        expect(player.level).toEqual(0);
        expect(player.tetromino).toMatchObject({shape: null, coord: {x: 0, y: 0}, index: 0});
        expect(Array.isArray(player.nextTetrominos)).toBe(true);
        expect(player.nextTetrominos.length).toEqual(0);
        expect(Array.isArray(player.spectrum)).toBe(true);
        expect(player.spectrum.length).toEqual(0);
        expect(player.hasLost).toBe(false);
        expect(player.board).toBe(null);
        expect(player.dropIntervalId).toBe(null);
        expect(player.dropFrequency).toEqual(0);

    })
    test('Player constructor - Invalid name argument', () => {
        var badFunction = () =>  {let player = new Player(10, 'socketId')}
        expect(badFunction).toThrow(Error);
        expect(badFunction).toThrow('Invalid player name argument. Only alphanumeric characters are allowed!');
        badFunction = () =>  {let player = new Player()}
        expect(badFunction).toThrow(Error);
        expect(badFunction).toThrow('Invalid player name argument. Only alphanumeric characters are allowed!');
        badFunction = () =>  {let player = new Player('Hello@#$', 'socketId')}
        expect(badFunction).toThrow(Error);
        expect(badFunction).toThrow('Invalid player name argument. Only alphanumeric characters are allowed!');
    });
    test('getNextTetromino - valid case', () => {
        let player = new Player('Gerard', 'socketId');
        let game = new Game('tetris', player);
        player.resetParameters();
        player.isPlaying = true;
        player.getNextTetromino();
        expect(player.tetromino.shape).not.toBe(null);
        expect(player.tetromino.index).toEqual(1);
        expect(player.nextTetrominos.length).toEqual(3);
    })
    test('getNextTetromino - player is not part of any game', () => {
        let player = new Player('Gerard', 'socketId');
        var badFunction = () =>{player.getNextTetromino()};
        expect(badFunction).toThrow(Error);
        expect(badFunction).toThrow('Player is not part of any game');
    })
    test('getNextTetromino - Player is not playing', () => {
        let player = new Player('Gerard', 'socketId');
        let game = new Game('tetris', player);
        var badFunction = () =>{player.getNextTetromino()};
        expect(badFunction).toThrow(Error);
        expect(badFunction).toThrow('Player is not playing');
    })
    test('getTetrominoPrevision - valid case', () => {
        let player = new Player('Gerard', 'socketId');
        let game = new Game('tetris', player);
        player.resetParameters();
        player.isPlaying = true;
        player.getNextTetromino();
        player.getNextTetromino();
        expect(player.tetromino.shape).not.toBe(null);
        expect(player.tetromino.index).toEqual(2);
        expect(player.nextTetrominos.length).toEqual(3);
    })
    test('playerGameMustStop - should return true', () => {
        let player = new Player('Gerard', 'socketId');
        let game = new Game('tetris', player);
        player.resetParameters();
        player.isPlaying = true;
        player.getNextTetromino();
        expect(player.playerGameMustStop(1)).toBe(true);
    })
    test('playerGameMustStop - should return false', () => {
        let player = new Player('Gerard', 'socketId');
        let game = new Game('tetris', player);
        player.resetParameters();
        player.isPlaying = true;
        player.getNextTetromino();
        player.tetromino.coord.y++;
        expect(player.playerGameMustStop(1)).toBe(false);
    })
    test('updateTetromino - x and Y rotation', () => {
        let player = new Player('Gerard', 'socketId');
        let game = new Game('tetris', player);
        player.resetParameters();
        player.isPlaying = true;
        player.getNextTetromino();
        const prevCoordX= player.tetromino.coord.x;
        const prevCoordY= player.tetromino.coord.y;
        player.updateTetromino(1, 1, 0);
        expect(player.tetromino.coord.x).toEqual(prevCoordX + 1);
        expect(player.tetromino.coord.y).toEqual(prevCoordY + 1);
    })
    test('deleteAllFullStages', () => {
        let player = new Player('Gerard', 'socketId');
        let game = new Game('tetris', player);
        const board = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 't', 0, 0, 't', 0, 0],
            ['t', 't', 't', 't', 't', 't', 't', 't', 't', 't'],
            [0, 'i', 'i', 'i', 'i', 'i', 'i', 'i', 'i', 'i']
        ]
        player.board = board;
        player.deleteAllFullStages();
        for (let i = 0;  i  < player.board[2].lengthl; i++) {
            expect(player.board[2][i]).toEqual(0);
        }
        
    })
    test('userGameStatsManager', () => {
        let player = new Player('Gerard', 'socketId');
        let game = new Game('tetris', player);
        player.resetParameters();
        player.isPlaying = true;
        player.userGameStatsManager(1);
        expect(player.rows).toEqual(1);
        expect(player.score).toEqual(100);
        expect(player.level).toEqual(0);
        player.userGameStatsManager(2);
        expect(player.rows).toEqual(3);
        player.userGameStatsManager(3);
        expect(player.rows).toEqual(6);
        player.userGameStatsManager(4);
        expect(player.rows).toEqual(10);
        expect(player.level).toEqual(1);
        player.userGameStatsManager(482);
        expect(player.score).toEqual(1900);
    })
    test('getPrintableBoard', () => {
        let player = new Player('Gerard', 'socketId');
        let game = new Game('tetris', player);
        player.resetParameters();
        player.isPlaying = true;
        player.getNextTetromino();
        const returnedBoard = player.getPrintableBoard();
        expect(returnedBoard.length).toEqual(20);
    })
    test('setHasLost', () => {
        let player1 = new Player('Gerard', 'socketId');
        let player2 = new Player('Gerarde', 'socketId2');
        let game = new Game('tetris', player1);
        player1.isPlaying = true;
        player2.isPlaying = true;
        player2.joinGame(game);
        player2.setHasLost();
        expect(player2.hasLost).toBe(true);

    })
    test('joinGame - invalid game instance', () => {
        let player = new Player('Gerard', 'socketId');
        const badFunction = () => {player.joinGame('gameYolo')}
        expect(badFunction).toThrow(Error);
        expect(badFunction).toThrow('Invalid game type arg.');
    })
    test('joinGame - player is already in game', () => {
        let player = new Player('Gerard', 'socketId');
        let game = new Game('tetris', player);
        const badFunction = () => {player.joinGame('game')}
        expect(badFunction).toThrow(Error);
        expect(badFunction).toThrow('Player is already in a game.');
    })
    test('leaveGame', () => {
        let player = new Player('Gerard', 'socketId');
        let game = new Game('tetris', player);
        player.isPlaying = true;
        player.leaveGame();
        expect(player.isPlaying).toBe(false);
        expect(player.game).toBe(null);
    })
    test('leaveGame player is not part of any game', () => {
        let player = new Player('Gerard', 'socketId');
        const badFunction = () => {player.leaveGame()};
        expect(badFunction).toThrow(Error);
        expect(badFunction).toThrow('Player is not part of any game.');
    })
    test('computeSpectrum', () => {
        let player = new Player('Gerard', 'socketId');
        let game = new Game('tetris', player);
        game.isStarted = true;
        player.resetParameters();
        player.isPlaying = true;
        player.computeSpectrum();
        expect(player.spectrum.length).toEqual(20);
    })
    test('computeSpectrum - Invalid board detected', () => {
        let player = new Player('Gerard', 'socketId');
        let game = new Game('tetris', player);
        player.resetParameters();
        player.isPlaying = true;
        player.board = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ]
        const badFunction = () => {player.computeSpectrum()}
        expect(badFunction).toThrow(Error);
        expect(badFunction).toThrow('Invalid player board detected in computeSpectrum!');
    })
    httpServer.close();
})