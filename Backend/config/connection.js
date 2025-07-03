require('dotenv').config();
const mysql = require('mysql2');  // Import mysql2 package

// Direct DB credentials from environment variables
const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  waitForConnections: true,  // Wait for a connection to become available
  connectionLimit: 10,       // Max number of connections to create at a time
  queueLimit: 0              // No limit on the number of queued connections
});

// Use the promise API for easy async/await usage
const promisePool = pool.promise();  // Chain .promise() to enable promises

// Export the promise-based pool
module.exports = promisePool;
