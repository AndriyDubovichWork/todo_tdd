import React, { useEffect, useState } from 'react';
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import { TaskType } from '../ToDo/ToDo';
import style from './FullScreenSticker.module.scss';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { TaskHandler } from '../helper/TaskHandler';
import { Typography, TextField, Button } from '@mui/material';
const FullScreenSticker = (props: { tasks: TaskType[]; setTasks: any }) => {
  const params = useParams();
  const navigate = useNavigate();

  const [Task, setTask] = useState<TaskType>({
    id: 404,
    text: 'some error',
    isCompleted: false,
  });
  const [isTextCheangeable, setIsTextCheangeable] = useState(false);

  useEffect(() => {
    if (!props.tasks) {
      setTask({
        id: 404,
        isCompleted: false,
        text: 'Some Error',
      });
      return;
    }
    props.tasks.map((task: TaskType) => {
      if (task.id === parseInt(params.toDoId || '404')) {
        setTask(task);
      }
    });
  }, []);

  return (
    <>
      <Typography>
        <NavLink to='/todo_tdd' data-testid={'arrow'}>
          <ArrowBackIcon sx={{ float: 'left', padding: '10px' }} />
        </NavLink>
        <Button
          onClick={() => navigate('/todo_tdd')}
          sx={{ float: 'right', padding: '10px' }}
        >
          save
        </Button>
      </Typography>

      {isTextCheangeable ? (
        <TextField
          label='edit task'
          multiline
          value={Task.text}
          sx={{ width: '100%' }}
          onChange={(e) => {
            TaskHandler(props.tasks, props.setTasks, Task, e.target.value);
          }}
        />
      ) : (
        <Typography
          onDoubleClick={() => {
            setIsTextCheangeable(true);
          }}
          sx={{
            paddingTop: '40px',
            textAling: 'center',
          }}
        >
          {Task.text}
        </Typography>
      )}
    </>
  );
};

export default FullScreenSticker;
