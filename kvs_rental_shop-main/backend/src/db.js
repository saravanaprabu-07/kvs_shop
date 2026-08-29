const mysql = require('mysql2');
require('dotenv').config();

const clean = (val) => (val ? val.trim() : val);

// Aiven requires SSL. We skip strict CA chain verification here because
// pasting a multi-line PEM certificate into dashboard env var fields
// reliably corrupts line breaks. The connection is still encrypted --
// rejectUnauthorized:false only disables verifying the server's identity
// against that CA, not encryption itself.
const pool = mysql.createPool({
  host: clean(process.env.DB_HOST),
  port: Number(clean(process.env.DB_PORT)) || 3306,
  user: clean(process.env.DB_USER),
  password: clean(process.env.DB_PASSWORD),
  database: clean(process.env.DB_NAME),
  waitForConnections: true,
  connectionLimit: 10,
  connectTimeout: 20000,
  ssl: { rejectUnauthorized: false }
});

module.exports = pool.promise();