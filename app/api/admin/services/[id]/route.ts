import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import pool from '@/lib/db';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  
  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await request.json();
    const { title, subtitle, bullets, buttonText, image } = data;

    if (!title || !subtitle || !bullets || !buttonText || !image) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    await pool.query(
      `UPDATE services SET title = ?, subtitle = ?, bullets = ?, buttonText = ?, image = ? WHERE id = ?`,
      [title, subtitle, JSON.stringify(bullets), buttonText, image, params.id]
    );

    return NextResponse.json({ success: true, message: 'Service updated successfully' });
  } catch (error) {
    console.error('Error updating service:', error);
    return NextResponse.json({ error: 'Failed to update service' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  
  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await pool.query('DELETE FROM services WHERE id = ?', [params.id]);

    return NextResponse.json({ success: true, message: 'Service deleted successfully' });
  } catch (error) {
    console.error('Error deleting service:', error);
    return NextResponse.json({ error: 'Failed to delete service' }, { status: 500 });
  }
}
