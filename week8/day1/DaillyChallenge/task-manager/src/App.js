import React from "react";
import { TaskProvider } from "./context/TaskContext";
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";
import "./index.css";

export default function App() {
  return (
    <TaskProvider>
      <div className="app">
        <h1>Enhanced Task Manager</h1>
        <AddTask />
        <TaskList />
      </div>
    </TaskProvider>
  );
}
