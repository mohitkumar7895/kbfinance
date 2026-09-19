import { NextResponse } from 'next/server';
import { initialServices } from '@/data/servicesSeed';

export async function GET() {
  try {
    // Ensure table exists
    await pool.query(`
      CREATE TABLE IF NOT EXISTS services (
        id VARCHAR(255) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        subtitle TEXT,
        bullets JSON,
        buttonText VARCHAR(255),
        image VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Seed if empty
    const [countRows] = await pool.query('SELECT COUNT(*) as count FROM services');
    if ((countRows as any)[0].count === 0) {
      for (const svc of initialServices) {
        await pool.query(
          `INSERT INTO services (id, title, subtitle, bullets, buttonText, image) VALUES (?, ?, ?, ?, ?, ?)`,
          [svc.id, svc.title, svc.subtitle, JSON.stringify(svc.bullets), svc.buttonText, svc.image]
        );
      }
    }

    const [rows] = await pool.query('SELECT * FROM services ORDER BY created_at ASC');
    const services = (rows as any[]).map(row => ({
      ...row,
      bullets: typeof row.bullets === 'string' ? JSON.parse(row.bullets) : row.bullets
    }));

    return NextResponse.json({ services });
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
  }
}
