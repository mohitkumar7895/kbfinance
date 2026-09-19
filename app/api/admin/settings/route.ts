import { NextResponse } from "next/server";
import pool from "@/lib/db";

// Ensure table exists
async function ensureSettingsTable() {
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS settings (
      setting_key VARCHAR(100) PRIMARY KEY,
      setting_value TEXT
    )
  `);

  // Insert defaults if empty
  const [rows] = await pool.execute("SELECT COUNT(*) as count FROM settings");
  const count = (rows as any)[0].count;
  
  if (count === 0) {
    await pool.execute(`
      INSERT INTO settings (setting_key, setting_value) VALUES 
      ('founder_image', '/images/about.jpg'),
      ('founder_name', 'Sanjay Kumar Rawat'),
      ('founder_bio', 'Dedicated to helping individuals and businesses navigate their financial journeys with confidence.'),
      ('partner_image_1', '/images/partner1.jpg'),
      ('partner_image_2', '/images/partner2.jpg'),
      ('partner_image_3', '/images/partner3.jpg')
    `);
  }
}

export async function GET() {
  try {
    await ensureSettingsTable();
    
    const [rows] = await pool.execute("SELECT setting_key, setting_value FROM settings");
    
    const settings = (rows as any[]).reduce((acc, row) => {
      acc[row.setting_key] = row.setting_value;
      return acc;
    }, {});
    
    return NextResponse.json(settings);
  } catch (error) {
    console.error("Failed to fetch settings:", error);
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    await ensureSettingsTable();
    
    // Process each key-value pair and update the database
    for (const [key, value] of Object.entries(data)) {
      if (typeof value === 'string') {
        await pool.execute(
          "INSERT INTO settings (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value = ?",
          [key, value, value]
        );
      }
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to update settings:", error);
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}
