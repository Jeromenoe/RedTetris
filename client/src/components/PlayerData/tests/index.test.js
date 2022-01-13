import React from 'react';
import { PlayerData } from '../index';
import renderer from 'react-test-renderer';
import configureStore from "redux-mock-store";
import {Provider} from 'react-redux';



describe('Testing PlayerData Component', () => {
	test('Test with basic values', async () => {
		const mockStore = configureStore();
		const initialState = {
			me: {
				level: 5,
				score: 1000,
				rows: 10
			}
		};
		const store = mockStore(initialState);
		const tree = renderer.create(<Provider store={store}><PlayerData /></Provider>).toJSON();
		expect(tree).toMatchSnapshot();
	  });
});