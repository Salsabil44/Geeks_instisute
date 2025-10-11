import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../redux/tasksActions";

export default function TaskForm() {
  const dispatch = useDispatch();
  const selected = useSelector(s => s.selectedDay);
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!text.trim()) {
      setError("Task cannot be empty");
      return;
    }
    dispatch(addTask(selected, text.trim()));
    setText("");
    setError("");
  };

  return (
    <form onSubmit={submit} style={{marginTop:12}}>
      <div style={{display:"flex",gap:8}}>
        <input className="input" placeholder="Write a new task..." value={text} onChange={e=>setText(e.target.value)} />
        <button className="btn primary" type="submit">Add</button>
      </div>
      {error && <div style={{color:"var(--danger)",marginTop:8}}>{error}</div>}
    </form>
  );
}
