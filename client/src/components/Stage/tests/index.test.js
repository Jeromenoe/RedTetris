import React from 'react';
import Stage from '../index';
import renderer from 'react-test-renderer';
import configureStore from "redux-mock-store";
import { Provider } from 'react-redux';


describe('Testing Stage Component', () => {
	test('Test with styledTetrisWrapper div', async () => {
		const div = document.createElement('div');
		div.setAttribute('id', 'styledTetrisWrapper');
		document.body.appendChild(div);
		const mockStore = configureStore();
		const initialState = {
			me: {
				stage: [
					[0, 0, 'I', 'J'],
					[0, 0, 'I', 'J'],
					[0, 0, 'I', 'J'],
					[0, 0, 'I', 'J']
				]
			}
		};
		const store = mockStore(initialState);
		const tree = renderer.create(<Provider store={store}><Stage /></Provider>).toJSON();
		expect(tree).toMatchSnapshot();
		document.body.removeChild(div);
	});

	test('Test without styledTetrisWrapper div', async () => {
		const mockStore = configureStore();
		const initialState = {
			me: {
				stage: [
					[0, 0, 'I', 'J'],
					[0, 0, 'I', 'J'],
					[0, 0, 'I', 'J'],
					[0, 0, 'I', 'J']
				]
			}
		};
		const store = mockStore(initialState);
		const tree = renderer.create(<Provider store={store}><Stage /></Provider>).toJSON();
		expect(tree).toMatchSnapshot();
	});
});