import React, { PropTypes, Component } from 'react';

class TodoCreator extends Component {
  static propTypes = {
    createTodo: PropTypes.func.isRequired,
  };

  submit = () => {
    const title = this.refs.input.value;

    if (!title) {
      return;
    }

    this.props.createTodo(title);
    this.reset();
  }

  handleReturn = e => {
    if (e.which === 13) {
      this.submit();
    }
  }

  reset = () => {
    this.refs.input.value = '';
  };

  render() {
    return (
      <input
        ref="input"
        onKeyDown={this.handleReturn}
        className="new-todo"
        placeholder="What needs to be done?"
        autofocus
      />
    );
  }
}

import { provide } from 'react-redux-provide-pattern';
import todosProvider from '../providers/todos';

export default provide(todosProvider)(TodoCreator);