import React, { Component } from "react";
import data from "./data.json";

class Example2 extends Component {
  render() {
    return (
      <div>
        <h2>Example2: Skills</h2>
        <ul>
          {data.Skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Example2;