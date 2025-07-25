import React from 'react';
import { FaTrash, FaPen } from 'react-icons/fa';

const TaskList = ({ tasks, handleEdit, handleDelete, toggleComplete }) => {
  if (tasks.length === 0) return <p className="empty">No tasks found.</p>;

  return (
    <div className="task-list">
      {tasks.map(t => (
        <div className={`task ${t.completed ? 'completed' : ''}`} data-id={t.id} key={t.id}>
          <div className="task-info">
            <div onClick={toggleComplete}>
              <p>{t.text}</p>
              {t.dueDate && <span className="due">📅 {new Date(t.dueDate).toDateString()}</span>}
            </div>
            <select
              value={t.completed ? 'completed' : 'pending'}
              onChange={(e) => toggleComplete(t.id)}
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div className="actions">
            <button onClick={() => handleEdit(t.id)}><FaPen /></button>
            <button onClick={() => handleDelete(t.id)}><FaTrash /></button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
