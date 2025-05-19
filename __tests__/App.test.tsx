/**
 * @format
 */


import React from 'react';
import App from '../App';
import ReactTestRenderer from 'react-test-renderer';

// Note: import explicitly to use the types shipped with jest.
import {it, test} from '@jest/globals';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

test('renders correctly', async () => {
  await ReactTestRenderer.act(() => {
    ReactTestRenderer.create(<App />);
  });
});
