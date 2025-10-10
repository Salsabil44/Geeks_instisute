import React, { useContext, useRef, useState } from "react";
import { TaskContext } from "../context/TaskContext";

export default function TaskList() {
  const { state, dispatch } = useContext(TaskContext);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const editRef = useRef();

  const filteredTasks = state.tasks.filter((task) => {
    if (state.filter === "completed") return task.completed;
    if (state.filter === "active") return !task.completed;
    return true;
  });

  const handleEdit = (task) => {
    setEditingTaskId(task.id);
    setTimeout(() => {
      editRef.current.value = task.text;
      editRef.current.focus();
    }, 0);
  };

  const saveEdit = (id) => {
    const newText = editRef.current.value.trim();
    if (newText) {
      dispatch({ type: "EDIT_TASK", payload: { id, text: newText } });
    }
    setEditingTaskId(null);
  };

  return (
    <div className="task-list">
      <div className="filters">
        <button onClick={() => dispatch({ type: "SET_FILTER", payload: "all" })}>
          All
        </button>
        <button
          onClick={() => dispatch({ type: "SET_FILTER", payload: "active" })}
        >
          Active
        </button>
        <button
          onClick={() => dispatch({ type: "SET_FILTER", payload: "completed" })}
        >
          Completed
        </button>
      </div>

      {filteredTasks.map((task) => (
        <div
          key={task.id}
          className={`task ${task.completed ? "completed" : ""}`}
        >
          {editingTaskId === task.id ? (
            <>
              <input ref={editRef} type="text" defaultValue={task.text} />
              <button onClick={() => saveEdit(task.id)}>Save</button>
            </>
          ) : (
            <>
              <span onClick={() => dispatch({ type: "TOGGLE_TASK", payload: task.id })}>
                {task.text}
              </span>
              <button onClick={() => handleEdit(task)}>Edit</button>
              <button onClick={() => dispatch({ type: "DELETE_TASK", payload: task.id })}>
                Delete
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
