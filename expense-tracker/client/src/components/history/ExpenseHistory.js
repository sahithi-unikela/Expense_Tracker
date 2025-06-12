import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ExpenseHistory = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get('/api/history');
        setLogs(res.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch history logs');
        setLoading(false);
      }
    };
    
    fetchHistory();
  }, []);
  
  // Format date and time
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };
  
  // Get action color class
  const getActionClass = (actionType) => {
    switch (actionType) {
      case 'Created':
        return 'action-created';
      case 'Updated':
        return 'action-updated';
      case 'Deleted':
        return 'action-deleted';
      default:
        return '';
    }
  };
  
  if (loading) return <div>Loading...</div>;
  
  return (
    <div className="history-container">
      <div className="history-header">
        <h2>Expense History Log</h2>
        <Link to="/dashboard" className="btn btn-secondary">
          Back to Dashboard
        </Link>
      </div>
      
      {error && <div className="alert alert-danger">{error}</div>}
      
      {logs.length === 0 ? (
        <p>No history logs found.</p>
      ) : (
        <div className="history-list">
          {logs.map(log => (
            <div key={log._id} className={`history-item ${getActionClass(log.actionType)}`}>
              <div className="history-item-header">
                <span className="action-badge">{log.actionType}</span>
                <span className="timestamp">{formatDateTime(log.timestamp)}</span>
              </div>
              
              <div className="history-item-content">
                {log.actionType === 'Created' && (
                  <div className="history-details">
                    <p><strong>Added expense:</strong> {log.newData.description}</p>
                    <p><strong>Amount:</strong> ${log.newData.amount.toFixed(2)}</p>
                    <p><strong>Category:</strong> {log.newData.category}</p>
                    <p><strong>Date:</strong> {formatDateTime(log.newData.date)}</p>
                  </div>
                )}
                
                {log.actionType === 'Updated' && (
                  <div className="history-details">
                    <p><strong>Updated expense:</strong> {log.newData.description}</p>
                    <div className="changes">
                      {log.oldData.amount !== log.newData.amount && (
                        <p><strong>Amount:</strong> ${log.oldData.amount.toFixed(2)} → ${log.newData.amount.toFixed(2)}</p>
                      )}
                      {log.oldData.category !== log.newData.category && (
                        <p><strong>Category:</strong> {log.oldData.category} → {log.newData.category}</p>
                      )}
                      {log.oldData.date !== log.newData.date && (
                        <p><strong>Date:</strong> {formatDateTime(log.oldData.date)} → {formatDateTime(log.newData.date)}</p>
                      )}
                      {log.oldData.description !== log.newData.description && (
                        <p><strong>Description:</strong> "{log.oldData.description}" → "{log.newData.description}"</p>
                      )}
                    </div>
                  </div>
                )}
                
                {log.actionType === 'Deleted' && (
                  <div className="history-details">
                    <p><strong>Deleted expense:</strong> {log.oldData.description}</p>
                    <p><strong>Amount:</strong> ${log.oldData.amount.toFixed(2)}</p>
                    <p><strong>Category:</strong> {log.oldData.category}</p>
                    <p><strong>Date:</strong> {formatDateTime(log.oldData.date)}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExpenseHistory;
