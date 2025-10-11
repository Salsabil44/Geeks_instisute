import { SELECT_DAY, ADD_TASK, EDIT_TASK, DELETE_TASK } from "./tasksActions";

const initialState = {
  selectedDay: new Date().toISOString().slice(0,10),
  tasksByDay: {},
};

export default function tasksReducer(state = initialState, action) {
  switch (action.type) {
    case SELECT_DAY:
      return { ...state, selectedDay: action.payload };

    case ADD_TASK: {
      const { day, text } = action.payload;
      const existing = state.tasksByDay[day] || [];
      const newTask = { id: Date.now(), text };
      return { ...state, tasksByDay: { ...state.tasksByDay, [day]: [...existing, newTask] } };
    }

    case EDIT_TASK: {
      const { day, id, newText } = action.payload;
      const list = state.tasksByDay[day] || [];
      return { ...state, tasksByDay: { ...state.tasksByDay, [day]: list.map(t => t.id === id ? { ...t, text: newText } : t) } };
    }

    case DELETE_TASK: {
      const { day, id } = action.payload;
      const list = state.tasksByDay[day] || [];
      return { ...state, tasksByDay: { ...state.tasksByDay, [day]: list.filter(t => t.id !== id) } };
    }

    default:
      return state;
  }
}
