import { io } from '../index.js'
import { Game } from '../src/Game.js'
import { Player } from '../src/Player.js'


var gameList = [];
var playerList = [];

export var testingExportation = {
    gameList,
    playerList,
    removePlayerFromDB,
    setGameSettings,
    removeGameFromDB,
    userAction,
    joinGame,
    sendStartGameSignal
}

export const socketIOEventEmitterManager = (action, socketRoom, payload) => {
    switch (action) {
        case 'startGameSignal': 
            io.to(socketRoom).emit('startGameSignal');
            break;
        case 'updateGameInfos':
            io.to(socketRoom).emit('updateGameInfos', payload);
            break;
        case 'updateMeInfos':
            io.to(socketRoom).emit('updateMeInfos', payload);
            break;
        case 'updatePlayerBoard':
            io.to(socketRoom).emit('updatePlayerBoard', payload);
            break;
        case 'updatePlayerStats':
            io.to(socketRoom).emit('updatePlayerStats', payload);
            break;
        case 'updateNextTetromino':
            io.to(socketRoom).emit('updateNextTetromino', payload);
            break;
        case 'updatePlayersSpectrums':
            io.to(socketRoom).emit('updatePlayersSpectrums', payload);
            break;
        case 'playerGameIsOver':
            io.to(socketRoom).emit('playerGameIsOver');
            break;
        case 'gameIsOver':
            io.to(socketRoom).emit('gameIsOver');
            break;
        default:
            throw new Error('Invalid action type');
    }
}

export function addEventsHandlers(io) {
    io.on('connection', (socket) => {
        socket.on('readyToPlay', () => {
            sendStartGameSignal(io, socket);
        })
        socket.on('joinGame', (data, callback) => {
            joinGame(io, socket, data, callback);
        })
        socket.on('setSettings', (data) => {
            setGameSettings(socket, data);
        })
        socket.on('USER_ACTION', (data) => {
            userAction(socket, data);
        })
        socket.on('disconnect', () => {
            removePlayerFromDB(socket);
        })
        socket.on('playerLeave', () => {
            removePlayerFromDB(socket);
        })
     })
}

function setGameSettings(socket, data) {
    let playerIndex = playerList.findIndex(x => x.socketId === socket.id)
    if (playerIndex == -1) {
        throw new Error('Player does not exist');
    }
    let player = playerList[playerIndex];
    let game = player.game;
    if (!game)
        throw new Error('Player is not part of any game');
    game.setFallFrequency(data.difficulty)
    game.setRemoveOwnIndestructibleLine(data.removeOwnIndestructibleLine)
    game.setNbOfNextTetrominos(data.nbOfNextTetromino);
}

function removePlayerFromDB(socket) {
    let playerIndex = playerList.findIndex(x => x.socketId === socket.id)
    if (playerIndex == -1)
        return;
    let player = playerList[playerIndex];
    let game = player.game;
    if (player.game) {
        player.leaveGame();
        socket.leave(game.name);
        let gameClone = getDeepCopyOfGame(game);
        socketIOEventEmitterManager('updateGameInfos', game.name, {game: gameClone});
    }
    playerList.splice(playerIndex, 1);
    if (game && game.players.length === 0) {
        removeGameFromDB(game);
    }
}

function removeGameFromDB(game) {
    if (!game || !game.name)
        return;
    let gameIndex = gameList.findIndex(x => x.name === game.name)
    if (gameIndex == -1)
        return;
    gameList.splice(gameIndex, 1);
}

function userAction(socket, data) {
    let playerIndex = playerList.findIndex(x => x.socketId === socket.id)
    if (playerIndex == -1) {
        throw new Error('Player does not exist');
    }
    let player = playerList[playerIndex];
    if (!player.game) {
        throw new Error('Player is not part of any game');
    }
    if (player.hasLost || !player.game.isStarted)
        return;
    playerList[playerIndex].manageTetrominoEvents(data.offsetX, data.offsetY, data.drop, data.rotation);
}

function joinGame(io, socket, data, callback) {
    let game = null;
    try {
        const player = createNewPlayer(socket, data);
        game = checkIfGameExist(data);
        if (game) {
            game.addPlayer(player);
        } else {
            game = new Game(data.roomName, player);
            gameList.push(game);
        }
        socket.nickname = player.name;
        socket.join(game.name);
        let gameClone = getDeepCopyOfGame(game);
        socketIOEventEmitterManager('updateGameInfos', game.name, {game: gameClone});
        callback('ok');
    } catch (err) {
        let errorLog = {
            playerName: null,
            gameName: null
        };
        if (err.message.indexOf("player name") != -1 || err.message.indexOf("Name must") != -1)
            errorLog.playerName = err.message;
        else if (err.message.indexOf("game name") != -1 || err.message.indexOf("Game must") != -1)
            errorLog.gameName = err.message;
        else if (err.message.indexOf("userName already exists"))
            errorLog.gameName = err.message;
        removePlayerFromDB(socket);
        callback(errorLog)
    }
}

export const getDeepCopyOfGame = (sourceGame) => {
    let { players, ...gameCopy } = {...sourceGame};
    gameCopy.players = sourceGame.players.map((player) => {
        const { game, dropIntervalId, ...playerCopy } = { ...player};
        return playerCopy;
    });
    return gameCopy;
}

function checkIfGameExist(data) {
    const gameIndex = gameList.findIndex(x => x.name === data.roomName);

    if (gameIndex === -1) {
        return null;
    }
    return gameList[gameIndex];
}

function createNewPlayer(socket, data) {
    let newPlayer = new Player(data.playerName, socket.id);
    playerList.push(newPlayer);
    return newPlayer;
}


function sendStartGameSignal(io, socket) {
    let playerIndex = playerList.findIndex(x => x.socketId === socket.id)
    if (playerIndex == -1) {
        return;
    }
    let game = playerList[playerIndex].game
    if (!game) {
        return;
    }
    socketIOEventEmitterManager('startGameSignal', game.name, null)
    game.startGame();
}