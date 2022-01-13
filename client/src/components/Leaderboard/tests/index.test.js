import React from 'react';
import { Leaderboard } from '../index';
import renderer from 'react-test-renderer';
import configureStore from "redux-mock-store";
import {Provider} from 'react-redux';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { mount, configure } from 'enzyme';

import { SocketContext, socket } from "../../../context/socket"


configure({adapter: new Adapter()});



describe('Testing Leaderboard Component', () => {
	test('Check store isOver = true', async () => {
		const mockStore = configureStore();
		const initialState = {
			game: {
				isOver: true,
				players: [{
					rank: 1,
					name: "Jojo",
					score: 1000,
					rows: 10,
					level: 4
				},
				{
					rank: 2,
					name: "Joji",
					score: 1000,
					rows: 10,
					level: 4
				}]},
			me : {
				name : "Jojo"
			}
		};
		const store = mockStore(initialState);
		const tree = renderer.create(<Provider store={store}><Leaderboard /></Provider>).toJSON();
		expect(tree).toMatchSnapshot();
	  });

	test('Check store isOver = false', async () => {
		const mockStore = configureStore();
		const initialState = {
			game: {
				isOver: false,
				players: [{
					rank: 1,
					name: "Jojo",
					score: 1000,
					rows: 10,
					level: 4
				}]},
			me : {
				name : "Jojo"
			}
		};
		const store = mockStore(initialState);
		
		const tree = renderer.create(<Provider store={store}><Leaderboard /></Provider>).toJSON();
		expect(tree).toMatchSnapshot();
	});


	test('Test button leave game', async () => {
		const mockStore = configureStore();
		const initialState = {
			game: {
				isOver: false,
				players: [{
					rank: 1,
					name: "Jojo",
					score: 1000,
					rows: 10,
					level: 4
				}]},
			me : {
				name : "Jojo"
			}
		};
		const store = mockStore(initialState);
		
		const wrapper = mount(<Provider store={store}><SocketContext.Provider value={socket}><Leaderboard /></SocketContext.Provider></Provider>);
		wrapper.find('#btn-leave-in-game').simulate('click');
	});
	
});