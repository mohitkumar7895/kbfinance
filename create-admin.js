const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');

async function createAdmin() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'kb_finance'
  });

  const email = 'admin@kbfinancial.in';
  const password = 'AdminPassword123!';
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const [existing] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      console.log('Admin already exists.');
      await connection.execute('UPDATE users SET role = "ADMIN" WHERE email = ?', [email]);
      console.log('Role ensured to be ADMIN.');
      process.exit(0);
    }

    await connection.execute(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      ['KB Admin', email, hashedPassword, 'ADMIN']
    );
    console.log('Admin created successfully.');
  } catch (error) {
    console.error('Error creating admin:', error);
  } finally {
    await connection.end();
  }
}

createAdmin();
