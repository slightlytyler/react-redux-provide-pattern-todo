// Provider
import { createResourceProvider } from 'react-redux-provide-pattern';

const todos = createResourceProvider('todos', 'todo', 'todoKey');

// Constants
const TOGGLE_TODO = 'TOGGLE_TODO';

todos.constants.TOGGLE_TODO = TOGGLE_TODO;

// Actions
import generateId from 'shortid';

todos.actions.createTodo = title => todos.actions.setTodo(generateId(), {
  title,
  completed: false
})

todos.actions.toggleTodo = id => (dispatch, getState) => {
  dispatch(todos.actions.updateTodo(id, {
    completed: !getState().todos.recordsById[id].completed
  }));
};

todos.actions.toggleAll = () => (dispatch, getState) => {
  const { records, recordsById } = getState().todos;
  const allCompleted = records.every(id => recordsById[id].completed);

  dispatch(todos.actions.updateManyTodos(records, {
    completed: !allCompleted
  }));
};

todos.actions.clearCompleted = () => (dispatch, getState) => {
  const { records, recordsById } = getState().todos;
  const { deleteTodo } = todos.actions;

  dispatch(todos.actions.deleteManyTodos(records));
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

todos.selectors.currentFilter = state => state.filter;

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