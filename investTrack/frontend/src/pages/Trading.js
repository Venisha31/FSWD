import React, { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { useAuth } from '../hooks/useAuth';
import { Search, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, DollarSign, BarChart3 } from 'lucide-react';
import axios from 'axios';
import './Trading.css';

const Trading = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tradeType, setTradeType] = useState('BUY');
  const [quantity, setQuantity] = useState('');
  const [showTradeModal, setShowTradeModal] = useState(false);
  const [searchTimeout, setSearchTimeout] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuth();

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
    };
  }, [searchTimeout]);

  // Search for stocks
  const searchStocks = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      setLoading(true);
      console.log('Searching for:', query); // Debug log
      const response = await axios.get(`/api/stock/search?q=${encodeURIComponent(query)}`);
      console.log('Search results:', response.data); // Debug log
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching stocks:', error);
      enqueueSnackbar('Failed to search stocks', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  // Get real-time stock data
  const getStockData = async (symbol) => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/stock/quote/${symbol}`);
      setStockData(response.data);
      setSelectedStock(symbol);
    } catch (error) {
      console.error('Error fetching stock data:', error);
      enqueueSnackbar('Failed to fetch stock data', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  // Execute trade
  const executeTrade = async () => {
    if (!quantity || quantity <= 0) {
      enqueueSnackbar('Please enter a valid quantity', { variant: 'error' });
      return;
    }

    try {
      setLoading(true);
      const endpoint = tradeType === 'BUY' ? '/api/transactions/buy' : '/api/transactions/sell';
      const response = await axios.post(endpoint, {
        userId: user._id,
        symbol: selectedStock,
        quantity: parseInt(quantity)
      });

      enqueueSnackbar(`${tradeType} order executed successfully!`, { variant: 'success' });
      setShowTradeModal(false);
      setQuantity('');
      // Refresh stock data
      getStockData(selectedStock);
    } catch (error) {
      console.error('Error executing trade:', error);
      enqueueSnackbar(error.response?.data?.message || 'Trade failed', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formatPercentage = (value) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-IN').format(num);
  };

  return (
    <div className="trading">
      <div className="trading-header">
        <h1 className="trading-title">Stock Trading</h1>
        <p className="trading-subtitle">Search, analyze, and trade stocks in real-time</p>
      </div>

      {/* Search Section */}
      <div className="search-section glass-card">
        <div className="search-container">
          <div className="search-input-wrapper">
            <Search size={20} className="search-icon" />
            <input
              type="text"
                             placeholder="Search for stocks (e.g., TCS, INFY, RELIANCE, AAPL, GOOGL)..."
              value={searchQuery}
                             onChange={(e) => {
                 const value = e.target.value;
                 setSearchQuery(value);
                 
                 // Clear previous timeout
                 if (searchTimeout) {
                   clearTimeout(searchTimeout);
                 }
                 
                 // Set new timeout for search
                 const timeout = setTimeout(() => {
                   searchStocks(value);
                 }, 300); // 300ms delay
                 
                 setSearchTimeout(timeout);
               }}
              className="search-input"
            />
          </div>
        </div>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="search-results">
            {searchResults.map((stock) => (
              <div
                key={stock.symbol}
                className="search-result-item"
                onClick={() => {
                  getStockData(stock.symbol);
                  setSearchQuery(stock.symbol);
                  setSearchResults([]);
                }}
              >
                <div className="result-symbol">{stock.symbol}</div>
                <div className="result-name">{stock.name}</div>
                <div className="result-price">{formatCurrency(stock.price || 0)}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Stock Data Display */}
      {stockData && (
        <div className="stock-data-section">
          <div className="stock-overview glass-card">
            <div className="stock-header">
              <div className="stock-info">
                <h2 className="stock-symbol">{stockData.symbol}</h2>
                <p className="stock-name">{stockData.companyName || 'N/A'}</p>
              </div>
              <button
                className="btn btn-primary"
                onClick={() => setShowTradeModal(true)}
              >
                Trade
              </button>
            </div>

            <div className="stock-price-section">
              <div className="current-price">
                <span className="price-label">Current Price</span>
                <span className="price-value">{formatCurrency(stockData.price)}</span>
              </div>
              <div className={`price-change ${(stockData.changePercent || 0) >= 0 ? 'positive' : 'negative'}`}>
                {(stockData.changePercent || 0) >= 0 ? <ArrowUpRight size={20} /> : <ArrowDownRight size={20} />}
                <span className="change-value">{formatCurrency(stockData.change || 0)}</span>
                <span className="change-percent">{formatPercentage(stockData.changePercent || 0)}</span>
              </div>
            </div>

            <div className="stock-details-grid">
              <div className="detail-item">
                <span className="detail-label">Open</span>
                <span className="detail-value">{formatCurrency(stockData.open || 0)}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">High</span>
                <span className="detail-value">{formatCurrency(stockData.high || 0)}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Low</span>
                <span className="detail-value">{formatCurrency(stockData.low || 0)}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Volume</span>
                <span className="detail-value">{formatNumber(stockData.volume || 0)}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Market Cap</span>
                <span className="detail-value">{formatCurrency(stockData.marketCap || 0)}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">52W High</span>
                <span className="detail-value">{formatCurrency(stockData.yearHigh || 0)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Trade Modal */}
      {showTradeModal && (
        <div className="modal-overlay">
          <div className="modal-content glass-card">
            <div className="modal-header">
              <h2>Place Trade Order</h2>
              <button
                className="modal-close"
                onClick={() => setShowTradeModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="trade-info">
                <div className="trade-stock">
                  <span className="trade-symbol">{selectedStock}</span>
                  <span className="trade-price">{formatCurrency(stockData?.price || 0)}</span>
                </div>
              </div>

              <div className="trade-form">
                <div className="form-group">
                  <label>Trade Type</label>
                  <div className="trade-type-buttons">
                    <button
                      className={`trade-type-btn ${tradeType === 'BUY' ? 'active' : ''}`}
                      onClick={() => setTradeType('BUY')}
                    >
                      <TrendingUp size={16} />
                      Buy
                    </button>
                    <button
                      className={`trade-type-btn ${tradeType === 'SELL' ? 'active' : ''}`}
                      onClick={() => setTradeType('SELL')}
                    >
                      <TrendingDown size={16} />
                      Sell
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label>Quantity</label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="Enter quantity"
                    className="input"
                    min="1"
                  />
                </div>

                {quantity && stockData && (
                  <div className="trade-summary">
                    <div className="summary-item">
                      <span>Total Value:</span>
                      <span>{formatCurrency((parseFloat(quantity) || 0) * (stockData.price || 0))}</span>
                    </div>
                    <div className="summary-item">
                      <span>Available Cash:</span>
                      <span>{formatCurrency(user?.cash || 0)}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="modal-actions">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowTradeModal(false)}
                >
                  Cancel
                </button>
                <button
                  className={`btn ${tradeType === 'BUY' ? 'btn-success' : 'btn-danger'}`}
                  onClick={executeTrade}
                  disabled={!quantity || quantity <= 0 || loading}
                >
                  {loading ? 'Processing...' : `${tradeType} ${selectedStock}`}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Trading;
