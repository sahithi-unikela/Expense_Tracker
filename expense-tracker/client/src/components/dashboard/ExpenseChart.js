import React from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const ExpenseChart = ({ expenses }) => {
  // Process data for category distribution
  const categoryData = () => {
    const categories = {};
    
    expenses.forEach(expense => {
      if (categories[expense.category]) {
        categories[expense.category] += expense.amount;
      } else {
        categories[expense.category] = expense.amount;
      }
    });
    
    return {
      labels: Object.keys(categories),
      datasets: [
        {
          data: Object.values(categories),
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF',
            '#FF9F40',
            '#8AC249',
            '#EA526F'
          ]
        }
      ]
    };
  };
  
  // Process data for monthly spending
  const monthlyData = () => {
    const months = {};
    
    expenses.forEach(expense => {
      const date = new Date(expense.date);
      const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;
      
      if (months[monthYear]) {
        months[monthYear] += expense.amount;
      } else {
        months[monthYear] = expense.amount;
      }
    });
    
    return {
      labels: Object.keys(months),
      datasets: [
        {
          label: 'Monthly Spending',
          data: Object.values(months),
          backgroundColor: '#36A2EB'
        }
      ]
    };
  };
  
  if (expenses.length === 0) {
    return <div>No data to display</div>;
  }
  
  return (
    <div className="charts-container">
      <div className="chart-item">
        <h3>Spending by Category</h3>
        <div className="chart-wrapper">
          <Pie data={categoryData()} />
        </div>
      </div>
      
      <div className="chart-item">
        <h3>Monthly Spending</h3>
        <div className="chart-wrapper">
          <Bar 
            data={monthlyData()} 
            options={{
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ExpenseChart;
