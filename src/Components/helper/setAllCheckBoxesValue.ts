import { TaskType } from '../ToDo/ToDo';

export const setAllCheckBoxesValue = (
  tasks: TaskType[],
  setTasks: any,
  value: boolean
) => {
  setTasks(
    tasks.map((task: TaskType) => {
      return { ...task, isCompleted: value };
    })
  );
};
