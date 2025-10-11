
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editTask } from "../redux/tasksActions";

const EditTaskForm = ({ selectedDay, task, onClose }) => {
  const [title, setTitle] = useState(task.title);
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    if (!title.trim()) return;
    dispatch(editTask(selectedDay, task.id, { title }));
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "inline" }}>
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <button type="submit">Save</button>
      <button type="button" onClick={onClose}>Cancel</button>
    </form>
  );
};

export default EditTaskForm;
