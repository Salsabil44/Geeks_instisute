import React, { Component } from "react";

export default class ColorLifecycle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favoriteColor: "red"
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    // Part I: 
    return true;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("in getSnapshotBeforeUpdate");
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("after update");
  }

  changeColor = (color) => {
    this.setState({ favoriteColor: color });
  };

  componentDidMount() {
    // Part II: 
    setTimeout(() => {
      this.setState({ favoriteColor: "yellow" });
    }, 2000);
  }

  render() {
    return (
      <div>
        <h1>My favorite color is {this.state.favoriteColor}</h1>
        <button onClick={() => this.changeColor("blue")}>Change to Blue</button>
      </div>
    );
  }
}
