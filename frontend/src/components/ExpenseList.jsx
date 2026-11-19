import React from 'react';

const formatDisplayDate = (dateString) => {
  if (!dateString) return '-';
  return new Date(dateString).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

const formatCurrency = (amount) =>
  new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(Number(amount || 0));

function ExpenseList({ expenses, onEdit, onDelete, loading }) {
  if (loading) return <p className="status-text">Loading expenses...</p>;
  if (!expenses.length) {
    return <div className="empty-state"><p>No expenses found. Add your first expense above to get started.</p></div>;
  }

  return (
    <div className="table-wrapper">
      <table className="expense-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Date</th>
            <th className="text-right">Amount</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense._id}>
              <td className="expense-title">{expense.title}</td>
              <td><span className={`badge badge-${expense.category.toLowerCase()}`}>{expense.category}</span></td>
              <td>{formatDisplayDate(expense.date)}</td>
              <td className="text-right expense-amount">₹{formatCurrency(expense.amount)}</td>
              <td className="text-center actions-cell">
                <button type="button" className="btn btn-sm btn-edit" onClick={() => onEdit(expense)}>Edit</button>
                <button type="button" className="btn btn-sm btn-delete" onClick={() => onDelete(expense._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExpenseList;