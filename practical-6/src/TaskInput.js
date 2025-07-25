import React from 'react';

const TaskInput = ({ task, setTask, dueDate, setDueDate, handleAddOrUpdate, editId }) => {
  return (
    <div className="task-input">
      <input
        type="text"
        placeholder="Enter your task..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <button onClick={handleAddOrUpdate}>
        {editId ? 'Update' : 'Add'}
      </button>
    </div>
  );
};

export default TaskInput;
