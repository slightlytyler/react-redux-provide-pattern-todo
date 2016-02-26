import { combineReducers } from 'redux';
import countProvider from './providers/count';

export default combineReducers({
  count: countProvider.reducers,
});
