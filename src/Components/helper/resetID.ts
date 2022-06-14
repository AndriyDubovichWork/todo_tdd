import { TaskType } from '../ToDo/ToDo';

export const ResetID = (tasks: TaskType[], setTasks: any) => {
  let copy = tasks.map((task: TaskType, id: number) => {
    return {
      ...task,
      id,
    };
  });
  if (!copy) {
    copy = [];
  }
  setTasks(copy);
};
