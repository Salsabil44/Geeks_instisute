import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedDate: new Date().toISOString().split("T")[0],
  tasks: {},
};

const plannerSlice = createSlice({
  name: "planner",
  initialState,
  reducers: {
    setDate: (state, action) => {
      state.selectedDate = action.payload;
    },
    addTask: (state, action) => {
      const { date, text } = action.payload;
      if (!state.tasks[date]) state.tasks[date] = [];
      state.tasks[date].push({
        id: Date.now(),
        text,
        createdAt: new Date().toISOString().split("T")[0], // store creation date
      });
    },
    editTask: (state, action) => {
      const { date, id, text } = action.payload;
      const task = state.tasks[date].find((t) => t.id === id);
      if (task) task.text = text;
    },
    deleteTask: (state, action) => {
      const { date, id } = action.payload;
      state.tasks[date] = state.tasks[date].filter((t) => t.id !== id);
    },
  },
});

export const { setDate, addTask, editTask, deleteTask } = plannerSlice.actions;
export default plannerSlice.reducer;
