import React, { Component } from "react";

export default class BuggyCounter extends Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
  }

  handleClick = () => {
    this.setState(({ counter }) => {
      if (counter + 1 === 5) {
        throw new Error("I crashed!");
      }
      return { counter: counter + 1 };
    });
  };

  render() {
    return (
      <h2 onClick={this.handleClick} style={{ cursor: "pointer" }}>
        Counter: {this.state.counter}
      </h2>
    );
  }
}
