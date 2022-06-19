import React, { Dispatch, SetStateAction } from 'react';
import { TaskType } from '../ToDo/ToDo';
import { Button,  TextField, Box } from '@mui/material';
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
  setAddTask: any;
  setTasks: any;
  addTask: TaskType;
  isAllSelected: boolean;
  setIsAllSelected: any;
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
        inputProps={{ 'data-testid': 'text-field' }}
        onKeyDown={(event: any) => {
          if (event.key === 'Enter' && addTask.text) {
            addToList(tasks, addTask, setTasks);
            setAddTask({ id: 0, text: '', isCompleted: false });
          }
        }}
        onSubmit={() => {
          if (addTask.text) {
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
        data-testid='add_btn'
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
        data-testid='delete_btn'
        disabled={!isAnySelected}
        variant='contained'
        onClick={() => {
          DeleteChecked(tasks, setTasks);
        }}
      >
        delete
      </Button>
      {isAllSelected ? (
        <Button
          data-testid='unSelectAll_btn'
          disabled={tasks.length === 0}
          variant='contained'
          onClick={() => setAllCheckBoxesValue(tasks, setTasks, false)}
        >
          unselect all
        </Button>
      ) : (
        <Button
          data-testid='selectAll_btn'
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
