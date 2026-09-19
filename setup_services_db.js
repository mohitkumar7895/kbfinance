require('dotenv').config({ path: '.env' });
const mysql = require('mysql2/promise');

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

async function setup() {
  const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'kb_financial',
  });

  try {
    console.log("Creating services table if not exists...");
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

    // Check if table is empty
    const [rows] = await pool.query('SELECT COUNT(*) as count FROM services');
    if (rows[0].count === 0) {
      console.log("Seeding services table...");
      for (const svc of initialServices) {
        await pool.query(
          `INSERT INTO services (id, title, subtitle, bullets, buttonText, image) VALUES (?, ?, ?, ?, ?, ?)`,
          [svc.id, svc.title, svc.subtitle, JSON.stringify(svc.bullets), svc.buttonText, svc.image]
        );
      }
      console.log("Services seeded successfully.");
    } else {
      console.log("Services table already has data, skipping seed.");
    }
  } catch (err) {
    console.error("Setup failed:", err);
  } finally {
    await pool.end();
  }
}

setup();
