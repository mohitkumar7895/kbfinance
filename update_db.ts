import pool from "./lib/db";
import { defaultSiteContent } from "./data/siteContent";

async function run() {
  try {
    const CONTENT_KEY = "site_content";
    const [rows]: any = await pool.execute("SELECT setting_value FROM settings WHERE setting_key = ?", [CONTENT_KEY]);
    let content = rows.length > 0 && rows[0].setting_value ? JSON.parse(rows[0].setting_value) : {};

    // Ensure contact exists
    if (!content.contact) content.contact = {};
    
    // Update email
    content.contact.email = defaultSiteContent.contact.email;

    const value = JSON.stringify(content);
    await pool.execute(
      "INSERT INTO settings (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value = ?",
      [CONTENT_KEY, value, value]
    );
    console.log("Database updated successfully");
  } catch (error) {
    console.error("Error:", error);
  } finally {
    process.exit(0);
  }
}

run();
