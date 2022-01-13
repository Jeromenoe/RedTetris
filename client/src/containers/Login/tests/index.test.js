import React from 'react';
import {Login} from '../login';

import configureStore from "redux-mock-store";
import {Provider} from 'react-redux';
import toJson from "enzyme-to-json";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { mount, configure } from 'enzyme';

import { SocketContext, socket } from "../../../context/socket"


configure({adapter: new Adapter()});


beforeEach(() => {
	// Avoid `attachTo: document.body` Warning
	const div = document.createElement('div');
	div.setAttribute('id', 'container');
	document.body.appendChild(div);
  });
  
  afterEach(() => {
	const div = document.getElementById('container');
	if (div) {
	  document.body.removeChild(div);
	}
  });

describe('Testing Login Container', () => {
	test('Check render', async () => {
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

		const wrapper = mount(
		<Provider store={store}><SocketContext.Provider value={socket}><Login /></SocketContext.Provider></Provider>, 
		{ attachTo: document.getElementById('container') });
		expect(toJson(wrapper)).toMatchSnapshot();

		wrapper.find('.PlayButton').simulate('click');

	  });

	  test('Check good url', async () => {
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

		delete window.location;
		window.location = {}
		window.location.href = 'http://localhost:3000#game[toto]';

		const wrapper = mount(
		<Provider store={store}><SocketContext.Provider value={socket}><Login /></SocketContext.Provider></Provider>, 
		{ attachTo: document.getElementById('container') });
		expect(toJson(wrapper)).toMatchSnapshot();

	  });
});