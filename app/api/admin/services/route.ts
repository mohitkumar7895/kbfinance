import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import pool from '@/lib/db';

export async function GET() {
  const session = await getServerSession(authOptions);
  
  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
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

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await request.json();
    const { id, title, subtitle, bullets, buttonText, image } = data;

    if (!id || !title || !subtitle || !bullets || !buttonText || !image) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    await pool.query(
      `INSERT INTO services (id, title, subtitle, bullets, buttonText, image) VALUES (?, ?, ?, ?, ?, ?)`,
      [id, title, subtitle, JSON.stringify(bullets), buttonText, image]
    );

    return NextResponse.json({ success: true, message: 'Service created successfully' });
  } catch (error: any) {
    console.error('Error creating service:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      return NextResponse.json({ error: 'A service with this ID already exists' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create service' }, { status: 500 });
  }
}
