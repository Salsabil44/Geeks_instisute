import React from "react";
import DatePickerComponent from "./components/DatePicker";
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";

function App() {
  return (
    <div style={{ minHeight: "100vh", background: "#f0f2f5", display: "flex", justifyContent: "center", paddingTop: "50px" }}>
      <div style={{ background: "#fff", padding: "30px", borderRadius: "12px", boxShadow: "0 4px 15px rgba(0,0,0,0.1)", width: "400px" }}>
        <h1 style={{ textAlign: "center", color: "#333" }}>Daily Planner</h1>
        <DatePickerComponent />
        <AddTask />
        <TaskList />
      </div>
    </div>
  );
}

export default App;
