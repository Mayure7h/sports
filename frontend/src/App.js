import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BrandDetail from './components/BrandDetail';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/brand-details/:productId" element={<BrandDetail />} />
            </Routes>
        </Router>
    );
}

export default App;
