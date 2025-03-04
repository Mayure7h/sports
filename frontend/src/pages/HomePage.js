import React, { useState } from 'react';
import CategoryList from '../components/CategoryList';
import ProductTable from '../components/ProductTable';
import BrandDetail from '../components/BrandDetail';
import './HomePage.css';

const HomePage = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedBrand, setSelectedBrand] = useState(null);

    return (
        <div className="home-page">
            {/* Navbar */}
            <nav className="navbar">
                <div className="navbar-logo">🏀 Sport Odyssey</div>
                <ul className="navbar-links">
                    <li><a href="/">Home</a></li>
                </ul>
            </nav>

            {/* Welcome Section */}
            <div className="welcome-section">
                <p className="welcome-text">WELCOME TO THE</p>
                <h1>🏀 Sport Odyssey 🏀</h1>
                <p className="subtitle">Your one-stop destination for all things sports!</p>
            </div>

            {/* Main Content */}
            <div className="content">
                {!selectedBrand ? (
                    <>
                        <CategoryList
                            onSelect={(category) => {
                                setSelectedCategory(category);
                                setSelectedBrand(null); // Reset brand when category changes
                            }}
                        />
                        {selectedCategory && (
                            <ProductTable
                                category={selectedCategory}
                                onBrandSelect={setSelectedBrand}
                            />
                        )}
                    </>
                ) : (
                    <>
                        <button className="back-button" onClick={() => setSelectedBrand(null)}>
                            ← Back to Products
                        </button>
                        <BrandDetail brand={selectedBrand} />
                    </>
                )}
            </div>
        </div>
    );
};

export default HomePage;