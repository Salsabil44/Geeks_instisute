import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editTask, deleteTask } from "../plannerSlice";

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();
  const selectedDate = useSelector((state) => state.planner.selectedDate);
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(task.text);

  const handleEdit = () => {
    dispatch(editTask({ date: selectedDate, id: task.id, text }));
    setIsEditing(false);
  };

  return (
    <li
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px",
        borderBottom: "1px solid #eee",
        borderRadius: "8px",
        marginBottom: "10px",
        background: "#f9f9f9",
      }}
    >
      {isEditing ? (
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ flex: 1, padding: "6px", marginRight: "10px" }}
        />
      ) : (
        <span>{task.text}</span>
      )}

      {isEditing ? (
        <button onClick={handleEdit} style={{ marginRight: "5px", background: "#4CAF50", color: "#fff", border: "none", padding: "6px 10px", borderRadius: "6px" }}>
          Save
        </button>
      ) : (
        <button onClick={() => setIsEditing(true)} style={{ marginRight: "5px", padding: "6px 10px" }}>Edit</button>
      )}
      <button
        onClick={() => dispatch(deleteTask({ date: selectedDate, id: task.id }))}
        style={{ background: "#ff4d4d", color: "#fff", border: "none", padding: "6px 10px", borderRadius: "6px" }}
      >
        Delete
      </button>
    </li>
  );
};

export default TaskItem;
