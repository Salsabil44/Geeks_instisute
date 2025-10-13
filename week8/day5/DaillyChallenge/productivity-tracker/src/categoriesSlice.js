import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = {
  allCategories: [
    { id: 1, name: 'Work' },
    { id: 2, name: 'Personal' },
    { id: 3, name: 'Health' },
  ],
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
});

export const selectAllCategories = (state) => state.categories.allCategories;

export const selectCategoryById = createSelector(
  [selectAllCategories, (_, id) => id],
  (categories, id) => categories.find((c) => c.id === id)
);

export default categoriesSlice.reducer;
