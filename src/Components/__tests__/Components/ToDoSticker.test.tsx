import React from 'react';
import renderer from 'react-test-renderer';
import { cleanup, render, screen } from '@testing-library/react';
import ToDoSticker from './../../ToDo/ToDoSticker';
import { Delete } from './../../helper/CruD';
import { TaskType } from '../../ToDo/ToDo';
afterEach(() => cleanup());
// @ts-nocheck
const task: TaskType = { text: 'hi', id: 0, isCompleted: false };
const taskTwo: TaskType = { text: 'hi', id: 1, isCompleted: true };

let tasks: TaskType[] = [
  { text: 'hi', id: 0, isCompleted: false },
  { text: 'hello', id: 1, isCompleted: true },
];
const setTasks = (newtasks: TaskType[]) => {
  tasks = newtasks;
};
const isCheckedHandler = (id: number, tasks: TaskType[]) => {
  const tasksupdate = tasks.map((task: TaskType) => {
    if (id === task.id) {
      return {
        id: task.id,
        text: task.text,
        isCompleted: !task.isCompleted,
      };
    }
    return {
      id: task.id,
      text: task.text,
      isCompleted: task.isCompleted,
    };
  });

  setTasks(tasksupdate);
};

test('ToDo Sticker have to match snapshot', () => {
  const tree = renderer
    .create(
      <ToDoSticker
        task={task}
        tasks={tasks}
        isCheckedHandler={isCheckedHandler}
        Delete={Delete}
        setTasks={setTasks}
      />,
      {
        createNodeMock: () => document.createElement('textarea'),
      }
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
test('when task completed checkbox is activated', () => {
  render(
    <ToDoSticker
      task={taskTwo}
      tasks={tasks}
      isCheckedHandler={isCheckedHandler}
      Delete={Delete}
      setTasks={setTasks}
    />
  );

  const CheckBox = screen
    .getByTestId('check-box')
    .querySelector('input[type="checkbox"]');

  expect(CheckBox).toHaveProperty('checked', true);
});
