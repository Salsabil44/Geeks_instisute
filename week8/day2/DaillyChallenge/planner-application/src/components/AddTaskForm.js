import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/tasksActions";

const AddTaskForm = ({ selectedDay, onClose }) => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleAdd = () => {
    if (!title.trim()) {
      setError("Task cannot be empty");
      return;
    }
    dispatch(addTask(selectedDay, title));
    setTitle("");
    setError("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-80">
        <h3 className="text-lg font-bold text-indigo-600 mb-3">
          Add Task for {selectedDay}
        </h3>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter your task..."
          className="w-full border border-gray-300 rounded-lg p-2 mb-2 focus:ring-2 focus:ring-indigo-400 outline-none"
        />
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-3 py-1 bg-gray-300 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleAdd}
            className="px-3 py-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTaskForm;
