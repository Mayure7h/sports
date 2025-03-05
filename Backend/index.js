// // const express = require('express');
// import express from 'express';
// import cors from 'cors';
// import connectDB from './config/db.js';
// import productRoutes from './routes/productRoutes.js';
// import salesRoutes from './routes/salesRoutes.js';
// import purchaseRoutes from './routes/purchaseRoutes.js';

// import path from 'path';


// const app = express();
// const PORT = 5000;

// // Middleware
// app.use(cors(corsOptions));
// app.use(express.json());


// // Database connection
// connectDB();

// const _dirname = path.resolve();


// // Routes
// app.use('/api/products', productRoutes);
// app.use('/api/sales', salesRoutes);
// app.use('/api/purchases', purchaseRoutes);
// // app.get('/', (req, res) => res.send('🏃‍♂ Sports Store API Running!'));

// app.use(express.static(path.join(_dirname , "/frontend/build")));
// app.get("*", (_, res) => {
//     res.sendFile(path.resolve(_dirname, "frontend", "build", "index.html"));
// })

// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import salesRoutes from './routes/salesRoutes.js';
import purchaseRoutes from './routes/purchaseRoutes.js';
import path from 'path';

const app = express();
const PORT = 5000;

// CORS Configuration
const corsOptions = {
    origin: 'https://sports-7-ypvt.onrender.com',
    credentials: true
};

// Middleware
app.use(cors(corsOptions)); // Applying CORS settings
app.use(express.json());

// Database connection
connectDB();

const _dirname = path.resolve();

// Routes
app.use('/api/products', productRoutes);
app.use('/api/sales', salesRoutes);
app.use('/api/purchases', purchaseRoutes);

// Serve frontend static files
app.use(express.static(path.join(_dirname, "/frontend/build")));
app.get("*", (_, res) => {
    res.sendFile(path.resolve(_dirname, "frontend", "build", "index.html"));
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
