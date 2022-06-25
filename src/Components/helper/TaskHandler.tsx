import { TaskType } from '../ToDo/ToDo';

export const TaskHandler = (
  tasks: TaskType[],
  setTasks: any,
  task: TaskType,
  newValue: string
) => {
  const newTasks = tasks.map((Innertask: TaskType) => {
    if (Innertask.id === task.id) {
      Innertask.text = newValue;
    }
    return Innertask;
  });
  setTasks(newTasks);
};
