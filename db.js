const { Pool } = require('pg');
require('dotenv').config();

// Create a new pool using your .env credentials
const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
});

// Test the connection
pool.connect((err, client, release) => {
    if (err) {
        return console.error('Error acquiring client', err.stack);
    }
    console.log('Successfully connected to the PostgreSQL Database!');
    release(); // Puts the connection back in the pool
});

module.exports = pool;