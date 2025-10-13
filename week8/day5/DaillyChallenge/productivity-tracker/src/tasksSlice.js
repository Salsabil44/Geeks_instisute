import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = {
  allTasks: [
    { id: 1, title: 'Write report', categoryId: 1, completed: false },
    { id: 2, title: 'Grocery shopping', categoryId: 2, completed: true },
    { id: 3, title: 'Read book', categoryId: 1, completed: false },
    { id: 4, title: 'Exercise', categoryId: 3, completed: false },
  ],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.allTasks.push(action.payload);
    },
    editTask: (state, action) => {
      const { id, title, categoryId } = action.payload;
      const task = state.allTasks.find((t) => t.id === id);
      if (task) {
        task.title = title;
        task.categoryId = categoryId;
      }
    },
    deleteTask: (state, action) => {
      state.allTasks = state.allTasks.filter((t) => t.id !== action.payload);
    },
    toggleTaskCompletion: (state, action) => {
      const task = state.allTasks.find((t) => t.id === action.payload);
      if (task) task.completed = !task.completed;
    },
  },
});

export const { addTask, editTask, deleteTask, toggleTaskCompletion } = tasksSlice.actions;

export default tasksSlice.reducer;


export const selectAllTasks = (state) => state.tasks.allTasks;


export const selectTasksByCategory = createSelector(
  [selectAllTasks, (_, categoryId) => categoryId],
  (tasks, categoryId) => {
    if (!categoryId) return tasks;
    return tasks.filter((task) => task.categoryId === categoryId);
  }
);

export const selectCompletedTasks = createSelector(
  [selectAllTasks],
  (tasks) => tasks.filter((task) => task.completed).length
);
