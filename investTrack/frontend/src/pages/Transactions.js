import React, { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { useAuth } from '../hooks/useAuth';
import { Plus, TrendingUp, TrendingDown, Filter, Search } from 'lucide-react';
import axios from 'axios';
import './Transactions.css';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showTradeModal, setShowTradeModal] = useState(false);
  const [tradeType, setTradeType] = useState('BUY');
  const [filters, setFilters] = useState({
    type: '',
    symbol: '',
    dateFrom: '',
    dateTo: ''
  });
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchTransactions();
    }
  }, [user]);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(`/api/transactions/${user._id}`);
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      enqueueSnackbar('Failed to load transactions', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredTransactions = transactions.filter(transaction => {
    if (filters.type && transaction.type !== filters.type) return false;
    if (filters.symbol && !transaction.symbol.toLowerCase().includes(filters.symbol.toLowerCase())) return false;
    if (filters.dateFrom && new Date(transaction.createdAt) < new Date(filters.dateFrom)) return false;
    if (filters.dateTo && new Date(transaction.createdAt) > new Date(filters.dateTo)) return false;
    return true;
  });

  if (loading) {
    return (
      <div className="transactions-loading">
        <div className="loading-spinner"></div>
        <p>Loading transactions...</p>
      </div>
    );
  }

  return (
    <div className="transactions">
      <div className="transactions-header">
        <div className="header-content">
          <h1 className="transactions-title">Transaction History</h1>
          <p className="transactions-subtitle">Track all your buy and sell transactions</p>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => setShowTradeModal(true)}
        >
          <Plus size={16} />
          New Trade
        </button>
      </div>

      {/* Filters */}
      <div className="filters-section glass-card">
        <div className="filters-header">
          <Filter size={20} />
          <h3>Filters</h3>
        </div>
        <div className="filters-grid">
          <div className="filter-group">
            <label>Type</label>
            <select 
              value={filters.type} 
              onChange={(e) => setFilters({...filters, type: e.target.value})}
              className="input"
            >
              <option value="">All</option>
              <option value="BUY">Buy</option>
              <option value="SELL">Sell</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Symbol</label>
            <div className="search-input">
              <Search size={16} />
              <input
                type="text"
                placeholder="Search by symbol..."
                value={filters.symbol}
                onChange={(e) => setFilters({...filters, symbol: e.target.value})}
                className="input"
              />
            </div>
          </div>
          <div className="filter-group">
            <label>From Date</label>
            <input
              type="date"
              value={filters.dateFrom}
              onChange={(e) => setFilters({...filters, dateFrom: e.target.value})}
              className="input"
            />
          </div>
          <div className="filter-group">
            <label>To Date</label>
            <input
              type="date"
              value={filters.dateTo}
              onChange={(e) => setFilters({...filters, dateTo: e.target.value})}
              className="input"
            />
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="transactions-table-container">
        <div className="transactions-table glass-card">
          <div className="table-header">
            <h2 className="table-title">All Transactions</h2>
            <div className="table-summary">
              <span className="summary-item">
                Total: {filteredTransactions.length} transactions
              </span>
            </div>
          </div>

          {filteredTransactions.length > 0 ? (
            <div className="table-wrapper">
              <table className="transactions-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Symbol</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map((transaction) => (
                    <tr key={transaction._id} className="transaction-row">
                      <td className="date-cell">
                        {formatDate(transaction.createdAt)}
                      </td>
                      <td className="type-cell">
                        <div className={`type-badge ${transaction.type.toLowerCase()}`}>
                          {transaction.type === 'BUY' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                          <span>{transaction.type}</span>
                        </div>
                      </td>
                      <td className="symbol-cell">
                        <div className="symbol-info">
                          <div className="symbol-text">{transaction.symbol}</div>
                        </div>
                      </td>
                      <td className="quantity-cell">
                        {transaction.quantity.toLocaleString()}
                      </td>
                      <td className="price-cell">
                        {formatCurrency(transaction.price)}
                      </td>
                      <td className="total-cell">
                        {formatCurrency(transaction.total)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="no-transactions">
              <div className="no-transactions-content">
                <div className="no-transactions-icon">
                  <TrendingUp size={48} />
                </div>
                <h3 className="no-transactions-title">No Transactions Found</h3>
                <p className="no-transactions-description">
                  {transactions.length === 0 
                    ? "You haven't made any transactions yet. Start trading to see your history here!"
                    : "No transactions match your current filters. Try adjusting your search criteria."
                  }
                </p>
                {transactions.length === 0 && (
                  <button 
                    className="btn btn-primary"
                    onClick={() => setShowTradeModal(true)}
                  >
                    Start Trading
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Trade Modal would go here */}
      {showTradeModal && (
        <div className="modal-overlay">
          <div className="modal-content glass-card">
            <div className="modal-header">
              <h2>New Trade</h2>
              <button 
                className="modal-close"
                onClick={() => setShowTradeModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <p>Trade modal content would go here...</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transactions;
