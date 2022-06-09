import React from 'react';

export type TaskType = {
  text: string;
  isCompleted: boolean;
  id: number;
};

type ToDoType = {
  tasks: TaskType[];
  setTasks: React.Dispatch<React.SetStateAction<TaskType[]>>;
};

const ToDo = ({ tasks, setTasks }: ToDoType) => {
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
          <div key={task.id} className='column'>
            <input
              type={'checkbox'}
              checked={task.isCompleted}
              onChange={() => {
                isCheckedHandler(task.id, tasks);
              }}
              key={task.id}
            />
            <label>{task.text}</label>
          </div>
        );
      })}
    </>
  );
};

export default ToDo;
