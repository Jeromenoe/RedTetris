import React, { useContext, useEffect } from 'react'
import { useSelector } from 'react-redux';
import Tetris from '../../components/Tetris/index';
import { SocketContext } from '../../context/socket';
import { AppContainer } from './styles'
import { Login } from '../Login/login'
import { WaitingRoom } from '../WaitingRoom/waitingRoom'
import { getGameInfos } from '../../selectors/game'
import { initSockets } from '../../sockets';

const App = () => {
	// console.log('re-render App');
	// const [playing, toggle] = useAudio('https://vgmsite.com/soundtracks/tetris-gameboy-rip/mpkrawiu/tetris-gameboy-02.mp3');
	const socket = useContext(SocketContext);
	const game = useSelector(getGameInfos)
	useEffect(() => {
		initSockets(socket);
	}, [socket]);
	let currentComponent = null;
	if (!game.name)
		currentComponent = <Login />
	else if (!game.isStarted)
		currentComponent = <WaitingRoom />
	else
		currentComponent = <Tetris />
	return (
		<AppContainer>
			{currentComponent}
			{/* <button onClick={toggle}>{playing ? "Pause" : "Play"}</button> */}
		</AppContainer>
	)
}

// const useAudio = url => {
//   const [audio] = useState(new Audio(url));
//   const [playing, setPlaying] = useState(false);

//   const toggle = () => setPlaying(!playing);

//   useEffect(() => {
//       playing ? audio.play() : audio.pause();
//     },
//     [playing]
//   );

//   useEffect(() => {
//     audio.addEventListener('ended', () => setPlaying(false));
//     return () => {
//       audio.removeEventListener('ended', () => setPlaying(false));
//     };
//   }, []);

//   return [playing, toggle];
// };

export default App;