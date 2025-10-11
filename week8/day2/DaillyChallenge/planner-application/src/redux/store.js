import { createStore } from "redux";
import tasksReducer from "./tasksReducer";

const loadState = () => {
  try {
    const s = localStorage.getItem("daily_planner_state_v1");
    return s ? JSON.parse(s) : undefined;
  } catch {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    localStorage.setItem("daily_planner_state_v1", JSON.stringify(state));
  } catch {}
};

const persisted = loadState();

const store = createStore(
  tasksReducer,
  persisted,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => saveState(store.getState()));

export default store;
