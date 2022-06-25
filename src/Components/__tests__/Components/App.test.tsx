import React from 'react';
import renderer from 'react-test-renderer';
import { cleanup } from '@testing-library/react';
import App from '../../../App';
import RoutesTestingHOC from './../../helper/RoutesTestingHOC';
afterEach(() => cleanup());

test('App have to match snapshot', () => {
  const tree = renderer
    .create(
      <RoutesTestingHOC>
        <App />
      </RoutesTestingHOC>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
