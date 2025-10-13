import React, { useState } from 'react';
import CategorySelector from './components/CategorySelector';
import TaskList from './components/TaskList';

function App() {
  const [selectedCategoryId, setSelectedCategoryId] = useState(0);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Productivity Tracker</h1>

      <CategorySelector
        selectedCategoryId={selectedCategoryId}
        onChange={setSelectedCategoryId}
      />

      <TaskList categoryId={selectedCategoryId || null} />
    </div>
  );
}

export default App;
