import dns from "node:dns";
import mysql from "mysql2/promise";

dns.setDefaultResultOrder("ipv4first");

const host = process.env.DB_HOST || "localhost";
const useSsl = process.env.DB_SSL === "true";

const pool = mysql.createPool({
  host,
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "kb_financial",
  waitForConnections: true,
  connectionLimit: 1,
  maxIdle: 1,
  idleTimeout: 10000,
  queueLimit: 10,
  connectTimeout: 8000,
  enableKeepAlive: true,
  ssl: useSsl ? { rejectUnauthorized: false } : undefined,
});

export async function pingDatabase() {
  const [rows] = await withTimeout(pool.query("SELECT 1 AS ok"), 8000);
  return (rows as any[])[0]?.ok === 1;
}

function withTimeout<T>(promise: Promise<T>, ms = 8000): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("DB timeout")), ms);
    promise.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (err) => {
        clearTimeout(timer);
        reject(err);
      }
    );
  });
}

export { withTimeout };

export default pool;
