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

    // Fetch Total Customers
    const [customersResult] = await pool.execute<RowDataPacket[]>('SELECT COUNT(*) as count FROM customers');
    const totalCustomers = customersResult[0].count;

    // Fetch Pending Applications
    const [appsResult] = await pool.execute<RowDataPacket[]>('SELECT COUNT(*) as count FROM loan_applications WHERE status IN ("NEW", "UNDER_REVIEW")');
    const pendingApps = appsResult[0].count;

    // Fetch New Enquiries
    const [enquiriesResult] = await pool.execute<RowDataPacket[]>('SELECT COUNT(*) as count FROM contact_inquiries WHERE status = "NEW"');
    const newEnquiries = enquiriesResult[0].count;

    // Fetch Recent Activity (Combining recent inquiries and loan applications)
    const [recentEnquiries] = await pool.execute<RowDataPacket[]>(
      'SELECT id, name as user, service_required as action_type, "submitted a new enquiry" as action, created_at, status FROM contact_inquiries ORDER BY created_at DESC LIMIT 3'
    );
    
    const [recentApps] = await pool.execute<RowDataPacket[]>(
      'SELECT l.id, u.name as user, l.service_type as action_type, "submitted a new loan application" as action, l.created_at, l.status FROM loan_applications l JOIN users u ON l.user_id = u.id ORDER BY l.created_at DESC LIMIT 3'
    );

    // Combine and sort by date descending
    const activity = [...recentEnquiries, ...recentApps]
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 5)
      .map(item => ({
        id: item.id + '-' + item.action_type,
        user: item.user,
        action: item.action + ' for ' + item.action_type,
        time: item.created_at, // Will be formatted on client
        status: item.status.toLowerCase()
      }));

    return NextResponse.json({
      stats: {
        totalCustomers,
        pendingApps,
        newEnquiries,
      },
      activity
    });
  } catch (error) {
    console.error('Error fetching admin dashboard data:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
