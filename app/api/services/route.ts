import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    const [rows] = await pool.query('SELECT * FROM services ORDER BY created_at ASC');
    
    // Parse the JSON bullets back to array
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
