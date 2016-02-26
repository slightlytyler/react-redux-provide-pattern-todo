import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';
import DevTools from './DevTools';
import App from './components/App';

const initialState = {};
const enhancer = compose(
  applyMiddleware(thunk),
  DevTools.instrument(),
);

const store = createStore(rootReducer, initialState, enhancer);

if (module.hot) {
  module.hot.accept('./rootReducer', () =>
    store.replaceReducer(require('./rootReducer'))
  );
}

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
