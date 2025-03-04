import React from 'react';
import './CategoryList.css'; // Import CSS for styling

const categories = ['Shoes', 'T-Shirts', 'Joggers', 'Watches', 'Sports Helmets'];

const CategoryList = ({ onSelect }) => {
    return (
        <div className="category-list">
            <h2>Sports Categories</h2>
            <div className="categories">
                {categories.map((category) => (
                    <button
                        key={category}
                        className="category-button"
                        onClick={() => onSelect(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CategoryList;