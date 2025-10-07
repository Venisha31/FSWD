import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  List, 
  Eye, 
  Settings,
  X,
  DollarSign
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './Sidebar.css';

const Sidebar = ({ isOpen, onClose }) => {
  const { user } = useAuth();

  const navItems = [
    {
      path: '/dashboard',
      icon: BarChart3,
      label: 'Dashboard'
    },
    {
      path: '/holdings',
      icon: PieChart,
      label: 'Holdings'
    },
    {
      path: '/trading',
      icon: DollarSign,
      label: 'Trading'
    },
    {
      path: '/transactions',
      icon: List,
      label: 'Transactions'
    },
    {
      path: '/watchlist',
      icon: Eye,
      label: 'Watchlist'
    },
    {
      path: '/analytics',
      icon: TrendingUp,
      label: 'Analytics'
    }
  ];

  return (
    <>
      <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-brand">
            <div className="brand-logo">
              <TrendingUp size={24} />
            </div>
            <h2 className="brand-text">InvestTrack</h2>
          </div>
          <button className="sidebar-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="sidebar-user">
          <div className="user-avatar">
            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <div className="user-info">
            <p className="user-name">{user?.name || 'User'}</p>
            <p className="user-email">{user?.email}</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          <ul className="nav-list">
            {navItems.map((item) => (
              <li key={item.path} className="nav-item">
                <NavLink
                  to={item.path}
                  className={({ isActive }) => 
                    `nav-link ${isActive ? 'nav-link-active' : ''}`
                  }
                  onClick={onClose}
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <NavLink to="/settings" className="nav-link" onClick={onClose}>
            <Settings size={20} />
            <span>Settings</span>
          </NavLink>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
