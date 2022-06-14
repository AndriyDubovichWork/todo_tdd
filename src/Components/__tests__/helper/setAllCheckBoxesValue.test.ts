import { cleanup } from '@testing-library/react';
import { setAllCheckBoxesValue } from '../../helper/setAllCheckBoxesValue';

afterEach(() => cleanup());
let tasks = [
  { text: 's', id: 0, isCompleted: false },
  { text: 'e', id: 1, isCompleted: true },
  { text: 'x', id: 2, isCompleted: false },
  { text: 'y', id: 3, isCompleted: true },
];
test('set all CheckBoxes to true', () => {
  const SetTasks = (NEWtasks: any) => {
    tasks = NEWtasks;
  };
  setAllCheckBoxesValue(tasks, SetTasks, true);
  expect(tasks).toEqual([
    { text: 's', id: 0, isCompleted: true },
    { text: 'e', id: 1, isCompleted: true },
    { text: 'x', id: 2, isCompleted: true },
    { text: 'y', id: 3, isCompleted: true },
  ]);
});
test('set all CheckBoxes to false', () => {
  const SetTasks = (NEWtasks: any) => {
    tasks = NEWtasks;
  };
  setAllCheckBoxesValue(tasks, SetTasks, false);
  expect(tasks).toEqual([
    { text: 's', id: 0, isCompleted: false },
    { text: 'e', id: 1, isCompleted: false },
    { text: 'x', id: 2, isCompleted: false },
    { text: 'y', id: 3, isCompleted: false },
  ]);
});
