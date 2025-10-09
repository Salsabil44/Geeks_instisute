import React, { Component } from "react";
import data from "./data.json";

class Example1 extends Component {
  render() {
    return (
      <div>
        <h2>Example1: Social Medias</h2>
        <ul>
          {data.SocialMedias.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    );
  }
}
export default Example1;