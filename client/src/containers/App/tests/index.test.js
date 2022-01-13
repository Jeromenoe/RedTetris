import React from 'react';
import App from '../app';

import configureStore from "redux-mock-store";
import {Provider} from 'react-redux';
import toJson from "enzyme-to-json";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { mount, configure } from 'enzyme';

import { SocketContext, socket } from "../../../context/socket"


configure({adapter: new Adapter()});

describe('Testing App Container', () => {
	test('Check Login', async () => {
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
		const wrapper = mount(<Provider store={store}><SocketContext.Provider value={socket}><App /></SocketContext.Provider></Provider>);
		expect(toJson(wrapper)).toMatchSnapshot();
	  });

	  test('Check waiting room', async () => {
		const mockStore = configureStore();
		const initialState = {
			game: {
				name: 'test',
				isStarted: false,
				isOver: false,
				opponents: [],
				players: [
					{name: 'toto'}
				],
				removeOwnIndestructibleLine: false,
				difficulty: 2,
				nbOfNextTetromino: 3,
			},
			me: {
				name: 'toto',
				hasLost: false,
				stage: [[]],
				nextPieces: [],
				rows: 0,
				level: 0,
				score: 0
			}
		};
		const store = mockStore(initialState);
		const wrapper = mount(<Provider store={store}><SocketContext.Provider value={socket}><App /></SocketContext.Provider></Provider>);
		expect(toJson(wrapper)).toMatchSnapshot();
	  });

	  test('Check in game', async () => {
		const mockStore = configureStore();
		const initialState = {
			game: {
				name: 'test',
				isStarted: true,
				isOver: false,
				opponents: [],
				players: [
					[{name: 'toto'}]
				],
				removeOwnIndestructibleLine: false,
				difficulty: 2,
				nbOfNextTetromino: 3,
			},
			me: {
				name: 'toto',
				hasLost: false,
				stage: [[]],
				nextPieces: [],
				rows: 0,
				level: 0,
				score: 0
			}
		};
		const store = mockStore(initialState);
		const wrapper = mount(<Provider store={store}><SocketContext.Provider value={socket}><App /></SocketContext.Provider></Provider>);
		expect(toJson(wrapper)).toMatchSnapshot();
	  });
});