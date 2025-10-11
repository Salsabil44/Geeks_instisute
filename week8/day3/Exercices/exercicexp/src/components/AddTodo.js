
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../todoSlice";

const AddTodo = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    dispatch(addTodo(text));
    setText("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", marginBottom: "20px" }}
    >
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task..."
        style={{
          flex: 1,
          padding: "10px",
          borderRadius: "8px 0 0 8px",
          border: "1px solid #ccc",
          outline: "none",
        }}
      />
      <button
        type="submit"
        style={{
          padding: "10px 20px",
          border: "none",
          background: "#4CAF50",
          color: "#fff",
          fontWeight: "bold",
          borderRadius: "0 8px 8px 0",
          cursor: "pointer",
          transition: "background 0.3s",
        }}
        onMouseEnter={(e) => (e.target.style.background = "#45a049")}
        onMouseLeave={(e) => (e.target.style.background = "#4CAF50")}
      >
        Add
      </button>
    </form>
  );
};

export default AddTodo;
