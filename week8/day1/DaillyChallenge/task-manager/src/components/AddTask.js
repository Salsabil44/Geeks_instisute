import React, { useState, useContext } from "react";
import { TaskContext } from "../context/TaskContext";

export default function AddTask() {
  const { dispatch } = useContext(TaskContext);
  const [text, setText] = useState("");

  const handleAdd = () => {
    if (text.trim() === "") return;
    dispatch({ type: "ADD_TASK", payload: text });
    setText("");
  };

  return (
    <div className="add-task">
      <input
        type="text"
        value={text}
        placeholder="Enter a task..."
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleAdd}>Add Task</button>
    </div>
  );
}
