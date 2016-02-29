import React, { PropTypes, Component } from 'react';
import TodoList from './TodoList';

class TodoMain extends Component {
  static propTypes = {
    toggleAll: PropTypes.func.isRequired,
  };

  render() {
    return (
      <section className="main">
        <input
          onClick={this.props.toggleAll}
          className="toggle-all"
          type="checkbox"
        />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <TodoList />
      </section>
    );
  }
}

import { provide } from 'react-redux-provide-pattern';
import todosProvider from '../providers/todos';

export default provide(todosProvider)(TodoMain);