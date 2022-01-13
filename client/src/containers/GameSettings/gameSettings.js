import React from 'react';
import { GameSettingsContainer, ModalContent } from './styles'
import { RadioOptions } from '../../components/RadioOptions/index'

export const GameSettings = () => {
	window.addEventListener("click", function(event) {
        var modal = document.getElementById('gameSettingsPopup');
        if (event.target === modal) {
            modal.style.visibility = 'hidden';
            modal.style.opacity = "0";
        }
    });
    return (
        <GameSettingsContainer id="gameSettingsPopup">
            <ModalContent>
                <div className="settings-header">
                    <span id= "closebtn" className="CloseButton" onClick={hideSettingPopup}>&times;</span>
                    <h2>SETTINGS</h2>
                </div>
                <ul className="options-list">
                    <li className="options-elem" key="1">DIFFICULTY:<RadioOptions settingId={1}/></li>
                    <li className="options-elem" key="2">NUMBER OF NEXT TETROMINOS:<RadioOptions settingId={2}/></li>
                    <li className="options-elem" key="3">DELETE OWN INDESTRUTIBLE LINES:<RadioOptions settingId={3}/></li>
                    {/* <li>Changer les raccourcis clavier<RadioOptions settingId={1}/></li> */}
                </ul>
            </ModalContent>
        </GameSettingsContainer>
    )
}

export const showSettingPopup = () => {
    var modal = document.getElementById('gameSettingsPopup');
    modal.style.visibility = 'visible';
    modal.style.opacity = "1";
}

function hideSettingPopup() {
    var modal = document.getElementById('gameSettingsPopup');
    modal.style.visibility = 'hidden';
    modal.style.opacity = "0";
}