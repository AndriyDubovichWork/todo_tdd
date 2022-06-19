import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import IteractButtons from './../../IteractButtons/IteractButtons';
import { addToList, DeleteChecked } from '../../helper/CruD';
import { TaskType } from '../../ToDo/ToDo';

afterEach(cleanup);

let tasks: TaskType[] = [
  { text: 'hi', id: 0, isCompleted: false },
  { text: 'hello', id: 1, isCompleted: true },
];

const setTasks = (newtasks: TaskType[]) => {
  tasks = newtasks;
};

let addTask = {
  text: '',
  id: 404,
  isCompleted: false,
};

const setAddTask = (newtask: TaskType) => {
  addTask = newtask;
};

let isAllSelected = false;

const setIsAllSelected = (newIsAllSelected: boolean) => {
  isAllSelected = newIsAllSelected;
};

let isAnySelected = false;
let isAnySelectedtwo = true;

// fuck this test i spend 3 days

describe('text area', () => {
  test('have to change text', () => {
    render(
      <IteractButtons
        DeleteChecked={DeleteChecked}
        tasks={tasks}
        setAddTask={setAddTask}
        setTasks={setTasks}
        addTask={addTask}
        addToList={addToList}
        isAllSelected={isAllSelected}
        setIsAllSelected={setIsAllSelected}
        isAnySelected={isAnySelected}
      />
    );

    const Input: HTMLElement = screen.getByTestId('text-field');
    expect(addTask.text).toBe('');

    fireEvent.change(Input, { target: { value: 'hello' } });
    expect(addTask.text).toBe('hello');
    fireEvent.change(Input, { target: { value: '' } });
  });
  test('have to change text and on enter add new element to array', async () => {
    tasks = [{ text: 'hi', id: 0, isCompleted: false }];

    await render(
      <IteractButtons
        DeleteChecked={DeleteChecked}
        tasks={tasks}
        setAddTask={setAddTask}
        setTasks={setTasks}
        addTask={addTask}
        addToList={addToList}
        isAllSelected={isAllSelected}
        setIsAllSelected={setIsAllSelected}
        isAnySelected={isAnySelected}
      />
    );
    const Input = screen.getByTestId('text-field');
    addTask.text = 'world';
    expect(Input).toBeInTheDocument();

    fireEvent.submit(Input);
    expect(tasks).toEqual([
      { text: 'hi', id: 0, isCompleted: false },
      { text: 'world', id: 1, isCompleted: false },
    ]);
  });
});
describe('buttons', () => {
  test('on delete click all checked have to be removed from array', async () => {
    tasks = [
      { text: 'hi', id: 0, isCompleted: false },
      { text: 'hello', id: 1, isCompleted: true },
    ];

    render(
      <IteractButtons
        DeleteChecked={DeleteChecked}
        tasks={tasks}
        setAddTask={setAddTask}
        setTasks={setTasks}
        addTask={addTask}
        addToList={addToList}
        isAllSelected={isAllSelected}
        setIsAllSelected={setIsAllSelected}
        isAnySelected={isAnySelectedtwo}
      />
    );

    const Delete = screen.getByTestId('delete_btn');
    expect(tasks).toEqual([
      { text: 'hi', id: 0, isCompleted: false },
      { text: 'hello', id: 1, isCompleted: true },
    ]);
    fireEvent.click(Delete);
    expect(tasks).toEqual([{ text: 'hi', id: 0, isCompleted: false }]);
  });
  test('on add button click have to add element to array', () => {
    tasks = [{ text: 'hi', id: 0, isCompleted: false }];
    addTask.text = 'world';
    render(
      <IteractButtons
        DeleteChecked={DeleteChecked}
        tasks={tasks}
        setAddTask={setAddTask}
        setTasks={setTasks}
        addTask={addTask}
        addToList={addToList}
        isAllSelected={isAllSelected}
        setIsAllSelected={setIsAllSelected}
        isAnySelected={isAnySelected}
      />
    );
    const Input = screen.getByTestId('text-field');
    const Add = screen.getByTestId('add_btn');
    expect(Input).toBeInTheDocument();
    expect(Add).toBeInTheDocument();

    fireEvent.click(Add);
    expect(tasks).toEqual([
      { text: 'hi', id: 0, isCompleted: false },
      { text: 'world', id: 1, isCompleted: false },
    ]);
  });
  test('on click selectAll all todo is checked', () => {
    tasks = [
      { text: 'hi', id: 0, isCompleted: false },
      { text: 'world', id: 1, isCompleted: false },
    ];
    addTask.text = 'world';
    render(
      <IteractButtons
        DeleteChecked={DeleteChecked}
        tasks={tasks}
        setAddTask={setAddTask}
        setTasks={setTasks}
        addTask={addTask}
        addToList={addToList}
        isAllSelected={isAllSelected}
        setIsAllSelected={setIsAllSelected}
        isAnySelected={isAnySelected}
      />
    );
    const SelectAll = screen.getByTestId('selectAll_btn');
    expect(SelectAll).toBeInTheDocument();

    fireEvent.click(SelectAll);
    expect(tasks).toEqual([
      { text: 'hi', id: 0, isCompleted: true },
      { text: 'world', id: 1, isCompleted: true },
    ]);
  });
});
