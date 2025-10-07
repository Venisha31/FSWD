import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Holdings from './pages/Holdings';
import Transactions from './pages/Transactions';
import Watchlist from './pages/Watchlist';
import Analytics from './pages/Analytics';
import Trading from './pages/Trading';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import './App.css';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

// Public Route Component (redirect if already logged in)
const PublicRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? <Navigate to="/dashboard" /> : children;
};

function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <AuthProvider>
        <Router>
          <div className="App">
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              } />
              <Route path="/signup" element={
                <PublicRoute>
                  <Signup />
                </PublicRoute>
              } />
              
              {/* Protected Routes */}
              <Route path="/" element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }>
                <Route index element={<Navigate to="/dashboard" />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="holdings" element={<Holdings />} />
                <Route path="transactions" element={<Transactions />} />
                <Route path="watchlist" element={<Watchlist />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="trading" element={<Trading />} />
              </Route>
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </SnackbarProvider>
  );
}

export default App;
