import React from 'react';
import Calendar from 'react-calendar';
import { isSameDay, parseISO } from 'date-fns';
import 'react-calendar/dist/Calendar.css';

const CalendarView = ({ tasks, selectedDate, setSelectedDate }) => {
  const taskCount = (date) =>
    tasks.filter(t => t.dueDate && isSameDay(parseISO(t.dueDate), date)).length;

  return (
    <div className="calendar-view">
      <h3>📅 Tasks by Date</h3>
      <Calendar
        value={selectedDate}
        onChange={setSelectedDate}
        tileContent={({ date }) =>
          taskCount(date) > 0 ? (
            <span className="dot">{taskCount(date)}</span>
          ) : null
        }
      />
      {selectedDate && (
        <p className="selected-date">
          Selected: {selectedDate.toDateString()}
        </p>
      )}
    </div>
  );
};

export default CalendarView;
