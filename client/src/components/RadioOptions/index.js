import React from 'react';
import store from '../../store/index';
import { updateData } from '../../actions/game';

export const RadioOptions = ({ settingId }) => {
    const game = store.getState().game;
    return (
        <div className="radio-group">
            { settingId === 1 &&
                <>
                    <input type="radio" id="opt-1" name="selector-1"
                        checked={game.difficulty === 1}
                        onChange={e=>handleDifficultyOption(1)}/>
                    <label htmlFor="opt-1">EASY</label>
                    <input type="radio" id="opt-2" name="selector-1"
                        checked={game.difficulty === 2}
                        onChange={e=>handleDifficultyOption(2)}/>
                    <label htmlFor="opt-2">MEDIUM</label>
                    <input type="radio" id="opt-3" name="selector-1"
                        checked={game.difficulty === 3}
                        onChange={e=>handleDifficultyOption(3)}/>
                    <label htmlFor="opt-3">HARD</label>
                    <input type="radio" id="opt-4" name="selector-1"
                        checked={game.difficulty === 4}
                        onChange={e=>handleDifficultyOption(4)}/>
                    <label htmlFor="opt-4">LEVEL</label>
                </>
            }
            { settingId === 2 &&
                <>
                    <input type="radio" id="opt-5" name="selector-2"
                        checked={game.nbOfNextTetromino === 1}
                        onChange={e=>handleNbNextTetrominosOption(1)}/>
                    <label htmlFor="opt-5">1</label>
                    <input type="radio" id="opt-6" name="selector-2"
                        checked={game.nbOfNextTetromino === 2}
                        onChange={e=>handleNbNextTetrominosOption(2)}/>
                    <label htmlFor="opt-6">2</label>
                    <input type="radio" id="opt-7" name="selector-2"
                        checked={game.nbOfNextTetromino === 3}
                        onChange={e=>handleNbNextTetrominosOption(3)}/>
                    <label htmlFor="opt-7">3</label>
                    <input type="radio" id="opt-8" name="selector-2"
                        checked={game.nbOfNextTetromino === 4}
                        onChange={e=>handleNbNextTetrominosOption(4)}/>
                    <label htmlFor="opt-8">4</label>
                    <input type="radio" id="opt-9" name="selector-2"
                        checked={game.nbOfNextTetromino === 5}
                        onChange={e=>handleNbNextTetrominosOption(5)}/>
                    <label htmlFor="opt-9">5</label>
                </>
            }
            { settingId === 3 &&
                <>
                    <input type="radio" id="opt-10" name="selector-3"
                        checked={game.removeOwnIndestructibleLine === false}
                        onChange={e=>handleIndestructibleLineOption(1)}/>
                    <label htmlFor="opt-10">FALSE</label>
                    <input type="radio" id="opt-11" name="selector-3"
                        checked={game.removeOwnIndestructibleLine === true}
                        onChange={e=>handleIndestructibleLineOption(2)}/>
                    <label htmlFor="opt-11">TRUE</label>
                </>
            }
        </div>
    )
}

const handleNbNextTetrominosOption = (id) => {
    const game = store.getState().game;

    let gameCloned = {
        ...game,
        nbOfNextTetromino: id,
    };
    store.dispatch(updateData({game: gameCloned}));
}

const handleIndestructibleLineOption = (id) => {
    const game = store.getState().game;

    const optionValue = (id === 1) ? false : true;
    let gameCloned = {
        ...game,
        removeOwnIndestructibleLine: optionValue,
    };
    store.dispatch(updateData({game: gameCloned}));
}

const handleDifficultyOption = (id) => {
    const game = store.getState().game;

    let gameCloned = {
        ...game,
        difficulty: id,
    };
    store.dispatch(updateData({game: gameCloned}));
}