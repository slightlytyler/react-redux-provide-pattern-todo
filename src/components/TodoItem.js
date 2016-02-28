import React, { PropTypes, Component } from 'react';

class TodoItem extends Component {
  static propTypes = {
    todo: PropTypes.object.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    toggleTodo: PropTypes.func.isRequired,
  };

  delete = () => this.props.deleteTodo(this.props.todo.id);

  toggle = () => this.props.toggleTodo(this.props.todo.id);

  render() {
    const { title, completed } = this.props.todo;

    return (
      <div>
        <div>{title}</div>
        <input type="checkbox" value={completed} onClick={this.toggle} />
        <button onClick={this.delete}>x</button>
      </div>
    );
  }
}

import { provide } from 'react-redux-provide-pattern';
import todosProvider from '../providers/todos';

export default provide(todosProvider)(TodoItem);