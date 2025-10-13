import React from 'react';
import { useSelector } from 'react-redux';
import { selectAllCategories } from '../categoriesSlice';

const CategorySelector = ({ selectedCategoryId, onChange }) => {
  const categories = useSelector(selectAllCategories);

  return (
    <select value={selectedCategoryId} onChange={(e) => onChange(Number(e.target.value))}>
      <option value={0}>All Categories</option>
      {categories.map((cat) => (
        <option key={cat.id} value={cat.id}>
          {cat.name}
        </option>
      ))}
    </select>
  );
};

export default CategorySelector;
