import React, { useState } from 'react';

const ExpenseFilter = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    category: '',
    minAmount: '',
    maxAmount: ''
  });
  
  const onChange = e => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };
  
  const onSubmit = e => {
    e.preventDefault();
    onFilter(filters);
  };
  
  const onReset = () => {
    setFilters({
      startDate: '',
      endDate: '',
      category: '',
      minAmount: '',
      maxAmount: ''
    });
    onFilter({});
  };
  
  return (
    <div className="filter-container">
      <h3>Filter Expenses</h3>
      <form onSubmit={onSubmit}>
        <div className="filter-grid">
          <div className="form-group">
            <label>Start Date</label>
            <input
              type="date"
              name="startDate"
              value={filters.startDate}
              onChange={onChange}
            />
          </div>
          
          <div className="form-group">
            <label>End Date</label>
            <input
              type="date"
              name="endDate"
              value={filters.endDate}
              onChange={onChange}
            />
          </div>
          
          <div className="form-group">
            <label>Category</label>
            <select
              name="category"
              value={filters.category}
              onChange={onChange}
            >
              <option value="">All Categories</option>
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
            <label>Min Amount ($)</label>
            <input
              type="number"
              name="minAmount"
              value={filters.minAmount}
              onChange={onChange}
              min="0"
              step="0.01"
            />
          </div>
          
          <div className="form-group">
            <label>Max Amount ($)</label>
            <input
              type="number"
              name="maxAmount"
              value={filters.maxAmount}
              onChange={onChange}
              min="0"
              step="0.01"
            />
          </div>
        </div>
        
        <div className="filter-buttons">
          <button type="button" onClick={onReset} className="btn btn-secondary">
            Reset
          </button>
          <button type="submit" className="btn btn-primary">
            Apply Filters
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExpenseFilter;
