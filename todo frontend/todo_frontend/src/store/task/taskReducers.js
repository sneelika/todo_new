import {ADD_TASK_NAME} from './taskActionTypes';

const initialState = {
  tasks: {},
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK_NAME:
      const {taskNames} = action.payload;

      return {
        ...state,
        tasks: {...state.tasks, ...taskNames},
      };

    default:
      return state;
  }
};

export default taskReducer;
