import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/routing/PrivateRoute';
import Navbar from './components/layout/Navbar';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import ExpenseForm from './components/expenses/ExpenseForm';
import ExpenseHistory from './components/history/ExpenseHistory';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } />
            <Route path="/add-expense" element={
              <PrivateRoute>
                <ExpenseForm />
              </PrivateRoute>
            } />
            <Route path="/edit-expense/:id" element={
              <PrivateRoute>
                <ExpenseForm />
              </PrivateRoute>
            } />
            <Route path="/history" element={
              <PrivateRoute>
                <ExpenseHistory />
              </PrivateRoute>
            } />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
