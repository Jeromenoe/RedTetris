import React from 'react';
import Tetris from '../index';
import renderer from 'react-test-renderer';
import configureStore from "redux-mock-store";
import {Provider} from 'react-redux';
import toJson from "enzyme-to-json";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { mount, configure } from 'enzyme';
import { StyledTetrisWrapper } from "../styles";

import { SocketContext, socket } from "../../../context/socket"


configure({adapter: new Adapter()});


describe('Testing Tetris Component', () => {
	test('Test for snapshot', async () => {
		const mockStore = configureStore();
		const initialState = {
			game: {
				name: null,
				isStarted: false,
				isOver: false,
				opponents: [],
				players: [],
				removeOwnIndestructibleLine: false,
				difficulty: 2,
				nbOfNextTetromino: 3,
			},
			me: {
				name: null,
				hasLost: false,
				stage: [[]],
				nextPieces: [],
				rows: 0,
				level: 0,
				score: 0
			}
		};
		const store = mockStore(initialState);
		const wrapper = mount(<Provider store={store}><SocketContext.Provider value={socket}><Tetris /></SocketContext.Provider></Provider>);
		expect(toJson(wrapper)).toMatchSnapshot();
	  });
	  test('Test for input', async () => {
		const mockStore = configureStore();
		const initialState = {
			game: {
				name: 'test',
				isStarted: false,
				isOver: false,
				opponents: [],
				players: [],
				removeOwnIndestructibleLine: false,
				difficulty: 2,
				nbOfNextTetromino: 3,
			},
			me: {
				name: null,
				hasLost: false,
				stage: [[]],
				nextPieces: [],
				rows: 0,
				level: 0,
				score: 0
			}
		};
		const store = mockStore(initialState);
		const wrapper = mount(<Provider store={store}><SocketContext.Provider value={socket}><Tetris /></SocketContext.Provider></Provider>);
		wrapper.find(StyledTetrisWrapper).simulate('keyDown', { keyCode: 37 });
		wrapper.find(StyledTetrisWrapper).simulate('keyDown', { keyCode: 39 });
		wrapper.find(StyledTetrisWrapper).simulate('keyDown', { keyCode: 40 });
		wrapper.find(StyledTetrisWrapper).simulate('keyDown', { keyCode: 38 });
		wrapper.find(StyledTetrisWrapper).simulate('keyDown', { keyCode: 32 });
		wrapper.find(StyledTetrisWrapper).simulate('keyDown', { keyCode: 30 });
		wrapper.find('#leavePlayingGame').simulate('click');
	  });

	  test('Test for input with wrong keycode', async () => {
		const mockStore = configureStore();
		const initialState = {
			game: {
				name: 'test',
				isStarted: false,
				isOver: true,
				opponents: [],
				players: [],
				removeOwnIndestructibleLine: false,
				difficulty: 2,
				nbOfNextTetromino: 3,
			},
			me: {
				name: null,
				hasLost: false,
				stage: [[]],
				nextPieces: [],
				rows: 0,
				level: 0,
				score: 0
			}
		};
		const store = mockStore(initialState);
		const wrapper = mount(<Provider store={store}><SocketContext.Provider value={socket}><Tetris /></SocketContext.Provider></Provider>);
		wrapper.find(StyledTetrisWrapper).simulate('keyDown', { keyCode: 37 });
	});
});