import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectTasksByCategory, toggleTaskCompletion, deleteTask } from '../tasksSlice';

const TaskList = ({ categoryId }) => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) =>
    categoryId ? selectTasksByCategory(state, categoryId) : state.tasks.allTasks
  );

  const handleToggle = useCallback(
    (id) => dispatch(toggleTaskCompletion(id)),
    [dispatch]
  );

  const handleDelete = useCallback(
    (id) => dispatch(deleteTask(id)),
    [dispatch]
  );

  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {tasks.map((task) => (
        <li
          key={task.id}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            margin: '5px 0',
            padding: '8px',
            background: '#f0f0f0',
            borderRadius: '6px',
          }}
        >
          <span
            onClick={() => handleToggle(task.id)}
            style={{ textDecoration: task.completed ? 'line-through' : 'none', cursor: 'pointer' }}
          >
            {task.title}
          </span>
          <button onClick={() => handleDelete(task.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
