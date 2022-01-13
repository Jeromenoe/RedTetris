import React from 'react';
import Cell from '../index';
import renderer from 'react-test-renderer';


describe('Testing Cell Component', () => {
	test('Check valids parameters', async () => {
		const tree = renderer.create(<Cell type={"T"} color={"#000000"}/>).toJSON();
		expect(tree).toMatchSnapshot();
	  });
	test('Check with spectrum type', async () => {
		const tree = renderer.create(<Cell type={"spectrum"} color={"#000000"}/>).toJSON();
		expect(tree).toMatchSnapshot();
	  });
});