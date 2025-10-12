import React from "react";
import { useSelector } from "react-redux";
import TaskItem from "./TaskItem";

const TaskList = () => {
  const selectedDate = useSelector((state) => state.planner.selectedDate);
  const tasks = useSelector((state) => state.planner.tasks[selectedDate] || []);

  if (tasks.length === 0)
    return <p style={{ textAlign: "center", color: "#888" }}>No tasks for this day.</p>;

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {tasks.map((task) => (
        <li
          key={task.id}
          style={{
            background: "#f9fafb",
            margin: "8px 0",
            padding: "10px",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
          }}
        >
          <TaskItem task={task} />
          <small style={{ color: "#888", fontSize: "12px" }}>
            Created on: {task.createdAt}
          </small>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
