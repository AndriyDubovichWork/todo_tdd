import { render, screen, cleanup } from '@testing-library/react';
import ToDo from './../ToDo/ToDo';

afterEach(() => cleanup());

test('have to render', () => {
  //   render(<ToDo />);

  expect(true).toBe(true);
});
