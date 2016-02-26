import { createProvider } from 'react-redux-provide-pattern';

const count = createProvider('count');

// Constants
const INCREMENT_COUNT = 'INCREMENT_COUNT';

count.constants = { INCREMENT_COUNT };

// Actions
count.actions = {
  incrementCount(magnitude = 1) {
    return {
      type: INCREMENT_COUNT,
      increment: magnitude
    };
  },

  decrementCount(magnitude = 1) {
    return {
      type: INCREMENT_COUNT,
      increment: -magnitude
    };
  },

  doubleCountAsync() {
    return (dispatch, getState) => {
      dispatch({
        type: INCREMENT_COUNT,
        increment: getState().count
      });
    };
  },
};

// Reducers
count.reducers = (state = 0, action) => {
  switch (action.type) {
    case INCREMENT_COUNT:
      return state + action.increment;

    default:
      return state;
  }
};

export default count;