import React from 'react';
import {GameSettings} from '../gameSettings';

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

describe('Testing GameSettings Container', () => {
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
		const map = {};
		window.addEventListener = jest.fn((event, cb) => {
			map[event] = cb;
		  })

		const wrapper = mount(
		<Provider store={store}><SocketContext.Provider value={socket}><GameSettings /></SocketContext.Provider></Provider>, 
		{ attachTo: document.getElementById('container') });
		expect(toJson(wrapper)).toMatchSnapshot();
		wrapper.find('#closebtn').simulate('click');
	
		
		map.click({target: document.getElementById('gameSettingsPopup')});
	  });

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
		const map = {};
		window.addEventListener = jest.fn((event, cb) => {
			map[event] = cb;
		  })

		const wrapper = mount(
		<Provider store={store}><SocketContext.Provider value={socket}><GameSettings /></SocketContext.Provider></Provider>, 
		{ attachTo: document.getElementById('container') });
		expect(toJson(wrapper)).toMatchSnapshot();
		map.click({target: 'test'});
	  });
});