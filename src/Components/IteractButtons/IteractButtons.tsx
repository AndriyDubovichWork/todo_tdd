import React, { Dispatch, SetStateAction } from 'react';
import { TaskType } from '../ToDo/ToDo';
import { Button, FormControlLabel, TextField } from '@mui/material';
import { setAllCheckBoxesValue } from './../helper/setAllCheckBoxesValue';

type IteractButtonsType = {
  DeleteChecked: (
    task: TaskType[],
    setTasks: Dispatch<SetStateAction<TaskType[]>>
  ) => void;
  addToList: (
    tasks: TaskType[],
    task: TaskType,
    setTasks: Dispatch<SetStateAction<TaskType[]>>
  ) => void;
  tasks: TaskType[];
  setAddTask: Dispatch<SetStateAction<TaskType>>;
  setTasks: Dispatch<SetStateAction<TaskType[]>>;
  addTask: TaskType;
  isAllSelected: boolean;
  setIsAllSelected: Dispatch<SetStateAction<boolean>>;
};

const IteractButtons = ({
  DeleteChecked,
  tasks,
  setAddTask,
  setTasks,
  addTask,
  addToList,
  isAllSelected,
  setIsAllSelected,
}: IteractButtonsType) => {
  return (
    <>
      <TextField
        onChange={(e) => {
          setAddTask({ id: 0, text: e.target.value, isCompleted: false });
        }}
        value={addTask.text}
      />
      <Button
        variant='contained'
        onClick={() => addToList(tasks, addTask, setTasks)}
      >
        add
      </Button>
      <Button
        variant='contained'
        onClick={() => DeleteChecked(tasks, setTasks)}
      >
        delete
      </Button>
      {isAllSelected ? (
        <Button
          variant='contained'
          onClick={() => setAllCheckBoxesValue(tasks, setTasks, false)}
        >
          unselect all
        </Button>
      ) : (
        <Button
          variant='contained'
          onClick={() => setAllCheckBoxesValue(tasks, setTasks, true)}
        >
          select all
        </Button>
      )}
    </>
  );
};

export default IteractButtons;
