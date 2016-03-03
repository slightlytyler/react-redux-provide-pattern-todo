import React, { PropTypes, Component } from 'react';
import TodoList from './TodoList';

class TodoMain extends Component {
  static propTypes = {
    toggleAll: PropTypes.func.isRequired,
    allCompleted: PropTypes.bool.isRequired,
  };

  render() {
    const { toggleAll, allCompleted } = this.props;

    return (
      <section className="main">
        <input
        checked={allCompleted}
          onClick={toggleAll}
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