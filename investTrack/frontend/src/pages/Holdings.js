import React, { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import axios from 'axios';
import './Holdings.css';

const Holdings = () => {
  const [holdings, setHoldings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchHoldings();
    }
  }, [user]);

  const fetchHoldings = async () => {
    try {
      const response = await axios.get(`/api/portfolio/${user._id}`);
      setHoldings(response.data.holdings || []);
    } catch (error) {
      console.error('Error fetching holdings:', error);
      enqueueSnackbar('Failed to load holdings', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleStartTrading = () => {
    navigate('/trading');
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
      <div className="holdings-loading">
        <div className="loading-spinner"></div>
        <p>Loading holdings...</p>
      </div>
    );
  }

  return (
    <div className="holdings">
      <div className="holdings-header">
        <h1 className="holdings-title">My Holdings</h1>
        <p className="holdings-subtitle">Track your stock investments and performance</p>
      </div>

      {holdings.length > 0 ? (
        <div className="holdings-table-container">
          <div className="holdings-table glass-card">
            <div className="table-header">
              <h2 className="table-title">Current Holdings</h2>
              <div className="table-summary">
                <span className="summary-item">
                  Total Value: {formatCurrency(holdings.reduce((sum, h) => sum + h.totalValue, 0))}
                </span>
                <span className="summary-item">
                  Total P&L: {formatCurrency(holdings.reduce((sum, h) => sum + h.pnl, 0))}
                </span>
                <button className="btn btn-primary btn-sm" onClick={handleStartTrading}>
                  New Trade
                </button>
              </div>
            </div>

            <div className="table-wrapper">
              <table className="holdings-table">
                <thead>
                  <tr>
                    <th>Stock</th>
                    <th>Quantity</th>
                    <th>Avg Price</th>
                    <th>Current Price</th>
                    <th>Total Value</th>
                    <th>P&L</th>
                    <th>P&L %</th>
                  </tr>
                </thead>
                <tbody>
                  {holdings.map((holding) => (
                    <tr key={holding.symbol} className="holding-row">
                      <td className="stock-cell">
                        <div className="stock-info">
                          <div className="stock-symbol">{holding.symbol}</div>
                          <div className="stock-name">{holding.companyName || 'N/A'}</div>
                        </div>
                      </td>
                      <td className="quantity-cell">
                        {holding.quantity.toLocaleString()}
                      </td>
                      <td className="price-cell">
                        {formatCurrency(holding.avgPrice)}
                      </td>
                      <td className="price-cell">
                        {formatCurrency(holding.currentPrice)}
                      </td>
                      <td className="value-cell">
                        {formatCurrency(holding.totalValue)}
                      </td>
                      <td className={`pnl-cell ${holding.pnl >= 0 ? 'positive' : 'negative'}`}>
                        <div className="pnl-content">
                          {holding.pnl >= 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                          <span>{formatCurrency(holding.pnl)}</span>
                        </div>
                      </td>
                      <td className={`pnl-percent-cell ${holding.pnlPercentage >= 0 ? 'positive' : 'negative'}`}>
                        {formatPercentage(holding.pnlPercentage)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="no-holdings glass-card">
          <div className="no-holdings-content">
            <div className="no-holdings-icon">
              <TrendingUp size={48} />
            </div>
            <h3 className="no-holdings-title">No Holdings Yet</h3>
            <p className="no-holdings-description">
              You haven't purchased any stocks yet. Start building your portfolio by buying your first stock!
            </p>
            <button className="btn btn-primary" onClick={handleStartTrading}>
              Start Trading
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Holdings;
