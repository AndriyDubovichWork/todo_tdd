import React, { useEffect, useState } from 'react';
import './App.css';
import ToDo, { TaskType } from './Components/ToDo/ToDo';
import IteractButtons from './Components/IteractButtons/IteractButtons';
import { addToList, DeleteChecked, Delete } from './Components/helper/CruD';
import { Route, Router, Routes } from 'react-router-dom';
import FullScreenSticker from './Components/FullScreenSticker/FullScreenSticker';

function App() {
  const [addTask, setAddTask] = useState({
    text: '',
    id: 404,
    isCompleted: false,
  });

  const [tasks, setTasks]: (TaskType[] | any)[] = useState([]);

  const [isAllSelected, setIsAllSelected]: (boolean | any)[] = useState(false);

  const [isAnySelected, setIsAnySelected]: (boolean | any)[] = useState(false);

  useEffect(() => {
    setIsAllSelected(true);
    setIsAnySelected(false);
    tasks.map((task: TaskType) => {
      if (!task.isCompleted) {
        setIsAllSelected(false);
      } else {
        setIsAnySelected(true);
      }
    });
  }, [tasks, isAnySelected]);

  return (
    <Routes>
      <Route
        path='/todo_tdd'
        element={
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
              isAnySelected={isAnySelected}
            />
            <ToDo tasks={tasks} setTasks={setTasks} Delete={Delete} />
          </>
        }
      ></Route>
      <Route
        path='/todo_tdd/:toDoId'
        element={
          <>
            <FullScreenSticker tasks={tasks} setTasks={setTasks} />
          </>
        }
      />
    </Routes>
  );
}

export default App;
