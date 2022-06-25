import React from 'react';
import renderer from 'react-test-renderer';
import { cleanup, render, screen, fireEvent } from '@testing-library/react';

import FullScreenSticker from '../../../Components/FullScreenSticker/FullScreenSticker';
import { TaskType } from '../../ToDo/ToDo';
import RoutesTestingHOC from './../../helper/RoutesTestingHOC';
afterEach(() => cleanup());

let tasks: TaskType[] = [
  { text: 'hello 0', id: 0, isCompleted: false },
  { text: 'hello 1', id: 1, isCompleted: true },
  { text: 'hello 2', id: 2, isCompleted: false },
  { text: 'hello 3', id: 3, isCompleted: true },
];

const setTasks = (NewTask: TaskType[]) => {
  tasks = NewTask;
};
describe('FullScreenSticker', () => {
  test('FullScreenSticker have to match snapshot', () => {
    const tree = renderer
      .create(
        <RoutesTestingHOC>
          <FullScreenSticker tasks={tasks} setTasks={setTasks} />
        </RoutesTestingHOC>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('on back arrow click change link', async () => {
    render(
      <RoutesTestingHOC>
        <FullScreenSticker tasks={tasks} setTasks={setTasks} />
      </RoutesTestingHOC>
    );
    const Arrow = screen.getByTestId('arrow');
    await fireEvent.click(Arrow);
    expect(Arrow).toBeInTheDocument();
  });
});
