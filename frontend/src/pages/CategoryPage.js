// src/pages/CategoryPage.js
import React from 'react';
import ProductTable from '../components/ProductTable';

const CategoryPage = ({ category, onBack }) => {
  return (
    <div>
      <button onClick={onBack}>← Back to Categories</button>
      <h2>{category} Products</h2>
      <ProductTable category={category} />
    </div>
  );
};

export default CategoryPage;