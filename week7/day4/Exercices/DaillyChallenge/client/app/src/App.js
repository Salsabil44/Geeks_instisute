import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      inputValue: "",
      responseMessage: "",
    };
  }

  // GET request when the component loads
  async componentDidMount() {
    try {
      const res = await fetch("http://localhost:5000/api/hello");
      const data = await res.json(); 
      this.setState({ message: data.message });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  // POST request when form is submitted
  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/world", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value: this.state.inputValue }),
      });

      const data = await res.json();
      this.setState({ responseMessage: data.message });
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  render() {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>{this.state.message}</h1>

        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.inputValue}
            onChange={(e) => this.setState({ inputValue: e.target.value })}
            placeholder="Type something..."
          />
          <button type="submit">Send</button>
        </form>

        <p>{this.state.responseMessage}</p>
      </div>
    );
  }
}

export default App;
