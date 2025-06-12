import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const ExpenseForm = () => {
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    date: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;
  
  useEffect(() => {
    if (isEditing) {
      const fetchExpense = async () => {
        try {
          const res = await axios.get(`/api/expenses/${id}`);
          const { amount, category, description } = res.data;
          
          // Format date for input field (YYYY-MM-DD)
          const date = new Date(res.data.date);
          const formattedDate = date.toISOString().split('T')[0];
          
          setFormData({
            amount,
            category,
            date: formattedDate,
            description
          });
        } catch (err) {
          setError('Failed to fetch expense details');
        }
      };
      
      fetchExpense();
    }
  }, [id, isEditing]);
  
  const { amount, category, date, description } = formData;
  
  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const onSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const expenseData = {
        amount: parseFloat(amount),
        category,
        date,
        description
      };
      
      if (isEditing) {
        await axios.put(`/api/expenses/${id}`, expenseData);
      } else {
        await axios.post('/api/expenses', expenseData);
      }
      
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save expense');
      setLoading(false);
    }
  };
  
  return (
    <div className="expense-form-container">
      <h2>{isEditing ? 'Edit Expense' : 'Add New Expense'}</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Amount ($)</label>
          <input
            type="number"
            name="amount"
            value={amount}
            onChange={onChange}
            step="0.01"
            min="0.01"
            required
          />
        </div>
        
        <div className="form-group">
          <label>Category</label>
          <select
            name="category"
            value={category}
            onChange={onChange}
            required
          >
            <option value="">Select a category</option>
            <option value="Food">Food</option>
            <option value="Transportation">Transportation</option>
            <option value="Housing">Housing</option>
            <option value="Utilities">Utilities</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Shopping">Shopping</option>
            <option value="Other">Other</option>
          </select>
        </div>
        
        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            name="date"
            value={date}
            onChange={onChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={description}
            onChange={onChange}
            required
          ></textarea>
        </div>
        
        <div className="form-buttons">
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="btn btn-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Saving...' : (isEditing ? 'Update Expense' : 'Add Expense')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExpenseForm;
