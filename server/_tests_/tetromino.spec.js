import { Piece } from '../src/Piece.js'

describe('Testing Tetromino class', () => {
    test('Tetromino constructor', () => {
        const tetromino = new Piece();
        expect(tetromino.shape).not.toBe(null);
    })
})