export const SELECT_DAY = "SELECT_DAY";
export const ADD_TASK = "ADD_TASK";
export const EDIT_TASK = "EDIT_TASK";
export const DELETE_TASK = "DELETE_TASK";

export const selectDay = (day) => ({ type: SELECT_DAY, payload: day });
export const addTask = (day, text) => ({ type: ADD_TASK, payload: { day, text } });
export const editTask = (day, id, newText) => ({ type: EDIT_TASK, payload: { day, id, newText } });
export const deleteTask = (day, id) => ({ type: DELETE_TASK, payload: { day, id } });
