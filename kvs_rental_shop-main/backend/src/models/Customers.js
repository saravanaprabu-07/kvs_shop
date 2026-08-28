const db = require('../db');

const CustomerModel = {
  async getAll() {
    const [rows] = await db.query('SELECT * FROM customers ORDER BY id DESC');
    return rows;
  },

  async create(customerData) {
    const { name, phone, id_proof_type, id_proof_num } = customerData;
    const [result] = await db.query(
      'INSERT INTO customers (name, phone, id_proof_type, id_proof_num) VALUES (?, ?, ?, ?)',
      [name, phone, id_proof_type, id_proof_num]
    );
    return { id: result.insertId, ...customerData };
  }
};

module.exports = CustomerModel;