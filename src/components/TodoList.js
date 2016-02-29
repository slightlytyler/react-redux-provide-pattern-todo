import React, { PropTypes, Component } from 'react';
import TodoItem from './TodoItem';

class TodoList extends Component {
  static propTypes = {
    todos: PropTypes.array.isRequired,
  };

  render() {
    const { todos } = this.props;

    return (
      <ul className="todo-list">
        {
          todos.map(id => (
            <TodoItem
              key={id}
              todoKey={id}
            />
          ))
        }
      </ul>
    );
  }
}

import { provide } from 'react-redux-provide-pattern';
import todosProvider from '../providers/todos';

export default provide(todosProvider)(TodoList);