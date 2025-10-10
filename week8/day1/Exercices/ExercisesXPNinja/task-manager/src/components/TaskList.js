import React, { useContext } from "react";
import { TaskContext } from "../context/TaskContext";

export default function TaskList() {
  const { state, dispatch } = useContext(TaskContext);

  return (
    <div>
      <h2>Task List</h2>
      {state.tasks.length === 0 ? (
        <p>No tasks yet. Add one above!</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {state.tasks.map((task) => (
            <li key={task.id} style={{ marginBottom: "10px" }}>
              <span
                onClick={() =>
                  dispatch({ type: "TOGGLE_TASK", payload: task.id })
                }
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
                  cursor: "pointer",
                  marginRight: "10px",
                }}
              >
                {task.text}
              </span>
              <button
                onClick={() =>
                  dispatch({ type: "REMOVE_TASK", payload: task.id })
                }
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
