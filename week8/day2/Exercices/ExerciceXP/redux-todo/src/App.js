import React from "react";
import TodoInput from "./Components/TodoInput";
import TodoList from "./Components/TodoList";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <h1>📝 Redux Todo App</h1>
      <TodoInput />
      <TodoList />
    </div>
  );
}

export default App;
