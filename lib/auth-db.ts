import bcrypt from "bcryptjs";
import pool from "@/lib/db";
import { RowDataPacket } from "mysql2";

export const DEFAULT_ADMIN_EMAIL = "admin@kbfinancial.in";
export const DEFAULT_ADMIN_PASSWORD = "AdminPassword123!";

export async function ensureAuthTables() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      role VARCHAR(20) DEFAULT 'USER',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS customers (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      phone VARCHAR(20),
      address TEXT,
      city VARCHAR(100),
      state VARCHAR(100),
      pincode VARCHAR(20),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `);
}

export async function ensureDefaultAdmin() {
  await ensureAuthTables();

  const [admins] = await pool.execute<RowDataPacket[]>(
    "SELECT id FROM users WHERE role = 'ADMIN' LIMIT 1"
  );

  if (admins.length > 0) return;

  const [existing] = await pool.execute<RowDataPacket[]>(
    "SELECT id FROM users WHERE email = ?",
    [DEFAULT_ADMIN_EMAIL]
  );

  if (existing.length > 0) {
    await pool.execute("UPDATE users SET role = 'ADMIN' WHERE email = ?", [
      DEFAULT_ADMIN_EMAIL,
    ]);
    return;
  }

  const hashedPassword = await bcrypt.hash(DEFAULT_ADMIN_PASSWORD, 10);
  await pool.execute(
    "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
    ["KB Admin", DEFAULT_ADMIN_EMAIL, hashedPassword, "ADMIN"]
  );
}
