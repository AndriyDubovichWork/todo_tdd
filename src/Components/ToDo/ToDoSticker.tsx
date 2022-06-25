import React, { Dispatch, SetStateAction, useState } from 'react';
import Draggable from 'react-draggable';
import { Box, Checkbox, TextField } from '@mui/material';
import PushPinIcon from '@mui/icons-material/PushPin';
import CloseIcon from '@mui/icons-material/Close';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import SaveIcon from '@mui/icons-material/Save';
import { TaskType } from './ToDo';
import LinesEllipsis from 'react-lines-ellipsis';
import { useNavigate } from 'react-router-dom';
import { TaskHandler } from './../helper/TaskHandler';
type ToDoStickerType = {
  task: TaskType;
  tasks: TaskType[];
  isCheckedHandler: (id: number, tasks: TaskType[]) => void;
  setTasks: any;
  Delete: (
    task: TaskType[],
    setTasks: Dispatch<SetStateAction<TaskType[]>>,
    id: number
  ) => void;
};

const ToDoSticker = ({
  task,
  tasks,
  isCheckedHandler,
  Delete,
  setTasks,
}: ToDoStickerType) => {
  const navigate = useNavigate();

  const [isDraggeable, setIsDraggeable] = useState(true);
  const [isTextCheangeable, setIsTextCheangeable] = useState(false);

  const cursor = isDraggeable ? 'grab' : 'auto';
  return (
    <Draggable disabled={!isDraggeable} key={task.id}>
      <Box
        data-testid={'sticker' + task.id}
        style={{
          padding: '10px',
          backgroundColor: '#cece',
          display: 'inline-block',
          overflowWrap: 'break-word',
          wordWrap: 'break-word',
          hyphens: 'auto',
          cursor: cursor,
          width: 200,
          height: 200,
        }}
      >
        <Checkbox
          data-testid='check-box'
          checked={task.isCompleted}
          onChange={() => {
            isCheckedHandler(task.id, tasks);
          }}
          sx={{ cursor: 'pointer' }}
        />

        {!isDraggeable ? (
          <PushPinIcon
            data-testid='pin'
            sx={{ transform: 'rotate(20deg)', cursor: 'pointer' }}
            onClick={() => {
              setIsDraggeable(!isDraggeable);
              setIsTextCheangeable(false);
            }}
          />
        ) : (
          <PushPinIcon
            data-testid='pin'
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              setIsDraggeable(!isDraggeable);
            }}
          />
        )}
        <OpenInFullIcon
          onClick={() => {
            navigate('/todo_tdd/' + task.id);
          }}
          sx={{ cursor: 'pointer' }}
        />
        <CloseIcon
          data-testid={'delete' + task.id}
          sx={{ cursor: 'pointer' }}
          onClick={() => Delete(tasks, setTasks, task.id)}
        />
        {isTextCheangeable ? (
          <TextField
            label='edit task'
            multiline
            rows={5}
            value={task.text}
            onChange={(e) => {
              TaskHandler(tasks, setTasks, task, e.target.value);
            }}
          />
        ) : (
          <LinesEllipsis
            text={task.text}
            onDoubleClick={() => {
              if (isDraggeable) {
                return;
              }
              setIsTextCheangeable(true);
            }}
            maxLine='7'
            ellipsis='...'
            trimRight
            style={{ userSelect: 'none', cursor: cursor }}
            basedOn='letters'
          />
        )}
      </Box>
    </Draggable>
  );
};

export default ToDoSticker;
