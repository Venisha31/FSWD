import React, { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { useAuth } from '../hooks/useAuth';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  PieChart,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchPortfolioData();
    }
  }, [user]);

  const fetchPortfolioData = async () => {
    try {
      const response = await axios.get(`/api/portfolio/${user._id}`);
      setPortfolioData(response.data);
    } catch (error) {
      console.error('Error fetching portfolio data:', error);
      enqueueSnackbar('Failed to load portfolio data', { variant: 'error' });
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

  const formatPercentage = (value) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading portfolio data...</p>
      </div>
    );
  }

  // Mock data for chart - replace with real data from API
  const chartData = [
    { date: 'Jan', value: 100000 },
    { date: 'Feb', value: 105000 },
    { date: 'Mar', value: 98000 },
    { date: 'Apr', value: 112000 },
    { date: 'May', value: 108000 },
    { date: 'Jun', value: 115000 },
  ];

  const totalValue = portfolioData?.totalValue || 100000;
  const totalInvested = portfolioData?.totalInvested || 95000;
  const totalPnL = totalValue - totalInvested;
  const pnlPercentage = totalInvested > 0 ? (totalPnL / totalInvested) * 100 : 0;

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Portfolio Overview</h1>
        <p className="dashboard-subtitle">Track your investments and performance</p>
      </div>

      {/* Key Metrics Cards */}
      <div className="metrics-grid">
        <div className="metric-card glass-card">
          <div className="metric-icon">
            <DollarSign size={24} />
          </div>
          <div className="metric-content">
            <h3 className="metric-label">Total Portfolio Value</h3>
            <p className="metric-value">{formatCurrency(totalValue)}</p>
            <div className={`metric-change ${pnlPercentage >= 0 ? 'positive' : 'negative'}`}>
              {pnlPercentage >= 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
              <span>{formatPercentage(pnlPercentage)}</span>
            </div>
          </div>
        </div>

        <div className="metric-card glass-card">
          <div className="metric-icon">
            <PieChart size={24} />
          </div>
          <div className="metric-content">
            <h3 className="metric-label">Total Invested</h3>
            <p className="metric-value">{formatCurrency(totalInvested)}</p>
            <p className="metric-description">Amount invested in stocks</p>
          </div>
        </div>

        <div className="metric-card glass-card">
          <div className="metric-icon">
            <TrendingUp size={24} />
          </div>
          <div className="metric-content">
            <h3 className="metric-label">Total P&L</h3>
            <p className={`metric-value ${totalPnL >= 0 ? 'positive' : 'negative'}`}>
              {formatCurrency(totalPnL)}
            </p>
            <div className={`metric-change ${totalPnL >= 0 ? 'positive' : 'negative'}`}>
              {totalPnL >= 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
              <span>{formatPercentage(pnlPercentage)}</span>
            </div>
          </div>
        </div>

        <div className="metric-card glass-card">
          <div className="metric-icon">
            <TrendingDown size={24} />
          </div>
          <div className="metric-content">
            <h3 className="metric-label">Available Cash</h3>
            <p className="metric-value">{formatCurrency(portfolioData?.cash || 5000)}</p>
            <p className="metric-description">Ready to invest</p>
          </div>
        </div>
      </div>

      {/* Portfolio Chart */}
      <div className="chart-section">
        <div className="chart-card glass-card">
          <div className="chart-header">
            <h2 className="chart-title">Portfolio Value Over Time</h2>
            <div className="chart-legend">
              <div className="legend-item">
                <div className="legend-color portfolio"></div>
                <span>Portfolio Value</span>
              </div>
            </div>
          </div>
          
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                <XAxis 
                  dataKey="date" 
                  stroke="var(--text-secondary)"
                  fontSize={12}
                />
                <YAxis 
                  stroke="var(--text-secondary)"
                  fontSize={12}
                  tickFormatter={(value) => formatCurrency(value)}
                />
                <Tooltip 
                  formatter={(value) => [formatCurrency(value), 'Portfolio Value']}
                  labelStyle={{ color: 'var(--text-primary)' }}
                  contentStyle={{
                    backgroundColor: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="var(--primary-color)" 
                  strokeWidth={3}
                  dot={{ fill: 'var(--primary-color)', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: 'var(--primary-color)', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="activity-section">
        <div className="activity-card glass-card">
          <h2 className="activity-title">Recent Activity</h2>
          <div className="activity-list">
            {portfolioData?.recentTransactions?.length > 0 ? (
              portfolioData.recentTransactions.map((transaction, index) => (
                <div key={index} className="activity-item">
                  <div className="activity-icon">
                    {transaction.type === 'BUY' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                  </div>
                  <div className="activity-content">
                    <p className="activity-text">
                      {transaction.type === 'BUY' ? 'Bought' : 'Sold'} {transaction.quantity} shares of {transaction.symbol}
                    </p>
                    <p className="activity-time">{new Date(transaction.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="activity-amount">
                    {formatCurrency(transaction.total)}
                  </div>
                </div>
              ))
            ) : (
              <div className="no-activity">
                <p>No recent transactions</p>
                <p className="text-muted">Start trading to see your activity here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
