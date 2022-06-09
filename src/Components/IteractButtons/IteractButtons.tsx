import React, { Dispatch, SetStateAction } from 'react';
import { TaskType } from '../ToDo/ToDo';

type IteractButtonsType = {
  DeleteChecked: (task: TaskType[]) => void;
  addToList: (tasks: TaskType[], task: TaskType) => void;
  tasks: TaskType[];
  setAddTask: Dispatch<SetStateAction<TaskType>>;
  addTask: TaskType;
};

const IteractButtons = ({
  DeleteChecked,
  tasks,
  setAddTask,
  addTask,
  addToList,
}: IteractButtonsType) => {
  return (
    <>
      <input
        onChange={(e) => {
          setAddTask({ id: 0, text: e.target.value, isCompleted: false });
        }}
        value={addTask.text}
      />
      <button onClick={() => addToList(tasks, addTask)}>add</button>
      <button onClick={() => DeleteChecked(tasks)}>delete</button>
    </>
  );
};

export default IteractButtons;
