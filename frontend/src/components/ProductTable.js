
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProductTable = ({ category }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            if (!category) return;

            setLoading(true);
            setError('');

            try {
                const res = await axios.get(`https://sports-7-ypvt.onrender.com/api/products?category=${category}`);
                setProducts(res.data);
            } catch (err) {
                console.error('Failed to fetch products:', err);
                setError('Failed to load products. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [category]);

    return (
        <div>
            <h2>{category} Products</h2>

            {loading && <p>Loading products...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px', marginTop: '20px' }}>
                {!loading && !error && products.length > 0 ? (
                    products.map((product) => (
                        <div key={product._id} style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '8px', textAlign: 'center' }}>
                            <img src={product.image} alt={product.name} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px' }} />
                            <h3>{product.name}</h3>
                            <p><strong>Brand:</strong> {product.brand}</p>
                            <p><strong>Price:</strong> ₹{product.price?.toFixed(2)}</p>
                            <p><strong>Rating:</strong> ⭐ {product.rating}/5</p>
                            <p><strong>Stock:</strong> {product.stockQuantity} units</p>
                            <button onClick={() => navigate(`/brand-details/${product._id}`)} style={{ marginTop: '10px', padding: '5px 10px', cursor: 'pointer' }}>
                                View Details
                            </button>
                        </div>
                    ))
                ) : (
                    !loading && <p>No products found for {category}.</p>
                )}
            </div>
        </div>
    );
};

export default ProductTable;
