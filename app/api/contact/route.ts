import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, city, message } = body;

    if (!name || !phone || !city) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const query = `
      INSERT INTO contact_inquiries (name, phone, email, city, message)
      VALUES (?, ?, ?, ?, ?)
    `;
    const values = [name, phone, email || null, city, message || null];

    const [result] = await pool.execute(query, values);

    return NextResponse.json({ success: true, id: (result as any).insertId }, { status: 201 });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
