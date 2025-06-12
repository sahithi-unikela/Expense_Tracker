import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ExpenseList from '../expenses/ExpenseList';
import ExpenseChart from './ExpenseChart';
import ExpenseFilter from './ExpenseFilter';
import ExportButton from './ExportButton';

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await axios.get('/api/expenses');
        setExpenses(res.data);
        setFilteredExpenses(res.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch expenses');
        setLoading(false);
      }
    };
    
    fetchExpenses();
  }, []);
  
  const deleteExpense = async (id) => {
    try {
      await axios.delete(`/api/expenses/${id}`);
      const updatedExpenses = expenses.filter(expense => expense._id !== id);
      setExpenses(updatedExpenses);
      setFilteredExpenses(updatedExpenses);
    } catch (err) {
      setError('Failed to delete expense');
    }
  };
  
  const handleFilter = (filters) => {
    let filtered = [...expenses];
    
    if (filters.startDate) {
      filtered = filtered.filter(expense => 
        new Date(expense.date) >= new Date(filters.startDate)
      );
    }
    
    if (filters.endDate) {
      filtered = filtered.filter(expense => 
        new Date(expense.date) <= new Date(filters.endDate)
      );
    }
    
    if (filters.category) {
      filtered = filtered.filter(expense => 
        expense.category === filters.category
      );
    }
    
    if (filters.minAmount) {
      filtered = filtered.filter(expense => 
        expense.amount >= parseFloat(filters.minAmount)
      );
    }
    
    if (filters.maxAmount) {
      filtered = filtered.filter(expense => 
        expense.amount <= parseFloat(filters.maxAmount)
      );
    }
    
    setFilteredExpenses(filtered);
  };
  
  if (loading) return <div>Loading...</div>;
  
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Your Expenses</h2>
        <div className="dashboard-actions">
          <Link to="/add-expense" className="btn btn-primary">
            Add New Expense
          </Link>
          {expenses.length > 0 && <ExportButton expenses={filteredExpenses} />}
        </div>
      </div>
      
      {error && <div className="alert alert-danger">{error}</div>}
      
      {expenses.length === 0 ? (
        <p>No expenses found. Add your first expense!</p>
      ) : (
        <>
          <ExpenseFilter onFilter={handleFilter} />
          <ExpenseChart expenses={filteredExpenses} />
          <ExpenseList expenses={filteredExpenses} onDelete={deleteExpense} />
        </>
      )}
      
      <div className="dashboard-footer">
        <Link to="/history" className="btn btn-secondary">
          View History Log
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
