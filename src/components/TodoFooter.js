import React, { PropTypes, Component } from 'react';

class TodoFooter extends Component {
  static propTypes = {
    remainingTodos: PropTypes.number.isRequired,
    clearCompleted: PropTypes.func.isRequired,
  };

  render() {
    return (
      <footer className="footer">
        <span className="todo-count"><strong>{this.props.remainingTodos}</strong> item left</span>
        <ul className="filters">
          <li>
            <a className="selected" href="#/">All</a>
          </li>
          <li>
            <a href="#/active">Active</a>
          </li>
          <li>
            <a href="#/completed">Completed</a>
          </li>
        </ul>
        <button
          className="clear-completed"
          onClick={this.props.clearCompleted}
        >
          Clear completed
        </button>
      </footer>
    );
  }
}

import { provide } from 'react-redux-provide-pattern';
import todosProvider from '../providers/todos';

export default provide(todosProvider)(TodoFooter);