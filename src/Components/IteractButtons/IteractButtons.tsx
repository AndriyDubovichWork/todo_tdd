import React, { Dispatch, SetStateAction } from 'react';
import { TaskType } from '../ToDo/ToDo';
import { Button, FormControlLabel, TextField, Box } from '@mui/material';
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
  isAnySelected: boolean;
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
  isAnySelected,
}: IteractButtonsType) => {
  return (
    <Box
      sx={{
        margin: '20px auto',
        display: 'flex',
        justifyContent: 'space-around',
      }}
    >
      <TextField
        onKeyDown={(event: any) => {
          if (event.key === 'Enter') {
            addToList(tasks, addTask, setTasks);
            setAddTask({ id: 0, text: '', isCompleted: false });
          }
        }}
        onChange={(e: any) => {
          setAddTask({ id: 0, text: e.target.value, isCompleted: false });
        }}
        value={addTask.text}
      />
      <Button
        disabled={!addTask.text}
        variant='contained'
        onClick={() => {
          addToList(tasks, addTask, setTasks);
          setAddTask({ id: 0, text: '', isCompleted: false });
        }}
      >
        add
      </Button>
      <Button
        disabled={!isAnySelected}
        variant='contained'
        onClick={() => DeleteChecked(tasks, setTasks)}
      >
        delete
      </Button>
      {isAllSelected ? (
        <Button
          disabled={tasks.length === 0}
          variant='contained'
          onClick={() => setAllCheckBoxesValue(tasks, setTasks, false)}
        >
          unselect all
        </Button>
      ) : (
        <Button
          disabled={tasks.length === 0}
          variant='contained'
          onClick={() => setAllCheckBoxesValue(tasks, setTasks, true)}
        >
          select all
        </Button>
      )}
    </Box>
  );
};

export default IteractButtons;
