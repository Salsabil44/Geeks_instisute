// Exercise3.js
import React, { Component } from 'react';
import './Exercise.css';

class Exercise extends Component {
  render() {
    const headerStyle = {
      color: 'white',
      backgroundColor: 'DodgerBlue',
      padding: '10px',
      fontFamily: 'Arial',
      borderRadius: '8px',
    };

    return (
      <div>
        <h1 style={headerStyle}>This is a header</h1>

        <p className="para">
          This is a paragraph 
        </p>

        <a href="https://react.dev" target="_blank" rel="noreferrer">
          this is a link
        </a>

        <br />
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
          alt="React Logo"
          width="100"
          style={{ marginTop: '10px' }}
        />

        <form style={{ marginTop: '15px' }}>
          <label>
            Enter your name:
            <input type="text" placeholder="Your name" style={{ marginLeft: '10px' }} />
          </label>
          <button type="submit" style={{ marginLeft: '10px' }}>
            Submit
          </button>
        </form>

        <ul style={{ marginTop: '10px' }}>
          <li>React</li>
          <li>JavaScript</li>
          <li>CSS</li>
        </ul>
      </div>
    );
  }
}

export default Exercise;
