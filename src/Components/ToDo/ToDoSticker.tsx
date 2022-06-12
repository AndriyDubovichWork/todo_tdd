import React, {
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
} from 'react';
import Draggable from 'react-draggable';
import { Box, Checkbox, Typography } from '@mui/material';
import PushPinIcon from '@mui/icons-material/PushPin';
import CloseIcon from '@mui/icons-material/Close';
import { TaskType } from './ToDo';
import { Resizable } from 're-resizable';

type ToDoStickerType = {
  task: TaskType;
  tasks: TaskType[];
  isCheckedHandler: (id: number, tasks: TaskType[]) => void;
  setTasks: Dispatch<SetStateAction<TaskType[]>>;
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
  const [isDraggeable, setIsDraggeable] = useState(true);
  const [size, setSize] = useState({ height: 0, width: 0 });

  const Sticker = useRef<any>(null);
  useLayoutEffect(() => {
    if (!Sticker.current) {
      return;
    }
    console.log(Sticker.current.offsetWidth);
    let width = Sticker.current.offsetWidth;
    let height = Sticker.current.offsetHeight;
    console.log(width, height);
    if (width >= 3 * height) {
      width = width * 3;
    }
    setSize({
      width,
      height,
    });
  }, []);

  return (
    <Draggable disabled={!isDraggeable} key={task.id}>
      <Box
        ref={Sticker}
        style={{
          padding: '10px',
          backgroundColor: '#cece',
          display: 'inline-block',
          overflowWrap: 'break-word',
          wordWrap: 'break-word',
          hyphens: 'auto',
          cursor: 'grab',
          width: size.width,
          height: size.height,
        }}
      >
        <Checkbox
          checked={task.isCompleted}
          onChange={() => {
            isCheckedHandler(task.id, tasks);
          }}
          sx={{ cursor: 'pointer' }}
        />
        {!isDraggeable ? (
          <PushPinIcon
            sx={{ transform: 'rotate(20deg)', cursor: 'pointer' }}
            onClick={() => {
              setIsDraggeable(!isDraggeable);
            }}
          />
        ) : (
          <PushPinIcon
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              setIsDraggeable(!isDraggeable);
            }}
          />
        )}
        <CloseIcon
          sx={{ cursor: 'pointer' }}
          onClick={() => Delete(tasks, setTasks, task.id)}
        />

        <Typography style={{ padding: '5px' }}>{task.text}</Typography>
      </Box>
    </Draggable>
  );
};

export default ToDoSticker;
