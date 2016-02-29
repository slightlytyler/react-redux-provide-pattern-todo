import React, { PropTypes, Component } from 'react';
import TodoCreator from './TodoCreator';

const TodoHeader = () => (
  <header className="header">
    <h1>todos</h1>
    <TodoCreator />
  </header>
);

export default TodoHeader;