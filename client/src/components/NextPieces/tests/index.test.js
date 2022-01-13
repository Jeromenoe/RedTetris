import React from 'react';
import { NextPieces } from '../index';
import renderer from 'react-test-renderer';
import configureStore from "redux-mock-store";
import {Provider} from 'react-redux';



describe('Testing NextPieces Component', () => {
	test('Next tetrominos', async () => {
		const mockStore = configureStore();
		const initialState = {
			me : {
				nextPieces: [
					[
						['I', 'I', 'I', 'I']
					],
					[
						['J', 0, 0, 0],
						['J', 'J', 'J', 0]
					]
				]
			}
		};
		const store = mockStore(initialState);
		const tree = renderer.create(<Provider store={store}><NextPieces /></Provider>).toJSON();
		expect(tree).toMatchSnapshot();
	  });
});