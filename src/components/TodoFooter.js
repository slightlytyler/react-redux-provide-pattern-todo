import React, { PropTypes, Component } from 'react';

class TodoFooter extends Component {
  static propTypes = {
    remainingTodos: PropTypes.number.isRequired,
    clearCompleted: PropTypes.func.isRequired,
    filter: PropTypes.string.isRequired,
    setFilter: PropTypes.func.isRequired,
  };

  setFilterAll = () => this.props.setFilter('all');

  setFilterActive = () => this.props.setFilter('active');

  setFilterCompleted = () => this.props.setFilter('completed');

  render() {
    const { remainingTodos, filter } = this.props;
    return (
      <footer className="footer">
        <span className="todo-count"><strong>{remainingTodos}</strong> item left</span>
        <ul className="filters">
          <li>
            <a
              className={filter === 'all' ? 'selected' : ''}
              onClick={this.setFilterAll}
            >
              All
            </a>
          </li>
          <li>
            <a
              className={filter === 'active' ? 'selected' : ''}
              onClick={this.setFilterActive}
            >
              Active
            </a>
          </li>
          <li>
            <a
              className={filter === 'completed' ? 'selected' : ''}
              onClick={this.setFilterCompleted}
            >
              Completed
            </a>
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