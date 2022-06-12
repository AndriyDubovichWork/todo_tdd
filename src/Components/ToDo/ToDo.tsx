import React, { Dispatch, SetStateAction } from 'react';

import ToDoSticker from './ToDoSticker';

export type TaskType = {
  text: string;
  isCompleted: boolean;
  id: number;
};

type ToDoType = {
  tasks: TaskType[];
  setTasks: React.Dispatch<React.SetStateAction<TaskType[]>>;
  Delete: (
    task: TaskType[],
    setTasks: Dispatch<SetStateAction<TaskType[]>>,
    id: number
  ) => void;
};

const ToDo = ({ tasks, setTasks, Delete }: ToDoType) => {
  const isCheckedHandler = (id: number, tasks: TaskType[]) => {
    const tasksupdate = tasks.map((task) => {
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

  return (
    <>
      {tasks.map((task: TaskType) => {
        return (
          <ToDoSticker
            key={task.id}
            task={task}
            tasks={tasks}
            isCheckedHandler={isCheckedHandler}
            Delete={Delete}
            setTasks={setTasks}
          />
        );
      })}
    </>
  );
};

export default ToDo;
