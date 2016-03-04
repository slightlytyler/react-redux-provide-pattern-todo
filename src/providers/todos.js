// Provider
import { createResourceProvider } from 'react-redux-provide-pattern';

const todos = createResourceProvider('todos', 'todo', 'todoKey');

// Constants
const SET_TODOS_FILTER = 'SET_TODOS_FILTER';

todos.constants.SET_TODOS_FILTER = SET_TODOS_FILTER;

// Selectors
import { createSelector } from 'reselect'
import { size } from 'lodash';

todos.selectors.currentFilter = state => state.filter;

todos.selectors.activeTodos = createSelector(
  todos.selectors.records,
  todos.selectors.recordsById,
  (records, recordsById) => records.filter(id => !recordsById[id].completed)
);

todos.selectors.completedTodos = createSelector(
  todos.selectors.records,
  todos.selectors.recordsById,
  (records, recordsById) => records.filter(id => recordsById[id].completed)
);

todos.selectors.currentTodos = createSelector(
  todos.selectors.records,
  todos.selectors.currentFilter,
  todos.selectors.activeTodos,
  todos.selectors.completedTodos,
  (records, currentFilter, activeTodos, completedTodos) => {
    switch (currentFilter) {
      case 'all':
        return records;

      case 'active':
        return activeTodos;

      case 'completed':
        return completedTodos

      default:
        return records;
    }
  }
);

todos.selectors.allCompleted = createSelector(
  todos.selectors.records,
  todos.selectors.completedTodos,
  (records, completedTodos) => records.length !== 0 ? records.length === size(completedTodos) : false
);

todos.selectors.remainingTodos = createSelector(
  todos.selectors.activeTodos,
  activeTodos => size(activeTodos)
);

// Actions
import { compose } from 'redux';
import generateId from 'shortid';

todos.actions.createTodo = title => todos.actions.setTodo(generateId(), {
  title,
  completed: false
})

todos.actions.toggleTodo = id => (dispatch, getState) => {
  compose(
    dispatch,
    todos.actions.updateTodo
  )(
    id,
    { completed: !getState().todos.recordsById[id].completed }
  );
};

todos.actions.toggleAll = () => (dispatch, getState) => {
  const { todos: todosState } = getState();

  compose(
    dispatch,
    todos.actions.updateManyTodos,
  )(
    todosState.records,
    { completed: !todos.selectors.allCompleted(todosState) },
  );
};

todos.actions.clearCompleted = () => (dispatch, getState) => {
  compose(
    dispatch,
    todos.actions.deleteManyTodos,
    todos.selectors.completedTodos
  )(getState().todos);
};

todos.actions.setFilter = filter => ({
  type: SET_TODOS_FILTER,
  filter,
});

// Reducers
todos.reducers.filter = (state = 'all', action) => {
  switch (action.type) {
    case SET_TODOS_FILTER:
      return action.filter;

    default:
      return state;
  }
};

export default todos;