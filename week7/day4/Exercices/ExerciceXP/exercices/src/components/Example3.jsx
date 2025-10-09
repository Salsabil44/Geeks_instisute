import React, { Component } from "react";
import data from "./data.json";

class Example3 extends Component {
  render() {
    return (
      <div>
        <h2>Example3: Experiences</h2>
        {data.Experiences.map((exp) => (
          <div key={exp.id}>
            <strong>{exp.title}</strong> at {exp.company}
          </div>
        ))}
      </div>
    );
  }
}

export default Example3;