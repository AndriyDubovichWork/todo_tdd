import { cleanup } from '@testing-library/react';
import { addToList, Delete, DeleteChecked } from '../../helper/CruD';
afterEach(() => cleanup());
let tasks = [];
const setTasks = (tasksCopy: any) => {
  tasks = tasksCopy;
};
test('Have to Create(add) new element in array', () => {
  tasks = [{ text: 'helo', id: 0, isCompleted: false }];
  const task = { text: 'hello', id: 1, isCompleted: true };

  addToList(tasks, task, setTasks);
  expect(tasks).toStrictEqual([
    { text: 'helo', id: 0, isCompleted: false },
    { text: 'hello', id: 1, isCompleted: true },
  ]);
});

test('Have to Delete(remove) element from array by id', () => {
  tasks = [{ text: 'helo', id: 0, isCompleted: false }];

  const id = 0;
  Delete(tasks, setTasks, id);

  expect(tasks).toEqual([]);
});

test('Have to Delete(remove) element from array by id and change other elements ids', () => {
  tasks = [
    { text: 'helo', id: 0, isCompleted: false },
    { text: 'hello', id: 20, isCompleted: false },
  ];

  const id = 0;
  Delete(tasks, setTasks, id);

  expect(tasks).toEqual([{ text: 'hello', id: 0, isCompleted: false }]);
});

test('Have to Delete(remove) checked element from array and change id', () => {
  tasks = [
    { text: 'helo', id: 0, isCompleted: true },
    { text: 'helo', id: 1, isCompleted: false },
  ];

  DeleteChecked(tasks, setTasks);

  expect(tasks).toEqual([{ text: 'helo', id: 0, isCompleted: false }]);
});
