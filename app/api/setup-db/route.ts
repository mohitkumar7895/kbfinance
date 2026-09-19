import { NextResponse } from 'next/server';
import pool from '@/lib/db';

const initialServices = [
  {
    id: "personal",
    title: "Personal Loan",
    subtitle: "Quick and easy personal loans for your immediate needs.",
    bullets: ["No collateral required", "Fast approval process", "Flexible repayment terms"],
    buttonText: "Apply for Personal Loan",
    image: "/images/personal-loan.jpg"
  },
  {
    id: "business",
    title: "Business Loan",
    subtitle: "Fuel your business growth with our tailored business loans.",
    bullets: ["Working capital finance", "Machinery loan", "Expansion funds"],
    buttonText: "Apply for Business Loan",
    image: "/images/business-loan.jpg"
  },
  {
    id: "home",
    title: "Home Loan",
    subtitle: "Fulfill your dream of owning a home with attractive interest rates.",
    bullets: ["Low interest rates", "Long repayment tenure", "Easy documentation"],
    buttonText: "Apply for Home Loan",
    image: "/images/service-loans.jpg"
  },
  {
    id: "lap",
    title: "Loan Against Property",
    subtitle: "Unlock the value of your property to meet large financial needs.",
    bullets: ["High loan amount", "Lower interest rates", "Residential or commercial"],
    buttonText: "Apply for LAP",
    image: "/images/service-insurance.jpg"
  },
  {
    id: "fd",
    title: "Fixed Deposit (FD)",
    subtitle: "Secure your savings and earn guaranteed returns over time.",
    bullets: ["High interest rates", "Flexible tenure", "Safe and secure"],
    buttonText: "Open an FD Today",
    image: "/images/service-investment.jpg"
  },
  {
    id: "rd",
    title: "Recurring Deposit (RD)",
    subtitle: "Build a corpus systematically with small monthly savings.",
    bullets: ["Save regularly", "Attractive returns", "Inculcates savings habit"],
    buttonText: "Start an RD",
    image: "/images/hero-2.jpg"
  },
  {
    id: "msme",
    title: "MSME Loan",
    subtitle: "Specialized financial support for Micro, Small and Medium Enterprises.",
    bullets: ["Collateral-free options", "Government scheme support", "Quick processing"],
    buttonText: "Apply for MSME Loan",
    image: "/images/hero-3.jpg"
  },
  {
    id: "credit",
    title: "Credit Card",
    subtitle: "Enjoy financial flexibility and rewards with our premium credit cards.",
    bullets: ["Cashback & rewards", "Lounge access", "Interest-free period"],
    buttonText: "Apply for Credit Card",
    image: "/images/service-tax.jpg"
  }
];

export async function GET() {
  try {
    // 1. Create table if it doesn't exist (Useful for Vercel production)
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

    // 2. Check if table is empty
    const [rows] = await pool.query('SELECT COUNT(*) as count FROM services');
    
    // 3. Seed data if empty
    if ((rows as any)[0].count === 0) {
      for (const svc of initialServices) {
        await pool.query(
          `INSERT INTO services (id, title, subtitle, bullets, buttonText, image) VALUES (?, ?, ?, ?, ?, ?)`,
          [svc.id, svc.title, svc.subtitle, JSON.stringify(svc.bullets), svc.buttonText, svc.image]
        );
      }
      return NextResponse.json({ success: true, message: "Database table created and seeded with 8 services successfully!" });
    }

    return NextResponse.json({ success: true, message: "Database table is already set up and contains data." });
  } catch (error) {
    console.error('Setup error:', error);
    return NextResponse.json({ error: 'Failed to setup database', details: error }, { status: 500 });
  }
}
