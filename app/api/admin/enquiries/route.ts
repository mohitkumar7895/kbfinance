import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || (session.user as any).role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const [rows] = await pool.execute<RowDataPacket[]>(
      `SELECT id, name, phone, email, city, service_required, message, status, created_at 
       FROM contact_inquiries 
       ORDER BY created_at DESC`
    );

    return NextResponse.json({ enquiries: rows });
  } catch (error) {
    console.error('Error fetching enquiries:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
