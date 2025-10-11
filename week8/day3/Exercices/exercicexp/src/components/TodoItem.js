
import React from "react";
import { useDispatch } from "react-redux";
import { toggleTodo, removeTodo } from "../todoSlice";

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();

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
        background: todo.completed ? "#d1ffd1" : "#f9f9f9",
        cursor: "pointer",
        transition: "all 0.2s",
      }}
    >
      <span
        onClick={() => dispatch(toggleTodo(todo.id))}
        style={{
          textDecoration: todo.completed ? "line-through" : "none",
          color: todo.completed ? "#888" : "#333",
          flex: 1,
        }}
      >
        {todo.text}
      </span>
      <button
        onClick={() => dispatch(removeTodo(todo.id))}
        style={{
          background: "#ff4d4d",
          border: "none",
          color: "#fff",
          padding: "6px 12px",
          borderRadius: "6px",
          cursor: "pointer",
          transition: "background 0.3s",
        }}
        onMouseEnter={(e) => (e.target.style.background = "#e60000")}
        onMouseLeave={(e) => (e.target.style.background = "#ff4d4d")}
      >
        Delete
      </button>
    </li>
  );
};

export default TodoItem;
