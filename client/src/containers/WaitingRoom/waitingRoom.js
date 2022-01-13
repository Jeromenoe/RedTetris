import { useSelector } from 'react-redux';
import React, { useContext } from 'react';
import { SocketContext } from '../../context/socket';
import { WaitingRoomContainer, WaitingRoomHeaderContainer, WaitingPlayer, ButtonContainer} from './styles'
import { GameSettings, showSettingPopup } from '../GameSettings/gameSettings'
import { getGameInfos, getPlayerDatas } from '../../selectors/game'
import store from '../../store/index'
import { updateData } from '../../actions/game';
import { initialState } from '../../reducers/index';

export const WaitingRoom = () => {
	const socket = useContext(SocketContext)
    const me = useSelector(getPlayerDatas);
    const game = useSelector(getGameInfos);
    const playerList = getPlayerList(game, me);
    const meIsAdmin = (game.players[0].name === me.name) ? true : false;

    const sendStartGameSignal = () => {
        const game = store.getState().game;
        socket.emit('setSettings', game);
		socket.emit('readyToPlay', null);
    };
    const sendPlayerLeaveSignal = () => {
        socket.emit('playerLeave', null);
        store.dispatch(updateData(initialState));
    };
    return (
        <WaitingRoomContainer>
            <WaitingRoomHeaderContainer>
                <h2 className="waitingRoomTitle">{game.name.toUpperCase()}</h2>
                { meIsAdmin && <button className="settingsBtn" id='showSettingPopup'><img src="./settingBtn.png" className="settingsImg" alt="settings" onClick={showSettingPopup}/></button> }
            </WaitingRoomHeaderContainer>
            <ul className="waitingPlayerList">{playerList}</ul>   
            <ButtonContainer>
                <button className="LeaveButton" onClick={sendPlayerLeaveSignal}>LEAVE</button>
                { meIsAdmin && <button className="PlayButton" onClick={sendStartGameSignal}>PLAY</button> }
                { !meIsAdmin && <button className="WaitingAdminButton">WAITING FOR {game.players[0].name.toUpperCase()}</button>}
            </ButtonContainer>
            <GameSettings/>
        </WaitingRoomContainer>
    )
}

function getPlayerList(game, me) {
    return game.players.map((player, index) => {
        var playerColor = null;
        if (player.name === me.name) {
            playerColor = "#f53643";
            return <WaitingPlayer color={playerColor} key={index}>{player.name + ' (me)'}</WaitingPlayer>
        }
        playerColor = "#5c5c5c";
        return <WaitingPlayer color={playerColor} key={index}>{player.name}</WaitingPlayer>
        });
}