import React, { useEffect, useState } from 'react';
import './App.css';
import ToDo, { TaskType } from './Components/ToDo/ToDo';
import IteractButtons from './Components/IteractButtons/IteractButtons';
import deepcopy from 'deepcopy';

function App() {
  const [addTask, setAddTask] = useState({
    text: '',
    id: 404,
    isCompleted: false,
  });

  const [tasks, setTasks]: (TaskType[] | any)[] = useState([]);
  const ResetID = (tasks: TaskType[]) => {
    const copy = tasks.map((task: TaskType, id: number) => {
      return {
        ...task,
        id,
      };
    });
    setTasks(copy);
  };

  const addToList = (tasks: TaskType[], task: TaskType) => {
    let copy = deepcopy(tasks);
    task.id = copy.length;
    copy.push(task);
    setTasks(copy);
  };

  const DeleteChecked = (tasks: TaskType[]) => {
    let tasksCopy: TaskType[] = [];
    tasks.map((task: TaskType) => {
      if (!task.isCompleted) {
        tasksCopy.push(task);
      }
    });
    ResetID(tasksCopy);
  };

  return (
    <>
      <IteractButtons
        addToList={addToList}
        addTask={addTask}
        setAddTask={setAddTask}
        DeleteChecked={DeleteChecked}
        tasks={tasks}
      />
      <ToDo tasks={tasks} setTasks={setTasks} />
    </>
  );
}

export default App;
