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
      `SELECT u.id, u.name, u.email, u.role, u.created_at, 
              c.phone, c.city, c.state 
       FROM users u 
       LEFT JOIN customers c ON u.id = c.user_id 
       ORDER BY u.created_at DESC`
    );

    return NextResponse.json({ customers: rows });
  } catch (error) {
    console.error('Error fetching customers:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
