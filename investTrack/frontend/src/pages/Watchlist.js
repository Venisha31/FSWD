import React, { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { useAuth } from '../hooks/useAuth';
import { Plus, X, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import axios from 'axios';
import './Watchlist.css';

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSymbol, setNewSymbol] = useState('');
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchWatchlist();
    }
  }, [user]);

  const fetchWatchlist = async () => {
    try {
      const response = await axios.get(`/api/watchlist/${user._id}`);
      setWatchlist(response.data.symbols || []);
    } catch (error) {
      console.error('Error fetching watchlist:', error);
      enqueueSnackbar('Failed to load watchlist', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const addToWatchlist = async (symbol) => {
    try {
      await axios.post('/api/watchlist/add', { userId: user._id, symbol: symbol.toUpperCase() });
      enqueueSnackbar(`${symbol} added to watchlist`, { variant: 'success' });
      setShowAddModal(false);
      setNewSymbol('');
      fetchWatchlist();
    } catch (error) {
      console.error('Error adding to watchlist:', error);
      enqueueSnackbar(error.response?.data?.message || 'Failed to add to watchlist', { variant: 'error' });
    }
  };

  const removeFromWatchlist = async (symbol) => {
    try {
      await axios.post('/api/watchlist/remove', { userId: user._id, symbol });
      enqueueSnackbar(`${symbol} removed from watchlist`, { variant: 'success' });
      fetchWatchlist();
    } catch (error) {
      console.error('Error removing from watchlist:', error);
      enqueueSnackbar('Failed to remove from watchlist', { variant: 'error' });
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

  const formatPercentage = (value) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
  };

  if (loading) {
    return (
      <div className="watchlist-loading">
        <div className="loading-spinner"></div>
        <p>Loading watchlist...</p>
      </div>
    );
  }

  return (
    <div className="watchlist">
      <div className="watchlist-header">
        <div className="header-content">
          <h1 className="watchlist-title">My Watchlist</h1>
          <p className="watchlist-subtitle">Track your favorite stocks and their performance</p>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => setShowAddModal(true)}
        >
          <Plus size={16} />
          Add Stock
        </button>
      </div>

      {watchlist.length > 0 ? (
        <div className="watchlist-grid">
          {watchlist.map((stock) => (
            <div key={stock.symbol} className="stock-card glass-card">
              <div className="stock-card-header">
                <div className="stock-info">
                  <h3 className="stock-symbol">{stock.symbol}</h3>
                  <p className="stock-name">{stock.companyName || 'N/A'}</p>
                </div>
                <button 
                  className="remove-btn"
                  onClick={() => removeFromWatchlist(stock.symbol)}
                >
                  <X size={16} />
                </button>
              </div>

              <div className="stock-price-info">
                <div className="current-price">
                  {formatCurrency(stock.currentPrice || 0)}
                </div>
                <div className={`price-change ${(stock.changePercent || 0) >= 0 ? 'positive' : 'negative'}`}>
                  {(stock.changePercent || 0) >= 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                  <span>{formatPercentage(stock.changePercent || 0)}</span>
                </div>
              </div>

              <div className="stock-details">
                <div className="detail-item">
                  <span className="detail-label">Open:</span>
                  <span className="detail-value">{formatCurrency(stock.open || 0)}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">High:</span>
                  <span className="detail-value">{formatCurrency(stock.high || 0)}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Low:</span>
                  <span className="detail-value">{formatCurrency(stock.low || 0)}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Volume:</span>
                  <span className="detail-value">{(stock.volume || 0).toLocaleString()}</span>
                </div>
              </div>

              <div className="stock-actions">
                <button className="btn btn-secondary btn-sm">
                  View Details
                </button>
                <button className="btn btn-primary btn-sm">
                  Trade
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-watchlist glass-card">
          <div className="no-watchlist-content">
            <div className="no-watchlist-icon">
              <TrendingUp size={48} />
            </div>
            <h3 className="no-watchlist-title">Your Watchlist is Empty</h3>
            <p className="no-watchlist-description">
              Start building your watchlist by adding stocks you want to track. You'll get real-time updates on their prices and performance.
            </p>
            <button 
              className="btn btn-primary"
              onClick={() => setShowAddModal(true)}
            >
              Add Your First Stock
            </button>
          </div>
        </div>
      )}

      {/* Add Stock Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content glass-card">
            <div className="modal-header">
              <h2>Add Stock to Watchlist</h2>
              <button 
                className="modal-close"
                onClick={() => setShowAddModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="symbol">Stock Symbol</label>
                <input
                  type="text"
                  id="symbol"
                  value={newSymbol}
                  onChange={(e) => setNewSymbol(e.target.value.toUpperCase())}
                  placeholder="e.g., AAPL, GOOGL, MSFT"
                  className="input"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      addToWatchlist(newSymbol);
                    }
                  }}
                />
              </div>
              <div className="modal-actions">
                <button 
                  className="btn btn-secondary"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
                <button 
                  className="btn btn-primary"
                  onClick={() => addToWatchlist(newSymbol)}
                  disabled={!newSymbol.trim()}
                >
                  Add Stock
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Watchlist;
