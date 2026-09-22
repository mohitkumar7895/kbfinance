import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import nodemailer from 'nodemailer';

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

    // Send email notification
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      const mailOptions = {
        from: process.env.SMTP_USER || 'noreply@kbfinance.in.net',
        to: 'FINANCESERVICESKB@GMAIL.COM',
        subject: `New Enquiry from ${name}`,
        html: `
          <h2>New Enquiry Received</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Email:</strong> ${email || 'N/A'}</p>
          <p><strong>City:</strong> ${city}</p>
          <p><strong>Message:</strong></p>
          <p>${message ? message.replace(/\n/g, '<br>') : 'N/A'}</p>
        `,
      };

      if (process.env.SMTP_USER && process.env.SMTP_PASS) {
        await transporter.sendMail(mailOptions);
      } else {
        console.warn('SMTP credentials not configured, skipping email notification');
      }
    } catch (emailError) {
      console.error('Failed to send email notification:', emailError);
      // We don't want to fail the whole request if email fails, so we just log it
    }

    return NextResponse.json({ success: true, id: (result as any).insertId }, { status: 201 });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
