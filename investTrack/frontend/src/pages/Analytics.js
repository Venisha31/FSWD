import React, { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { PieChart, BarChart3, TrendingUp, DollarSign } from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from 'recharts';
import axios from 'axios';
import './Analytics.css';

const Analytics = () => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('1M');
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    fetchAnalyticsData();
  }, [timeRange]);

  const fetchAnalyticsData = async () => {
    try {
      const response = await axios.get(`/portfolio/analytics?range=${timeRange}`);
      setAnalyticsData(response.data);
    } catch (error) {
      console.error('Error fetching analytics data:', error);
      enqueueSnackbar('Failed to load analytics data', { variant: 'error' });
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
      <div className="analytics-loading">
        <div className="loading-spinner"></div>
        <p>Loading analytics...</p>
      </div>
    );
  }

  // Mock data - replace with real data from API
  const portfolioHistory = [
    { date: 'Jan 1', value: 100000 },
    { date: 'Jan 8', value: 105000 },
    { date: 'Jan 15', value: 98000 },
    { date: 'Jan 22', value: 112000 },
    { date: 'Jan 29', value: 108000 },
    { date: 'Feb 5', value: 115000 },
    { date: 'Feb 12', value: 118000 },
    { date: 'Feb 19', value: 122000 },
  ];

  const allocationData = [
    { name: 'Technology', value: 40, color: '#3b82f6' },
    { name: 'Healthcare', value: 25, color: '#10b981' },
    { name: 'Finance', value: 20, color: '#f59e0b' },
    { name: 'Consumer', value: 15, color: '#ef4444' },
  ];

  const performanceData = [
    { month: 'Jan', return: 5.2 },
    { month: 'Feb', return: 3.8 },
    { month: 'Mar', return: -2.1 },
    { month: 'Apr', return: 7.5 },
    { month: 'May', return: 4.2 },
    { month: 'Jun', return: 6.1 },
  ];

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

  return (
    <div className="analytics">
      <div className="analytics-header">
        <div className="header-content">
          <h1 className="analytics-title">Portfolio Analytics</h1>
          <p className="analytics-subtitle">Deep insights into your investment performance</p>
        </div>
        <div className="time-range-selector">
          <select 
            value={timeRange} 
            onChange={(e) => setTimeRange(e.target.value)}
            className="input"
          >
            <option value="1W">1 Week</option>
            <option value="1M">1 Month</option>
            <option value="3M">3 Months</option>
            <option value="6M">6 Months</option>
            <option value="1Y">1 Year</option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="metrics-grid">
        <div className="metric-card glass-card">
          <div className="metric-icon">
            <TrendingUp size={24} />
          </div>
          <div className="metric-content">
            <h3 className="metric-label">Total Return</h3>
            <p className="metric-value">+15.8%</p>
            <p className="metric-description">+₹18,000</p>
          </div>
        </div>

        <div className="metric-card glass-card">
          <div className="metric-icon">
            <DollarSign size={24} />
          </div>
          <div className="metric-content">
            <h3 className="metric-label">Portfolio Value</h3>
            <p className="metric-value">{formatCurrency(118000)}</p>
            <p className="metric-description">Current total value</p>
          </div>
        </div>

        <div className="metric-card glass-card">
          <div className="metric-icon">
            <BarChart3 size={24} />
          </div>
          <div className="metric-content">
            <h3 className="metric-label">Volatility</h3>
            <p className="metric-value">12.4%</p>
            <p className="metric-description">Annualized volatility</p>
          </div>
        </div>

        <div className="metric-card glass-card">
          <div className="metric-icon">
            <PieChart size={24} />
          </div>
          <div className="metric-content">
            <h3 className="metric-label">Sharpe Ratio</h3>
            <p className="metric-value">1.24</p>
            <p className="metric-description">Risk-adjusted return</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-section">
        {/* Portfolio Value Chart */}
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
              <LineChart data={portfolioHistory}>
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

        {/* Asset Allocation Chart */}
        <div className="chart-card glass-card">
          <div className="chart-header">
            <h2 className="chart-title">Asset Allocation</h2>
            <p className="chart-subtitle">Portfolio breakdown by sector</p>
          </div>
          
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={allocationData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {allocationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Allocation']}
                  labelStyle={{ color: 'var(--text-primary)' }}
                  contentStyle={{
                    backgroundColor: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                  }}
                />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Returns Chart */}
        <div className="chart-card glass-card">
          <div className="chart-header">
            <h2 className="chart-title">Monthly Returns</h2>
            <p className="chart-subtitle">Performance by month</p>
          </div>
          
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                <XAxis 
                  dataKey="month" 
                  stroke="var(--text-secondary)"
                  fontSize={12}
                />
                <YAxis 
                  stroke="var(--text-secondary)"
                  fontSize={12}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Return']}
                  labelStyle={{ color: 'var(--text-primary)' }}
                  contentStyle={{
                    backgroundColor: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                  }}
                />
                <Bar 
                  dataKey="return" 
                  fill="var(--primary-color)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Performance Summary */}
      <div className="performance-summary glass-card">
        <h2 className="summary-title">Performance Summary</h2>
        <div className="summary-grid">
          <div className="summary-item">
            <h4>Best Performing Stock</h4>
            <p className="summary-value">AAPL</p>
            <p className="summary-change positive">+23.4%</p>
          </div>
          <div className="summary-item">
            <h4>Worst Performing Stock</h4>
            <p className="summary-value">TSLA</p>
            <p className="summary-change negative">-8.7%</p>
          </div>
          <div className="summary-item">
            <h4>Most Traded</h4>
            <p className="summary-value">GOOGL</p>
            <p className="summary-description">15 transactions</p>
          </div>
          <div className="summary-item">
            <h4>Portfolio Beta</h4>
            <p className="summary-value">1.12</p>
            <p className="summary-description">Slightly volatile</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
