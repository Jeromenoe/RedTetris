import { testingExportation, getDeepCopyOfGame, socketIOEventEmitterManager, addEventsHandlers } from '../socket_manager/socketManager.js'
import { httpServer, io } from '../index.js'
import { Game } from '../src/Game.js'
import { Player } from '../src/Player.js'

const { removePlayerFromDB,
    setGameSettings,
    playerList,
    gameList,
    removeGameFromDB,
    userAction,
    joinGame,
    sendStartGameSignal
} = testingExportation;

class Socket {
    constructor() {
        this.id = 'socketId'
    }
    leave(){};
    join(){};
}

const callback = () => {}

const socket = new Socket();

describe('Testing socketManager', () => {
    test('socketIOEventEmitterManager', () => {
        socketIOEventEmitterManager('startGameSignal');
        socketIOEventEmitterManager('updateGameInfos');
        socketIOEventEmitterManager('updateMeInfos');
        socketIOEventEmitterManager('updatePlayerBoard');
        socketIOEventEmitterManager('updatePlayerStats');
        socketIOEventEmitterManager('updateNextTetromino');
        socketIOEventEmitterManager('updatePlayersSpectrums');
        socketIOEventEmitterManager('playerGameIsOver');
        socketIOEventEmitterManager('gameIsOver');
        const badFunction = () => {socketIOEventEmitterManager('invalidActionType')};
        expect(badFunction).toThrow(Error);
        expect(badFunction).toThrow('Invalid action type');
    })
    test('setGameSettings - valid case', () => {
        let player = new Player('Tristan', 'socketId');
        let game = new Game('tetris', player);
        playerList.push(player);
        const data = {
            difficulty: 2,
            removeOwnIndestructibleLine: true,
            nbOfNextTetromino: 3
        }
        setGameSettings(socket, data);
        expect(game.fallFrequency).toEqual(2);
        expect(game.removeOwnIndestructibleLine).toEqual(true);
        expect(game.nbOfNextTetrominos).toEqual(3);
        playerList.pop();
    })
    test('setGameSettings - invalid player', () => {
        let player = new Player('Tristan', 'socketId');
        let game = new Game('tetris', player);
        const data = null
        const badFunction = ()  => {setGameSettings(socket, data)};
        expect(badFunction).toThrow(Error);
        expect(badFunction).toThrow('Player does not exist');
    })
    test('setGameSettings - Player is not part of any game', () => {
        let player = new Player('Tristan', 'socketId');
        playerList.push(player);
        const badFunction = ()  => {setGameSettings(socket, null)};
        expect(badFunction).toThrow(Error);
        expect(badFunction).toThrow('Player is not part of any game');
        playerList.pop();
    })
    test('removePlayerFromDB', () => {
        let player = new Player('Tristan', 'socketId');
        let game = new Game('tetris', player);
        playerList.push(player);
        gameList.push(game);
        removePlayerFromDB(socket);
    })
    test('removeGameFromDB', () => {
        let player = new Player('tristan', 'socketId');
        let game = new Game('tetris', player);
        removeGameFromDB(null);
        removeGameFromDB(game);
    })
    test('userAction - Game is not started', () => {
        let player = new Player('tristan', 'socketId');
        let game = new Game('tetris', player);
        playerList.push(player);
        userAction(socket, null)
        playerList.pop();
    })
    test('userAction - Player does not exist', () => {
        let player = new Player('tristan', 'socketId');
        let game = new Game('tetris', player);
        const badFunction = () => {userAction(socket, null)};
        expect(badFunction).toThrow(Error);
        expect(badFunction).toThrow('Player does not exist');
    })
    test('userAction - Player is not part of any game', () => {
        let player = new Player('tristan', 'socketId');
        playerList.push(player);
        const badFunction = () => {userAction(socket, null)};
        expect(badFunction).toThrow(Error);
        expect(badFunction).toThrow('Player is not part of any game');
        playerList.pop();
    })
    test('joinGame - game does not exists', () => {
        const data = {
            playerName: 'tristan',
            roomName: 'tetris'
        }
        joinGame(io, socket, data, callback);
        expect(playerList.length).toEqual(1);
        expect(playerList[0].name).toEqual('tristan');
        expect(gameList.length).toEqual(1);
        expect(gameList[0].name).toEqual('tetris');
        playerList.pop();
        gameList.pop();
    })
    test('joinGame - game exists', () => {
        const data = {
            playerName: 'tristan',
            roomName: 'tetris'
        }
        let player = new Player('tristane', 'socketId');
        let game = new Game('tetris', player);
        gameList.push(game);
        joinGame(io, socket, data, callback);
        expect(playerList.length).toEqual(1);
        expect(playerList[0].name).toEqual('tristan');
        expect(gameList.length).toEqual(1);
        expect(gameList[0].name).toEqual('tetris');
        playerList.pop();
        gameList.pop();
    })
    test('joinGame - Invalid player name', () => {
        const data = {
            playerName: 'tristan!',
            roomName: 'tetris'
        }
        joinGame(io, socket, data, callback);
    })
    test('joinGame - Invalid game name', () => {
        const data = {
            playerName: 'tristan',
            roomName: 'tetris!'
        }
        joinGame(io, socket, data, callback);
    })
    test('joinGame - User already exists', () => {
        let player = new Player('tristan', 'socketId');
        let game = new Game('tetris', player);
        gameList.push(game);
        const data = {
            playerName: 'tristan',
            roomName: 'tetris'
        }
        joinGame(io, socket, data, callback);
        gameList.pop();
    })
    test('getDeepCopy', () => {
        let player = new Player('Tristan', 'socketId');
        let game = new Game('tetris', player);
        let clonedGame = getDeepCopyOfGame(game);
        expect(clonedGame.name).toEqual(game.name);
        expect(clonedGame.tetrominos).toEqual(game.tetrominos);
        expect(clonedGame.isStarted).toEqual(game.isStarted);
        expect(clonedGame.fallFrequency).toEqual(game.fallFrequency);
        expect(clonedGame.removeOwnIndestructibleLines).toEqual(game.removeOwnIndestructibleLines);
        expect(clonedGame.nbOfNextTetrominos).toEqual(game.nbOfNextTetrominos);
        expect(clonedGame.maxPlayer).toEqual(game.maxPlayer);
    })
    test('sendStartGameSignal', () => {
        let player = new Player('tristan', 'socketId');
        let game = new Game('tetris', player);
        playerList.push(player);
        sendStartGameSignal(io, socket);
        playerList.pop();
        game.stopGame(); //To clear interval
    })
    test('sendStartGameSignal - Player does not exist', () => {
        sendStartGameSignal(io, socket);
    })
    test('sendStartGameSignal - Player is not part of any game', () => {
        let player = new Player('Tristan', 'socketId');
        playerList.push(player);
        sendStartGameSignal(io, socket);
        playerList.pop();
    })
    httpServer.close();
})