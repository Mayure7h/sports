const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db.js');
const productRoutes = require('./routes/productRoutes.js');
const salesRoutes = require('./routes/salesRoutes.js');
const purchaseRoutes = require('./routes/purchaseRoutes.js');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
connectDB();

// Routes
app.use('/api/products', productRoutes);
app.use('/api/sales', salesRoutes);
app.use('/api/purchases', purchaseRoutes);

app.get('/', (req, res) => res.send('🏃‍♂ Sports Store API Running!'));

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
