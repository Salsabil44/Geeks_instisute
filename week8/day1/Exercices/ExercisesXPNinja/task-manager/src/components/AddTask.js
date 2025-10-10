import React, { useState, useContext } from "react";
import { TaskContext } from "../context/TaskContext";

export default function AddTask() {
  const [text, setText] = useState("");
  const { dispatch } = useContext(TaskContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() === "") return;
    dispatch({ type: "ADD_TASK", payload: text });
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="Enter task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit" style={{ marginLeft: "10px" }}>
        Add Task
      </button>
    </form>
  );
}
