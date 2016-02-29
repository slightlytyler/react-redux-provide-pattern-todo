import React, { PropTypes, Component } from 'react';
import TodoCreator from './TodoCreator';

class TodoHeader extends Component {
  static propTypes = {
  };

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <TodoCreator />
      </header>
    );
  }
}

import { provide } from 'react-redux-provide-pattern';
import todosProvider from '../providers/todos';

export default provide(todosProvider)(TodoHeader);