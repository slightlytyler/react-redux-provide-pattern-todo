import React from 'react';
import DevTools from '../DevTools';

import TodoHeader from './TodoHeader';
import TodoMain from './TodoMain';
import TodoFooter from './TodoFooter';
import '../styles.css';

const App = () => (
  <div className="container">
    <section className="todoapp">
      <TodoHeader />
      <TodoMain />
      <TodoFooter />
    </section>
    <footer className="info">
      <p>Double-click to edit a todo</p>
    </footer>
    <DevTools />
  </div>
);

export default App;