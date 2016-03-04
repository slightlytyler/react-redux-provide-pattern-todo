// Provider
import { createResourceProvider } from 'react-redux-provide-pattern';

const provider = createResourceProvider('todos', 'todo', 'todoKey');
const {
  constants,
  selectors,
  actions,
  reducers,
} = provider;

// Constants
const SET_TODOS_FILTER = 'SET_TODOS_FILTER';

constants.SET_TODOS_FILTER = SET_TODOS_FILTER;

// Selectors
import { createSelector } from 'reselect'
import { size } from 'lodash';

selectors.currentFilter = state => state.filter;

selectors.activeTodos = createSelector(
  selectors.records,
  selectors.recordsById,
  (records, recordsById) => records.filter(id => !recordsById[id].completed)
);

selectors.completedTodos = createSelector(
  selectors.records,
  selectors.recordsById,
  (records, recordsById) => records.filter(id => recordsById[id].completed)
);

selectors.currentTodos = createSelector(
  selectors.currentFilter,
  selectors.records,
  selectors.activeTodos,
  selectors.completedTodos,
  (currentFilter, records, activeTodos, completedTodos) => {
    switch (currentFilter) {
      case 'active':
        return activeTodos;

      case 'completed':
        return completedTodos

      case 'all':
      default:
        return records;
    }
  }
);

selectors.allCompleted = createSelector(
  selectors.records,
  selectors.completedTodos,
  (records, completedTodos) =>
    size(records) !== 0
      ? size(records) === size(completedTodos)
      : false
);

selectors.remainingTodos = createSelector(
  selectors.activeTodos,
  activeTodos => size(activeTodos)
);

// Actions
import { compose } from 'redux';
import generateId from 'shortid';

actions.createTodo = title => actions.setTodo(generateId(), {
  title,
  completed: false
});

actions.toggleTodo = id => (dispatch, getState) => {
  compose(
    dispatch,
    actions.updateTodo
  )(
    id,
    { completed: !getState().todos.recordsById[id].completed }
  );
};

actions.toggleAll = () => (dispatch, getState) => {
  const { todos } = getState();

  compose(
    dispatch,
    actions.updateManyTodos,
  )(
    todos.records,
    { completed: !selectors.allCompleted(todos) },
  );
};

actions.clearCompleted = () => (dispatch, getState) => {
  compose(
    dispatch,
    actions.deleteManyTodos,
    selectors.completedTodos
  )(getState().todos);
};

actions.setFilter = filter => ({
  type: SET_TODOS_FILTER,
  filter,
});

// Reducers
reducers.filter = (state = 'all', action) => {
  switch (action.type) {
    case SET_TODOS_FILTER:
      return action.filter;

    default:
      return state;
  }
};

export default provider;