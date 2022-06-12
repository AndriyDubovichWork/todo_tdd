import deepcopy from 'deepcopy';
import { TaskType } from '../ToDo/ToDo';
import { ResetID } from './resetID';
import { Dispatch, SetStateAction } from 'react';

export const addToList = (
  tasks: TaskType[],
  task: TaskType,
  setTasks: Dispatch<SetStateAction<TaskType[]>>
) => {
  let copy = deepcopy(tasks);
  task.id = copy.length;
  copy.push(task);
  setTasks(copy);
};

export const DeleteChecked = (tasks: TaskType[], setTasks: any) => {
  let tasksCopy: TaskType[] = [];
  tasks.map((task: TaskType) => {
    if (!task.isCompleted) {
      tasksCopy.push(task);
    }
  });
  ResetID(tasksCopy, setTasks);
};

export const Delete = (tasks: TaskType[], setTasks: Dispatch<SetStateAction<TaskType[]>>, id: number) => {
  let tasksCopy: TaskType[] = [];
  tasks.map((task: TaskType) => {
    if (task.id !== id) {
      tasksCopy.push(task);
    }
  });
  ResetID(tasksCopy, setTasks);
};
