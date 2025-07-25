import React from 'react';

const Filters = ({
  statusFilter, setStatusFilter,
  searchText, setSearchText,
  searchDate, setSearchDate
}) => {
  return (
    <div className="filters">
      <input
        type="text"
        placeholder="🔍 Search task..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <input
        type="date"
        value={searchDate}
        onChange={(e) => setSearchDate(e.target.value)}
        title="Filter by Due Date"
      />
      <div className="status-filters">
        <button className={statusFilter === 'all' ? 'active' : ''} onClick={() => setStatusFilter('all')}>All</button>
        <button className={statusFilter === 'pending' ? 'active' : ''} onClick={() => setStatusFilter('pending')}>Pending</button>
        <button className={statusFilter === 'completed' ? 'active' : ''} onClick={() => setStatusFilter('completed')}>Completed</button>
      </div>
    </div>
  );
};

export default Filters;
