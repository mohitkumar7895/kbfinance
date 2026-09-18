const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });
require('dotenv').config({ path: '.env' });

async function setupDatabase() {
  try {
    // Connect without specifying database to create it if it doesn't exist
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      multipleStatements: true
    });

    console.log('Connected to MySQL server.');

    // Read the schema file
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');

    console.log('Executing schema.sql...');
    
    // Execute the SQL statements
    await connection.query(schemaSql);
    
    console.log('Database and tables created successfully!');
    
    await connection.end();
  } catch (error) {
    console.error('Error setting up the database:', error);
  }
}

setupDatabase();
