import React from "react";
import { TaskProvider } from "./context/TaskContext";
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";

function App() {
  return (
    <TaskProvider>
      <div
        style={{
          width: "400px",
          margin: "40px auto",
          textAlign: "center",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "10px",
        }}
      >
        <h1>Task Manager</h1>
        <AddTask />
        <TaskList />
      </div>
    </TaskProvider>
  );
}

export default App;
