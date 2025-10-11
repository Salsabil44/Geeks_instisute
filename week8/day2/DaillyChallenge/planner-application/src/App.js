import React from "react";
import DatePicker from "./components/DatePicker";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

export default function App() {
  return (
    <div className="container">
      <div className="header">
        <div>
          <div className="title">Daily Planner</div>
        </div>
        <div className="controls">
          <div style={{textAlign:"right"}}>
            <div style={{fontWeight:700}}>Plan your day</div>
           
          </div>
        </div>
      </div>

      <div style={{marginTop:12}}>
        <DatePicker />
        <div className="week" style={{marginTop:14}}>
          {/* Small visual week helper — show dates for current week */}
        </div>
      </div>

      <div className="main">
        <div className="left">
          <TaskForm />
        </div>
        <div className="right">
          <TaskList />
        </div>
      </div>
    </div>
  );
}
