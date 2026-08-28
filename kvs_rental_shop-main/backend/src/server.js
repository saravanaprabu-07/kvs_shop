const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// 1. Inventory Endpoint
app.get('/api/inventory', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM inventory');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Orders & Order Items Endpoint
app.get('/api/orders', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT o.*, c.name AS customer_name, c.phone 
      FROM orders o 
      LEFT JOIN customers c ON o.customer_id = c.id
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Customers Endpoint
app.get('/api/customers', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM customers');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/inventory', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM inventory');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. Tent Bookings Endpoint
app.get('/api/tent-bookings', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM tent_bookings');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. Payments Endpoint
app.get('/api/payments', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM payments');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`KVS Rental Server running on port ${PORT}`));