const express = require('express');
const router = express.Router();
const Inventory = require('../models/Inventory');

router.get('/', async (req, res) => {
  try {
    const items = await Inventory.getAll();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;