import React from 'react';
import renderer from 'react-test-renderer';
import { cleanup } from '@testing-library/react';
import App from '../../../App';
afterEach(() => cleanup());

test('App have to match snapshot', () => {
  const tree = renderer.create(<App />).toJSON();

  expect(tree).toMatchSnapshot();
});
