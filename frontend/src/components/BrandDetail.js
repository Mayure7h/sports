import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './BrandDetail.css'; // Import the CSS file for styling

const BrandDetail = () => {
  const { productId,name} = useParams();
  
  const [sales, setSales] = useState([]);
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    if (!productId) {
      console.warn('Product ID is not defined, skipping API calls');
      return;
    }

    console.log(`Fetching data for product ID: ${productId}`);

    axios.get(`http://localhost:5000/api/sales/${productId}`)
      .then((res) => {
        console.log('Sales data received:', res.data);
        setSales(res.data);
      })
      .catch((err) => console.error('Failed to fetch sales:', err));

    axios.get(`http://localhost:5000/api/purchases/${productId}`)
      .then((res) => {
        console.log('Purchase data received:', res.data);
        setPurchases(res.data);
      })
      .catch((err) => console.error('Failed to fetch purchases:', err));
  }, [productId]);

  return (
    <div className="brand-detail-container">
      <h2>Details for Product ID: { productId|| 'Unknown'}</h2>

      <div className="sales-section">
        <h3>Sales Records</h3>
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Sales ID</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Total Amount</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {sales.length > 0 ? (
              sales.map((sale) => (
                <tr key={sale._id}>
                  <td>{sale._id}</td>
                  <td>{sale.salesQuantity}</td>
                  <td>${sale.salesUnitPrice}</td>
                  <td>${(sale.salesQuantity * sale.salesUnitPrice).toFixed(2)}</td>
                  <td>{new Date(sale.salesTimestamp).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="5">No sales data available</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="purchase-section">
        <h3>Purchase Records</h3>
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Purchase ID</th>
              <th>Quantity</th>
              <th>Unit Cost</th>
              <th>Total Cost</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {purchases.length > 0 ? (
              purchases.map((purchase) => (
                <tr key={purchase._id}>
                  <td>{purchase._id}</td>
                  <td>{purchase.purchaseQuantity}</td>
                  <td>${purchase.purchaseUnitCost}</td>
                  <td>${(purchase.purchaseQuantity * purchase.purchaseUnitCost).toFixed(2)}</td>
                  <td>{new Date(purchase.purchaseTimestamp).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="5">No purchase data available</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BrandDetail;