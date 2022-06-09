import React, { useEffect, useState } from 'react';
import './App.css';
import ToDo, { TaskType } from './Components/ToDo/ToDo';
import IteractButtons from './Components/IteractButtons/IteractButtons';
import deepcopy from 'deepcopy';
import { addToList, DeleteChecked } from './Components/helper/CruD';

function App() {
  const [addTask, setAddTask] = useState({
    text: '',
    id: 404,
    isCompleted: false,
  });

  const [tasks, setTasks]: (TaskType[] | any)[] = useState([]);

  const [isAllSelected, setIsAllSelected]: (boolean | any)[] = useState(false);

  useEffect(() => {
    setIsAllSelected(true);
    tasks.map((task: TaskType) => {
      if (!task.isCompleted) {
        setIsAllSelected(false);
      }
    });
  }, [tasks]);

  return (
    <>
      <IteractButtons
        addToList={addToList}
        addTask={addTask}
        setAddTask={setAddTask}
        setTasks={setTasks}
        DeleteChecked={DeleteChecked}
        tasks={tasks}
        isAllSelected={isAllSelected}
        setIsAllSelected={setIsAllSelected}
      />
      <ToDo tasks={tasks} setTasks={setTasks} />
    </>
  );
}

export default App;
