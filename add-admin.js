const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');

async function run() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'kb_finance'
  });

  const email = 'financeserviceskb@gmail.com';
  const password = 'financekb@321';
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const [existing] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      console.log('User exists. Updating password and role.');
      await connection.execute('UPDATE users SET password = ?, role = "ADMIN" WHERE email = ?', [hashedPassword, email]);
      console.log('Updated existing user successfully.');
    } else {
      await connection.execute(
        'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
        ['KB Admin', email, hashedPassword, 'ADMIN']
      );
      console.log('Admin created successfully.');
    }
  } catch (err) {
    console.error(err);
  } finally {
    await connection.end();
  }
}

run();
