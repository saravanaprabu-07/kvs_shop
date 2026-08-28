const express = require('express');
const router = express.Router();
const Customer = require('../models/Customers');

router.get('/', async (req, res) => {
  try {
    const customers = await Customer.getAll();
    res.json(customers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const newCustomer = await Customer.create(req.body);
    res.status(201).json(newCustomer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;