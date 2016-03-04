import React, { PropTypes, Component } from 'react';
import { findDOMNode } from 'react-dom';

class TodoItem extends Component {
  static propTypes = {
    todo: PropTypes.object.isRequired,
    updateTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    toggleTodo: PropTypes.func.isRequired,
  };

  state = {
    editing: false,
  };

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  }

  delete = () => this.props.deleteTodo(this.props.todo.id);

  toggle = () => this.props.toggleTodo(this.props.todo.id);

  edit = () => this.setState({ editing: true });

  acceptChanges = () => {
    const title = this.refs.edit.value;

    this.setState({ editing: false });

    if (title) {
      this.props.updateTodo(this.props.todo.id, {
        title,
      });
    }
    else {
      this.props.deleteTodo(this.props.todo.id);
    }
  };

  handleClickOutside = e => {
    if (this.state.editing && (e.target !== findDOMNode(this.refs.edit))) {
      this.acceptChanges();
    }
  };

  renderView = () => {
    const { title, completed } = this.props.todo;

    return (
      <div className="view" onDoubleClick={this.edit}>
        <input
          checked={completed}
          onChange={this.toggle}
          className="toggle"
          type="checkbox"
        />
        <label>{title}</label>
        <button
          onClick={this.delete}
          className="destroy"
        />
      </div>
    );
  };

  renderInput = () => {
    const handleKeyDown = e => {
      if (e.which === 13) {
        this.acceptChanges();
      }
    };
    const handleFocus = e => {
      const val = e.target.value;
      e.target.value = '';
      e.target.value = val;
    };

    return (
      <input
        ref="edit"
        className="edit"
        defaultValue={this.props.todo.title}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        autoFocus
      />
    );
  }

  render() {
    const className = [
      this.props.completed ? 'completed' : '',
      this.state.editing ? 'editing' : ''
    ].join('');

    return (
      <li className={className}>
        {
          this.state.editing
            ? this.renderInput()
            : this.renderView()
        }
      </li>
    );
  }
}

import { provide } from 'react-redux-provide-pattern';
import todosProvider from '../providers/todos';

export default provide(todosProvider)(TodoItem);