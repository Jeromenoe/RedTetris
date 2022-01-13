import React, { useContext, useState } from 'react';
import { UserLoginContainer, UserInputContainer} from './styles'
import { updateData } from '../../actions/game'
import { SocketContext } from '../../context/socket';
import store from '../../store/index';

export const Login = () => {
    let [errorLog, setErrorLog] = useState(null); 
    const socket = useContext(SocketContext);

    const loginServer = (e) => {
        let playerName = document.getElementById("playerNameId").value;
        let gameName = document.getElementById("gameNameId").value;
        socket.emit('joinGame', {roomName: gameName, playerName: playerName}, (response) => {
            if (response === 'ok') {
                const me = store.getState().me;
                let clonedMe = {
                    ...me,
                    name: playerName,
                };
                store.dispatch(updateData({me: clonedMe}));
            } else {
                setErrorLog(response);
            }
        });
    }
    getUrlInfos(socket);
    return (
      <UserLoginContainer>
        <h1 className="redTetrisTitle">Red Tetris</h1>
        <UserInputContainer>
            <input type='text' id="playerNameId" className="userInfosTextField" placeholder="User Name"/>
            {errorLog && errorLog.playerName && <p className="error-login">{errorLog.playerName}</p> }
        </UserInputContainer>
        <UserInputContainer>
            <input type='text' id="gameNameId" className="userInfosTextField" placeholder="Game Name"/>
            {errorLog && errorLog.gameName && <p className="error-login">{errorLog.gameName}</p>}
        </UserInputContainer>
        <button className="PlayButton" onClick={loginServer}>PLAY</button>
      </UserLoginContainer>
      
    )
  }

export const getUrlInfos = (socket) => {
    const gameName = retrieveGameNameFromUrl(window.location.href);
    const playerName = retrievePlayerNameFromUrl(window.location.href);

    if (!gameName || !playerName)
        return;
    socket.emit('joinGame', {roomName: gameName, playerName: playerName}, (response) => {
        if (response === 'ok') {
            const me = store.getState().me;
            const game = store.getState().game;
            let clonedMe = {
                ...me,
                name: playerName,
            };
            let clonedGame = {
                ...game,
                name: gameName,
            };
            store.dispatch(updateData({ me: clonedMe, game: clonedGame }))
        }
    });
}

function retrieveGameNameFromUrl(url) {
    const indexOfHashUrl = url.indexOf('#');
    const indexOfOpeningBracket = url.indexOf('[');

    if (indexOfHashUrl === -1 || indexOfHashUrl > indexOfOpeningBracket)
        return null;
    const roomName = url.slice(indexOfHashUrl + 1, indexOfOpeningBracket);
    if (!roomName)
        return null;
    return roomName;
}

function retrievePlayerNameFromUrl(url) {
    const indexOfOpeningBracket = url.indexOf('[');
    const indexOfClosingBracket = url.indexOf(']');

    if (indexOfOpeningBracket === -1 || indexOfClosingBracket === -1
        || indexOfOpeningBracket > indexOfClosingBracket) {
        return null;
    }
    const playerName = url.slice(indexOfOpeningBracket + 1, indexOfClosingBracket);
    if (!playerName)
        return null;
    return playerName;
}