import pool from "@/lib/db";
import { initialServices } from "@/data/servicesSeed";

const CREATE_SERVICES_TABLE = `
  CREATE TABLE IF NOT EXISTS services (
    id VARCHAR(255) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    subtitle TEXT,
    bullets JSON,
    buttonText VARCHAR(255),
    image VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`;

function parseBullets(bullets: unknown): string[] {
  if (Array.isArray(bullets)) {
    return bullets.map(String);
  }

  if (typeof bullets === "string") {
    try {
      const parsed = JSON.parse(bullets);
      return Array.isArray(parsed) ? parsed.map(String) : [];
    } catch {
      return [];
    }
  }

  return [];
}

function mapServiceRows(rows: any[]) {
  return rows.map((row) => ({
    ...row,
    bullets: parseBullets(row.bullets),
  }));
}

export async function getServices() {
  try {
    await pool.query(CREATE_SERVICES_TABLE);

    const [countRows] = await pool.query("SELECT COUNT(*) as count FROM services");
    const count = Number((countRows as any)[0]?.count ?? 0);

    if (count === 0) {
      for (const svc of initialServices) {
        await pool.query(
          `INSERT INTO services (id, title, subtitle, bullets, buttonText, image) VALUES (?, ?, ?, ?, ?, ?)`,
          [svc.id, svc.title, svc.subtitle, JSON.stringify(svc.bullets), svc.buttonText, svc.image]
        );
      }
    }

    const [rows] = await pool.query("SELECT * FROM services ORDER BY created_at ASC");
    const services = mapServiceRows(rows as any[]);
    return services.length > 0 ? services : initialServices;
  } catch (err) {
    console.error("Failed to fetch services:", err);
    return initialServices;
  }
}
