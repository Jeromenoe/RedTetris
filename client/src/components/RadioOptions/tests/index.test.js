import React from 'react';
import { RadioOptions } from '../index';
import renderer from 'react-test-renderer';
import configureStore from "redux-mock-store";
import {Provider} from 'react-redux';

import toJson from "enzyme-to-json";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { mount, configure } from 'enzyme';

import { SocketContext, socket } from "../../../context/socket"


configure({adapter: new Adapter()});


describe('Testing RadioOptions Component', () => {
	test('Test rendering ok', async () => {
		const mockStore = configureStore();
		const initialState = {
			game: {
				difficulty: 1,
				nbOfNextTetromino: 1,
				removeOwnIndestructibleLine: 1
			}
		};
		const store = mockStore(initialState);
		const wrapper = mount(<Provider store={store}><SocketContext.Provider value={socket}><RadioOptions settingId={1} /></SocketContext.Provider></Provider>);
		expect(toJson(wrapper)).toMatchSnapshot();
	  });

	  test('Test on game difficulty', async () => {
		const mockStore = configureStore();
		const initialState = {
			game: {
				difficulty: 1,
				nbOfNextTetromino: 1,
				removeOwnIndestructibleLine: 1
			}
		};
		const store = mockStore(initialState);
		
		const wrapper = mount(<Provider store={store}><SocketContext.Provider value={socket}><RadioOptions settingId={1} /></SocketContext.Provider></Provider>);
		wrapper.find('#opt-1').simulate('change');
		wrapper.find('#opt-2').simulate('change');
		wrapper.find('#opt-3').simulate('change');
		wrapper.find('#opt-4').simulate('change');
	});

	test('Test on nb of next tetrominos', async () => {
		const mockStore = configureStore();
		const initialState = {
			game: {
				difficulty: 1,
				nbOfNextTetromino: 1,
				removeOwnIndestructibleLine: 1
			}
		};
		const store = mockStore(initialState);
		
		const wrapper = mount(<Provider store={store}><SocketContext.Provider value={socket}><RadioOptions settingId={2} /></SocketContext.Provider></Provider>);
		wrapper.find('#opt-5').simulate('change');
		wrapper.find('#opt-6').simulate('change');
		wrapper.find('#opt-7').simulate('change');
		wrapper.find('#opt-8').simulate('change');
		wrapper.find('#opt-9').simulate('change');
	});

	test('Test on indestructible line option', async () => {
		const mockStore = configureStore();
		const initialState = {
			game: {
				difficulty: 1,
				nbOfNextTetromino: 1,
				removeOwnIndestructibleLine: 1
			}
		};
		const store = mockStore(initialState);
		
		const wrapper = mount(<Provider store={store}><SocketContext.Provider value={socket}><RadioOptions settingId={3} /></SocketContext.Provider></Provider>);
		wrapper.find('#opt-10').simulate('change');
		wrapper.find('#opt-11').simulate('change');
	});
});