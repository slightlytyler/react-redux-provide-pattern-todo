import { combineReducers } from 'redux';
import todosProvider from './providers/todos';

export default combineReducers({
  todos: combineReducers(todosProvider.reducers),
});
