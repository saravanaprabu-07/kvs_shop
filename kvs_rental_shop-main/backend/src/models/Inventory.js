const db = require('../db');

const InventoryModel = {
  async getAll() {
    const [rows] = await db.query('SELECT * FROM inventory ORDER BY name ASC');
    return rows;
  }
};

module.exports = InventoryModel;