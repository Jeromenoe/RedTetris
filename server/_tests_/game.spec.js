import {Game} from '../src/Game.js'
import {Player} from '../src/Player.js'
import {MAX_PLAYERS} from "../config/config.js";
import { httpServer } from "../index.js"

describe("Testing Game class", () => {
    test("Game constructor - Giving minimum args requirement", () => {
        const player = new Player('Tristan');
        const game = new Game('Tetris', player);
        expect(game.name).toEqual('Tetris');
        expect(Array.isArray(game.players)).toBe(true);
        expect(game.players.length).toEqual(1);
        expect(game.players[0]).toEqual(player);
        expect(Array.isArray(game.tetrominos)).toBe(true);
        expect(game.tetrominos.length).toEqual(0);
        expect(game.fallFrequency).toEqual(1);
        expect(game.maxPlayers).toEqual(MAX_PLAYERS);
        expect(game.isStarted).toBe(false);
        expect(game.removeOwnIndestructibleLine).toBe(false);
        expect(game.nbOfNextTetrominos).toEqual(3);
    })
    test("Game constructor - Giving valid value of additional maxPlayer arg", () => {
        const player = new Player('Tristan');
        const game = new Game('Tetris', player, 8);
        expect(game.name).toEqual('Tetris');
        expect(Array.isArray(game.players)).toBe(true);
        expect(game.players.length).toEqual(1);
        expect(game.players[0]).toEqual(player);
        expect(Array.isArray(game.tetrominos)).toBe(true);
        expect(game.tetrominos.length).toEqual(0);
        expect(game.fallFrequency).toEqual(1);
        expect(game.maxPlayers).toEqual(8);
        expect(game.isStarted).toBe(false);
        expect(game.removeOwnIndestructibleLine).toBe(false);
        expect(game.nbOfNextTetrominos).toEqual(3);
    })
    test("Game constructor - Giving valid value of additional fallFrequency arg", () => {
        const player = new Player('Tristan');
        const game = new Game('Tetris', player, MAX_PLAYERS, 2);
        expect(game.name).toEqual('Tetris');
        expect(Array.isArray(game.players)).toBe(true);
        expect(game.players.length).toEqual(1);
        expect(game.players[0]).toEqual(player);
        expect(Array.isArray(game.tetrominos)).toBe(true);
        expect(game.tetrominos.length).toEqual(0);
        expect(game.fallFrequency).toEqual(2);
        expect(game.maxPlayers).toEqual(MAX_PLAYERS);
        expect(game.isStarted).toBe(false);
        expect(game.removeOwnIndestructibleLine).toBe(false);
        expect(game.nbOfNextTetrominos).toEqual(3);
    })
    test("Game constructor - Missing mandatory name arg", () => {
        const testFunction = () => {new Game()}
        expect(testFunction).toThrow(Error);
        expect(testFunction).toThrow("Invalid game name argument. Only alphanumeric characters are allowed!");

    })
    test("Game constructor - Giving bad name arg", () => {
        const testFunction = () => {new Game('@')}
        expect(testFunction).toThrow(Error);
        expect(testFunction).toThrow("Invalid game name argument. Only alphanumeric characters are allowed!");
        const testFunction2 = () => {new Game([1])}
        expect(testFunction2).toThrow(Error);
        expect(testFunction2).toThrow("Invalid game name argument. Only alphanumeric characters are allowed!");
    })
    test("Game constructor - Missing mandatory creator arg", () => {
        const testFunction = () => {new Game('Tetris')}
        expect(testFunction).toThrow(Error);
        expect(testFunction).toThrow("Invalid creator object type.");
    })
    test("Game constructor - Giving bad type of creator arg", () => {
        const testFunction = () => {new Game('Tetris', 'Tristan')}
        expect(testFunction).toThrow(Error);
        expect(testFunction).toThrow("Invalid creator object type.");
    })
    test("Game constructor - Giving invalid value of additional maxPlayer arg", () => {
        let player = new Player('Tristan');
        const testFunction = () => {new Game('Tetris', player, MAX_PLAYERS + 1)}
        expect(testFunction).toThrow(Error);
        expect(testFunction).toThrow("maxPlayers value is out of range (1 to " + MAX_PLAYERS.toString() + ")");
        const testFunction2 = () => {new Game('Tetris', player, -10)}
        expect(testFunction2).toThrow(Error);
        expect(testFunction2).toThrow("maxPlayers value is out of range (1 to " + MAX_PLAYERS.toString() + ")");
    })
    test("Game constructor - Giving invalid type of additional maxPlayer arg", () => {
        let player = new Player('Tristan');
        const testFunction = () => {new Game('Tetris', player, 'YOLO')}
        expect(testFunction).toThrow(Error);
        expect(testFunction).toThrow("Invalid maxPlayers type.");
    })
    test("Game constructor - Giving invalid value of additional fallFrequency arg", () => {
        let player = new Player('Tristan');
        const testFunction = () => {new Game('Tetris', player, MAX_PLAYERS, 0)}
        expect(testFunction).toThrow(Error);
        expect(testFunction).toThrow("FallFrequency value is out of range (1 to 4).");
        const testFunction2 = () => {new Game('Tetris', player, MAX_PLAYERS, -5651)}
        expect(testFunction2).toThrow(Error);
        expect(testFunction2).toThrow("FallFrequency value is out of range (1 to 4).");
        const testFunction3 = () => {new Game('Tetris', player, MAX_PLAYERS, 5)}
        expect(testFunction3).toThrow(Error);
        expect(testFunction3).toThrow("FallFrequency value is out of range (1 to 4).");
        const testFunction4 = () => {new Game('Tetris', player, MAX_PLAYERS, 2.2)}
        expect(testFunction4).toThrow(Error);
        expect(testFunction4).toThrow("Invalid fallFrequency type.");
    })
    test("Game constructor - Giving invalid type of additional fallFrequency arg", () => {
        let player = new Player('Tristan');
        const testFunction = () => {new Game('Tetris', player, MAX_PLAYERS, 'yolo')}
        expect(testFunction).toThrow(Error);
        expect(testFunction).toThrow("Invalid fallFrequency type.");
    })
    test("setNbOfNextTetrominos - Valid value", () => {
        let player = new Player('Tristan');
        let game = new Game('Tetris', player);
        game.setNbOfNextTetrominos(5);
        expect(game.nbOfNextTetrominos).toEqual(5);
    })
    test("setNbOfNextTetrominos - Invalid value", () => {
        let player = new Player('Tristan');
        let game = new Game('Tetris', player);
        const testFunction = () => {game.setNbOfNextTetrominos(10)};
        expect(testFunction).toThrow(Error);
        expect(testFunction).toThrow("Invalid number of next Tetrominos");
    })
    test("setRemoveOwnIndestructibleLine - Valid value", () => {
        let player = new Player('Tristan');
        let game = new Game('Tetris', player);
        game.setRemoveOwnIndestructibleLine(true);
        expect(game.removeOwnIndestructibleLine).toBe(true);
        game.setRemoveOwnIndestructibleLine(false);
        expect(game.removeOwnIndestructibleLine).toBe(false);
    })
    test("setRemoveOwnIndestructibleLine - Invalid type of value", () => {
        let player = new Player('Tristan');
        let game = new Game('Tetris', player);
        const testFunction = () => {game.setRemoveOwnIndestructibleLine(10)};
        expect(testFunction).toThrow(Error);
        expect(testFunction).toThrow("Invalid type RemoveOwnIndestructibleLine");
    })
    test("startGame - Check is everything's get reset", () => {
        let player1 = new Player('Tristan');
        let player2 = new Player('Jerome');
        player1.score = 152000;
        player1.isPlaying = false;
        player1.tetromino.index = 163;
        player1.hasLost = true;
        player2.score = 2552200;
        player2.isPlaying = false;
        player2.tetromino.index = 223;
        player2.hasLost = false;
        let game = new Game('Tetris', player1);
        game.isStarted = false
        game.addPlayer(player2);
        game.startGame();
        expect(game.isStarted).toEqual(true);
        expect(game.players[0].score).toEqual(0);
        expect(game.players[1].score).toEqual(0);
        expect(game.players[0].isPlaying).toBe(true);
        expect(game.players[1].isPlaying).toBe(true);
        expect(game.players[0].tetromino.index).toEqual(1);
        expect(game.players[1].tetromino.index).toEqual(1);
        expect(game.players[0].hasLost).toBe(false);
        expect(game.players[1].hasLost).toBe(false);
        expect(game.players[0].rows).toEqual(0);
        expect(game.players[0].level).toEqual(0);
        expect(game.players[0].rank).toEqual(0);
        expect(game.players[0].dropFrequency).toEqual(1000);
        game.stopGame(); //To clear interval...
    })
    test("stopGame - Check everything's has been updated", () => { //I should check for socket..
        let player1 = new Player('Tristan');
        let player2 = new Player('Jerome');
        player1.score = 152000;
        player1.isPlaying = true
        player1.tetromino.index = 163;
        player1.hasLost = true;
        player2.score = 2552200;
        player2.isPlaying = false
        player2.tetromino.index = 223;
        player2.hasLost = false;
        let game = new Game('Tetris', player1);
        game.addPlayer(player2);
        game.stopGame();
        expect(game.isStarted).toEqual(false);
        expect(game.players[0].score).toEqual(152000);
        expect(game.players[1].score).toEqual(2552200);
        expect(game.players[0].isPlaying).toBe(false);
        expect(game.players[1].isPlaying).toBe(false);
        expect(game.players[0].tetromino.index).toEqual(163);
        expect(game.players[1].tetromino.index).toEqual(223);
        expect(game.players[0].hasLost).toBe(true);
        expect(game.players[1].hasLost).toBe(false);
    })
    test("getCorrespondingTetromino - valid piece index value", () => {
        let player = new Player('Tristan');
        let game = new Game('Tetris', player);
        expect(game.tetrominos.length).toEqual(0);
        game.getCorrespondingTetrimino(0);
        expect(game.tetrominos.length).toEqual(1);
        game.getCorrespondingTetrimino(1);
        expect(game.tetrominos.length).toEqual(2);
    })
    test("getCorrespondingTetromino - Invalid piece index value", () => {
        let player = new Player('Tristan');
        let game = new Game('Tetris', player);
        const testFunction = () => {game.getCorrespondingTetrimino(-1)};
        expect(testFunction).toThrow(Error);
        expect(testFunction).toThrow("Invalid tetrominoIdx value.");
        const testFunction2 = () => {game.getCorrespondingTetrimino(1)};
        expect(testFunction2).toThrow(Error);
        expect(testFunction2).toThrow("Invalid tetrominoIdx value.");
    })
    test("getCorrespondingTetrimino - Invalid piece index type", () => {
        let player = new Player('Tristan');
        let game = new Game('Tetris', player);
        const testFunction = () => {game.getCorrespondingTetrimino('yoolo')};
        expect(testFunction).toThrow(Error);
        expect(testFunction).toThrow("Invalid tetrominoIdx type.");
    })
    test("checkIfGameShouldEnd - Game hasn't started yet", () => {
        let player1 = new Player('Tristan');
        let player2 = new Player('Jerome');
        let game = new Game('Tetris', player1);
        game.addPlayer(player2);
        player1.isPlaying = true;
        player2.isPlaying = true;
        game.checkIfGameShouldEnd();
        expect(game.isStarted).toBe(false);
        expect(game.players[0].isPlaying).toBe(true);
        expect(game.players[1].isPlaying).toBe(true);
    })
    test("checkIfGameShouldEnd - Should end game", () => {
        let player1 = new Player('Tristan');
        let player2 = new Player('Jerome');
        let game = new Game('Tetris', player1);
        game.addPlayer(player2);
        game.startGame();
        game.players[1].hasLost = true;
        game.checkIfGameShouldEnd();
        expect(game.isStarted).toBe(false);
        expect(game.players[0].isPlaying).toBe(false);
        expect(game.players[1].isPlaying).toBe(false);
        game.stopGame();
    })
    test("setMaxPlayers - Valid value for maxPlayers property", () => {
        const player = new Player('Tristan');
        const game = new Game('Tetris', player);
        game.setMaxPlayers(6);
        expect(game.maxPlayers).toEqual(6);
        for (let i = 0; i < 6 - 1; i++) {
            let newPlayer = new Player('newPlayer' + i.toString());
            game.addPlayer(newPlayer);
            expect(game.players.length).toEqual(i + 2);
            expect(game.players[i + 1]).toMatchObject(newPlayer);
        }
        const badFunction = function() {
            game.addPlayer(new Player('newPlayer' + (6 - 1).toString()));
        }
        expect(badFunction).toThrow(Error);
        expect(badFunction).toThrow('There cannot be more than ' + game.maxPlayers.toString() + ' players in the game.');
    })
    test("setMaxPlayers - Out of range value for maxPlayers property", () => {
        const player = new Player('Tristan');
        const game = new Game('Tetris', player);
        const badFunction = () => {game.setMaxPlayers(0)};
        expect(badFunction).toThrow(Error);
        expect(badFunction).toThrow("maxPlayers value is out of range (1 to " + MAX_PLAYERS.toString() + ")")
        const badFunction2 = () => {game.setMaxPlayers(MAX_PLAYERS + 1)};
        expect(badFunction2).toThrow(Error);
        expect(badFunction2).toThrow("maxPlayers value is out of range (1 to " + MAX_PLAYERS.toString() + ")")
    })
    test("setMaxPlayers - Invalid argument type as maxPlayers property", () => {
        const player = new Player('Tristan');
        const game = new Game('Tetris', player);
        const badFunction = () => {game.setMaxPlayers('yolo')};
        expect(badFunction).toThrow(Error);
        expect(badFunction).toThrow("Invalid maxPlayers type.")
    })
    test("setFallFrequency - Valid value", () => {
        const player = new Player('Tristan');
        const game = new Game('Tetris', player);
        game.setFallFrequency(2);
        expect(game.fallFrequency).toEqual(2);
        game.setFallFrequency(4);
        expect(game.fallFrequency).toEqual(4);
    })
    test("setFallFrequency - Out of range value", () => {
        const player = new Player('Tristan');
        const game = new Game('Tetris', player);
        const badFunction = () => {game.setFallFrequency(-2)};
        expect(badFunction).toThrow(Error);
        expect(badFunction).toThrow("FallFrequency value is out of range (1 to 4).");
    })
    test("setFallFrequency - Invalid type of value", () => {
        const player = new Player('Tristan');
        const game = new Game('Tetris', player);
        const badFunction = () => {game.setFallFrequency('yolo')};
        expect(badFunction).toThrow(Error);
        expect(badFunction).toThrow("Invalid fallFrequency type.");
    })
    test('addPlayer - valid case', () => {
        const player = new Player('Tristan');
        const game = new Game("Tetris", player);
        const player2 = new Player('Anonyme');
        game.addPlayer(player2);
        expect(game.players.length).toEqual(2);
        expect(game.players[1].game).toEqual(game);
        expect(game.players[1].isPlaying).toBe(false);
    })
    test('addPlayer - Invalid player type', () => {
        const player = new Player('Tristan');
        const game = new Game("Tetris", player);
        const player2 = 'Anonyme';
        const badFunction = () => {game.addPlayer(player2)};
        expect(badFunction).toThrow(Error);
        expect(badFunction).toThrow("Invalid creator object type.");
    })
    test('addPlayer - Duplicate player in game', () => {
        const player = new Player('Tristan');
        const game = new Game("Tetris", player);
        const badFunction = () => {game.addPlayer(player)};
        expect(badFunction).toThrow(Error);
        expect(badFunction).toThrow("Username already exists in this game!");
    })
    test('deletePlayer - valid case', () => {
        const player = new Player('Tristan');
        const game = new Game("Tetris", player);
        const player2 = new Player('Anonyme');
        game.addPlayer(player2);
        game.deletePlayer(player2);
        expect(game.players.length).toEqual(1);
    })
    test('deletePlayer - No such player in this game', () => {
        const player = new Player('Tristan');
        const game = new Game("Tetris", player);
        const player2 = new Player('Anonyme');
        const player3 = new Player('Anonyme2');
        game.addPlayer(player2);
        const badFunction = () => {game.deletePlayer(player3)};
        expect(badFunction).toThrow(Error);
        expect(badFunction).toThrow("No player named \"" + player3.name + "\" in this game.");
    })
    test('deletePlayer - Invalid player type', () => {
        const player = new Player('Tristan');
        const game = new Game("Tetris", player);
        const player2 = 'Anonyme';
        const badFunction = () => {game.deletePlayer(player2)};
        expect(badFunction).toThrow(Error);
        expect(badFunction).toThrow("Invalid creator object type.");
    })
    test('addIndestructibleLinesOnPlayers - valid case', () => {
        const player = new Player('Tristan');
        const game = new Game("Tetris", player);
        const player2 = new Player('Anonyme');
        const player3 = new Player('Anonyme2');
        game.addPlayer(player2);
        game.addPlayer(player3);
        game.setRemoveOwnIndestructibleLine(true);
        game.startGame();
        game.addIndestructibleLinesOnPlayers(player, 2);
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 10; j++) {
                expect(game.players[1].board[19 - i][j]).toEqual(1);
            }
        }
        expect(game.players[1].board[17][0]).toEqual(0);
        game.stopGame();
    })
    test('takeOffIndestrutibleLinesFromPlayer - valid case', () => {
        const player = new Player('Tristan');
        const game = new Game("Tetris", player);
        const player2 = new Player('Anonyme');
        const player3 = new Player('Anonyme2');
        game.addPlayer(player2);
        game.addPlayer(player3);
        game.setRemoveOwnIndestructibleLine(true);
        game.startGame();
        game.addIndestructibleLinesOnPlayers(player, 2);
        expect(player2.board[19][0]).toEqual(1);
        game.addIndestructibleLinesOnPlayers(player2, 2);
        for (let i = 0; i < 20; i++) {
            for (let j = 0; j < 10; j++) {
                expect(game.players[1].board[i][j]).toEqual(0);
            }
        }
        game.stopGame();
    })
    httpServer.close();
});
