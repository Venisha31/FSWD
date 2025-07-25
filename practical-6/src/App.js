import React, { useEffect, useState } from 'react';
import './App.css';
import TaskInput from './TaskInput';
import TaskList from './TaskList';
import Filters from './Filters';
import { isSameDay, parseISO } from 'date-fns';

const App = () => {
  const [task, setTask] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editId, setEditId] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [searchDate, setSearchDate] = useState('');

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddOrUpdate = () => {
    if (!task.trim()) return;
    if (editId) {
      setTasks(tasks.map(t => t.id === editId ? { ...t, text: task, dueDate } : t));
      setEditId(null);
    } else {
      setTasks([...tasks, {
        id: Date.now(),
        text: task,
        dueDate,
        completed: false
      }]);
    }
    setTask('');
    setDueDate('');
  };

  const handleEdit = (id) => {
    const t = tasks.find(t => t.id === id);
    setTask(t.text);
    setDueDate(t.dueDate || '');
    setEditId(id);
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const toggleComplete = (idOrEvent) => {
    const id = typeof idOrEvent === 'number' ? idOrEvent : parseInt(idOrEvent.target.closest('.task').dataset.id);
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const filteredTasks = tasks.filter(t => {
    const matchStatus =
      statusFilter === 'all' ? true :
      statusFilter === 'completed' ? t.completed : !t.completed;

    const matchSearch = t.text.toLowerCase().includes(searchText.toLowerCase());

    const matchDate = searchDate
      ? isSameDay(parseISO(t.dueDate), parseISO(searchDate))
      : true;

    return matchStatus && matchSearch && matchDate;
  });

  return (
    <div className="app-container">
      <h1>✨ Daily Task Planner</h1>

      <TaskInput
        task={task}
        setTask={setTask}
        dueDate={dueDate}
        setDueDate={setDueDate}
        handleAddOrUpdate={handleAddOrUpdate}
        editId={editId}
      />

      <Filters
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        searchText={searchText}
        setSearchText={setSearchText}
        searchDate={searchDate}
        setSearchDate={setSearchDate}
      />

      <TaskList
        tasks={filteredTasks}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        toggleComplete={toggleComplete}
      />
    </div>
  );
};

export default App;
