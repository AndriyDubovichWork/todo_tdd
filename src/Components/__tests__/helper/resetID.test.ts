import React from 'react';
import renderer from 'react-test-renderer';
import { cleanup } from '@testing-library/react';
import { ResetID } from '../../helper/resetID';
import { LegendToggleOutlined } from '@mui/icons-material';

afterEach(() => cleanup());

test("have to reset id's", () => {
  let tasks = [
    { text: 's', id: 0, isCompleted: false },
    { text: 'e', id: 10, isCompleted: true },
    { text: 'x', id: 20, isCompleted: true },
    { text: 'y', id: 2, isCompleted: true },
  ];
  const SetTasks = (NEWtasks: any) => {
    tasks = NEWtasks;
  };
  ResetID(tasks, SetTasks);
  expect(tasks).toEqual([
    { text: 's', id: 0, isCompleted: false },
    { text: 'e', id: 1, isCompleted: true },
    { text: 'x', id: 2, isCompleted: true },
    { text: 'y', id: 3, isCompleted: true },
  ]);
});
