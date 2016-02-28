import React, { PropTypes, Component } from 'react';

import TodoItem from './TodoItem';
import TodoCreator from './TodoCreator';

class TodoList extends Component {
  static propTypes = {
    todos: PropTypes.array.isRequired,
  };

  render() {
    const { todos } = this.props;

    return (
      <div>
        {
          todos.map(id => (
            <TodoItem
              key={id}
              todoKey={id}
            />
          ))
        }
        <TodoCreator />
      </div>
    );
  }
}

import { provide } from 'react-redux-provide-pattern';
import todosProvider from '../providers/todos';

export default provide(todosProvider)(TodoList);