import { configureStore } from '@reduxjs/toolkit';
import booksReducer from '../bookslice';

const store = configureStore({
  reducer: {
    books: booksReducer,
  },
});

export default store;
