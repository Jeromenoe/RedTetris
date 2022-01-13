import React from 'react';
import { Opponents } from '../index';
import renderer from 'react-test-renderer';
import configureStore from "redux-mock-store";
import { Provider } from 'react-redux';



describe('Testing Opponents Component', () => {
	test('Single Opponent', async () => {
		const mockStore = configureStore();
		const initialState = {
			game: {
				opponents: [
					{
						name: "toto",
						spectrum: [
							[0, 0, 'I', 'J']
						]
					}
				]
			}
		};
		const store = mockStore(initialState);
		const tree = renderer.create(<Provider store={store}><Opponents /></Provider>).toJSON();
		expect(tree).toMatchSnapshot();
	});
	test('multiple opponents', async () => {
		const mockStore = configureStore();
		const initialState = {
			game: {
				opponents: [
					{
						name: "toto",
						spectrum: [
							[0, 0, 'I', 'J']
						]
					},
					{
						name: "titi",
						spectrum: [
							[0, 0, 'I', 'J']
						]
					}
				]
			}
		};
		const store = mockStore(initialState);
		const tree = renderer.create(<Provider store={store}><Opponents /></Provider>).toJSON();
		expect(tree).toMatchSnapshot();
	});

	test('Opponent spectrum height = 0', async () => {
		const mockStore = configureStore();
		const initialState = {
			game: {
				opponents: [
					{
						name: "toto",
						spectrum: []
					}
				]
			}
		};
		const store = mockStore(initialState);
		const tree = renderer.create(<Provider store={store}><Opponents /></Provider>).toJSON();
		expect(tree).toMatchSnapshot();
	});
});