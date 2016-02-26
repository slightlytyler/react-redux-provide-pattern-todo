import React, { PropTypes, Component } from 'react';

class Counter extends Component {
  static propTypes = {
    count: PropTypes.number.isRequired,
    incrementCount: PropTypes.func.isRequired,
    decrementCount: PropTypes.func.isRequired,
    doubleCountAsync: PropTypes.func.isRequired,
  };

  increment = () => this.props.incrementCount();

  decrement = () => this.props.decrementCount();

  double = () => this.props.doubleCountAsync();

  render() {
    return (
      <div>
        <div>Current count: {this.props.count}</div>
        <button onClick={this.decrement}>-</button>
        <button onClick={this.increment}>+</button>
        <button onClick={this.double}>x2</button>
      </div>
    );
  }
}

import { provide } from 'react-redux-provide-pattern';
import countProvider from '../providers/count';

export default provide(countProvider)(Counter);