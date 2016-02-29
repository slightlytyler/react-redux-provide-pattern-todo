import React, { PropTypes, Component } from 'react';

class TodoCreator extends Component {
  static propTypes = {
    createTodo: PropTypes.func.isRequired,
  };

  submit = () => {
    const title = this.refs.title.value;

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
    this.refs.title.value = '';
  };

  render() {
    return (
      <div>
        <input
          ref="title"
          onKeyDown={this.handleReturn}
        />
        <button onClick={this.submit}>Add</button>
      </div>
    );
  }
}

import { provide } from 'react-redux-provide-pattern';
import todosProvider from '../providers/todos';

export default provide(todosProvider)(TodoCreator);