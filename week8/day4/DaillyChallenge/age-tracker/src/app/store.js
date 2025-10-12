import { configureStore } from "@reduxjs/toolkit";
import ageReducer from "../age/ageSlice";

export const store = configureStore({
  reducer: {
    age: ageReducer,
  },
});

export default store;
