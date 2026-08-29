const mysql = require('mysql2');
require('dotenv').config();

// Trim every value to eliminate hidden whitespace/tab/newline characters
// that can sneak in when copy-pasting credentials into a dashboard.
const clean = (val) => (val ? val.trim() : val);

// Aiven (and most managed MySQL providers) require SSL.
// Paste the full contents of the downloaded ca.pem into the DB_SSL_CA env var on Render.
const sslConfig = process.env.DB_SSL_CA
  ? { ca: clean(process.env.DB_SSL_CA).replace(/\\n/g, '\n') }
  : undefined;

const pool = mysql.createPool({
  host: clean(process.env.DB_HOST),
  port: Number(clean(process.env.DB_PORT)) || 3306,
  user: clean(process.env.DB_USER),
  password: clean(process.env.DB_PASSWORD),
  database: clean(process.env.DB_NAME),
  waitForConnections: true,
  connectionLimit: 10,
  connectTimeout: 20000,
  ssl: sslConfig
});

module.exports = pool.promise();