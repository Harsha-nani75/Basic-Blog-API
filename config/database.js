const mysql = require('mysql2/promise');
require('dotenv').config();

// Create a connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'blog_api',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test the connection
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Connected to MySQL Database');
    connection.release();
    return true;
  } catch (err) {
    console.error('❌ MySQL connection error:', err.message);
    console.log('\n🔧 To fix this issue:');
    console.log('1. Install MySQL locally: https://dev.mysql.com/downloads/mysql/');
    console.log('2. Create a database named "blog_api" or update DB_NAME in .env');
    console.log('3. Update your .env file with the correct database credentials:');
    console.log('   DB_HOST=localhost');
    console.log('   DB_USER=root');
    console.log('   DB_PASSWORD=your_password');
    console.log('   DB_NAME=blog_api');
    console.log('4. Run the database.sql file to create tables and sample data:');
    console.log('   mysql -u root -p blog_api < database.sql\n');
    throw err;
  }
};

module.exports = { pool, testConnection };

