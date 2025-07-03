// db.js
require('dotenv').config();
const mysql = require('mysql2');

// Direct DB credentials
const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

let connection;

const connectToServer = (callback) => {
  connection = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
  });

  connection.connect((err) => {
    if (err) {
      console.error('❌ MySQL connection error:', err.message);
      return callback(err);
    }
    console.log('✅ MySQL database connected successfully!');
    callback(null);
  });
};

// const getDb = () => connection;

module.exports = {
  connectToServer,
//   getDb,
};
