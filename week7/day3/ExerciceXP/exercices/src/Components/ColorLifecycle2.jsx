import React, { Component } from "react";

class Child extends Component {
  componentWillUnmount() {
    alert("Child component is being unmounted!");
  }

  render() {
    return <h2>Hello World!</h2>;
  }
}

export default class ColorLifecycle2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favoriteColor: "red",
      show: true
    };
  }

  changeColor = (color) => {
    this.setState({ favoriteColor: color });
  };

  deleteChild = () => {
    this.setState({ show: false });
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ favoriteColor: "yellow" });
    }, 2000);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("in getSnapshotBeforeUpdate");
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("after update");
  }

  render() {
    return (
      <div>
        <h1>My favorite color is {this.state.favoriteColor}</h1>
        <button onClick={() => this.changeColor("blue")}>Change to Blue</button>
        <button onClick={this.deleteChild} style={{ marginLeft: "10px" }}>
          Delete Child
        </button>

        {this.state.show && <Child />}
      </div>
    );
  }
}
