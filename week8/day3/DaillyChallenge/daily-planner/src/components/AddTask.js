import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../plannerSlice";

const AddTask = () => {
  const dispatch = useDispatch();
  const selectedDate = useSelector((state) => state.planner.selectedDate);
  const [text, setText] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    dispatch(addTask({ date: selectedDate, text }));
    setText("");
  };

  return (
    <form onSubmit={handleAdd} style={{ display: "flex", marginBottom: "20px" }}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="New task..."
        style={{ flex: 1, padding: "10px", borderRadius: "8px 0 0 8px", border: "1px solid #ccc" }}
      />
      <button
        type="submit"
        style={{ padding: "10px 20px", border: "none", borderRadius: "0 8px 8px 0", background: "#4CAF50", color: "#fff", cursor: "pointer" }}
      >
        Add
      </button>
    </form>
  );
};

export default AddTask;
