import React from 'react';

const FILTER_OPTIONS = ['All', 'Food', 'Travel', 'Shopping', 'Bills', 'Other'];

function ExpenseFilter({ selectedCategory, onCategoryChange }) {
  return (
    <div className="filter-bar">
      <label htmlFor="category-filter">Filter by Category:</label>
      <select id="category-filter" value={selectedCategory} onChange={(e) => onCategoryChange(e.target.value)}>
        {FILTER_OPTIONS.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    </div>
  );
}

export default ExpenseFilter;