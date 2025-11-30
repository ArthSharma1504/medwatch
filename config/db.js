// config/db.js
const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || "127.0.0.1",
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME || "medwatch",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  // enable namedPlaceholders if you want to use :name style placeholders
  // namedPlaceholders: true
});

// Simple ping to validate connection at startup
pool.getConnection((err, conn) => {
  if (err) {
    console.error("MySQL connection error (pool):", err.message);
    // Do NOT throw here if you want dev-server to keep running; throw in production if desired
  } else {
    console.log("MySQL pool connected");
    conn.release();
  }
});

module.exports = pool;
