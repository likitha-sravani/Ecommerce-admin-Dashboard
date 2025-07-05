import React, { useState, useEffect } from 'react';
import { api } from '../api';
import './Dashboard.css';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dateRange, setDateRange] = useState(30);

  useEffect(() => {
    fetchDashboardData();
  }, [dateRange]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await api.get(`/dashboard/stats/?days=${dateRange}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDashboardData(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load dashboard data');
      console.error('Dashboard error:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getStatusColor = (status) => {
    const colors = {
      'pending': '#ffa000',
      'processing': '#1976d2',
      'completed': '#43a047',
      'cancelled': '#e53935'
    };
    return colors[status] || '#666';
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading">Loading dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-container">
        <div className="error">{error}</div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="dashboard-container">
        <div className="error">No data available</div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <div className="date-range-selector">
          <label>Date Range: </label>
          <select 
            value={dateRange} 
            onChange={(e) => setDateRange(parseInt(e.target.value))}
          >
            <option value={7}>Last 7 days</option>
            <option value={30}>Last 30 days</option>
            <option value={90}>Last 90 days</option>
            <option value={365}>Last year</option>
          </select>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="metrics-grid">
        <div className="metric-card revenue">
          <div className="metric-icon">💰</div>
          <div className="metric-content">
            <h3>Total Revenue</h3>
            <p className="metric-value">{formatCurrency(dashboardData.total_revenue)}</p>
            <p className="metric-label">Last {dateRange} days</p>
          </div>
        </div>

        <div className="metric-card orders">
          <div className="metric-icon">📦</div>
          <div className="metric-content">
            <h3>Total Orders</h3>
            <p className="metric-value">{dashboardData.total_orders}</p>
            <p className="metric-label">Last {dateRange} days</p>
          </div>
        </div>

        <div className="metric-card customers">
          <div className="metric-icon">👥</div>
          <div className="metric-content">
            <h3>Total Customers</h3>
            <p className="metric-value">{dashboardData.total_customers}</p>
            <p className="metric-label">Last {dateRange} days</p>
          </div>
        </div>

        <div className="metric-card products">
          <div className="metric-icon">🛍️</div>
          <div className="metric-content">
            <h3>Total Products</h3>
            <p className="metric-value">{dashboardData.total_products}</p>
            <p className="metric-label">In inventory</p>
          </div>
        </div>

        <div className="metric-card avg-order">
          <div className="metric-icon">📊</div>
          <div className="metric-content">
            <h3>Avg Order Value</h3>
            <p className="metric-value">{formatCurrency(dashboardData.avg_order_value)}</p>
            <p className="metric-label">Per order</p>
          </div>
        </div>
      </div>

      {/* Charts and Analytics */}
      <div className="charts-grid">
        {/* Revenue Chart */}
        <div className="chart-card">
          <h3>Daily Revenue (Last 7 Days)</h3>
          <div className="revenue-chart">
            {dashboardData.daily_revenue.map((day, index) => (
              <div key={index} className="chart-bar">
                <div 
                  className="bar" 
                  style={{ 
                    height: `${Math.max((day.revenue / Math.max(...dashboardData.daily_revenue.map(d => d.revenue))) * 100, 5)}%` 
                  }}
                ></div>
                <span className="bar-label">{formatCurrency(day.revenue)}</span>
                <span className="bar-date">{new Date(day.date).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Orders by Status */}
        <div className="chart-card">
          <h3>Orders by Status</h3>
          <div className="status-chart">
            {dashboardData.orders_by_status.map((status, index) => (
              <div key={index} className="status-item">
                <div className="status-bar">
                  <div 
                    className="status-fill"
                    style={{ 
                      width: `${(status.count / Math.max(...dashboardData.orders_by_status.map(s => s.count))) * 100}%`,
                      backgroundColor: getStatusColor(status.status)
                    }}
                  ></div>
                </div>
                <div className="status-info">
                  <span className="status-name">{status.status}</span>
                  <span className="status-count">{status.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Products */}
      <div className="top-products-section">
        <h3>Top Selling Products</h3>
        <div className="top-products-grid">
          {dashboardData.top_products.map((product, index) => (
            <div key={index} className="top-product-card">
              <div className="product-rank">#{index + 1}</div>
              <div className="product-info">
                <h4>{product.product__name}</h4>
                <p>Quantity: {product.total_quantity}</p>
                <p>Revenue: {formatCurrency(product.total_revenue)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Date Range Info */}
      <div className="date-info">
        <p>Data from {dashboardData.date_range.start} to {dashboardData.date_range.end}</p>
      </div>
    </div>
  );
};

export default Dashboard; 