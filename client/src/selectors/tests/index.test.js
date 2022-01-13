import { getMeInfos } from '../me'

describe('Testing me selectors', () => {
	test('test get info me', async () => {
		const state = {
			me : {
				name: 'toto',
				score: 1000,
				level: 1,
				rows: 1,
				hasLost: true
			}
		}
		expect(getMeInfos(state)).toMatchObject(state.me);
	});
});