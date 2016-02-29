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
    console.log(completed);
    return (
      <li className={completed ? 'completed' : ''}>
        <div className="view">
          <input
            checked={completed}
            onClick={this.toggle}
            className="toggle"
            type="checkbox"
          />
          <label>{title}</label>
          <button
            onClick={this.delete}
            className="destroy"
          />
        </div>
        <input
          className="edit"
          value="Create a TodoMVC template"
        />
      </li>
    );
  }
}

import { provide } from 'react-redux-provide-pattern';
import todosProvider from '../providers/todos';

export default provide(todosProvider)(TodoItem);