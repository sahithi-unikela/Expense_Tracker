import React from 'react';
import { Link } from 'react-router-dom';

const ExpenseList = ({ expenses, onDelete }) => {
  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  
  return (
    <div className="expense-list">
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map(expense => (
            <tr key={expense._id}>
              <td>{formatDate(expense.date)}</td>
              <td>{expense.category}</td>
              <td>{expense.description}</td>
              <td>${expense.amount.toFixed(2)}</td>
              <td>
                <Link to={`/edit-expense/${expense._id}`} className="btn btn-sm btn-edit">
                  Edit
                </Link>
                <button
                  onClick={() => onDelete(expense._id)}
                  className="btn btn-sm btn-delete"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseList;
