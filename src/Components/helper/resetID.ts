import { TaskType } from '../ToDo/ToDo';

export const ResetID = (tasks: TaskType[], setTasks: any) => {
  const copy = tasks.map((task: TaskType, id: number) => {
    return {
      ...task,
      id,
    };
  });
  setTasks(copy);
};
