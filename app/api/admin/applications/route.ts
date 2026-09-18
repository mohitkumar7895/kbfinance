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
      `SELECT l.id, u.name as user_name, u.email, l.service_type, 
              l.loan_amount, l.employment_type, l.status, l.created_at 
       FROM loan_applications l 
       JOIN users u ON l.user_id = u.id 
       ORDER BY l.created_at DESC`
    );

    return NextResponse.json({ applications: rows });
  } catch (error) {
    console.error('Error fetching applications:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
