import {ADD_TASK_NAME} from './taskActionTypes';

export const updateTaskName = taskNames => ({
  type: ADD_TASK_NAME,
  payload: {
    taskNames,
  },
});
