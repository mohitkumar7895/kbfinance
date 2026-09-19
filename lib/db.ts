import mysql from "mysql2/promise";

const host = process.env.DB_HOST || "localhost";
const isLocal = host === "localhost" || host === "127.0.0.1";

const pool = mysql.createPool({
  host,
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "kb_financial",
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 10,
  connectTimeout: 15000,
  enableKeepAlive: true,
  ssl:
    process.env.DB_SSL === "false" || isLocal
      ? undefined
      : { rejectUnauthorized: false },
});

export default pool;
