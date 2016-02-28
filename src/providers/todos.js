// Provider
import { createResourceProvider } from 'react-redux-provide-pattern';

const todos = createResourceProvider('todos', 'todo', 'todoKey');
const { SET_TODO, UPDATE_TODO, DELETE_TODO } = todos.constants;

// Constants
const TOGGLE_TODO = 'TOGGLE_TODO';

todos.constants.TOGGLE_TODO = TOGGLE_TODO;

// Actions
import generateId from 'shortid';

todos.actions.createTodo = title => ({
  type: SET_TODO,
  id: generateId(),
  payload: {
    title,
    completed: false
  },
});

todos.actions.toggleTodo = id => (dispatch, getState) => {
  dispatch({
    type: UPDATE_TODO,
    id,
    payload: {
      completed: !getState().todos.recordsById[id].completed
    }
  });
};

todos.actions.clearCompleted = () => (dispatch, getState) => {
  const { records, recordsById } = getState().todos;
  const { deleteTodo } = todos.actions;

  records.forEach(id => {
    if (recordsById[id].completed) {
      dispatch(deleteTodo(id));
    }
  });
};

export default todos;