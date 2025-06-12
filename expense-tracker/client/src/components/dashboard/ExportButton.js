import React from 'react';

const ExportButton = ({ expenses }) => {
  const exportToCSV = () => {
    // Format data for CSV
    const headers = ['Date', 'Category', 'Description', 'Amount'];
    
    const csvData = expenses.map(expense => {
      const date = new Date(expense.date).toLocaleDateString();
      return `${date},"${expense.category}","${expense.description}",${expense.amount}`;
    });
    
    // Create CSV content
    const csvContent = [
      headers.join(','),
      ...csvData
    ].join('\n');
    
    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    // Create temporary link and trigger download
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `expenses_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <button onClick={exportToCSV} className="btn btn-secondary">
      Export to CSV
    </button>
  );
};

export default ExportButton;
