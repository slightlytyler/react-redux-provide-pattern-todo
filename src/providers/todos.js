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

todos.actions.toggleAll = () => (dispatch, getState) => {
  const { records, recordsById } = getState().todos;
  const allCompleted = records.every(id => recordsById[id].completed);

  records.forEach(id =>
    dispatch({
      type: UPDATE_TODO,
      id,
      payload: {
        completed: !allCompleted
      }
    })
  );
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

todos.actions.setFilter = filter => ({
  type: 'SET_TODOS_FILTER',
  filter,
});

// Reducers
todos.reducers.filter = (state = 'all', action) => {
  switch (action.type) {
    case 'SET_TODOS_FILTER':
      return action.filter;

    default:
      return state;
  }
}

// Selectors
import { createSelector } from 'reselect'

todos.selectors.currentFilter = state => state.todos.filter;

todos.selectors.currentTodos = createSelector(
  todos.selectors.records,
  todos.selectors.recordsById,
  todos.selectors.currentFilter,
  (records, recordsById, currentFilter) => {
    switch (currentFilter) {
      case 'all':
        return records;

      case 'active':
        return records.filter(id => !recordsById[id].completed);

      case 'completed':
        return records.filter(id => recordsById[id].completed);

      default:
        return records;
    }
  }
);

todos.selectors.allCompleted = createSelector(
  todos.selectors.records,
  todos.selectors.recordsById,
  (records, recordsById) => records.length !== 0 ? records.every(id => recordsById[id].completed) : false
);

todos.selectors.remainingTodos = createSelector(
  todos.selectors.records,
  todos.selectors.recordsById,
  (records, recordsById) => records.filter(id => !recordsById[id].completed).length
);

export default todos;