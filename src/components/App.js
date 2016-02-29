import React from 'react';
import DevTools from '../DevTools';

import TodoHeader from './TodoHeader';
import TodoList from './TodoList';
import TodoFooter from './TodoFooter';
import '../styles.css';

const App = () => (
  <div className="container">
    <section className="todoapp">
      <TodoHeader />
      <section className="main">
        <input className="toggle-all" type="checkbox" />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <TodoList />
      </section>
      <TodoFooter />
    </section>
    <footer className="info">
      <p>Double-click to edit a todo</p>
    </footer>
    <DevTools />
  </div>
);

export default App;