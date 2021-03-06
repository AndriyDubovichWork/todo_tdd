import React from 'react';
import renderer from 'react-test-renderer';
import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import ToDoSticker from './../../ToDo/ToDoSticker';
import { Delete } from './../../helper/CruD';
import { TaskType } from '../../ToDo/ToDo';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RoutesTestingHOC from './../../helper/RoutesTestingHOC';

afterEach(() => cleanup());
configure({ adapter: new Adapter() });
const task: TaskType = { text: 'hi', id: 0, isCompleted: false };
const taskTwo: TaskType = { text: 'hello', id: 1, isCompleted: true };

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
describe('main', () => {
  test('ToDo Sticker have to match snapshot', () => {
    const tree = renderer
      .create(
        <RoutesTestingHOC>
          <ToDoSticker
            task={task}
            tasks={tasks}
            isCheckedHandler={isCheckedHandler}
            Delete={Delete}
            setTasks={setTasks}
          />
        </RoutesTestingHOC>,

        {
          createNodeMock: () => document.createElement('textarea'),
        }
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
describe('check box', () => {
  test('when task completed checkbox is activated', () => {
    render(
      <RoutesTestingHOC>
        <ToDoSticker
          task={taskTwo}
          tasks={tasks}
          isCheckedHandler={isCheckedHandler}
          Delete={Delete}
          setTasks={setTasks}
        />
      </RoutesTestingHOC>
    );

    const CheckBox = screen
      .getByTestId('check-box')
      // eslint-disable-next-line testing-library/no-node-access
      .querySelector('input[type="checkbox"]');

    expect(CheckBox).toHaveProperty('checked', true);
  });

  test('when task not completed checkbox is not activated', () => {
    render(
      <RoutesTestingHOC>
        <ToDoSticker
          task={task}
          tasks={tasks}
          isCheckedHandler={isCheckedHandler}
          Delete={Delete}
          setTasks={setTasks}
        />
      </RoutesTestingHOC>
    );

    const CheckBox = screen
      .getByTestId('check-box')
      // eslint-disable-next-line testing-library/no-node-access
      .querySelector('input[type="checkbox"]');

    expect(CheckBox).toHaveProperty('checked', false);
  });
});
describe('pin', () => {
  test('when task drageable pin is straigth', () => {
    render(
      <RoutesTestingHOC>
        <ToDoSticker
          task={task}
          tasks={tasks}
          isCheckedHandler={isCheckedHandler}
          Delete={Delete}
          setTasks={setTasks}
        />
      </RoutesTestingHOC>
    );

    const Pin = screen.getByTestId('pin');

    expect(Pin).not.toHaveProperty('transform', 'rotate(20deg)');
  });
  test('when task not drageable pin is rotated', () => {
    render(
      <RoutesTestingHOC>
        <ToDoSticker
          task={task}
          tasks={tasks}
          isCheckedHandler={isCheckedHandler}
          Delete={Delete}
          setTasks={setTasks}
        />
      </RoutesTestingHOC>
    );

    const Pin = screen.getByTestId('pin');
    fireEvent.click(Pin);
    const style = window.getComputedStyle(Pin);
    expect(style.transform).toBe('rotate(20deg)');
  });
});
describe('delete', () => {
  test('when click delete element remove from array', () => {
    render(
      <RoutesTestingHOC>
        <ToDoSticker
          task={taskTwo}
          tasks={tasks}
          isCheckedHandler={isCheckedHandler}
          Delete={Delete}
          setTasks={setTasks}
        />
      </RoutesTestingHOC>
    );

    const DeleteCross = screen.getByTestId('delete' + taskTwo.id);
    fireEvent.click(DeleteCross);
    expect(tasks[0].text).toBe('hi');
  });
});
