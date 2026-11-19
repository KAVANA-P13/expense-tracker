import React from 'react';

function TotalSummary({ expenses, selectedCategory }) {
  const totalAmount = expenses.reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const formattedTotal = new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(totalAmount);

  return (
    <section className="summary-banner" aria-label="Total Expense Summary">
      <div className="summary-left">
        <span className="summary-label">
          Total Spent {selectedCategory !== 'All' ? `(${selectedCategory})` : '(All Categories)'}
        </span>
        <h2 className="summary-amount">₹{formattedTotal}</h2>
      </div>
      <div className="summary-right">
        <span className="summary-count">
          {expenses.length} {expenses.length === 1 ? 'expense' : 'expenses'}
        </span>
      </div>
    </section>
  );
}

export default TotalSummary;